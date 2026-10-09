import { d as useRoute$1, a as useHead, _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { u as useState } from './state-DfWu8L74.mjs';
import { N as NuxtLink } from './nuxt-link-DKiukXbL.mjs';
import { u as useAppReady } from './useAppReady-CL4Yb9-w.mjs';
import { u as useConsent, a as consentCategories } from './useConsent-BXTBb7Bp.mjs';
import { ref, unref, withCtx, createVNode, createTextVNode, watch, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderSlot, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderTeleport, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { X, Menu, ArrowUpRight } from 'lucide-vue-next';
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

//#region app/components/AppPreloader.vue
var _sfc_main$4 = {
	__name: "AppPreloader",
	__ssrInlineRender: true,
	setup(__props) {
		const preloaderDone = useState("preloaderDone", () => false);
		const heroImageLoaded = useState("heroImageLoaded", () => false);
		const progress = ref(0);
		ref(0);
		const entered = ref(false);
		const exiting = ref(false);
		const visible = ref(!preloaderDone.value);
		const digits = computed(() => String(Math.floor(progress.value)).padStart(3, "0"));
		const firstName = Array.from("ALEJANDRO");
		const lastName = Array.from("Suárez Durán");
		ref(false);
		ref(heroImageLoaded.value);
		ref(false);
		useHead({
			htmlAttrs: { class: "is-loading" },
			noscript: [{ innerHTML: "<style>.preloader,.cookie-banner{display:none!important}html.is-loading{overflow:auto!important}</style>" }]
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (visible.value) {
				_push(`<div${ssrRenderAttrs(mergeProps({
					class: ["preloader", {
						"is-entered": entered.value,
						"is-exiting": exiting.value
					}],
					role: "status",
					"aria-live": "polite"
				}, _attrs))}><span class="sr-only">Loading Alejandro Suárez Durán&#39;s portfolio</span><div class="preloader-meta"><span>PORTFOLIO — 2026</span><span>CLOUD · SYSTEMS · DATA</span></div><div class="preloader-center"><div class="preloader-mark" aria-hidden="true"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="30"></circle></svg><span>AS</span></div><div class="preloader-name" aria-hidden="true"><div class="preloader-name-line"><!--[-->`);
				ssrRenderList(unref(firstName), (letter, index) => {
					_push(`<span style="${ssrRenderStyle({ "--i": index })}">${ssrInterpolate(letter)}</span>`);
				});
				_push(`<!--]--></div><div class="preloader-name-line serif-accent"><!--[-->`);
				ssrRenderList(unref(lastName), (letter, index) => {
					_push(`<span style="${ssrRenderStyle({ "--i": index + unref(firstName).length })}">${ssrInterpolate(letter === " " ? "\xA0" : letter)}</span>`);
				});
				_push(`<!--]--></div></div></div><div class="preloader-progress"><span class="preloader-bar"><i style="${ssrRenderStyle({ transform: `scaleX(${progress.value / 100})` })}"></i></span><span>${ssrInterpolate(digits.value)} <span aria-hidden="true">→</span> 100</span></div></div>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppPreloader.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
//#endregion
//#region app/components/CookieBanner.vue
var _sfc_main$3 = {
	__name: "CookieBanner",
	__ssrInlineRender: true,
	setup(__props) {
		const ready = useAppReady();
		const { initialized, hasDecided} = useConsent();
		const visible = ref(false);
		let timer;
		watch([
			ready,
			initialized,
			hasDecided
		], ([isReady, isInitialized, decided]) => {
			clearTimeout(timer);
			if (!isReady || !isInitialized || decided) {
				visible.value = false;
				return;
			}
			timer = (void 0).setTimeout(() => {
				visible.value = true;
			}, 400);
		}, { immediate: true });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			if (visible.value && !unref(hasDecided)) {
				_push(`<aside${ssrRenderAttrs(mergeProps({
					class: "cookie-banner",
					role: "dialog",
					"aria-labelledby": "cookie-banner-title",
					"aria-modal": "false"
				}, _attrs))}><p id="cookie-banner-title" class="eyebrow">COOKIES</p><p class="cookie-copy">I use only the storage this site needs to work, plus optional analytics if you allow it. You can change your choice at any time. `);
				_push(ssrRenderComponent(_component_NuxtLink, { to: "/cookie-policy" }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Cookie policy`);
						else return [createTextVNode("Cookie policy")];
					}),
					_: 1
				}, _parent));
				_push(`.</p><div class="cookie-actions"><button type="button" class="cookie-choice-button">Reject all</button><button type="button" class="cookie-choice-button">Accept all</button><button type="button" class="cookie-settings-link">Settings</button></div></aside>`);
			} else _push(`<!---->`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CookieBanner.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
//#endregion
//#region app/components/CookiePreferences.vue
var _sfc_main$2 = {
	__name: "CookiePreferences",
	__ssrInlineRender: true,
	setup(__props) {
		const { preferencesOpen} = useConsent();
		ref(null);
		ref(null);
		const analyticsAllowed = ref(false);
		watch(preferencesOpen, async (isOpen) => {});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				if (unref(preferencesOpen)) {
					_push(`<div class="cookie-modal-backdrop"><section class="cookie-preferences" role="dialog" aria-labelledby="cookie-preferences-title" aria-modal="true" tabindex="-1"><div class="cookie-preferences-heading"><div><p class="eyebrow">COOKIE SETTINGS</p><h2 id="cookie-preferences-title">Your preferences</h2></div><button class="icon-button" type="button" aria-label="Close cookie settings">`);
					_push(ssrRenderComponent(unref(X), { size: 18 }, null, _parent));
					_push(`</button></div><div class="consent-category-list"><!--[-->`);
					ssrRenderList(unref(consentCategories), (category) => {
						_push(`<label class="consent-category"><span class="consent-category-copy"><strong>${ssrInterpolate(category.label)}</strong><small>${ssrInterpolate(category.description)}</small></span>`);
						if (category.required) _push(`<input type="checkbox" checked disabled aria-label="Strictly necessary, always active">`);
						else _push(`<input${ssrIncludeBooleanAttr(Array.isArray(analyticsAllowed.value) ? ssrLooseContain(analyticsAllowed.value, null) : analyticsAllowed.value) ? " checked" : ""} type="checkbox"${ssrRenderAttr("aria-label", `${category.label} cookies`)}>`);
						_push(`</label>`);
					});
					_push(`<!--]--></div><div class="cookie-actions cookie-modal-actions"><button type="button" class="cookie-choice-button">Save preferences</button><button type="button" class="cookie-choice-button">Reject all</button><button type="button" class="cookie-choice-button">Accept all</button></div></section></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CookiePreferences.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region app/components/ui/ScrollProgress.vue
var _sfc_main$1 = {
	__name: "ScrollProgress",
	__ssrInlineRender: true,
	setup(__props) {
		const progress = ref(0);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "scroll-progress",
				"aria-hidden": "true"
			}, _attrs))} data-v-c515431b><span style="${ssrRenderStyle({ transform: `scaleX(${progress.value})` })}" data-v-c515431b></span></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ScrollProgress.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ScrollProgress_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["__scopeId", "data-v-c515431b"]]);
//#endregion
//#region app/composables/useScrollSpy.js
function useScrollSpy(ids) {
	const activeId = ref("");
	const route = useRoute$1();
	watch(() => route.fullPath, () => {
		activeId.value = "";
	});
	return activeId;
}
//#endregion
//#region app/layouts/default.vue
var _sfc_main = {
	__name: "default",
	__ssrInlineRender: true,
	setup(__props) {
		const menuOpen = ref(false);
		const activeSection = useScrollSpy();
		const preloaderDone = useState("preloaderDone", () => false);
		useConsent();
		function closeMenu() {
			menuOpen.value = false;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppPreloader = _sfc_main$4;
			const _component_NuxtLink = NuxtLink;
			const _component_CookieBanner = _sfc_main$3;
			const _component_CookiePreferences = _sfc_main$2;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			if (!unref(preloaderDone)) _push(ssrRenderComponent(_component_AppPreloader, null, null, _parent));
			else _push(`<!---->`);
			_push(ssrRenderComponent(ScrollProgress_default, null, null, _parent));
			_push(`<header class="site-header wrap">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				class: "wordmark",
				to: {
					path: "/",
					hash: "#home"
				},
				"aria-label": "Alejandro Suárez Durán, home",
				onClick: closeMenu
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="wordmark-mark"${_scopeId}>AS</span><span class="wordmark-name"${_scopeId}>ALEJANDRO<br${_scopeId}>SUÁREZ DURÁN</span>`);
					else return [createVNode("span", { class: "wordmark-mark" }, "AS"), createVNode("span", { class: "wordmark-name" }, [
						createTextVNode("ALEJANDRO"),
						createVNode("br"),
						createTextVNode("SUÁREZ DURÁN")
					])];
				}),
				_: 1
			}, _parent));
			_push(`<button class="menu-toggle icon-button" type="button"${ssrRenderAttr("aria-expanded", menuOpen.value)} aria-label="Toggle navigation">`);
			if (menuOpen.value) _push(ssrRenderComponent(unref(X), { size: 19 }, null, _parent));
			else _push(ssrRenderComponent(unref(Menu), { size: 19 }, null, _parent));
			_push(`</button><nav class="${ssrRenderClass([{ "is-open": menuOpen.value }, "main-nav"])}" aria-label="Main navigation">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: {
					path: "/",
					hash: "#work"
				},
				class: { "is-active": unref(activeSection) === "work" },
				"aria-current": unref(activeSection) === "work" ? "location" : void 0,
				onClick: closeMenu
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Work`);
					else return [createTextVNode("Work")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: {
					path: "/",
					hash: "#skills"
				},
				class: { "is-active": unref(activeSection) === "skills" },
				"aria-current": unref(activeSection) === "skills" ? "location" : void 0,
				onClick: closeMenu
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Skills`);
					else return [createTextVNode("Skills")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: {
					path: "/",
					hash: "#about"
				},
				class: { "is-active": unref(activeSection) === "about" },
				"aria-current": unref(activeSection) === "about" ? "location" : void 0,
				onClick: closeMenu
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`About`);
					else return [createTextVNode("About")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: {
					path: "/",
					hash: "#contact"
				},
				class: { "is-active": unref(activeSection) === "contact" },
				"aria-current": unref(activeSection) === "contact" ? "location" : void 0,
				onClick: closeMenu
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Contact`);
					else return [createTextVNode("Contact")];
				}),
				_: 1
			}, _parent));
			_push(`<a class="nav-resume" href="/Curriculum-Alejandro.pdf" target="_blank" rel="noreferrer" aria-label="View CV (opens PDF in a new tab)">View CV `);
			_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
			_push(`</a></nav></header>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`<footer class="site-footer wrap">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				class: "wordmark footer-wordmark",
				to: {
					path: "/",
					hash: "#home"
				}
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="wordmark-mark"${_scopeId}>AS</span><span class="wordmark-name"${_scopeId}>ALEJANDRO<br${_scopeId}>SUÁREZ DURÁN</span>`);
					else return [createVNode("span", { class: "wordmark-mark" }, "AS"), createVNode("span", { class: "wordmark-name" }, [
						createTextVNode("ALEJANDRO"),
						createVNode("br"),
						createTextVNode("SUÁREZ DURÁN")
					])];
				}),
				_: 1
			}, _parent));
			_push(`<p>Cloud infrastructure · Systems · Web</p>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: {
					path: "/",
					hash: "#home"
				},
				class: "back-to-top"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`BACK TO TOP `);
						_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent, _scopeId));
					} else return [createTextVNode("BACK TO TOP "), createVNode(unref(ArrowUpRight), { size: 14 })];
				}),
				_: 1
			}, _parent));
			_push(`<span class="copyright">© 2026 ALEJANDRO SUÁREZ DURÁN</span><nav class="legal-footer-links" aria-label="Legal and cookie settings">`);
			_push(ssrRenderComponent(_component_NuxtLink, { to: "/privacy-policy" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Privacy Policy`);
					else return [createTextVNode("Privacy Policy")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, { to: "/legal-notice" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Legal Notice`);
					else return [createTextVNode("Legal Notice")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, { to: "/cookie-policy" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Cookie Policy`);
					else return [createTextVNode("Cookie Policy")];
				}),
				_: 1
			}, _parent));
			_push(`<button type="button">Cookie settings</button></nav></footer>`);
			_push(ssrRenderComponent(_component_CookieBanner, null, null, _parent));
			_push(ssrRenderComponent(_component_CookiePreferences, null, null, _parent));
			_push(`</div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-Dackolgb.mjs.map
