import { u as useSeoMeta } from '../virtual/entry.mjs';
import { _ as _sfc_main$1, l as legal } from './legal-DVqUX1Gb.mjs';
import { _ as _sfc_main$2 } from './LegalValue-DjOFsT6F.mjs';
import { mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
import './nuxt-link-DKiukXbL.mjs';

//#region app/pages/legal-notice.vue
var _sfc_main = {
	__name: "legal-notice",
	__ssrInlineRender: true,
	setup(__props) {
		const sections = [
			{
				id: "owner",
				title: "Owner identification"
			},
			{
				id: "purpose",
				title: "Purpose"
			},
			{
				id: "terms",
				title: "Terms of use"
			},
			{
				id: "property",
				title: "Intellectual and industrial property"
			},
			{
				id: "liability",
				title: "Liability disclaimer"
			},
			{
				id: "links",
				title: "External links"
			},
			{
				id: "law",
				title: "Governing law"
			}
		];
		useSeoMeta({
			title: "Legal Notice",
			description: "Legal information about Alejandro Suárez Durán’s portfolio website."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_LegalPage = _sfc_main$1;
			const _component_LegalValue = _sfc_main$2;
			_push(ssrRenderComponent(_component_LegalPage, mergeProps({
				eyebrow: "NOTICE",
				title: "Legal",
				accent: "Notice",
				sections,
				"last-updated": unref(legal).lastUpdated
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<section id="owner"${_scopeId}><h2${_scopeId}>Owner identification</h2><p${_scopeId}>Owner: ${ssrInterpolate(unref(legal).owner)}<br${_scopeId}>Tax identification number: `);
						_push(ssrRenderComponent(_component_LegalValue, { value: unref(legal).taxId }, null, _parent, _scopeId));
						_push(`<br${_scopeId}>Postal address: `);
						_push(ssrRenderComponent(_component_LegalValue, { value: unref(legal).address }, null, _parent, _scopeId));
						_push(`<br${_scopeId}>Email: <a${ssrRenderAttr("href", `mailto:${unref(legal).email}`)}${_scopeId}>${ssrInterpolate(unref(legal).email)}</a><br${_scopeId}>Website: `);
						_push(ssrRenderComponent(_component_LegalValue, { value: unref(legal).domain }, null, _parent, _scopeId));
						_push(`</p></section><section id="purpose"${_scopeId}><h2${_scopeId}>Purpose</h2><p${_scopeId}>This personal portfolio showcases professional experience, skills and contact details.</p></section><section id="terms"${_scopeId}><h2${_scopeId}>Terms of use</h2><p${_scopeId}>Use this website lawfully and do not interfere with its operation or other visitors’ rights.</p></section><section id="property"${_scopeId}><h2${_scopeId}>Intellectual and industrial property</h2><p${_scopeId}>Website content and design © Alejandro Suárez Durán. Technology logos belong to their respective owners and are used only to identify those technologies. Interface icons are provided by Lucide.</p><h3${_scopeId}>Image credits</h3><p${_scopeId}>The authorship and licences for the nebula and Jupiter test images must be confirmed before publication: <mark class="todo"${_scopeId}>[TO BE COMPLETED]</mark></p></section><section id="liability"${_scopeId}><h2${_scopeId}>Liability disclaimer</h2><p${_scopeId}>Information is provided for general purposes. The owner does not guarantee uninterrupted availability or that all information is complete and up to date.</p></section><section id="links"${_scopeId}><h2${_scopeId}>External links</h2><p${_scopeId}>This website may link to third-party services, including LinkedIn. Their operators are responsible for their own content and privacy practices.</p></section><section id="law"${_scopeId}><h2${_scopeId}>Governing law</h2><p${_scopeId}>Spanish law applies. Disputes are subject to the Spanish courts, without prejudice to any consumer rights that may apply.</p></section>`);
					} else return [
						createVNode("section", { id: "owner" }, [createVNode("h2", null, "Owner identification"), createVNode("p", null, [
							createTextVNode("Owner: " + toDisplayString(unref(legal).owner), 1),
							createVNode("br"),
							createTextVNode("Tax identification number: "),
							createVNode(_component_LegalValue, { value: unref(legal).taxId }, null, 8, ["value"]),
							createVNode("br"),
							createTextVNode("Postal address: "),
							createVNode(_component_LegalValue, { value: unref(legal).address }, null, 8, ["value"]),
							createVNode("br"),
							createTextVNode("Email: "),
							createVNode("a", { href: `mailto:${unref(legal).email}` }, toDisplayString(unref(legal).email), 9, ["href"]),
							createVNode("br"),
							createTextVNode("Website: "),
							createVNode(_component_LegalValue, { value: unref(legal).domain }, null, 8, ["value"])
						])]),
						createVNode("section", { id: "purpose" }, [createVNode("h2", null, "Purpose"), createVNode("p", null, "This personal portfolio showcases professional experience, skills and contact details.")]),
						createVNode("section", { id: "terms" }, [createVNode("h2", null, "Terms of use"), createVNode("p", null, "Use this website lawfully and do not interfere with its operation or other visitors’ rights.")]),
						createVNode("section", { id: "property" }, [
							createVNode("h2", null, "Intellectual and industrial property"),
							createVNode("p", null, "Website content and design © Alejandro Suárez Durán. Technology logos belong to their respective owners and are used only to identify those technologies. Interface icons are provided by Lucide."),
							createVNode("h3", null, "Image credits"),
							createVNode("p", null, [createTextVNode("The authorship and licences for the nebula and Jupiter test images must be confirmed before publication: "), createVNode("mark", { class: "todo" }, "[TO BE COMPLETED]")])
						]),
						createVNode("section", { id: "liability" }, [createVNode("h2", null, "Liability disclaimer"), createVNode("p", null, "Information is provided for general purposes. The owner does not guarantee uninterrupted availability or that all information is complete and up to date.")]),
						createVNode("section", { id: "links" }, [createVNode("h2", null, "External links"), createVNode("p", null, "This website may link to third-party services, including LinkedIn. Their operators are responsible for their own content and privacy practices.")]),
						createVNode("section", { id: "law" }, [createVNode("h2", null, "Governing law"), createVNode("p", null, "Spanish law applies. Disputes are subject to the Spanish courts, without prejudice to any consumer rights that may apply.")])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/legal-notice.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=legal-notice-B0AMaM2s.mjs.map
