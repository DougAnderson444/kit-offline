const i = "app-cache", f = (e) => {
  e.respondWith(
    caches.match(e.request).then(async (t) => {
      if (t)
        return t;
      const l = await caches.open(i);
      return fetch(e.request).then(async (a) => {
        if (e.request.url.indexOf("http") !== -1 && e.request.mode === "navigate")
          try {
            await l.add(e.request), console.log("Added", { cache: l });
          } catch (s) {
            console.error(s);
          }
        return a;
      }).catch(async (a) => {
        console.log("Fetch failed; returning offline page instead.", a);
        const s = await l.match(e.request);
        return console.log(e.request.url, { cachedResponse: s }), s;
      });
    })
  );
}, o = [
  "/sveltekit-offline/_app/immutable/assets/svelte-logo-87df40b8.svg",
  "/sveltekit-offline/_app/immutable/assets/fira-mono-greek-400-normal-a8be01ce.woff2",
  "/sveltekit-offline/_app/immutable/assets/fira-mono-cyrillic-ext-400-normal-3df7909e.woff2",
  "/sveltekit-offline/_app/immutable/assets/fira-mono-cyrillic-400-normal-c7d433fd.woff2",
  "/sveltekit-offline/_app/immutable/assets/fira-mono-latin-ext-400-normal-6bfabd30.woff2",
  "/sveltekit-offline/_app/immutable/assets/fira-mono-latin-400-normal-e43b3538.woff2",
  "/sveltekit-offline/_app/immutable/assets/fira-mono-greek-ext-400-normal-9e2fe623.woff2",
  "/sveltekit-offline/_app/immutable/assets/fira-mono-all-400-normal-1e3b098c.woff",
  "/sveltekit-offline/_app/immutable/start-7d0ac574.js",
  "/sveltekit-offline/_app/immutable/components/pages/_layout.svelte-4937fc84.js",
  "/sveltekit-offline/_app/immutable/assets/+layout-f00d6398.css",
  "/sveltekit-offline/_app/immutable/components/error.svelte-7d27ffec.js",
  "/sveltekit-offline/_app/immutable/components/pages/_page.svelte-fae7dd47.js",
  "/sveltekit-offline/_app/immutable/assets/+page-ab7a0104.css",
  "/sveltekit-offline/_app/immutable/modules/pages/_page.ts-e9fa0128.js",
  "/sveltekit-offline/_app/immutable/chunks/singletons-1148c08f.js",
  "/sveltekit-offline/_app/immutable/chunks/paths-03251350.js",
  "/sveltekit-offline/_app/immutable/chunks/stores-682d6f0f.js",
  "/sveltekit-offline/_app/immutable/chunks/_page-802cc2a3.js",
  "/sveltekit-offline/_app/immutable/chunks/0-e3ae6ac2.js",
  "/sveltekit-offline/_app/immutable/chunks/1-044af7fe.js",
  "/sveltekit-offline/_app/immutable/chunks/2-86f2d5f7.js"
], n = [
  "/sveltekit-offline/.nojekyll",
  "/sveltekit-offline/favicon.png",
  "/sveltekit-offline/logo.png",
  "/sveltekit-offline/manifest.webmanifest",
  "/sveltekit-offline/robots.txt",
  "/sveltekit-offline/svelte-welcome.png",
  "/sveltekit-offline/svelte-welcome.webp",
  "/sveltekit-offline/svelte.svg"
], m = (e) => {
  console.log("installing service worker"), e.waitUntil(
    caches.open(i).then((t) => (t.addAll(o), t.addAll(n), !0))
  );
};
self.addEventListener("install", m);
self.addEventListener("fetch", f);
