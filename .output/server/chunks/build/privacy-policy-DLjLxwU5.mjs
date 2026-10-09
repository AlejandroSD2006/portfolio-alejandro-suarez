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

//#region app/pages/privacy-policy.vue
var _sfc_main = {
	__name: "privacy-policy",
	__ssrInlineRender: true,
	setup(__props) {
		const sections = [
			{
				id: "controller",
				title: "Data controller"
			},
			{
				id: "data",
				title: "Data and purposes"
			},
			{
				id: "website",
				title: "What this website does not do"
			},
			{
				id: "retention",
				title: "Retention"
			},
			{
				id: "recipients",
				title: "Recipients and international transfers"
			},
			{
				id: "rights",
				title: "Your rights"
			},
			{
				id: "security",
				title: "Security"
			},
			{
				id: "changes",
				title: "Changes"
			},
			{
				id: "contact",
				title: "Contact"
			}
		];
		useSeoMeta({
			title: "Privacy Policy",
			description: "How this portfolio handles personal data and how to exercise your rights."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_LegalPage = _sfc_main$1;
			const _component_LegalValue = _sfc_main$2;
			_push(ssrRenderComponent(_component_LegalPage, mergeProps({
				eyebrow: "PRIVACY",
				title: "Privacy",
				accent: "Policy",
				sections,
				"last-updated": unref(legal).lastUpdated
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<section id="controller"${_scopeId}><h2${_scopeId}>Data controller</h2><p${_scopeId}>${ssrInterpolate(unref(legal).owner)}<br${_scopeId}>Tax identification number: `);
						_push(ssrRenderComponent(_component_LegalValue, { value: unref(legal).taxId }, null, _parent, _scopeId));
						_push(`<br${_scopeId}>Postal address: `);
						_push(ssrRenderComponent(_component_LegalValue, { value: unref(legal).address }, null, _parent, _scopeId));
						_push(`<br${_scopeId}>Email: <a${ssrRenderAttr("href", `mailto:${unref(legal).email}`)}${_scopeId}>${ssrInterpolate(unref(legal).email)}</a><br${_scopeId}>Website: `);
						_push(ssrRenderComponent(_component_LegalValue, { value: unref(legal).domain }, null, _parent, _scopeId));
						_push(`</p></section><section id="data"${_scopeId}><h2${_scopeId}>Data and purposes</h2><p${_scopeId}>If you email me, I process the details in your email and message to reply. The legal basis is your consent to send the message and my legitimate interest in responding (GDPR Articles 6(1)(a) and 6(1)(f)).</p><p${_scopeId}>The hosting provider may process technical server logs, such as IP address, browser and date, for security and operation.</p></section><section id="website"${_scopeId}><h2${_scopeId}>What this website does not do</h2><p${_scopeId}>The contact form does not send data to a server; its link opens your email client using <code${_scopeId}>mailto:</code>. Fonts are self-hosted, so the site does not contact Google to load them. This website does not run advertising or profiling.</p></section><section id="retention"${_scopeId}><h2${_scopeId}>Retention</h2><p${_scopeId}>Email correspondence is kept only for as long as needed to handle your enquiry, subject to any legal obligations that apply.</p></section><section id="recipients"${_scopeId}><h2${_scopeId}>Recipients and international transfers</h2><p${_scopeId}>The hosting provider is: `);
						_push(ssrRenderComponent(_component_LegalValue, { value: unref(legal).hosting }, null, _parent, _scopeId));
						_push(`. Confirm whether it transfers data outside the European Economic Area and the safeguards used: <mark class="todo"${_scopeId}>[TO BE COMPLETED]</mark></p></section><section id="rights"${_scopeId}><h2${_scopeId}>Your rights</h2><p${_scopeId}>You may request access, rectification, erasure, restriction, portability or object to processing by emailing <a${ssrRenderAttr("href", `mailto:${unref(legal).email}`)}${_scopeId}>${ssrInterpolate(unref(legal).email)}</a>. You may also complain to the Spanish Data Protection Agency (AEPD) at <a href="https://www.aepd.es" target="_blank" rel="noreferrer"${_scopeId}>aepd.es</a>.</p></section><section id="security"${_scopeId}><h2${_scopeId}>Security</h2><p${_scopeId}>Personal data should be handled using appropriate security measures. No method of transmission or storage can be guaranteed completely secure.</p></section><section id="changes"${_scopeId}><h2${_scopeId}>Changes</h2><p${_scopeId}>This policy may be updated when the website or its data practices change. The latest update date appears above.</p></section><section id="contact"${_scopeId}><h2${_scopeId}>Contact</h2><p${_scopeId}>For privacy questions or requests, email <a${ssrRenderAttr("href", `mailto:${unref(legal).email}`)}${_scopeId}>${ssrInterpolate(unref(legal).email)}</a>.</p></section>`);
					} else return [
						createVNode("section", { id: "controller" }, [createVNode("h2", null, "Data controller"), createVNode("p", null, [
							createTextVNode(toDisplayString(unref(legal).owner), 1),
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
						createVNode("section", { id: "data" }, [
							createVNode("h2", null, "Data and purposes"),
							createVNode("p", null, "If you email me, I process the details in your email and message to reply. The legal basis is your consent to send the message and my legitimate interest in responding (GDPR Articles 6(1)(a) and 6(1)(f))."),
							createVNode("p", null, "The hosting provider may process technical server logs, such as IP address, browser and date, for security and operation.")
						]),
						createVNode("section", { id: "website" }, [createVNode("h2", null, "What this website does not do"), createVNode("p", null, [
							createTextVNode("The contact form does not send data to a server; its link opens your email client using "),
							createVNode("code", null, "mailto:"),
							createTextVNode(". Fonts are self-hosted, so the site does not contact Google to load them. This website does not run advertising or profiling.")
						])]),
						createVNode("section", { id: "retention" }, [createVNode("h2", null, "Retention"), createVNode("p", null, "Email correspondence is kept only for as long as needed to handle your enquiry, subject to any legal obligations that apply.")]),
						createVNode("section", { id: "recipients" }, [createVNode("h2", null, "Recipients and international transfers"), createVNode("p", null, [
							createTextVNode("The hosting provider is: "),
							createVNode(_component_LegalValue, { value: unref(legal).hosting }, null, 8, ["value"]),
							createTextVNode(". Confirm whether it transfers data outside the European Economic Area and the safeguards used: "),
							createVNode("mark", { class: "todo" }, "[TO BE COMPLETED]")
						])]),
						createVNode("section", { id: "rights" }, [createVNode("h2", null, "Your rights"), createVNode("p", null, [
							createTextVNode("You may request access, rectification, erasure, restriction, portability or object to processing by emailing "),
							createVNode("a", { href: `mailto:${unref(legal).email}` }, toDisplayString(unref(legal).email), 9, ["href"]),
							createTextVNode(". You may also complain to the Spanish Data Protection Agency (AEPD) at "),
							createVNode("a", {
								href: "https://www.aepd.es",
								target: "_blank",
								rel: "noreferrer"
							}, "aepd.es"),
							createTextVNode(".")
						])]),
						createVNode("section", { id: "security" }, [createVNode("h2", null, "Security"), createVNode("p", null, "Personal data should be handled using appropriate security measures. No method of transmission or storage can be guaranteed completely secure.")]),
						createVNode("section", { id: "changes" }, [createVNode("h2", null, "Changes"), createVNode("p", null, "This policy may be updated when the website or its data practices change. The latest update date appears above.")]),
						createVNode("section", { id: "contact" }, [createVNode("h2", null, "Contact"), createVNode("p", null, [
							createTextVNode("For privacy questions or requests, email "),
							createVNode("a", { href: `mailto:${unref(legal).email}` }, toDisplayString(unref(legal).email), 9, ["href"]),
							createTextVNode(".")
						])])
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy-policy.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=privacy-policy-DLjLxwU5.mjs.map
