import { Q as is_function, S as SvelteComponent, i as init, s as safe_not_equal, k as element, a as space, q as text, P as query_selector_all, l as claim_element, h as detach, c as claim_space, m as children, r as claim_text, n as attr, F as append_hydration, b as insert_hydration, R as action_destroyer, T as update_keyed_each, d as check_outros, f as transition_in, t as transition_out, E as toggle_class, U as fix_position, V as add_transform, W as create_animation, X as add_render_callback, Y as create_bidirectional_transition, O as run_all, g as group_outros, Z as fix_and_outro_and_destroy_block, A as noop } from "../../../chunks/index-5b0149c9.js";
import { d as client } from "../../../chunks/singletons-d80afa86.js";
import "../../../chunks/index-b73ee6b7.js";
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
client.disable_scroll_handling;
client.goto;
const invalidate = client.invalidate;
client.prefetch;
client.prefetch_routes;
client.before_navigate;
client.after_navigate;
function enhance(form, {
  pending,
  error,
  result
} = {}) {
  let current_token;
  async function handle_submit(event) {
    const token = current_token = {};
    event.preventDefault();
    const data = new FormData(form);
    if (pending)
      pending({ data, form });
    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          accept: "application/json"
        },
        body: data
      });
      if (token !== current_token)
        return;
      if (response.ok) {
        if (result)
          result({ data, form, response });
        const url = new URL(form.action);
        url.search = url.hash = "";
        invalidate(url.href);
      } else if (error) {
        error({ data, form, error: null, response });
      } else {
        console.error(await response.text());
      }
    } catch (err) {
      if (error && err instanceof Error) {
        error({ data, form, error: err, response: null });
      } else {
        throw err;
      }
    }
  }
  form.addEventListener("submit", handle_submit);
  return {
    destroy() {
      form.removeEventListener("submit", handle_submit);
    }
  };
}
function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === "none" ? "" : style.transform;
  const sd = 1 - start;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (_t, u) => `
			transform: ${transform} scale(${1 - sd * u});
			opacity: ${target_opacity - od * u}
		`
  };
}
function flip(node, { from, to }, params = {}) {
  const style = getComputedStyle(node);
  const transform = style.transform === "none" ? "" : style.transform;
  const [ox, oy] = style.transformOrigin.split(" ").map(parseFloat);
  const dx = from.left + from.width * ox / to.width - (to.left + ox);
  const dy = from.top + from.height * oy / to.height - (to.top + oy);
  const { delay = 0, duration = (d) => Math.sqrt(d) * 120, easing = cubicOut } = params;
  return {
    delay,
    duration: is_function(duration) ? duration(Math.sqrt(dx * dx + dy * dy)) : duration,
    easing,
    css: (t, u) => {
      const x = u * dx;
      const y = u * dy;
      const sx = t + u * from.width / to.width;
      const sy = t + u * from.height / to.height;
      return `transform: ${transform} translate(${x}px, ${y}px) scale(${sx}, ${sy});`;
    }
  };
}
const _page_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[3] = list[i];
  child_ctx[4] = list;
  child_ctx[5] = i;
  return child_ctx;
}
function create_each_block(key_1, ctx) {
  let div;
  let form0;
  let input0;
  let input0_value_value;
  let t0;
  let input1;
  let input1_value_value;
  let t1;
  let button0;
  let button0_aria_label_value;
  let enhance_action;
  let t2;
  let form1;
  let input2;
  let input2_value_value;
  let t3;
  let input3;
  let input3_value_value;
  let t4;
  let button1;
  let t5;
  let form2;
  let input4;
  let input4_value_value;
  let t6;
  let button2;
  let button2_disabled_value;
  let enhance_action_2;
  let t7;
  let div_transition;
  let rect;
  let stop_animation = noop;
  let current;
  let mounted;
  let dispose;
  function enhance_function_1(...args) {
    return ctx[1](ctx[3], ctx[4], ctx[5], ...args);
  }
  function enhance_function_2() {
    return ctx[2](ctx[3], ctx[4], ctx[5]);
  }
  return {
    key: key_1,
    first: null,
    c() {
      div = element("div");
      form0 = element("form");
      input0 = element("input");
      t0 = space();
      input1 = element("input");
      t1 = space();
      button0 = element("button");
      t2 = space();
      form1 = element("form");
      input2 = element("input");
      t3 = space();
      input3 = element("input");
      t4 = space();
      button1 = element("button");
      t5 = space();
      form2 = element("form");
      input4 = element("input");
      t6 = space();
      button2 = element("button");
      t7 = space();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      form0 = claim_element(div_nodes, "FORM", { action: true, method: true });
      var form0_nodes = children(form0);
      input0 = claim_element(form0_nodes, "INPUT", { type: true, name: true, class: true });
      t0 = claim_space(form0_nodes);
      input1 = claim_element(form0_nodes, "INPUT", { type: true, name: true, class: true });
      t1 = claim_space(form0_nodes);
      button0 = claim_element(form0_nodes, "BUTTON", { class: true, "aria-label": true });
      children(button0).forEach(detach);
      form0_nodes.forEach(detach);
      t2 = claim_space(div_nodes);
      form1 = claim_element(div_nodes, "FORM", { class: true, action: true, method: true });
      var form1_nodes = children(form1);
      input2 = claim_element(form1_nodes, "INPUT", { type: true, name: true, class: true });
      t3 = claim_space(form1_nodes);
      input3 = claim_element(form1_nodes, "INPUT", {
        "aria-label": true,
        type: true,
        name: true,
        class: true
      });
      t4 = claim_space(form1_nodes);
      button1 = claim_element(form1_nodes, "BUTTON", { class: true, "aria-label": true });
      children(button1).forEach(detach);
      form1_nodes.forEach(detach);
      t5 = claim_space(div_nodes);
      form2 = claim_element(div_nodes, "FORM", { action: true, method: true });
      var form2_nodes = children(form2);
      input4 = claim_element(form2_nodes, "INPUT", { type: true, name: true, class: true });
      t6 = claim_space(form2_nodes);
      button2 = claim_element(form2_nodes, "BUTTON", { class: true, "aria-label": true });
      children(button2).forEach(detach);
      form2_nodes.forEach(detach);
      t7 = claim_space(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(input0, "type", "hidden");
      attr(input0, "name", "uid");
      input0.value = input0_value_value = ctx[3].uid;
      attr(input0, "class", "svelte-16nsat");
      attr(input1, "type", "hidden");
      attr(input1, "name", "done");
      input1.value = input1_value_value = ctx[3].done ? "" : "true";
      attr(input1, "class", "svelte-16nsat");
      attr(button0, "class", "toggle svelte-16nsat");
      attr(button0, "aria-label", button0_aria_label_value = "Mark todo as " + (ctx[3].done ? "not done" : "done"));
      attr(form0, "action", "/todos?_method=PATCH");
      attr(form0, "method", "post");
      attr(input2, "type", "hidden");
      attr(input2, "name", "uid");
      input2.value = input2_value_value = ctx[3].uid;
      attr(input2, "class", "svelte-16nsat");
      attr(input3, "aria-label", "Edit todo");
      attr(input3, "type", "text");
      attr(input3, "name", "text");
      input3.value = input3_value_value = ctx[3].text;
      attr(input3, "class", "svelte-16nsat");
      attr(button1, "class", "save svelte-16nsat");
      attr(button1, "aria-label", "Save todo");
      attr(form1, "class", "text svelte-16nsat");
      attr(form1, "action", "/todos?_method=PATCH");
      attr(form1, "method", "post");
      attr(input4, "type", "hidden");
      attr(input4, "name", "uid");
      input4.value = input4_value_value = ctx[3].uid;
      attr(input4, "class", "svelte-16nsat");
      attr(button2, "class", "delete svelte-16nsat");
      attr(button2, "aria-label", "Delete todo");
      button2.disabled = button2_disabled_value = ctx[3].pending_delete;
      attr(form2, "action", "/todos?_method=DELETE");
      attr(form2, "method", "post");
      attr(div, "class", "todo svelte-16nsat");
      toggle_class(div, "done", ctx[3].done);
      this.first = div;
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, form0);
      append_hydration(form0, input0);
      append_hydration(form0, t0);
      append_hydration(form0, input1);
      append_hydration(form0, t1);
      append_hydration(form0, button0);
      append_hydration(div, t2);
      append_hydration(div, form1);
      append_hydration(form1, input2);
      append_hydration(form1, t3);
      append_hydration(form1, input3);
      append_hydration(form1, t4);
      append_hydration(form1, button1);
      append_hydration(div, t5);
      append_hydration(div, form2);
      append_hydration(form2, input4);
      append_hydration(form2, t6);
      append_hydration(form2, button2);
      append_hydration(div, t7);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(enhance_action = enhance.call(null, form0, { pending: enhance_function_1 })),
          action_destroyer(enhance.call(null, form1)),
          action_destroyer(enhance_action_2 = enhance.call(null, form2, { pending: enhance_function_2 }))
        ];
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (!current || dirty & 1 && input0_value_value !== (input0_value_value = ctx[3].uid)) {
        input0.value = input0_value_value;
      }
      if (!current || dirty & 1 && input1_value_value !== (input1_value_value = ctx[3].done ? "" : "true")) {
        input1.value = input1_value_value;
      }
      if (!current || dirty & 1 && button0_aria_label_value !== (button0_aria_label_value = "Mark todo as " + (ctx[3].done ? "not done" : "done"))) {
        attr(button0, "aria-label", button0_aria_label_value);
      }
      if (enhance_action && is_function(enhance_action.update) && dirty & 1)
        enhance_action.update.call(null, { pending: enhance_function_1 });
      if (!current || dirty & 1 && input2_value_value !== (input2_value_value = ctx[3].uid)) {
        input2.value = input2_value_value;
      }
      if (!current || dirty & 1 && input3_value_value !== (input3_value_value = ctx[3].text) && input3.value !== input3_value_value) {
        input3.value = input3_value_value;
      }
      if (!current || dirty & 1 && input4_value_value !== (input4_value_value = ctx[3].uid)) {
        input4.value = input4_value_value;
      }
      if (!current || dirty & 1 && button2_disabled_value !== (button2_disabled_value = ctx[3].pending_delete)) {
        button2.disabled = button2_disabled_value;
      }
      if (enhance_action_2 && is_function(enhance_action_2.update) && dirty & 1)
        enhance_action_2.update.call(null, { pending: enhance_function_2 });
      if (dirty & 1) {
        toggle_class(div, "done", ctx[3].done);
      }
    },
    r() {
      rect = div.getBoundingClientRect();
    },
    f() {
      fix_position(div);
      stop_animation();
      add_transform(div, rect);
    },
    a() {
      stop_animation();
      stop_animation = create_animation(div, rect, flip, { duration: 200 });
    },
    i(local) {
      if (current)
        return;
      if (local) {
        add_render_callback(() => {
          if (!div_transition)
            div_transition = create_bidirectional_transition(div, scale, { start: 0.7 }, true);
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      if (local) {
        if (!div_transition)
          div_transition = create_bidirectional_transition(div, scale, { start: 0.7 }, false);
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (detaching && div_transition)
        div_transition.end();
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment(ctx) {
  let meta;
  let t0;
  let div;
  let h1;
  let t1;
  let t2;
  let form;
  let input;
  let t3;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let current;
  let mounted;
  let dispose;
  let each_value = ctx[0].todos;
  const get_key = (ctx2) => ctx2[3].uid;
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  return {
    c() {
      meta = element("meta");
      t0 = space();
      div = element("div");
      h1 = element("h1");
      t1 = text("Todos");
      t2 = space();
      form = element("form");
      input = element("input");
      t3 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      const head_nodes = query_selector_all('[data-svelte="svelte-aw2gey"]', document.head);
      meta = claim_element(head_nodes, "META", { name: true, content: true });
      head_nodes.forEach(detach);
      t0 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      h1 = claim_element(div_nodes, "H1", {});
      var h1_nodes = children(h1);
      t1 = claim_text(h1_nodes, "Todos");
      h1_nodes.forEach(detach);
      t2 = claim_space(div_nodes);
      form = claim_element(div_nodes, "FORM", { class: true, action: true, method: true });
      var form_nodes = children(form);
      input = claim_element(form_nodes, "INPUT", {
        name: true,
        "aria-label": true,
        placeholder: true,
        class: true
      });
      form_nodes.forEach(detach);
      t3 = claim_space(div_nodes);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      document.title = "Todos";
      attr(meta, "name", "description");
      attr(meta, "content", "A todo list app");
      attr(input, "name", "text");
      attr(input, "aria-label", "Add todo");
      attr(input, "placeholder", "+ tap to add a todo");
      attr(input, "class", "svelte-16nsat");
      attr(form, "class", "new svelte-16nsat");
      attr(form, "action", "/todos");
      attr(form, "method", "post");
      attr(div, "class", "todos svelte-16nsat");
    },
    m(target, anchor) {
      append_hydration(document.head, meta);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, div, anchor);
      append_hydration(div, h1);
      append_hydration(h1, t1);
      append_hydration(div, t2);
      append_hydration(div, form);
      append_hydration(form, input);
      append_hydration(div, t3);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
      current = true;
      if (!mounted) {
        dispose = action_destroyer(enhance.call(null, form, { result: enhance_function }));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1) {
        each_value = ctx2[0].todos;
        group_outros();
        for (let i = 0; i < each_blocks.length; i += 1)
          each_blocks[i].r();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, fix_and_outro_and_destroy_block, create_each_block, null, get_each_context);
        for (let i = 0; i < each_blocks.length; i += 1)
          each_blocks[i].a();
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      detach(meta);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      mounted = false;
      dispose();
    }
  };
}
const prerender = false;
const enhance_function = async ({ form }) => {
  form.reset();
};
function instance($$self, $$props, $$invalidate) {
  let { data } = $$props;
  const enhance_function_1 = (todo, each_value, todo_index, { data: data2 }) => {
    each_value[todo_index].done = !!data2.get("done");
  };
  const enhance_function_2 = (todo, each_value, todo_index) => $$invalidate(0, each_value[todo_index].pending_delete = true, data);
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
  };
  return [data, enhance_function_1, enhance_function_2];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { data: 0 });
  }
}
export {
  Page as default,
  prerender
};
//# sourceMappingURL=_page.svelte-89ccc43f.js.map
