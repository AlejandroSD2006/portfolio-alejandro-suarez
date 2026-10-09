import { N as NuxtLink } from './nuxt-link-DKiukXbL.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';

//#region app/components/LegalPage.vue
var _sfc_main = {
	__name: "LegalPage",
	__ssrInlineRender: true,
	props: {
		eyebrow: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		accent: {
			type: String,
			required: true
		},
		sections: {
			type: Array,
			required: true
		},
		lastUpdated: {
			type: String,
			required: true
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<main${ssrRenderAttrs(mergeProps({ class: "legal-page wrap" }, _attrs))}><p class="eyebrow">LEGAL / ${ssrInterpolate(__props.eyebrow)}</p><h1>${ssrInterpolate(__props.title)} <span class="serif-accent">${ssrInterpolate(__props.accent)}</span></h1><p class="legal-updated">Last updated: ${ssrInterpolate(__props.lastUpdated)}</p>`);
			if (__props.sections.length > 4) {
				_push(`<nav class="legal-index" aria-label="Page contents"><!--[-->`);
				ssrRenderList(__props.sections, (section) => {
					_push(`<a${ssrRenderAttr("href", `#${section.id}`)}>${ssrInterpolate(section.title)}</a>`);
				});
				_push(`<!--]--></nav>`);
			} else _push(`<!---->`);
			_push(`<article class="legal-content">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</article>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				class: "legal-back",
				to: {
					path: "/",
					hash: "#home"
				}
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`← Back to home`);
					else return [createTextVNode("← Back to home")];
				}),
				_: 1
			}, _parent));
			_push(`</main>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LegalPage.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region app/data/legal.js
var legal = {
	owner: "Alejandro Suárez Durán",
	email: "asuadur14@gmail.com",
	taxId: "",
	address: "",
	domain: "",
	hosting: "",
	lastUpdated: "2026-10-09"
};

export { _sfc_main as _, legal as l };
//# sourceMappingURL=legal-DVqUX1Gb.mjs.map
