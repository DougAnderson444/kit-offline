const p = "app-cache", m = (e) => {
  e.respondWith(
    caches.match(e.request).then(async (a) => {
      if (a)
        return a;
      const t = await caches.open(p);
      return fetch(e.request).then(async (l) => {
        if (e.request.url.indexOf("http") !== -1 && e.request.mode === "navigate")
          try {
            await t.add(e.request), console.log("Added", { cache: t });
          } catch (s) {
            console.error(s);
          }
        return l;
      }).catch(async (l) => {
        console.log("Fetch failed; returning offline page instead.", l);
        const s = await t.match(e.request);
        return console.log(e.request.url, { cachedResponse: s }), s;
      });
    })
  );
}, o = [
  "/_app/immutable/assets/svelte-logo-87df40b8.svg",
  "/_app/immutable/assets/fira-mono-greek-ext-400-normal-9e2fe623.woff2",
  "/_app/immutable/assets/fira-mono-cyrillic-400-normal-c7d433fd.woff2",
  "/_app/immutable/assets/fira-mono-cyrillic-ext-400-normal-3df7909e.woff2",
  "/_app/immutable/assets/fira-mono-greek-400-normal-a8be01ce.woff2",
  "/_app/immutable/assets/fira-mono-latin-ext-400-normal-6bfabd30.woff2",
  "/_app/immutable/assets/fira-mono-latin-400-normal-e43b3538.woff2",
  "/_app/immutable/assets/fira-mono-all-400-normal-1e3b098c.woff",
  "/_app/immutable/start-3945584a.js",
  "/_app/immutable/components/pages/_layout.svelte-d902a4e9.js",
  "/_app/immutable/assets/+layout-f00d6398.css",
  "/_app/immutable/components/error.svelte-f11dcb5d.js",
  "/_app/immutable/components/pages/_page.svelte-c3938bfb.js",
  "/_app/immutable/assets/+page-ab7a0104.css",
  "/_app/immutable/components/pages/about/_page.svelte-63812afa.js",
  "/_app/immutable/assets/+page-5770d689.css",
  "/_app/immutable/components/pages/todos/_page.svelte-1f226268.js",
  "/_app/immutable/assets/+page-5519d4df.css",
  "/_app/immutable/modules/pages/_page.ts-e9fa0128.js",
  "/_app/immutable/modules/pages/about/_page.ts-e8ab19e6.js",
  "/_app/immutable/chunks/singletons-3bb2d03b.js",
  "/_app/immutable/chunks/index-5b0149c9.js",
  "/_app/immutable/chunks/index-b73ee6b7.js",
  "/_app/immutable/chunks/stores-d5459a1e.js",
  "/_app/immutable/chunks/_page-802cc2a3.js",
  "/_app/immutable/chunks/_page-efb9c460.js",
  "/_app/immutable/chunks/0-e21cdecc.js",
  "/_app/immutable/chunks/1-e82ed13f.js",
  "/_app/immutable/chunks/2-9da09714.js",
  "/_app/immutable/chunks/3-91f18ffc.js",
  "/_app/immutable/chunks/4-16c447bb.js"
], n = [
  "/.nojekyll",
  "/favicon.png",
  "/logo.png",
  "/manifest.webmanifest",
  "/robots.txt",
  "/svelte-welcome.png",
  "/svelte-welcome.webp",
  "/svelte.svg"
], c = (e) => {
  console.log("installing service worker"), e.waitUntil(
    caches.open(p).then((a) => (a.addAll(o), a.addAll(n), !0))
  );
};
self.addEventListener("install", c);
self.addEventListener("fetch", m);
