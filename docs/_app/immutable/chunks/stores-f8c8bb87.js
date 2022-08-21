import "./index-5b0149c9.js";
import { s as stores } from "./singletons-d80afa86.js";
const getStores = () => {
  const stores$1 = stores;
  const readonly_stores = {
    page: {
      subscribe: stores$1.page.subscribe
    },
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    updated: stores$1.updated
  };
  Object.defineProperties(readonly_stores, {
    preloading: {
      get() {
        console.error("stores.preloading is deprecated; use stores.navigating instead");
        return {
          subscribe: stores$1.navigating.subscribe
        };
      },
      enumerable: false
    },
    session: {
      get() {
        removed_session();
        return {};
      },
      enumerable: false
    }
  });
  return readonly_stores;
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function removed_session() {
  throw new Error(
    "stores.session is no longer available. See https://github.com/sveltejs/kit/discussions/5883"
  );
}
export {
  page as p
};
//# sourceMappingURL=stores-f8c8bb87.js.map
