import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

//#region app/components/LegalValue.vue
var _sfc_main = {
	__name: "LegalValue",
	__ssrInlineRender: true,
	props: { value: {
		type: String,
		default: ""
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.value) _push(`<span${ssrRenderAttrs(_attrs)}>${ssrInterpolate(__props.value)}</span>`);
			else _push(`<mark${ssrRenderAttrs(mergeProps({ class: "todo" }, _attrs))}>[TO BE COMPLETED]</mark>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LegalValue.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=LegalValue-DjOFsT6F.mjs.map
