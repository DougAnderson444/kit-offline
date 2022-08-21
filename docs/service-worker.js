const l = "app-cache", o = (e) => {
  e.respondWith(
    caches.match(e.request).then(async (a) => {
      if (a)
        return a;
      console.info(`trying to fetch from server: ${e.request.url}`);
      const t = await caches.open(l);
      return fetch(e.request).then(async (p) => {
        if (e.request.url.indexOf("http") !== -1 && e.request.mode === "navigate")
          try {
            await t.add(e.request), console.log("Added", { cache: t });
          } catch (s) {
            console.error(s);
          }
        else
          console.log("Not added", e.request.url, e.request.mode);
        return p;
      }).catch(async (p) => {
        console.log("Fetch failed; returning offline page instead.", p);
        const s = await t.match(e.request);
        return console.log(e.request.url, { cachedResponse: s }), s;
      });
    })
  );
}, m = [
  "/_app/immutable/assets/svelte-logo-87df40b8.svg",
  "/_app/immutable/assets/fira-mono-cyrillic-ext-400-normal-3df7909e.woff2",
  "/_app/immutable/assets/fira-mono-greek-ext-400-normal-9e2fe623.woff2",
  "/_app/immutable/assets/fira-mono-cyrillic-400-normal-c7d433fd.woff2",
  "/_app/immutable/assets/fira-mono-greek-400-normal-a8be01ce.woff2",
  "/_app/immutable/assets/fira-mono-latin-ext-400-normal-6bfabd30.woff2",
  "/_app/immutable/assets/fira-mono-latin-400-normal-e43b3538.woff2",
  "/_app/immutable/assets/fira-mono-all-400-normal-1e3b098c.woff",
  "/_app/immutable/start-2cf27035.js",
  "/_app/immutable/components/pages/_layout.svelte-44f1e18b.js",
  "/_app/immutable/assets/+layout-f00d6398.css",
  "/_app/immutable/components/error.svelte-56acf75b.js",
  "/_app/immutable/components/pages/_page.svelte-95c6dc0c.js",
  "/_app/immutable/assets/+page-ab7a0104.css",
  "/_app/immutable/components/pages/about/_page.svelte-8bbe12be.js",
  "/_app/immutable/assets/+page-5770d689.css",
  "/_app/immutable/components/pages/todos/_page.svelte-89ccc43f.js",
  "/_app/immutable/assets/+page-5519d4df.css",
  "/_app/immutable/modules/pages/_page.ts-e9fa0128.js",
  "/_app/immutable/modules/pages/about/_page.ts-e8ab19e6.js",
  "/_app/immutable/chunks/singletons-d80afa86.js",
  "/_app/immutable/chunks/index-5b0149c9.js",
  "/_app/immutable/chunks/index-b73ee6b7.js",
  "/_app/immutable/chunks/stores-f8c8bb87.js",
  "/_app/immutable/chunks/_page-802cc2a3.js",
  "/_app/immutable/chunks/_page-efb9c460.js",
  "/_app/immutable/chunks/0-bb946229.js",
  "/_app/immutable/chunks/1-0c0b212d.js",
  "/_app/immutable/chunks/2-8a8a1bdd.js",
  "/_app/immutable/chunks/3-fb06c495.js",
  "/_app/immutable/chunks/4-0d3312d4.js"
], c = (e) => {
  console.log("installing service worker"), e.waitUntil(
    caches.open(l).then((a) => (a.addAll(m), !0))
  );
};
self.addEventListener("install", c);
self.addEventListener("fetch", o);
