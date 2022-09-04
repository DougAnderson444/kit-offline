var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { S as SvelteComponent, i as init, s as safe_not_equal, a as space, e as empty, c as claim_space, b as insert_hydration, g as group_outros, t as transition_out, d as check_outros, f as transition_in, h as detach, j as afterUpdate, o as onMount, k as element, l as claim_element, m as children, n as attr, p as set_style, q as text, r as claim_text, u as set_data, v as create_component, w as claim_component, x as mount_component, y as destroy_component, z as tick } from "./chunks/index-5b0149c9.js";
import { g as get_base_uri, f as find_anchor, a as get_href, s as stores, b as scroll_state, i as init$1, c as set_paths } from "./chunks/singletons-3bb2d03b.js";
import "./chunks/index-b73ee6b7.js";
class HttpError {
  constructor(status, message) {
    __publicField(this, "name", "HttpError");
    __publicField(this, "stack");
    this.status = status;
    this.message = message != null ? message : `Error: ${status}`;
  }
  toString() {
    return this.message;
  }
}
class Redirect {
  constructor(status, location2) {
    this.status = status;
    this.location = location2;
  }
}
function normalize_error(error2) {
  return error2;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_params(params) {
  for (const key in params) {
    params[key] = params[key].replace(/%23/g, "#").replace(/%3[Bb]/g, ";").replace(/%2[Cc]/g, ",").replace(/%2[Ff]/g, "/").replace(/%3[Ff]/g, "?").replace(/%3[Aa]/g, ":").replace(/%40/g, "@").replace(/%26/g, "&").replace(/%3[Dd]/g, "=").replace(/%2[Bb]/g, "+").replace(/%24/g, "$");
  }
  return params;
}
class LoadURL extends URL {
  get hash() {
    throw new Error(
      "url.hash is inaccessible from load. Consider accessing hash from the page store within the script tag of your component."
    );
  }
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
const native_fetch = window.fetch;
function initial_fetch(resource, opts) {
  const url = JSON.stringify(typeof resource === "string" ? resource : resource.url);
  let selector = `script[sveltekit\\:data-type="data"][sveltekit\\:data-url=${url}]`;
  if (opts && typeof opts.body === "string") {
    selector += `[sveltekit\\:data-body="${hash(opts.body)}"]`;
  }
  const script = document.querySelector(selector);
  if (script && script.textContent) {
    const { body, ...init2 } = JSON.parse(script.textContent);
    return Promise.resolve(new Response(body, init2));
  }
  return native_fetch(resource, opts);
}
const param_pattern = /^(\.\.\.)?(\w+)(?:=(\w+))?$/;
function parse_route_id(id) {
  const names = [];
  const types = [];
  let add_trailing_slash = true;
  const pattern = id === "" ? /^\/$/ : new RegExp(
    `^${id.split(/(?:@[a-zA-Z0-9_-]+)?(?:\/|$)/).map((segment, i, segments) => {
      const decoded_segment = decodeURIComponent(segment);
      const match = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(decoded_segment);
      if (match) {
        names.push(match[1]);
        types.push(match[2]);
        return "(?:/(.*))?";
      }
      const is_last = i === segments.length - 1;
      return decoded_segment && "/" + decoded_segment.split(/\[(.+?)\]/).map((content, i2) => {
        if (i2 % 2) {
          const match2 = param_pattern.exec(content);
          if (!match2) {
            throw new Error(
              `Invalid param: ${content}. Params and matcher names can only have underscores and alphanumeric characters.`
            );
          }
          const [, rest, name, type] = match2;
          names.push(name);
          types.push(type);
          return rest ? "(.*?)" : "([^/]+?)";
        }
        if (is_last && content.includes("."))
          add_trailing_slash = false;
        return content.normalize().replace(/%5[Bb]/g, "[").replace(/%5[Dd]/g, "]").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }).join("");
    }).join("")}${add_trailing_slash ? "/?" : ""}$`
  );
  return { pattern, names, types };
}
function exec(match, names, types, matchers2) {
  const params = {};
  for (let i = 0; i < names.length; i += 1) {
    const name = names[i];
    const type = types[i];
    const value = match[i + 1] || "";
    if (type) {
      const matcher = matchers2[type];
      if (!matcher)
        throw new Error(`Missing "${type}" param matcher`);
      if (!matcher(value))
        return;
    }
    params[name] = value;
  }
  return params;
}
function parse(nodes2, dictionary2, matchers2) {
  return Object.entries(dictionary2).map(([id, [errors, layouts, leaf, uses_server_data]]) => {
    const { pattern, names, types } = parse_route_id(id);
    const route = {
      id,
      exec: (path) => {
        const match = pattern.exec(path);
        if (match)
          return exec(match, names, types, matchers2);
      },
      errors: errors.map((n) => nodes2[n]),
      layouts: layouts.map((n) => nodes2[n]),
      leaf: nodes2[leaf],
      uses_server_data: !!uses_server_data
    };
    route.errors.length = route.layouts.length = Math.max(
      route.errors.length,
      route.layouts.length
    );
    return route;
  });
}
function error(status, message) {
  return new HttpError(status, message);
}
function create_else_block_1(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = ctx[0][0];
  function switch_props(ctx2) {
    return {
      props: {
        data: ctx2[1],
        errors: ctx2[4]
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes2) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes2);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = {};
      if (dirty & 2)
        switch_instance_changes.data = ctx2[1];
      if (dirty & 16)
        switch_instance_changes.errors = ctx2[4];
      if (switch_value !== (switch_value = ctx2[0][0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block_2(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = ctx[0][0];
  function switch_props(ctx2) {
    return {
      props: {
        data: ctx2[1],
        $$slots: { default: [create_default_slot] },
        $$scope: { ctx: ctx2 }
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes2) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes2);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = {};
      if (dirty & 2)
        switch_instance_changes.data = ctx2[1];
      if (dirty & 1053) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (switch_value !== (switch_value = ctx2[0][0])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_else_block(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = ctx[0][1];
  function switch_props(ctx2) {
    return {
      props: {
        data: ctx2[2],
        errors: ctx2[4]
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes2) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes2);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = {};
      if (dirty & 4)
        switch_instance_changes.data = ctx2[2];
      if (dirty & 16)
        switch_instance_changes.errors = ctx2[4];
      if (switch_value !== (switch_value = ctx2[0][1])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_if_block_3(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = ctx[0][1];
  function switch_props(ctx2) {
    return {
      props: {
        data: ctx2[2],
        $$slots: { default: [create_default_slot_1] },
        $$scope: { ctx: ctx2 }
      }
    };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes2) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes2);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = {};
      if (dirty & 4)
        switch_instance_changes.data = ctx2[2];
      if (dirty & 1033) {
        switch_instance_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (switch_value !== (switch_value = ctx2[0][1])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value = ctx[0][2];
  function switch_props(ctx2) {
    return { props: { data: ctx2[3] } };
  }
  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }
  return {
    c() {
      if (switch_instance)
        create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },
    l(nodes2) {
      if (switch_instance)
        claim_component(switch_instance.$$.fragment, nodes2);
      switch_instance_anchor = empty();
    },
    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }
      insert_hydration(target, switch_instance_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const switch_instance_changes = {};
      if (dirty & 8)
        switch_instance_changes.data = ctx2[3];
      if (switch_value !== (switch_value = ctx2[0][2])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }
        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx2));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },
    i(local) {
      if (current)
        return;
      if (switch_instance)
        transition_in(switch_instance.$$.fragment, local);
      current = true;
    },
    o(local) {
      if (switch_instance)
        transition_out(switch_instance.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(switch_instance_anchor);
      if (switch_instance)
        destroy_component(switch_instance, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block_3, create_else_block];
  const if_blocks = [];
  function select_block_type_1(ctx2, dirty) {
    if (ctx2[0][2])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type_1(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty();
    },
    l(nodes2) {
      if_block.l(nodes2);
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type_1(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(if_block_anchor.parentNode, if_block_anchor);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_if_block(ctx) {
  let div;
  let if_block = ctx[6] && create_if_block_1(ctx);
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes2) {
      div = claim_element(nodes2, "DIV", {
        id: true,
        "aria-live": true,
        "aria-atomic": true,
        style: true
      });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "id", "svelte-announcer");
      attr(div, "aria-live", "assertive");
      attr(div, "aria-atomic", "true");
      set_style(div, "position", "absolute");
      set_style(div, "left", "0");
      set_style(div, "top", "0");
      set_style(div, "clip", "rect(0 0 0 0)");
      set_style(div, "clip-path", "inset(50%)");
      set_style(div, "overflow", "hidden");
      set_style(div, "white-space", "nowrap");
      set_style(div, "width", "1px");
      set_style(div, "height", "1px");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (ctx2[6]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
    }
  };
}
function create_if_block_1(ctx) {
  let t;
  return {
    c() {
      t = text(ctx[7]);
    },
    l(nodes2) {
      t = claim_text(nodes2, ctx[7]);
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 128)
        set_data(t, ctx2[7]);
    },
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_fragment(ctx) {
  let current_block_type_index;
  let if_block0;
  let t;
  let if_block1_anchor;
  let current;
  const if_block_creators = [create_if_block_2, create_else_block_1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (ctx2[0][1])
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  let if_block1 = ctx[5] && create_if_block(ctx);
  return {
    c() {
      if_block0.c();
      t = space();
      if (if_block1)
        if_block1.c();
      if_block1_anchor = empty();
    },
    l(nodes2) {
      if_block0.l(nodes2);
      t = claim_space(nodes2);
      if (if_block1)
        if_block1.l(nodes2);
      if_block1_anchor = empty();
    },
    m(target, anchor) {
      if_blocks[current_block_type_index].m(target, anchor);
      insert_hydration(target, t, anchor);
      if (if_block1)
        if_block1.m(target, anchor);
      insert_hydration(target, if_block1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block0 = if_blocks[current_block_type_index];
        if (!if_block0) {
          if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block0.c();
        } else {
          if_block0.p(ctx2, dirty);
        }
        transition_in(if_block0, 1);
        if_block0.m(t.parentNode, t);
      }
      if (ctx2[5]) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
        } else {
          if_block1 = create_if_block(ctx2);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block0);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      current = false;
    },
    d(detaching) {
      if_blocks[current_block_type_index].d(detaching);
      if (detaching)
        detach(t);
      if (if_block1)
        if_block1.d(detaching);
      if (detaching)
        detach(if_block1_anchor);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { stores: stores2 } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  let { data_2 = null } = $$props;
  let { errors } = $$props;
  afterUpdate(stores2.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores2.page.subscribe(() => {
      if (mounted) {
        $$invalidate(6, navigated = true);
        $$invalidate(7, title = document.title || "untitled page");
      }
    });
    $$invalidate(5, mounted = true);
    return unsubscribe;
  });
  $$self.$$set = ($$props2) => {
    if ("stores" in $$props2)
      $$invalidate(8, stores2 = $$props2.stores);
    if ("page" in $$props2)
      $$invalidate(9, page = $$props2.page);
    if ("components" in $$props2)
      $$invalidate(0, components = $$props2.components);
    if ("data_0" in $$props2)
      $$invalidate(1, data_0 = $$props2.data_0);
    if ("data_1" in $$props2)
      $$invalidate(2, data_1 = $$props2.data_1);
    if ("data_2" in $$props2)
      $$invalidate(3, data_2 = $$props2.data_2);
    if ("errors" in $$props2)
      $$invalidate(4, errors = $$props2.errors);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & 768) {
      stores2.page.set(page);
    }
  };
  return [
    components,
    data_0,
    data_1,
    data_2,
    errors,
    mounted,
    navigated,
    title,
    stores2,
    page
  ];
}
class Root extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      stores: 8,
      page: 9,
      components: 0,
      data_0: 1,
      data_1: 2,
      data_2: 3,
      errors: 4
    });
  }
}
const scriptRel = function detectScriptRel() {
  const relList = document.createElement("link").relList;
  return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
}();
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep, importerUrl);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
const matchers = {};
const nodes = [
  () => __vitePreload(() => import("./chunks/0-e21cdecc.js"), true ? ["chunks\\0-e21cdecc.js","components\\pages\\_layout.svelte-d902a4e9.js","assets\\+layout-f00d6398.css","chunks\\index-5b0149c9.js","chunks\\stores-d5459a1e.js","chunks\\singletons-3bb2d03b.js","chunks\\index-b73ee6b7.js"] : void 0, import.meta.url),
  () => __vitePreload(() => import("./chunks/1-e82ed13f.js"), true ? ["chunks\\1-e82ed13f.js","components\\error.svelte-f11dcb5d.js","chunks\\index-5b0149c9.js","chunks\\stores-d5459a1e.js","chunks\\singletons-3bb2d03b.js","chunks\\index-b73ee6b7.js"] : void 0, import.meta.url),
  () => __vitePreload(() => import("./chunks/2-9da09714.js"), true ? ["chunks\\2-9da09714.js","chunks\\_page-802cc2a3.js","components\\pages\\_page.svelte-c3938bfb.js","assets\\+page-ab7a0104.css","chunks\\index-5b0149c9.js","chunks\\index-b73ee6b7.js"] : void 0, import.meta.url),
  () => __vitePreload(() => import("./chunks/3-91f18ffc.js"), true ? ["chunks\\3-91f18ffc.js","chunks\\_page-efb9c460.js","components\\pages\\about\\_page.svelte-63812afa.js","assets\\+page-5770d689.css","chunks\\index-5b0149c9.js"] : void 0, import.meta.url),
  () => __vitePreload(() => import("./chunks/4-16c447bb.js"), true ? ["chunks\\4-16c447bb.js","components\\pages\\todos\\_page.svelte-1f226268.js","assets\\+page-5519d4df.css","chunks\\index-5b0149c9.js","chunks\\singletons-3bb2d03b.js","chunks\\index-b73ee6b7.js"] : void 0, import.meta.url)
];
const dictionary = {
  "": [[1], [0], 2],
  "about": [[1], [0], 3],
  "todos": [[1], [0], 4, 1]
};
const SCROLL_KEY = "sveltekit:scroll";
const INDEX_KEY = "sveltekit:index";
const routes = parse(nodes, dictionary, matchers);
const default_layout = nodes[0]();
const default_error = nodes[1]();
let scroll_positions = {};
try {
  scroll_positions = JSON.parse(sessionStorage[SCROLL_KEY]);
} catch {
}
function update_scroll_positions(index) {
  scroll_positions[index] = scroll_state();
}
function create_client({ target, base, trailing_slash }) {
  var _a;
  const invalidated = [];
  const load_cache = {
    id: null,
    promise: null
  };
  const callbacks = {
    before_navigate: [],
    after_navigate: []
  };
  let current = {
    branch: [],
    error: null,
    session_id: 0,
    url: null
  };
  let started = false;
  let autoscroll = true;
  let updating = false;
  let session_id = 1;
  let invalidating = null;
  let root;
  let router_enabled = true;
  let current_history_index = (_a = history.state) == null ? void 0 : _a[INDEX_KEY];
  if (!current_history_index) {
    current_history_index = Date.now();
    history.replaceState(
      { ...history.state, [INDEX_KEY]: current_history_index },
      "",
      location.href
    );
  }
  const scroll = scroll_positions[current_history_index];
  if (scroll) {
    history.scrollRestoration = "manual";
    scrollTo(scroll.x, scroll.y);
  }
  let hash_navigating = false;
  let page;
  let token;
  async function goto(url, { noscroll = false, replaceState = false, keepfocus = false, state = {} }, redirect_chain) {
    if (typeof url === "string") {
      url = new URL(url, get_base_uri(document));
    }
    if (router_enabled) {
      return navigate({
        url,
        scroll: noscroll ? scroll_state() : null,
        keepfocus,
        redirect_chain,
        details: {
          state,
          replaceState
        },
        accepted: () => {
        },
        blocked: () => {
        }
      });
    }
    await native_navigation(url);
  }
  async function prefetch(url) {
    const intent = get_navigation_intent(url);
    if (!intent) {
      throw new Error("Attempted to prefetch a URL that does not belong to this app");
    }
    load_cache.promise = load_route(intent);
    load_cache.id = intent.id;
    return load_cache.promise;
  }
  async function update(url, redirect_chain, opts, callback) {
    var _a2, _b, _c;
    const intent = get_navigation_intent(url);
    const current_token = token = {};
    let navigation_result = intent && await load_route(intent);
    if (!navigation_result && url.origin === location.origin && url.pathname === location.pathname) {
      navigation_result = await load_root_error_page({
        status: 404,
        error: new Error(`Not found: ${url.pathname}`),
        url,
        routeId: null
      });
    }
    if (!navigation_result) {
      await native_navigation(url);
      return false;
    }
    url = (intent == null ? void 0 : intent.url) || url;
    if (token !== current_token)
      return false;
    invalidated.length = 0;
    if (navigation_result.type === "redirect") {
      if (redirect_chain.length > 10 || redirect_chain.includes(url.pathname)) {
        navigation_result = await load_root_error_page({
          status: 500,
          error: new Error("Redirect loop"),
          url,
          routeId: null
        });
      } else {
        if (router_enabled) {
          goto(new URL(navigation_result.location, url).href, {}, [
            ...redirect_chain,
            url.pathname
          ]);
        } else {
          await native_navigation(new URL(navigation_result.location, location.href));
        }
        return false;
      }
    } else if (((_b = (_a2 = navigation_result.props) == null ? void 0 : _a2.page) == null ? void 0 : _b.status) >= 400) {
      const updated = await stores.updated.check();
      if (updated) {
        await native_navigation(url);
      }
    }
    updating = true;
    if (opts && opts.details) {
      const { details } = opts;
      const change = details.replaceState ? 0 : 1;
      details.state[INDEX_KEY] = current_history_index += change;
      history[details.replaceState ? "replaceState" : "pushState"](details.state, "", url);
    }
    if (started) {
      current = navigation_result.state;
      if (navigation_result.props.page) {
        navigation_result.props.page.url = url;
      }
      {
        root.$set(navigation_result.props);
      }
    } else {
      initialize(navigation_result);
    }
    if (opts) {
      const { scroll: scroll2, keepfocus } = opts;
      if (!keepfocus) {
        const root2 = document.body;
        const tabindex = root2.getAttribute("tabindex");
        root2.tabIndex = -1;
        root2.focus({ preventScroll: true });
        setTimeout(() => {
          var _a3;
          (_a3 = getSelection()) == null ? void 0 : _a3.removeAllRanges();
        });
        if (tabindex !== null) {
          root2.setAttribute("tabindex", tabindex);
        } else {
          root2.removeAttribute("tabindex");
        }
      }
      await tick();
      if (autoscroll) {
        const deep_linked = url.hash && document.getElementById(url.hash.slice(1));
        if (scroll2) {
          scrollTo(scroll2.x, scroll2.y);
        } else if (deep_linked) {
          deep_linked.scrollIntoView();
        } else {
          scrollTo(0, 0);
        }
      }
    } else {
      await tick();
    }
    load_cache.promise = null;
    load_cache.id = null;
    autoscroll = true;
    if (navigation_result.props.page) {
      page = navigation_result.props.page;
    }
    const leaf_node = navigation_result.state.branch[navigation_result.state.branch.length - 1];
    router_enabled = ((_c = leaf_node == null ? void 0 : leaf_node.node.shared) == null ? void 0 : _c.router) !== false;
    if (callback)
      callback();
    updating = false;
  }
  function initialize(result) {
    current = result.state;
    const style = document.querySelector("style[data-sveltekit]");
    if (style)
      style.remove();
    page = result.props.page;
    {
      root = new Root({
        target,
        props: { ...result.props, stores },
        hydrate: true
      });
    }
    if (router_enabled) {
      const navigation = { from: null, to: new URL(location.href) };
      callbacks.after_navigate.forEach((fn) => fn(navigation));
    }
    started = true;
  }
  async function get_navigation_result_from_branch({
    url,
    params,
    branch,
    status,
    error: error2,
    routeId,
    validation_errors
  }) {
    const filtered = branch.filter(Boolean);
    const result = {
      type: "loaded",
      state: {
        url,
        params,
        branch,
        error: error2,
        session_id
      },
      props: {
        components: filtered.map((branch_node) => branch_node.node.component),
        errors: validation_errors
      }
    };
    let data = {};
    let data_changed = false;
    for (let i = 0; i < filtered.length; i += 1) {
      data = { ...data, ...filtered[i].data };
      if (data_changed || !current.branch.some((node) => node === filtered[i])) {
        result.props[`data_${i}`] = data;
        data_changed = true;
      }
    }
    const page_changed = !current.url || url.href !== current.url.href || current.error !== error2 || data_changed;
    if (page_changed) {
      result.props.page = { error: error2, params, routeId, status, url, data };
      const print_error = (property, replacement) => {
        Object.defineProperty(result.props.page, property, {
          get: () => {
            throw new Error(`$page.${property} has been replaced by $page.url.${replacement}`);
          }
        });
      };
      print_error("origin", "origin");
      print_error("path", "pathname");
      print_error("query", "searchParams");
    }
    return result;
  }
  async function load_node({ node, parent, url, params, routeId, server_data }) {
    var _a2, _b;
    const uses = {
      params: /* @__PURE__ */ new Set(),
      url: false,
      dependencies: /* @__PURE__ */ new Set(),
      parent: false
    };
    function depends(...deps) {
      for (const dep of deps) {
        const { href } = new URL(dep, url);
        uses.dependencies.add(href);
      }
    }
    let data = null;
    if (node.server) {
      uses.dependencies.add(url.href);
      uses.url = true;
    }
    const uses_params = {};
    for (const key in params) {
      Object.defineProperty(uses_params, key, {
        get() {
          uses.params.add(key);
          return params[key];
        },
        enumerable: true
      });
    }
    const load_url = new LoadURL(url);
    if ((_a2 = node.shared) == null ? void 0 : _a2.load) {
      const load_input = {
        routeId,
        params: uses_params,
        data: server_data,
        get url() {
          uses.url = true;
          return load_url;
        },
        async fetch(resource, init2) {
          let requested;
          if (typeof resource === "string") {
            requested = resource;
          } else {
            requested = resource.url;
            init2 = {
              body: resource.method === "GET" || resource.method === "HEAD" ? void 0 : await resource.blob(),
              cache: resource.cache,
              credentials: resource.credentials,
              headers: resource.headers,
              integrity: resource.integrity,
              keepalive: resource.keepalive,
              method: resource.method,
              mode: resource.mode,
              redirect: resource.redirect,
              referrer: resource.referrer,
              referrerPolicy: resource.referrerPolicy,
              signal: resource.signal,
              ...init2
            };
          }
          const normalized = new URL(requested, url).href;
          depends(normalized);
          return started ? native_fetch(normalized, init2) : initial_fetch(requested, init2);
        },
        setHeaders: () => {
        },
        depends,
        get parent() {
          uses.parent = true;
          return parent;
        }
      };
      Object.defineProperties(load_input, {
        props: {
          get() {
            throw new Error(
              "@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693"
            );
          },
          enumerable: false
        },
        session: {
          get() {
            throw new Error(
              "session is no longer available. See https://github.com/sveltejs/kit/discussions/5883"
            );
          },
          enumerable: false
        },
        stuff: {
          get() {
            throw new Error(
              "@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693"
            );
          },
          enumerable: false
        }
      });
      {
        data = (_b = await node.shared.load.call(null, load_input)) != null ? _b : null;
      }
    }
    return {
      node,
      data: data || server_data,
      uses
    };
  }
  async function load_route({ id, url, params, route }) {
    if (load_cache.id === id && load_cache.promise) {
      return load_cache.promise;
    }
    const { errors, layouts, leaf } = route;
    const changed = current.url && {
      url: id !== current.url.pathname + current.url.search,
      params: Object.keys(params).filter((key) => current.params[key] !== params[key])
    };
    [...errors, ...layouts, leaf].forEach((loader) => loader == null ? void 0 : loader().catch(() => {
    }));
    const nodes2 = [...layouts, leaf];
    const nodes_changed_since_last_render = [];
    for (let i = 0; i < nodes2.length; i++) {
      if (!nodes2[i]) {
        nodes_changed_since_last_render.push(false);
      } else {
        const previous = current.branch[i];
        const changed_since_last_render = !previous || changed.url && previous.uses.url || changed.params.some((param) => previous.uses.params.has(param)) || Array.from(previous.uses.dependencies).some((dep) => invalidated.some((fn) => fn(dep))) || previous.uses.parent && nodes_changed_since_last_render.includes(true);
        nodes_changed_since_last_render.push(changed_since_last_render);
      }
    }
    let server_data_payload = null;
    if (route.uses_server_data) {
      try {
        const res = await native_fetch(
          `${url.pathname}${url.pathname.endsWith("/") ? "" : "/"}__data.json${url.search}`
        );
        server_data_payload = await res.json();
        if (!res.ok) {
          throw server_data_payload;
        }
      } catch (e) {
        throw new Error("TODO render fallback error page");
      }
      if (server_data_payload.type === "redirect") {
        return server_data_payload;
      }
    }
    const server_data_nodes = server_data_payload == null ? void 0 : server_data_payload.nodes;
    const branch_promises = nodes2.map(async (loader, i) => {
      return Promise.resolve().then(async () => {
        var _a2;
        if (!loader)
          return;
        const node = await loader();
        const previous = current.branch[i];
        const changed_since_last_render = nodes_changed_since_last_render[i] || !previous || node !== previous.node;
        if (changed_since_last_render) {
          const payload = server_data_nodes == null ? void 0 : server_data_nodes[i];
          if (payload == null ? void 0 : payload.status) {
            throw error(payload.status, payload.message);
          }
          if (payload == null ? void 0 : payload.error) {
            throw payload.error;
          }
          return await load_node({
            node,
            url,
            params,
            routeId: route.id,
            parent: async () => {
              var _a3;
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, (_a3 = await branch_promises[j]) == null ? void 0 : _a3.data);
              }
              return data;
            },
            server_data: (_a2 = payload == null ? void 0 : payload.data) != null ? _a2 : null
          });
        } else {
          return previous;
        }
      });
    });
    for (const p of branch_promises)
      p.catch(() => {
      });
    const branch = [];
    for (let i = 0; i < nodes2.length; i += 1) {
      if (nodes2[i]) {
        try {
          branch.push(await branch_promises[i]);
        } catch (e) {
          const error2 = normalize_error(e);
          if (error2 instanceof Redirect) {
            return {
              type: "redirect",
              location: error2.location
            };
          }
          const status = e instanceof HttpError ? e.status : 500;
          while (i--) {
            if (errors[i]) {
              let error_loaded;
              let j = i;
              while (!branch[j])
                j -= 1;
              try {
                error_loaded = {
                  node: await errors[i](),
                  data: {},
                  uses: {
                    params: /* @__PURE__ */ new Set(),
                    url: false,
                    dependencies: /* @__PURE__ */ new Set(),
                    parent: false
                  }
                };
                return await get_navigation_result_from_branch({
                  url,
                  params,
                  branch: branch.slice(0, j + 1).concat(error_loaded),
                  status,
                  error: error2,
                  routeId: route.id
                });
              } catch (e2) {
                continue;
              }
            }
          }
          return await load_root_error_page({
            status,
            error: error2,
            url,
            routeId: route.id
          });
        }
      } else {
        branch.push(void 0);
      }
    }
    return await get_navigation_result_from_branch({
      url,
      params,
      branch,
      status: 200,
      error: null,
      routeId: route.id
    });
  }
  async function load_root_error_page({ status, error: error2, url, routeId }) {
    const params = {};
    const root_layout = await load_node({
      node: await default_layout,
      url,
      params,
      routeId,
      parent: () => Promise.resolve({}),
      server_data: null
    });
    const root_error = {
      node: await default_error,
      data: null,
      uses: {
        params: /* @__PURE__ */ new Set(),
        url: false,
        dependencies: /* @__PURE__ */ new Set(),
        parent: false
      }
    };
    return await get_navigation_result_from_branch({
      url,
      params,
      branch: [root_layout, root_error],
      status,
      error: error2,
      routeId
    });
  }
  function get_navigation_intent(url) {
    if (url.origin !== location.origin || !url.pathname.startsWith(base))
      return;
    const path = decodeURI(url.pathname.slice(base.length) || "/");
    for (const route of routes) {
      const params = route.exec(path);
      if (params) {
        const normalized = new URL(
          url.origin + normalize_path(url.pathname, trailing_slash) + url.search + url.hash
        );
        const id = normalized.pathname + normalized.search;
        const intent = { id, route, params: decode_params(params), url: normalized };
        return intent;
      }
    }
  }
  async function navigate({ url, scroll: scroll2, keepfocus, redirect_chain, details, accepted, blocked }) {
    const from = current.url;
    let should_block = false;
    const navigation = {
      from,
      to: url,
      cancel: () => should_block = true
    };
    callbacks.before_navigate.forEach((fn) => fn(navigation));
    if (should_block) {
      blocked();
      return;
    }
    update_scroll_positions(current_history_index);
    accepted();
    if (started) {
      stores.navigating.set({
        from: current.url,
        to: url
      });
    }
    await update(
      url,
      redirect_chain,
      {
        scroll: scroll2,
        keepfocus,
        details
      },
      () => {
        const navigation2 = { from, to: url };
        callbacks.after_navigate.forEach((fn) => fn(navigation2));
        stores.navigating.set(null);
      }
    );
  }
  function native_navigation(url) {
    location.href = url.href;
    return new Promise(() => {
    });
  }
  return {
    after_navigate: (fn) => {
      onMount(() => {
        callbacks.after_navigate.push(fn);
        return () => {
          const i = callbacks.after_navigate.indexOf(fn);
          callbacks.after_navigate.splice(i, 1);
        };
      });
    },
    before_navigate: (fn) => {
      onMount(() => {
        callbacks.before_navigate.push(fn);
        return () => {
          const i = callbacks.before_navigate.indexOf(fn);
          callbacks.before_navigate.splice(i, 1);
        };
      });
    },
    disable_scroll_handling: () => {
      if (updating || !started) {
        autoscroll = false;
      }
    },
    goto: (href, opts = {}) => goto(href, opts, []),
    invalidate: (resource) => {
      if (resource === void 0) {
        for (const node of current.branch) {
          node == null ? void 0 : node.uses.dependencies.add("");
        }
        invalidated.push(() => true);
      } else if (typeof resource === "function") {
        invalidated.push(resource);
      } else {
        const { href } = new URL(resource, location.href);
        invalidated.push((dep) => dep === href);
      }
      if (!invalidating) {
        invalidating = Promise.resolve().then(async () => {
          await update(new URL(location.href), []);
          invalidating = null;
        });
      }
      return invalidating;
    },
    prefetch: async (href) => {
      const url = new URL(href, get_base_uri(document));
      await prefetch(url);
    },
    prefetch_routes: async (pathnames) => {
      const matching = pathnames ? routes.filter((route) => pathnames.some((pathname) => route.exec(pathname))) : routes;
      const promises = matching.map((r) => {
        return Promise.all([...r.layouts, r.leaf].map((load) => load == null ? void 0 : load()));
      });
      await Promise.all(promises);
    },
    _start_router: () => {
      history.scrollRestoration = "manual";
      addEventListener("beforeunload", (e) => {
        let should_block = false;
        const navigation = {
          from: current.url,
          to: null,
          cancel: () => should_block = true
        };
        callbacks.before_navigate.forEach((fn) => fn(navigation));
        if (should_block) {
          e.preventDefault();
          e.returnValue = "";
        } else {
          history.scrollRestoration = "auto";
        }
      });
      addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
          update_scroll_positions(current_history_index);
          try {
            sessionStorage[SCROLL_KEY] = JSON.stringify(scroll_positions);
          } catch {
          }
        }
      });
      const trigger_prefetch = (event) => {
        const a = find_anchor(event);
        if (a && a.href && a.hasAttribute("sveltekit:prefetch")) {
          prefetch(get_href(a));
        }
      };
      let mousemove_timeout;
      const handle_mousemove = (event) => {
        clearTimeout(mousemove_timeout);
        mousemove_timeout = setTimeout(() => {
          var _a2;
          (_a2 = event.target) == null ? void 0 : _a2.dispatchEvent(
            new CustomEvent("sveltekit:trigger_prefetch", { bubbles: true })
          );
        }, 20);
      };
      addEventListener("touchstart", trigger_prefetch);
      addEventListener("mousemove", handle_mousemove);
      addEventListener("sveltekit:trigger_prefetch", trigger_prefetch);
      addEventListener("click", (event) => {
        if (!router_enabled)
          return;
        if (event.button || event.which !== 1)
          return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
          return;
        if (event.defaultPrevented)
          return;
        const a = find_anchor(event);
        if (!a)
          return;
        if (!a.href)
          return;
        const is_svg_a_element = a instanceof SVGAElement;
        const url = get_href(a);
        if (!is_svg_a_element && !(url.protocol === "https:" || url.protocol === "http:"))
          return;
        const rel = (a.getAttribute("rel") || "").split(/\s+/);
        if (a.hasAttribute("download") || rel.includes("external") || a.hasAttribute("sveltekit:reload")) {
          return;
        }
        if (is_svg_a_element ? a.target.baseVal : a.target)
          return;
        const [base2, hash2] = url.href.split("#");
        if (hash2 !== void 0 && base2 === location.href.split("#")[0]) {
          hash_navigating = true;
          update_scroll_positions(current_history_index);
          stores.page.set({ ...page, url });
          stores.page.notify();
          return;
        }
        navigate({
          url,
          scroll: a.hasAttribute("sveltekit:noscroll") ? scroll_state() : null,
          keepfocus: false,
          redirect_chain: [],
          details: {
            state: {},
            replaceState: url.href === location.href
          },
          accepted: () => event.preventDefault(),
          blocked: () => event.preventDefault()
        });
      });
      addEventListener("popstate", (event) => {
        if (event.state && router_enabled) {
          if (event.state[INDEX_KEY] === current_history_index)
            return;
          navigate({
            url: new URL(location.href),
            scroll: scroll_positions[event.state[INDEX_KEY]],
            keepfocus: false,
            redirect_chain: [],
            details: null,
            accepted: () => {
              current_history_index = event.state[INDEX_KEY];
            },
            blocked: () => {
              const delta = current_history_index - event.state[INDEX_KEY];
              history.go(delta);
            }
          });
        }
      });
      addEventListener("hashchange", () => {
        if (hash_navigating) {
          hash_navigating = false;
          history.replaceState(
            { ...history.state, [INDEX_KEY]: ++current_history_index },
            "",
            location.href
          );
        }
      });
      for (const link of document.querySelectorAll("link")) {
        if (link.rel === "icon")
          link.href = link.href;
      }
      addEventListener("pageshow", (event) => {
        if (event.persisted) {
          stores.navigating.set(null);
        }
      });
    },
    _hydrate: async ({ status, error: error2, node_ids, params, routeId }) => {
      const url = new URL(location.href);
      let result;
      try {
        const parse2 = (type, fallback) => {
          const script = document.querySelector(`script[sveltekit\\:data-type="${type}"]`);
          return (script == null ? void 0 : script.textContent) ? JSON.parse(script.textContent) : fallback;
        };
        const server_data = parse2("server_data", []);
        const validation_errors = parse2("validation_errors", void 0);
        const branch_promises = node_ids.map(async (n, i) => {
          var _a2;
          return load_node({
            node: await nodes[n](),
            url,
            params,
            routeId,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, (await branch_promises[j]).data);
              }
              return data;
            },
            server_data: (_a2 = server_data[i]) != null ? _a2 : null
          });
        });
        result = await get_navigation_result_from_branch({
          url,
          params,
          branch: await Promise.all(branch_promises),
          status,
          error: (error2 == null ? void 0 : error2.__is_http_error) ? new HttpError(
            error2.status,
            error2.message
          ) : error2,
          validation_errors,
          routeId
        });
      } catch (e) {
        const error3 = normalize_error(e);
        if (error3 instanceof Redirect) {
          await native_navigation(new URL(e.location, location.href));
          return;
        }
        result = await load_root_error_page({
          status: error3 instanceof HttpError ? error3.status : 500,
          error: error3,
          url,
          routeId
        });
      }
      initialize(result);
    }
  };
}
function set_public_env(environment) {
}
async function start({ paths, target, route, spa, trailing_slash, hydrate }) {
  const client = create_client({
    target,
    base: paths.base,
    trailing_slash
  });
  init$1({ client });
  set_paths(paths);
  if (hydrate) {
    await client._hydrate(hydrate);
  }
  if (route) {
    if (spa)
      client.goto(location.href, { replaceState: true });
    client._start_router();
  }
  dispatchEvent(new CustomEvent("sveltekit:start"));
}
export {
  set_public_env,
  start
};
//# sourceMappingURL=start-3945584a.js.map
