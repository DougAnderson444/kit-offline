import { CACHE_NAME } from './constants';

export default (event: FetchEvent): void => {
	event.respondWith(
		caches.match(event.request).then(async (cacheResponse) => {
			if (cacheResponse) {
				return cacheResponse;
			}

			console.info(`trying to fetch from server: ${event.request.url}`);
			const cache = await caches.open(CACHE_NAME);

			return fetch(event.request)
				.then(async (fetchResponse): Promise<Response | undefined> => {
					if (event.request.url.indexOf('http') !== -1 && event.request.mode === 'navigate') {
						try {
							await cache.add(event.request);
							console.log('Added', { cache });
						} catch (error) {
							console.error(error);
						}
					} else {
						console.log('Not added', event.request.url, event.request.mode);
					}

					return fetchResponse;
				})
				.catch(async (error) => {
					// console.error(`"${error}: ${event.request.url}`);
					console.log('Fetch failed; returning offline page instead.', error);

					const cachedResponse = await cache.match(event.request);
					console.log(event.request.url, { cachedResponse });
					return cachedResponse;

					// return error;
				});
		})
	);
};
