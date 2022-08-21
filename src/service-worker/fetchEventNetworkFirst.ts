import { CACHE_NAME } from './constants';

export default (event: FetchEvent): void => {
	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE_NAME);

			try {
				// First, try to use the navigation preload response if it's
				// supported.
				const preloadResponse = await event.preloadResponse;
				if (preloadResponse) {
					return preloadResponse;
				}

				// Always try the network first.
				const networkResponse = await fetch(event.request);

				console.log('Good. ', { networkResponse });

				//cache it
				if (event.request.url.indexOf('http') !== -1 && event.request.mode === 'navigate') {
					try {
						// filter what to add to the cache
						if (networkResponse.status !== 206) {
							cache.add(event.request.url);
							console.log('Added', { cache });
						}
					} catch (error) {
						console.error(error);
					}
				} else {
					console.log('Not added', event.request.url.indexOf('http') !== -1, event.request.mode);
				}

				return networkResponse;
			} catch (error) {
				// catch is only triggered if an exception is thrown, which is
				// likely due to a network error.
				// If fetch() returns a valid HTTP response with a response code in
				// the 4xx or 5xx range, the catch() will NOT be called.
				console.log('Fetch failed; returning offline page instead.', error);

				const cachedResponse = await cache.match(event.request);
				console.log({ cachedResponse });
				return cachedResponse;
			}
		})()
	);
};
