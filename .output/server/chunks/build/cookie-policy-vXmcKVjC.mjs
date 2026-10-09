import { u as useSeoMeta } from '../virtual/entry.mjs';
import { u as useConsent, c as consentItems, a as consentCategories } from './useConsent-BXTBb7Bp.mjs';
import { _ as _sfc_main$1, l as legal } from './legal-DVqUX1Gb.mjs';
import { mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import 'ipx';
import 'node:path';
import 'node:crypto';
import './state-DfWu8L74.mjs';
import './nuxt-link-DKiukXbL.mjs';

//#region app/pages/cookie-policy.vue
var _sfc_main = {
	__name: "cookie-policy",
	__ssrInlineRender: true,
	setup(__props) {
		const { openPreferences } = useConsent();
		const sections = [
			{
				id: "storage",
				title: "Cookies and local storage"
			},
			{
				id: "items",
				title: "Storage used by this website"
			},
			{
				id: "categories",
				title: "Categories"
			},
			{
				id: "choices",
				title: "Changing your choice"
			},
			{
				id: "third-parties",
				title: "Third-party cookies"
			},
			{
				id: "updates",
				title: "Updates"
			}
		];
		useSeoMeta({
			title: "Cookie Policy",
			description: "Storage used by this portfolio and how to manage cookie consent."
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_sfc_main$1, mergeProps({
				eyebrow: "COOKIES",
				title: "Cookie",
				accent: "Policy",
				sections,
				"last-updated": unref(legal).lastUpdated
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<section id="storage"${_scopeId}><h2${_scopeId}>Cookies and local storage</h2><p${_scopeId}>Cookies are small files stored by a website in your browser. Local storage is a separate browser feature that lets a website retain a small amount of information on your device.</p></section><section id="items"${_scopeId}><h2${_scopeId}>Storage used by this website</h2><div class="legal-table-wrap"${_scopeId}><table class="legal-table"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th${_scopeId}>Name</th><th${_scopeId}>Type</th><th${_scopeId}>Purpose</th><th${_scopeId}>Category</th><th${_scopeId}>Duration</th></tr></thead><tbody${_scopeId}><!--[-->`);
						ssrRenderList(unref(consentItems), (item) => {
							_push(`<tr${_scopeId}><td${_scopeId}>${ssrInterpolate(item.name)}</td><td${_scopeId}>${ssrInterpolate(item.type)}</td><td${_scopeId}>${ssrInterpolate(item.purpose)}</td><td${_scopeId}>${ssrInterpolate(item.category)}</td><td${_scopeId}>${ssrInterpolate(item.duration)}</td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></section><section id="categories"${_scopeId}><h2${_scopeId}>Categories</h2><!--[-->`);
						ssrRenderList(unref(consentCategories), (category) => {
							_push(`<p${_scopeId}><strong${_scopeId}>${ssrInterpolate(category.label)}:</strong> ${ssrInterpolate(category.description)}</p>`);
						});
						_push(`<!--]--><p${_scopeId}>Analytics, if configured in the future, is off by default and only enabled with your permission. Confirm whether an analytics tool will be used and identify it: <mark class="todo"${_scopeId}>[TO BE COMPLETED]</mark></p></section><section id="choices"${_scopeId}><h2${_scopeId}>Changing your choice</h2><p${_scopeId}>Use <button class="legal-inline-button" type="button"${_scopeId}>Cookie settings</button> in the footer to change or withdraw your choice at any time. You can also delete this website’s local storage in your browser settings.</p></section><section id="third-parties"${_scopeId}><h2${_scopeId}>Third-party cookies</h2><p${_scopeId}>This website currently does not load third-party cookies.</p></section><section id="updates"${_scopeId}><h2${_scopeId}>Updates</h2><p${_scopeId}>This policy may be updated if the website’s storage changes. Please check this page for the latest information.</p></section>`);
					} else return [
						createVNode("section", { id: "storage" }, [createVNode("h2", null, "Cookies and local storage"), createVNode("p", null, "Cookies are small files stored by a website in your browser. Local storage is a separate browser feature that lets a website retain a small amount of information on your device.")]),
						createVNode("section", { id: "items" }, [createVNode("h2", null, "Storage used by this website"), createVNode("div", { class: "legal-table-wrap" }, [createVNode("table", { class: "legal-table" }, [createVNode("thead", null, [createVNode("tr", null, [
							createVNode("th", null, "Name"),
							createVNode("th", null, "Type"),
							createVNode("th", null, "Purpose"),
							createVNode("th", null, "Category"),
							createVNode("th", null, "Duration")
						])]), createVNode("tbody", null, [(openBlock(true), createBlock(Fragment, null, renderList(unref(consentItems), (item) => {
							return openBlock(), createBlock("tr", { key: item.name }, [
								createVNode("td", null, toDisplayString(item.name), 1),
								createVNode("td", null, toDisplayString(item.type), 1),
								createVNode("td", null, toDisplayString(item.purpose), 1),
								createVNode("td", null, toDisplayString(item.category), 1),
								createVNode("td", null, toDisplayString(item.duration), 1)
							]);
						}), 128))])])])]),
						createVNode("section", { id: "categories" }, [
							createVNode("h2", null, "Categories"),
							(openBlock(true), createBlock(Fragment, null, renderList(unref(consentCategories), (category) => {
								return openBlock(), createBlock("p", { key: category.id }, [createVNode("strong", null, toDisplayString(category.label) + ":", 1), createTextVNode(" " + toDisplayString(category.description), 1)]);
							}), 128)),
							createVNode("p", null, [createTextVNode("Analytics, if configured in the future, is off by default and only enabled with your permission. Confirm whether an analytics tool will be used and identify it: "), createVNode("mark", { class: "todo" }, "[TO BE COMPLETED]")])
						]),
						createVNode("section", { id: "choices" }, [createVNode("h2", null, "Changing your choice"), createVNode("p", null, [
							createTextVNode("Use "),
							createVNode("button", {
								class: "legal-inline-button",
								type: "button",
								onClick: unref(openPreferences)
							}, "Cookie settings", 8, ["onClick"]),
							createTextVNode(" in the footer to change or withdraw your choice at any time. You can also delete this website’s local storage in your browser settings.")
						])]),
						createVNode("section", { id: "third-parties" }, [createVNode("h2", null, "Third-party cookies"), createVNode("p", null, "This website currently does not load third-party cookies.")]),
						createVNode("section", { id: "updates" }, [createVNode("h2", null, "Updates"), createVNode("p", null, "This policy may be updated if the website’s storage changes. Please check this page for the latest information.")])
					];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cookie-policy.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cookie-policy-vXmcKVjC.mjs.map
