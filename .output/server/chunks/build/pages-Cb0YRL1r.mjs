import { _ as _plugin_vue_export_helper_default, a as useHead, b as useNuxtApp, s as sanitizeTag, c as useRuntimeConfig } from '../virtual/entry.mjs';
import { u as useState } from './state-DfWu8L74.mjs';
import { N as NuxtLink } from './nuxt-link-DKiukXbL.mjs';
import { u as useAppReady } from './useAppReady-CL4Yb9-w.mjs';
import { resolveDirective, withCtx, unref, createTextVNode, createVNode, mergeProps, computed, ref, useAttrs, useTemplateRef, defineComponent, shallowRef, getCurrentInstance, provide, cloneVNode, h, createElementBlock, toDisplayString, openBlock, createBlock, createCommentVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { G as defu, M as hasProtocol, O as withLeadingSlash, z as joinURL, J as parseURL, P as encodeParam, Q as encodePath } from '../_/nitro.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrRenderVNode } from 'vue/server-renderer';
import { ArrowRight, ArrowDown, ArrowUpRight, Send, Server, Terminal, Cloud, Database, Brain, Sigma, Network } from 'lucide-vue-next';
import { siVmware, siAnsible, siLinux, siVercel, siPython, siPandas, siGit, siHtml5, siCss, siJavascript, siWordpress, siVuedotjs } from 'simple-icons';
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

//#region node_modules/@nuxt/image/dist/runtime/utils/meta.js
async function imageMeta(_ctx, url) {
	return await _imageMeta(url).catch((err) => {
		console.error("Failed to get image meta for " + url, err + "");
		return {
			width: 0,
			height: 0,
			ratio: 0
		};
	});
}
async function _imageMeta(url) {
	{
		const metadata = (await import('../_/index.mjs').then((r) => r.imageMeta))(await fetch(url).then((res) => res.buffer()));
		if (!metadata) throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
		const { width, height } = metadata;
		return {
			width,
			height,
			ratio: width && height ? width / height : void 0
		};
	}
}
//#endregion
//#region node_modules/@nuxt/image/dist/runtime/utils/index.js
function createMapper(map) {
	return ((key) => key !== void 0 ? map[key] || key : map.missingValue);
}
function createOperationsGenerator(config = {}) {
	const formatter = config.formatter;
	const keyMap = config.keyMap && typeof config.keyMap !== "function" ? createMapper(config.keyMap) : config.keyMap;
	const map = {};
	for (const key in config.valueMap) {
		const valueKey = key;
		const value = config.valueMap[valueKey];
		map[valueKey] = typeof value === "object" ? createMapper(value) : value;
	}
	return (modifiers) => {
		const operations = [];
		for (const _key in modifiers) {
			const key = _key;
			if (typeof modifiers[key] === "undefined") continue;
			const value = typeof map[key] === "function" ? map[key](modifiers[key]) : modifiers[key];
			operations.push([keyMap ? keyMap(key) : key, value]);
		}
		if (formatter) return operations.map((entry) => formatter(...entry)).join(config.joinWith ?? "&");
		return new URLSearchParams(operations).toString();
	};
}
function parseDensities(input = "") {
	if (input === void 0 || !input.length) return [];
	const densities = /* @__PURE__ */ new Set();
	for (const density of input.split(" ")) {
		const d = Number.parseInt(density.replace("x", ""));
		if (d) densities.add(d);
	}
	return Array.from(densities);
}
function checkDensities(densities) {
	if (densities.length === 0) throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
}
function parseSize(input = "") {
	if (typeof input === "number") return input;
	if (typeof input === "string") {
		if (input.replace("px", "").match(/^\d+$/g)) return Number.parseInt(input, 10);
	}
}
function parseSizes(input) {
	const sizes = {};
	if (typeof input === "string") for (const entry of input.split(/[\s,]+/).filter((e) => e)) {
		const s = entry.split(":");
		if (s.length !== 2) sizes["1px"] = s[0].trim();
		else sizes[s[0].trim()] = s[1].trim();
	}
	else Object.assign(sizes, input);
	return sizes;
}
//#endregion
//#region node_modules/@nuxt/image/dist/runtime/image.js
function createImage(globalOptions) {
	const ctx = { options: globalOptions };
	const getImage = (input, options = {}) => {
		const image = resolveImage(ctx, input, options);
		return image;
	};
	const $img = ((input, modifiers, options) => getImage(input, defu({ modifiers }, options)).url);
	for (const presetName in globalOptions.presets) $img[presetName] = ((source, modifiers, options) => $img(source, modifiers, {
		...globalOptions.presets[presetName],
		...options
	}));
	$img.options = globalOptions;
	$img.getImage = getImage;
	$img.getMeta = ((input, options) => getMeta(ctx, input, options));
	$img.getSizes = ((input, options) => getSizes(ctx, input, options));
	ctx.$img = $img;
	return $img;
}
async function getMeta(ctx, input, options) {
	const image = resolveImage(ctx, input, { ...options });
	if (typeof image.getMeta === "function") return await image.getMeta();
	else return await imageMeta(ctx, image.url);
}
function resolveImage(ctx, input, options) {
	if (input && typeof input !== "string") throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
	if (!input || input.startsWith("data:")) return { url: input };
	const { setup, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
	const provider = setup();
	const preset = getPreset(ctx, options.preset);
	input = hasProtocol(input) ? input : withLeadingSlash(input);
	if (!provider.supportsAlias) {
		for (const base in ctx.options.alias) if (input.startsWith(base)) {
			const alias = ctx.options.alias[base];
			if (alias) input = joinURL(alias, input.slice(base.length));
		}
	}
	if (provider.validateDomains && hasProtocol(input)) {
		const inputHost = parseURL(input).host;
		if (!ctx.options.domains.find((d) => d === inputHost)) return { url: input };
	}
	const _options = defu(options, preset, defaults);
	const resolvedOptions = {
		..._options,
		modifiers: {
			..._options.modifiers,
			width: _options.modifiers?.width ? parseSize(_options.modifiers.width) : void 0,
			height: _options.modifiers?.height ? parseSize(_options.modifiers.height) : void 0
		}
	};
	const image = provider.getImage(input, resolvedOptions, ctx);
	image.format ||= resolvedOptions.modifiers.format || "";
	return image;
}
function getProvider(ctx, name) {
	const provider = ctx.options.providers[name];
	if (!provider) throw new Error("Unknown provider: " + name);
	return provider;
}
function getPreset(ctx, name) {
	if (!name) return {};
	if (!ctx.options.presets[name]) throw new Error("Unknown preset: " + name);
	return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
	const preset = getPreset(ctx, opts.preset);
	const merged = defu(opts, preset);
	const width = parseSize(merged.modifiers?.width);
	const height = parseSize(merged.modifiers?.height);
	const sizes = merged.sizes ? parseSizes(merged.sizes) : {};
	const _densities = merged.densities?.trim();
	const densities = _densities ? parseDensities(_densities) : ctx.options.densities;
	checkDensities(densities);
	const hwRatio = width && height ? height / width : 0;
	const sizeVariants = [];
	const srcsetVariants = [];
	if (Object.keys(sizes).length >= 1) {
		for (const key in sizes) {
			const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
			if (variant === void 0) continue;
			sizeVariants.push({
				size: variant.size,
				screenMaxWidth: variant.screenMaxWidth,
				media: `(max-width: ${variant.screenMaxWidth - 1}px)`
			});
			for (const density of densities) srcsetVariants.push({
				width: variant._cWidth * density,
				src: getVariantSrc(ctx, input, opts, variant, density)
			});
		}
		finaliseSizeVariants(sizeVariants);
	} else for (const density of densities) {
		const key = Object.keys(sizes)[0];
		let variant = key ? getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx) : void 0;
		if (variant === void 0) variant = {
			size: "",
			screenMaxWidth: 0,
			_cWidth: opts.modifiers?.width,
			_cHeight: opts.modifiers?.height
		};
		srcsetVariants.push({
			width: density,
			src: getVariantSrc(ctx, input, opts, variant, density)
		});
	}
	finaliseSrcsetVariants(srcsetVariants);
	const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
	const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
	const suffix = sizesVal ? "w" : "x";
	return {
		sizes: sizesVal,
		srcset: srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", "),
		src: defaultVariant?.src
	};
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
	const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || Number.parseInt(key);
	const isFluid = size.endsWith("vw");
	if (!isFluid && /^\d+$/.test(size)) size = size + "px";
	if (!isFluid && !size.endsWith("px")) return;
	let _cWidth = Number.parseInt(size);
	if (!screenMaxWidth || !_cWidth) return;
	if (isFluid) _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
	const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
	return {
		size,
		screenMaxWidth,
		_cWidth,
		_cHeight
	};
}
function getVariantSrc(ctx, input, opts, variant, density) {
	return ctx.$img(input, {
		...opts.modifiers,
		width: variant._cWidth ? variant._cWidth * density : void 0,
		height: variant._cHeight ? variant._cHeight * density : void 0
	}, opts);
}
function finaliseSizeVariants(sizeVariants) {
	sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
	let previousMedia = null;
	for (let i = sizeVariants.length - 1; i >= 0; i--) {
		const sizeVariant = sizeVariants[i];
		if (sizeVariant.media === previousMedia) sizeVariants.splice(i, 1);
		previousMedia = sizeVariant.media;
	}
	for (let i = 0; i < sizeVariants.length; i++) sizeVariants[i].media = sizeVariants[i + 1]?.media || "";
}
function finaliseSrcsetVariants(srcsetVariants) {
	srcsetVariants.sort((v1, v2) => v1.width - v2.width);
	let previousWidth = null;
	for (let i = srcsetVariants.length - 1; i >= 0; i--) {
		const sizeVariant = srcsetVariants[i];
		if (sizeVariant.width === previousWidth) srcsetVariants.splice(i, 1);
		previousWidth = sizeVariant.width;
	}
}
//#endregion
//#region node_modules/@nuxt/image/dist/runtime/utils/provider.js
function defineProvider(setup) {
	let result;
	return () => {
		if (result) return result;
		result = typeof setup === "function" ? setup() : setup;
		return result;
	};
}
//#endregion
//#region node_modules/@nuxt/image/dist/runtime/providers/ipx.js
var operationsGenerator = createOperationsGenerator({
	keyMap: {
		format: "f",
		width: "w",
		height: "h",
		resize: "s",
		quality: "q",
		background: "b",
		position: "pos"
	},
	formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val.toString())
});
var ipx_default = defineProvider({
	validateDomains: true,
	supportsAlias: true,
	getImage: (src, { modifiers, baseURL }, ctx) => {
		if (modifiers.width && modifiers.height) {
			modifiers.resize = `${modifiers.width}x${modifiers.height}`;
			delete modifiers.width;
			delete modifiers.height;
		}
		const params = operationsGenerator(modifiers) || "_";
		if (!baseURL) baseURL = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
		return { url: joinURL(baseURL, params, encodePath(src)) };
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fimage-options.mjs
var imageOptions = {
	screens: {
		"sm": 640,
		"md": 768,
		"lg": 1024,
		"xl": 1280,
		"2xl": 1536
	},
	presets: {},
	domains: [],
	alias: {},
	densities: [1, 2],
	format: ["avif", "webp"],
	quality: 80,
	/** @type {"ipx"} */
	provider: "ipx",
	providers: { ["ipx"]: {
		setup: ipx_default,
		defaults: {}
	} }
};
//#endregion
//#region node_modules/@nuxt/image/dist/runtime/composables.js
var useImage = (event) => {
	const config = useRuntimeConfig();
	const nuxtApp = useNuxtApp();
	return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
		...imageOptions,
		event: nuxtApp.ssrContext?.event,
		nuxt: { baseURL: config.app.baseURL },
		runtimeConfig: config
	}));
};
//#endregion
//#region node_modules/@nuxt/image/dist/runtime/utils/props.js
var useImageProps = (props) => {
	const $img = useImage();
	return {
		providerOptions: computed(() => ({
			provider: props.provider,
			preset: props.preset
		})),
		normalizedAttrs: computed(() => ({
			width: parseSize(props.width),
			height: parseSize(props.height),
			crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
			nonce: props.nonce
		})),
		imageModifiers: computed(() => {
			return {
				...props.modifiers,
				width: props.width,
				height: props.height,
				format: props.format,
				quality: props.quality || $img.options.quality,
				background: props.background,
				fit: props.fit
			};
		})
	};
};
//#endregion
//#region node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue
var _sfc_main$16 = {
	__name: "NuxtImg",
	__ssrInlineRender: true,
	props: {
		custom: {
			type: Boolean,
			required: false
		},
		placeholder: {
			type: [
				Boolean,
				String,
				Number,
				Array
			],
			required: false
		},
		placeholderClass: {
			type: String,
			required: false
		},
		src: {
			type: String,
			required: false
		},
		format: {
			type: String,
			required: false
		},
		quality: {
			type: [String, Number],
			required: false
		},
		background: {
			type: String,
			required: false
		},
		fit: {
			type: String,
			required: false
		},
		modifiers: {
			type: Object,
			required: false
		},
		preset: {
			type: String,
			required: false
		},
		provider: {
			type: null,
			required: false
		},
		sizes: {
			type: [String, Object],
			required: false
		},
		densities: {
			type: String,
			required: false
		},
		preload: {
			type: [Boolean, Object],
			required: false
		},
		width: {
			type: [String, Number],
			required: false
		},
		height: {
			type: [String, Number],
			required: false
		},
		crossorigin: {
			type: [String, Boolean],
			required: false
		},
		nonce: {
			type: String,
			required: false
		}
	},
	emits: ["load", "error"],
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const $img = useImage();
		const { providerOptions, normalizedAttrs, imageModifiers } = useImageProps(props);
		const sizes = computed(() => $img.getSizes(props.src, {
			...providerOptions.value,
			sizes: props.sizes,
			densities: props.densities,
			modifiers: imageModifiers.value
		}));
		const placeholderLoaded = ref(false);
		const attrs = useAttrs();
		const imgAttrs = computed(() => ({
			...normalizedAttrs.value,
			"data-nuxt-img": "",
			...!props.placeholder || placeholderLoaded.value ? {
				sizes: sizes.value.sizes,
				srcset: sizes.value.srcset
			} : {},
			onerror: "this.setAttribute('data-error', 1)",
			...attrs
		}));
		const placeholder = computed(() => {
			if (placeholderLoaded.value) return false;
			const placeholder2 = props.placeholder === "" ? [10, 10] : props.placeholder;
			if (!placeholder2) return false;
			if (typeof placeholder2 === "string") return placeholder2;
			const [width = 10, height = width, quality = 50, blur = 3] = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2] : [];
			return $img(props.src, {
				...imageModifiers.value,
				width,
				height,
				quality,
				blur
			}, providerOptions.value);
		});
		const mainSrc = computed(() => props.sizes ? sizes.value.src : $img(props.src, imageModifiers.value, providerOptions.value));
		const src = computed(() => placeholder.value || mainSrc.value);
		if (props.preload) {
			const isResponsive = sizes.value.srcset.includes("x, ") || !!sizes.value.sizes;
			useHead({ link: [{
				rel: "preload",
				as: "image",
				nonce: props.nonce,
				crossorigin: normalizedAttrs.value.crossorigin,
				href: isResponsive ? sizes.value.src : src.value,
				...sizes.value.sizes && { imagesizes: sizes.value.sizes },
				...isResponsive && { imagesrcset: sizes.value.srcset },
				...typeof props.preload !== "boolean" && props.preload.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
			}] });
		}
		useNuxtApp().isHydrating;
		const imgEl = useTemplateRef("imgEl");
		__expose({ imgEl });
		return (_ctx, _push, _parent, _attrs) => {
			if (!__props.custom) _push(`<img${ssrRenderAttrs(mergeProps({
				ref_key: "imgEl",
				ref: imgEl,
				class: placeholder.value ? __props.placeholderClass : void 0
			}, imgAttrs.value, { src: src.value }, _attrs))}>`);
			else ssrRenderSlot(_ctx.$slots, "default", {
				imgAttrs: imgAttrs.value,
				isLoaded: placeholderLoaded.value,
				src: src.value
			}, null, _push, _parent);
		};
	}
};
var _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue");
	return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
defineComponent({
	name: "ServerPlaceholder",
	render() {
		return createElementBlock("div");
	}
});
//#endregion
//#region node_modules/nuxt/dist/app/components/client-only.js
var clientOnlySymbol = Symbol.for("nuxt:client-only");
var ClientOnly = defineComponent({
	name: "ClientOnly",
	inheritAttrs: false,
	props: [
		"fallback",
		"placeholder",
		"placeholderTag",
		"fallbackTag"
	],
	setup(props, { slots, attrs }) {
		const mounted = shallowRef(false);
		const vm = getCurrentInstance();
		if (vm) vm._nuxtClientOnly = true;
		provide(clientOnlySymbol, true);
		return () => {
			if (mounted.value) {
				const vnodes = slots.default?.();
				if (vnodes && vnodes.length === 1 && true) return [cloneVNode(vnodes[0], attrs)];
				return vnodes;
			}
			const slot = slots.fallback || slots.placeholder;
			if (slot) return h(slot);
			const fallbackStr = props.fallback || props.placeholder || "";
			const fallbackTag = sanitizeTag(props.fallbackTag || props.placeholderTag, "span");
			return createElementBlock(fallbackTag, attrs, fallbackStr);
		};
	}
});
//#endregion
//#region node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue
var _sfc_main$15 = /*@__PURE__*/ Object.assign({ inheritAttrs: false }, {
	__name: "NuxtPicture",
	__ssrInlineRender: true,
	props: {
		legacyFormat: {
			type: String,
			required: false
		},
		imgAttrs: {
			type: Object,
			required: false
		},
		src: {
			type: String,
			required: false
		},
		format: {
			type: String,
			required: false
		},
		quality: {
			type: [String, Number],
			required: false
		},
		background: {
			type: String,
			required: false
		},
		fit: {
			type: String,
			required: false
		},
		modifiers: {
			type: Object,
			required: false
		},
		preset: {
			type: String,
			required: false
		},
		provider: {
			type: null,
			required: false
		},
		sizes: {
			type: [String, Object],
			required: false
		},
		densities: {
			type: String,
			required: false
		},
		preload: {
			type: [Boolean, Object],
			required: false
		},
		width: {
			type: [String, Number],
			required: false
		},
		height: {
			type: [String, Number],
			required: false
		},
		crossorigin: {
			type: [String, Boolean],
			required: false
		},
		nonce: {
			type: String,
			required: false
		}
	},
	emits: ["load", "error"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const _attrs = useAttrs();
		const imageAttrNames = /* @__PURE__ */ new Set([
			"alt",
			"referrerpolicy",
			"usemap",
			"longdesc",
			"ismap",
			"loading",
			"crossorigin",
			"decoding",
			"nonce"
		]);
		const attrs = computed(() => {
			const attrs2 = {
				img: {
					...normalizedAttrs.value,
					...props.imgAttrs,
					onerror: "this.setAttribute('data-error', 1)",
					"data-nuxt-pic": ""
				},
				picture: {}
			};
			for (const key in _attrs) if (imageAttrNames.has(key)) {
				if (!(key in attrs2.img)) attrs2.img[key] = _attrs[key];
			} else attrs2.picture[key] = _attrs[key];
			return attrs2;
		});
		const originalFormat = computed(() => props.src?.match(/^[^?#]+\.(\w+)(?:$|[?#])/)?.[1]);
		const legacyFormat = computed(() => {
			if (props.legacyFormat) return props.legacyFormat;
			return !originalFormat.value || ![
				"png",
				"webp",
				"gif",
				"svg"
			].includes(originalFormat.value) ? "jpeg" : "png";
		});
		const $img = useImage();
		const { providerOptions, imageModifiers, normalizedAttrs } = useImageProps(props);
		const sources = computed(() => {
			const formats = props.format?.split(",") || (originalFormat.value === "svg" ? ["svg"] : $img.options.format?.length ? [...$img.options.format] : ["webp"]);
			if (formats[0] === "svg") return [{ src: props.src }];
			if (!formats.includes(legacyFormat.value)) formats.push(legacyFormat.value);
			else {
				formats.splice(formats.indexOf(legacyFormat.value), 1);
				formats.push(legacyFormat.value);
			}
			return formats.map((format) => {
				const { srcset, sizes, src } = $img.getSizes(props.src, {
					...providerOptions.value,
					sizes: props.sizes || $img.options.screens,
					densities: props.densities,
					modifiers: {
						...imageModifiers.value,
						format
					}
				});
				return {
					src,
					type: `image/${format}`,
					sizes,
					srcset
				};
			});
		});
		if (props.preload) useHead({ link: () => {
			const firstSource = sources.value[0];
			if (!firstSource?.srcset) return [];
			return [{
				rel: "preload",
				as: "image",
				imagesrcset: firstSource.srcset,
				nonce: props.nonce,
				...firstSource.sizes ? { imagesizes: firstSource.sizes } : {},
				...typeof props.preload !== "boolean" && props.preload?.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
			}];
		} });
		useNuxtApp().isHydrating;
		const imgEl = useTemplateRef("imgEl");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<picture${ssrRenderAttrs(mergeProps(attrs.value.picture, _attrs))}><!--[-->`);
			ssrRenderList(sources.value, (source, index) => {
				_push(`<!--[-->`);
				if (index + 1 < sources.value.length) _push(`<source${ssrRenderAttr("type", source.type)}${ssrRenderAttr("sizes", source.sizes)}${ssrRenderAttr("srcset", source.srcset)}>`);
				else _push(`<img${ssrRenderAttrs(mergeProps({
					ref_for: true,
					ref_key: "imgEl",
					ref: imgEl,
					key: "last" + source.src
				}, { ref_for: true }, attrs.value.img, {
					src: source.src,
					sizes: source.sizes,
					srcset: source.srcset
				}))}>`);
				_push(`<!--]-->`);
			});
			_push(`<!--]--></picture>`);
		};
	}
});
var _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue");
	return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
//#endregion
//#region app/data/education.js
var education = [
	{
		title: "Machine Learning Specialization",
		period: "In progress",
		detail: "Data management & training",
		current: true
	},
	{
		title: "Web Application Development",
		period: "2024–2026",
		detail: "I.E.S. Zaidín Vergeles"
	},
	{
		title: "Microcomputer Systems & Networks",
		period: "2022–2024",
		detail: "I.E.S. Politécnico Hermenegildo Lanz"
	}
];
//#endregion
//#region app/components/EducationTimeline.vue
var _sfc_main$14 = {
	__name: "EducationTimeline",
	__ssrInlineRender: true,
	setup(__props) {
		const element = ref(null);
		const visible = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			const _directive_reveal = resolveDirective("reveal");
			_push(`<ol${ssrRenderAttrs(mergeProps({
				ref_key: "element",
				ref: element,
				class: ["education-timeline", { "is-visible": visible.value }]
			}, _attrs))} data-v-9bab3429><!--[-->`);
			ssrRenderList(unref(education), (item, index) => {
				_push(`<li${ssrRenderAttrs(mergeProps({
					key: item.title,
					class: { "is-current": item.current }
				}, ssrGetDirectiveProps(_ctx, _directive_reveal, { delay: index * 100 })))} data-v-9bab3429><span class="timeline-point" aria-hidden="true" data-v-9bab3429></span><strong data-v-9bab3429>${ssrInterpolate(item.title)}</strong>`);
				if (item.current) _push(`<span class="timeline-detail" data-v-9bab3429><span class="timeline-period" data-v-9bab3429>${ssrInterpolate(item.period)}</span> · ${ssrInterpolate(item.detail)}</span>`);
				else _push(`<span class="timeline-detail" data-v-9bab3429>${ssrInterpolate(item.detail)} · <span class="timeline-period" data-v-9bab3429>${ssrInterpolate(item.period)}</span></span>`);
				_push(`</li>`);
			});
			_push(`<!--]--></ol>`);
		};
	}
};
var _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EducationTimeline.vue");
	return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
var EducationTimeline_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$14, [["__scopeId", "data-v-9bab3429"]]);
//#endregion
//#region app/data/projects.js
var projects = [
	{
		number: "01",
		name: "CIS Benchmark Automation",
		category: "PRIVATE CLOUD · KYNDRYL GRANADA",
		year: "FEB–MAY 2026",
		description: "Automated auditing and remediation for 356 Windows Server 2025 controls with Ansible, reaching 99% compliance.",
		theme: "cloud-work",
		mark: "99%"
	},
	{
		number: "02",
		name: "Web Maintenance",
		category: "WORDPRESS · ACADEMIA 10",
		year: "MAR–OCT 2025",
		description: "Maintained and regularly optimized the organization’s WordPress website to keep it in good working order.",
		theme: "web-work",
		mark: "W"
	},
	{
		number: "03",
		name: "Web Development Internship",
		category: "WEB DEVELOPMENT · UGR CIENCIAS DE LA EDUCACIÓN",
		year: "MAR–JUN 2024",
		description: "Web development internship at UGR Ciencias de la Educación.",
		theme: "internship-work",
		mark: "UGR"
	}
];
//#endregion
//#region app/components/ui/CountUp.vue
var _sfc_main$13 = {
	__name: "CountUp",
	__ssrInlineRender: true,
	props: {
		to: {
			type: Number,
			required: true
		},
		suffix: {
			type: String,
			default: ""
		},
		duration: {
			type: Number,
			default: 1400
		}
	},
	setup(__props) {
		const props = __props;
		const element = ref(null);
		const value = ref(props.to);
		useAppReady();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({
				ref_key: "element",
				ref: element
			}, _attrs))}>${ssrInterpolate(value.value)}${ssrInterpolate(__props.suffix)}</span>`);
		};
	}
};
var _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/CountUp.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
//#endregion
//#region app/components/ui/ProgressRing.vue
var _sfc_main$12 = {
	__name: "ProgressRing",
	__ssrInlineRender: true,
	props: { value: {
		type: Number,
		required: true
	} },
	setup(__props) {
		const element = ref(null);
		const progress = ref(0);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "element",
				ref: element,
				class: "progress-ring",
				style: { "--progress": progress.value }
			}, _attrs))} data-v-786ba748><svg viewBox="0 0 100 100" aria-hidden="true" data-v-786ba748><circle class="ring-track" cx="50" cy="50" r="42" data-v-786ba748></circle><circle class="ring-value" cx="50" cy="50" r="42" style="${ssrRenderStyle({ strokeDashoffset: 264 - 264 * progress.value / 100 })}" data-v-786ba748></circle></svg><div class="ring-content" data-v-786ba748>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></div>`);
		};
	}
};
var _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ProgressRing.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
var ProgressRing_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$12, [["__scopeId", "data-v-786ba748"]]);
//#endregion
//#region app/data/skills.js
var skillCategories = [
	{
		id: "cloud",
		label: "Cloud & Systems"
	},
	{
		id: "data",
		label: "Data & ML"
	},
	{
		id: "web",
		label: "Web & Dev"
	},
	{
		id: "network",
		label: "Networking"
	}
];
var skills = [
	{
		id: "vmware",
		name: "VMware vSphere",
		category: "cloud",
		icon: {
			kind: "brand",
			data: siVmware
		},
		usedIn: "Private cloud · Kyndryl Granada"
	},
	{
		id: "ansible",
		name: "Ansible",
		category: "cloud",
		icon: {
			kind: "brand",
			data: siAnsible
		},
		usedIn: "CIS Benchmark Automation"
	},
	{
		id: "windows-server",
		name: "Windows Server",
		category: "cloud",
		icon: {
			kind: "lucide",
			component: Server
		},
		usedIn: "CIS Benchmark Automation"
	},
	{
		id: "linux",
		name: "Linux",
		category: "cloud",
		icon: {
			kind: "brand",
			data: siLinux
		}
	},
	{
		id: "powershell",
		name: "PowerShell",
		category: "cloud",
		icon: {
			kind: "lucide",
			component: Terminal
		}
	},
	{
		id: "vercel",
		name: "Vercel",
		category: "cloud",
		icon: {
			kind: "brand",
			data: siVercel
		}
	},
	{
		id: "aws",
		name: "AWS",
		category: "cloud",
		icon: {
			kind: "lucide",
			component: Cloud
		}
	},
	{
		id: "python",
		name: "Python",
		category: "data",
		icon: {
			kind: "brand",
			data: siPython
		}
	},
	{
		id: "sql",
		name: "SQL",
		category: "data",
		icon: {
			kind: "lucide",
			component: Database
		}
	},
	{
		id: "machine-learning",
		name: "Machine Learning",
		category: "data",
		icon: {
			kind: "lucide",
			component: Brain
		},
		status: "in-progress"
	},
	{
		id: "pandas",
		name: "Pandas",
		category: "data",
		icon: {
			kind: "brand",
			data: siPandas
		}
	},
	{
		id: "pymath",
		name: "PyMath",
		category: "data",
		icon: {
			kind: "lucide",
			component: Sigma
		}
	},
	{
		id: "git",
		name: "Git",
		category: "web",
		icon: {
			kind: "brand",
			data: siGit
		}
	},
	{
		id: "html-css-js",
		name: "HTML / CSS / JS",
		category: "web",
		icon: {
			kind: "multi",
			items: [
				siHtml5,
				siCss,
				siJavascript
			]
		}
	},
	{
		id: "wordpress",
		name: "WordPress",
		category: "web",
		icon: {
			kind: "brand",
			data: siWordpress
		},
		usedIn: "Web Maintenance · Academia 10"
	},
	{
		id: "vue",
		name: "Vue",
		category: "web",
		icon: {
			kind: "brand",
			data: siVuedotjs
		}
	},
	{
		id: "tcp-ip",
		name: "TCP/IP",
		category: "network",
		icon: {
			kind: "lucide",
			component: Network
		}
	}
];
//#endregion
//#region app/components/ui/StatsStrip.vue
var _sfc_main$11 = {
	__name: "StatsStrip",
	__ssrInlineRender: true,
	setup(__props) {
		const stats = [
			{
				to: 356,
				suffix: "",
				label: "CIS CONTROLS AUDITED"
			},
			{
				to: 99,
				suffix: "%",
				label: "COMPLIANCE ON WINDOWS SERVER 2025"
			},
			{
				to: skills.length,
				suffix: "",
				label: "TECHNOLOGIES"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _directive_reveal = resolveDirective("reveal");
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "stats-strip" }, _attrs))} data-v-3b10dcf3><!--[-->`);
			ssrRenderList(stats, (stat, index) => {
				_push(`<div${ssrRenderAttrs(mergeProps({
					key: stat.label,
					class: "stat-item"
				}, ssrGetDirectiveProps(_ctx, _directive_reveal, { delay: index * 100 })))} data-v-3b10dcf3><strong data-v-3b10dcf3>`);
				_push(ssrRenderComponent(_sfc_main$13, {
					to: stat.to,
					suffix: stat.suffix
				}, null, _parent));
				_push(`</strong><span data-v-3b10dcf3>${ssrInterpolate(stat.label)}</span></div>`);
			});
			_push(`<!--]--></div>`);
		};
	}
};
var _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/StatsStrip.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var StatsStrip_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$11, [["__scopeId", "data-v-3b10dcf3"]]);
//#endregion
//#region app/components/ProjectGrid.vue
var _sfc_main$10 = {
	__name: "ProjectGrid",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _directive_reveal = resolveDirective("reveal");
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "work",
				class: "work-section wrap",
				"aria-labelledby": "work-title"
			}, _attrs))}><div class="section-topline"><p class="eyebrow">01 / EXPERIENCE</p><span>CLOUD <span class="topline-dot">✳</span> SYSTEMS <span class="topline-dot">✳</span> DATA</span></div><div${ssrRenderAttrs(mergeProps({ class: "work-heading" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))}><h2 id="work-title">Experience in cloud.<br><span class="serif-accent">A growing focus on data.</span></h2><p>Infrastructure, automation<br>and web maintenance.</p></div>`);
			_push(ssrRenderComponent(StatsStrip_default, null, null, _parent));
			_push(`<div class="project-grid"><!--[-->`);
			ssrRenderList(unref(projects), (project, index) => {
				_push(`<div${ssrRenderAttrs(mergeProps({
					key: project.number,
					class: ["project-reveal", index % 2 ? "reveal-right" : "reveal-left"]
				}, ssrGetDirectiveProps(_ctx, _directive_reveal)))}><article class="${ssrRenderClass([project.theme, "project-card"])}"><div class="project-art" aria-hidden="true">`);
				if (project.number === "01") _push(ssrRenderComponent(ProgressRing_default, { value: 99 }, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<span class="project-mark"${_scopeId}>`);
							_push(ssrRenderComponent(_sfc_main$13, {
								to: 99,
								suffix: "%"
							}, null, _parent, _scopeId));
							_push(`</span>`);
						} else return [createVNode("span", { class: "project-mark" }, [createVNode(_sfc_main$13, {
							to: 99,
							suffix: "%"
						})])];
					}),
					_: 2
				}, _parent));
				else if (project.number === "02") {
					_push(`<div class="browser-window"><div class="browser-toolbar"><i></i><i></i><i></i></div><div class="browser-lines"><!--[-->`);
					ssrRenderList(4, (line) => {
						_push(`<span></span>`);
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<span class="project-mark internship-mark">${ssrInterpolate(project.mark)}</span>`);
				_push(`<span class="art-orbit orbit-one"></span><span class="art-orbit orbit-two"></span><span class="art-object"></span><span class="art-label">EXPERIENCE / ${ssrInterpolate(project.number)}</span></div><div class="project-info"><div><span class="eyebrow">${ssrInterpolate(project.category)}</span><h3>${ssrInterpolate(project.name)}</h3><p>${ssrInterpolate(project.description)}</p></div><span class="project-year">${ssrInterpolate(project.year)}</span></div></article></div>`);
			});
			_push(`<!--]--></div></section>`);
		};
	}
};
var _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProjectGrid.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
//#endregion
//#region app/components/SkillIcon.vue
var _sfc_main$9 = {
	__name: "SkillIcon",
	__ssrInlineRender: true,
	props: { icon: {
		type: Object,
		required: true
	} },
	setup(__props) {
		const props = __props;
		const brand = computed(() => props.icon.kind === "brand" ? `#${props.icon.data.hex}` : "currentColor");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({
				class: "skill-icon",
				style: { "--brand": brand.value }
			}, _attrs))} data-v-529d810d>`);
			if (__props.icon.kind === "brand") _push(`<svg viewBox="0 0 24 24" role="img"${ssrRenderAttr("aria-label", __props.icon.data.title)} focusable="false" data-v-529d810d><path${ssrRenderAttr("d", __props.icon.data.path)} fill="currentColor" data-v-529d810d></path></svg>`);
			else if (__props.icon.kind === "multi") {
				_push(`<span class="skill-icon-multi" data-v-529d810d><!--[-->`);
				ssrRenderList(__props.icon.items, (item) => {
					_push(`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" data-v-529d810d><path${ssrRenderAttr("d", item.path)} fill="currentColor" data-v-529d810d></path></svg>`);
				});
				_push(`<!--]--></span>`);
			} else ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon.component), {
				size: 28,
				"stroke-width": 1.7,
				"aria-hidden": "true"
			}, null), _parent);
			_push(`</span>`);
		};
	}
};
var _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SkillIcon.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var SkillIcon_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$9, [["__scopeId", "data-v-529d810d"]]);
//#endregion
//#region app/components/ui/SpotlightCard.vue
var _sfc_main$8 = {
	__name: "SpotlightCard",
	__ssrInlineRender: true,
	setup(__props) {
		const card = ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "card",
				ref: card,
				class: "spotlight-card"
			}, _attrs))} data-v-d4c42689>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
};
var _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/SpotlightCard.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var SpotlightCard_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$8, [["__scopeId", "data-v-d4c42689"]]);
//#endregion
//#region app/components/SkillCard.vue
var _sfc_main$7 = {
	__name: "SkillCard",
	__ssrInlineRender: true,
	props: { skill: {
		type: Object,
		required: true
	} },
	setup(__props) {
		const props = __props;
		const categoryLabels = {
			cloud: "CLOUD & SYSTEMS",
			data: "DATA & ML",
			web: "WEB & DEV",
			network: "NETWORKING"
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(SpotlightCard_default, mergeProps({ class: "skill-spotlight" }, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<article class="skill-card" style="${ssrRenderStyle({ "--brand": props.skill.icon.kind === "brand" ? `#${props.skill.icon.data?.hex}` : "var(--green)" })}" data-v-caaa686d${_scopeId}><div class="skill-tile" data-v-caaa686d${_scopeId}>`);
						_push(ssrRenderComponent(SkillIcon_default, { icon: __props.skill.icon }, null, _parent, _scopeId));
						_push(`</div><span class="skill-category" data-v-caaa686d${_scopeId}>${ssrInterpolate(categoryLabels[__props.skill.category])}</span><h3 data-v-caaa686d${_scopeId}>${ssrInterpolate(__props.skill.name)}</h3>`);
						if (__props.skill.usedIn) _push(`<p class="skill-used-in" data-v-caaa686d${_scopeId}>${ssrInterpolate(__props.skill.usedIn)}</p>`);
						else _push(`<!---->`);
						if (__props.skill.status === "in-progress") _push(`<span class="skill-status" data-v-caaa686d${_scopeId}>IN PROGRESS</span>`);
						else _push(`<!---->`);
						_push(`</article>`);
					} else return [createVNode("article", {
						class: "skill-card",
						style: { "--brand": props.skill.icon.kind === "brand" ? `#${props.skill.icon.data?.hex}` : "var(--green)" }
					}, [
						createVNode("div", { class: "skill-tile" }, [createVNode(SkillIcon_default, { icon: __props.skill.icon }, null, 8, ["icon"])]),
						createVNode("span", { class: "skill-category" }, toDisplayString(categoryLabels[__props.skill.category]), 1),
						createVNode("h3", null, toDisplayString(__props.skill.name), 1),
						__props.skill.usedIn ? (openBlock(), createBlock("p", {
							key: 0,
							class: "skill-used-in"
						}, toDisplayString(__props.skill.usedIn), 1)) : createCommentVNode("", true),
						__props.skill.status === "in-progress" ? (openBlock(), createBlock("span", {
							key: 1,
							class: "skill-status"
						}, "IN PROGRESS")) : createCommentVNode("", true)
					], 4)];
				}),
				_: 1
			}, _parent));
		};
	}
};
var _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SkillCard.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var SkillCard_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$7, [["__scopeId", "data-v-caaa686d"]]);
//#endregion
//#region app/components/SkillsSection.vue
var _sfc_main$6 = {
	__name: "SkillsSection",
	__ssrInlineRender: true,
	setup(__props) {
		const activeCategory = ref("all");
		const filters = computed(() => [{
			id: "all",
			label: "All",
			count: skills.length
		}, ...skillCategories.map((category) => ({
			...category,
			count: skills.filter((skill) => skill.category === category.id).length
		}))]);
		const filteredSkills = computed(() => activeCategory.value === "all" ? skills : skills.filter((skill) => skill.category === activeCategory.value));
		return (_ctx, _push, _parent, _attrs) => {
			const _directive_reveal = resolveDirective("reveal");
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "skills",
				class: "skills-section wrap",
				"aria-labelledby": "skills-title"
			}, _attrs))} data-v-06fb572b><div class="section-topline" data-v-06fb572b><p class="eyebrow" data-v-06fb572b>02 / SKILLS</p><span data-v-06fb572b>TOOLS <span class="topline-dot" data-v-06fb572b>✳</span> SYSTEMS <span class="topline-dot" data-v-06fb572b>✳</span> DATA</span></div><div${ssrRenderAttrs(mergeProps({ class: "skills-heading" }, ssrGetDirectiveProps(_ctx, _directive_reveal, void 0, void 0, { fade: true })))} data-v-06fb572b><h2 id="skills-title" data-v-06fb572b>Tools I work with.<br data-v-06fb572b><span class="serif-accent" data-v-06fb572b>Always sharpening.</span></h2><p data-v-06fb572b>Grouped by what I use them for.</p></div><div class="skill-filters" role="group" aria-label="Filter skills by category" data-v-06fb572b><!--[-->`);
			ssrRenderList(filters.value, (filter) => {
				_push(`<button type="button"${ssrRenderAttr("aria-pressed", activeCategory.value === filter.id)} class="${ssrRenderClass({ "is-active": activeCategory.value === filter.id })}" data-v-06fb572b>${ssrInterpolate(filter.label)}<span data-v-06fb572b>${ssrInterpolate(filter.count)}</span></button>`);
			});
			_push(`<!--]--></div><div${ssrRenderAttrs(mergeProps({
				name: "skill-list",
				class: "skill-list"
			}, ssrGetDirectiveProps(_ctx, _directive_reveal, void 0, void 0, { zoom: true })))} data-v-06fb572b>`);
			ssrRenderList(filteredSkills.value, (skill) => {
				_push(ssrRenderComponent(SkillCard_default, {
					key: skill.id,
					skill
				}, null, _parent));
			});
			_push(`</div><p class="skills-count" data-v-06fb572b>${ssrInterpolate(unref(skills).length)} TECHNOLOGIES · ${ssrInterpolate(unref(skillCategories).length)} AREAS</p></section>`);
		};
	}
};
var _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SkillsSection.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var SkillsSection_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$6, [["__scopeId", "data-v-06fb572b"]]);
//#endregion
//#region app/components/ContactSection.vue
var emailAddress = "asuadur14@gmail.com";
var _sfc_main$5 = {
	__name: "ContactSection",
	__ssrInlineRender: true,
	setup(__props) {
		const message = ref("");
		const mailtoLink = computed(() => {
			return `mailto:${emailAddress}?subject=${encodeURIComponent("Hello from your portfolio")}&body=${encodeURIComponent(message.value.trim())}`;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _directive_reveal = resolveDirective("reveal");
			const _directive_magnetic = resolveDirective("magnetic");
			_push(`<section${ssrRenderAttrs(mergeProps({
				id: "contact",
				class: "contact-section"
			}, _attrs))}><div class="contact-inner wrap"><div${ssrRenderAttrs(mergeProps({ class: "contact-copy" }, ssrGetDirectiveProps(_ctx, _directive_reveal, void 0, void 0, { fade: true })))}><p class="eyebrow">04 / YOUR TURN</p><h2>Let’s make systems<br><span class="serif-accent">work better.</span></h2><p>For opportunities in cloud infrastructure, systems administration or web development, get in touch.</p><a class="email-link"${ssrRenderAttr("href", `mailto:${emailAddress}`)}>${ssrInterpolate(emailAddress)} `);
			_push(ssrRenderComponent(unref(ArrowUpRight), { size: 16 }, null, _parent));
			_push(`</a><a class="contact-detail" href="tel:+34644706491">+34 644 70 64 91</a><a class="contact-detail" href="https://www.linkedin.com/in/alejandro-su%C3%A1rez-dur%C3%A1n-a21151405" target="_blank" rel="noreferrer">LinkedIn profile `);
			_push(ssrRenderComponent(unref(ArrowUpRight), { size: 14 }, null, _parent));
			_push(`</a></div><form${ssrRenderAttrs(mergeProps({ class: "message-form" }, ssrGetDirectiveProps(_ctx, _directive_reveal, void 0, void 0, { left: true })))}><label for="message">A NOTE, A QUESTION, A HELLO</label><textarea id="message" name="message" rows="5" placeholder="Start wherever you like...">${ssrInterpolate(message.value)}</textarea><a${ssrRenderAttrs(mergeProps({
				class: "send-button",
				href: mailtoLink.value
			}, ssrGetDirectiveProps(_ctx, _directive_magnetic)))}><span>Open in your email app</span>`);
			_push(ssrRenderComponent(unref(Send), { size: 16 }, null, _parent));
			_push(`</a><p class="form-note">Your message opens in your email app, ready to send.</p><p class="form-note">I only use your details to reply to you. See the `);
			_push(ssrRenderComponent(_component_NuxtLink, { to: "/privacy-policy" }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Privacy Policy`);
					else return [createTextVNode("Privacy Policy")];
				}),
				_: 1
			}, _parent));
			_push(`.</p></form></div></section>`);
		};
	}
};
var _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ContactSection.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
//#endregion
//#region app/components/ui/MarqueeStrip.vue
var _sfc_main$4 = {
	__name: "MarqueeStrip",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "marquee-strip",
				"aria-label": "Technologies"
			}, _attrs))} data-v-e0d5bf84><div class="marquee-track" data-v-e0d5bf84><div class="marquee-group" data-v-e0d5bf84><!--[-->`);
			ssrRenderList(unref(skills), (skill) => {
				_push(`<span data-v-e0d5bf84>${ssrInterpolate(skill.name)} <i data-v-e0d5bf84>✳</i></span>`);
			});
			_push(`<!--]--></div><div class="marquee-group" aria-hidden="true" data-v-e0d5bf84><!--[-->`);
			ssrRenderList(unref(skills), (skill) => {
				_push(`<span data-v-e0d5bf84>${ssrInterpolate(skill.name)} <i data-v-e0d5bf84>✳</i></span>`);
			});
			_push(`<!--]--></div></div></div>`);
		};
	}
};
var _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/MarqueeStrip.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var MarqueeStrip_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$4, [["__scopeId", "data-v-e0d5bf84"]]);
//#endregion
//#region app/components/ui/SignalStage.vue
var _sfc_main$3 = {
	__name: "SignalStage",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ClientOnly = ClientOnly;
			const _directive_reveal = resolveDirective("reveal");
			_push(`<section${ssrRenderAttrs(mergeProps({
				class: "signal-stage",
				"aria-label": "Interactive network visualization"
			}, _attrs))} data-v-d2a48973>`);
			_push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "signal-content wrap" }, ssrGetDirectiveProps(_ctx, _directive_reveal)))} data-v-d2a48973><div class="signal-topline" data-v-d2a48973><span data-v-d2a48973>DATA SIGNAL</span><span data-v-d2a48973>VMWARE VSPHERE · ANSIBLE</span></div><div class="signal-flow" data-v-d2a48973><span data-v-d2a48973>PRIVATE CLOUD</span><span class="signal-track" data-v-d2a48973><i data-v-d2a48973></i></span><span data-v-d2a48973>MACHINE LEARNING</span></div></div></section>`);
		};
	}
};
var _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/SignalStage.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var SignalStage_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$3, [["__scopeId", "data-v-d2a48973"]]);
//#endregion
//#region app/components/ui/TypewriterText.vue
var _sfc_main$2 = {
	__name: "TypewriterText",
	__ssrInlineRender: true,
	props: { phrases: {
		type: Array,
		required: true
	} },
	setup(__props) {
		const props = __props;
		useAppReady();
		const text = ref(props.phrases[0] ?? "");
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({ class: "typewriter" }, _attrs))} data-v-32af868f><span class="sr-only" data-v-32af868f>${ssrInterpolate(__props.phrases.join(", "))}</span><span aria-hidden="true" class="typewriter-visible" data-v-32af868f>${ssrInterpolate(text.value)}</span></span>`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/TypewriterText.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var TypewriterText_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$2, [["__scopeId", "data-v-32af868f"]]);
//#endregion
//#region app/components/ui/LanguageMeter.vue
var _sfc_main$1 = {
	__name: "LanguageMeter",
	__ssrInlineRender: true,
	setup(__props) {
		const element = ref(null);
		const visible = ref(false);
		const languages = [{
			name: "Spanish",
			level: "Native",
			score: 6
		}, {
			name: "English",
			level: "B2",
			score: 4
		}];
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				ref_key: "element",
				ref: element,
				class: ["language-meter", { "is-visible": visible.value }]
			}, _attrs))} data-v-fc26d5f4><!--[-->`);
			ssrRenderList(languages, (language) => {
				_push(`<div class="language-row" role="meter"${ssrRenderAttr("aria-label", `${language.name}: ${language.level}`)}${ssrRenderAttr("aria-valuemin", 0)}${ssrRenderAttr("aria-valuemax", 6)}${ssrRenderAttr("aria-valuenow", language.score)} data-v-fc26d5f4><div class="language-label" data-v-fc26d5f4><strong data-v-fc26d5f4>${ssrInterpolate(language.name)}</strong><span data-v-fc26d5f4>${ssrInterpolate(language.level)}</span></div><div class="language-segments" aria-hidden="true" data-v-fc26d5f4><!--[-->`);
				ssrRenderList(6, (segment) => {
					_push(`<span class="${ssrRenderClass({ filled: segment <= language.score })}" style="${ssrRenderStyle({ "--segment-index": segment - 1 })}" data-v-fc26d5f4></span>`);
				});
				_push(`<!--]--></div></div>`);
			});
			_push(`<!--]--></div>`);
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/LanguageMeter.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var LanguageMeter_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$1, [["__scopeId", "data-v-fc26d5f4"]]);
//#endregion
//#region app/pages/index.vue
var _sfc_main = {
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const heroImageLoaded = useState("heroImageLoaded", () => false);
		function markHeroImageLoaded() {
			heroImageLoaded.value = true;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_NuxtImg = _sfc_main$16;
			const _component_ClientOnly = ClientOnly;
			const _component_NuxtPicture = _sfc_main$15;
			const _directive_reveal = resolveDirective("reveal");
			_push(`<main${ssrRenderAttrs(_attrs)}><section id="home" class="hero wrap" aria-labelledby="hero-title"><div class="hero-copy panel"><p class="eyebrow"><span class="status-dot"></span> MACHINE LEARNING <span class="eyebrow-divider">/</span> DATA <span class="eyebrow-divider">/</span> SYSTEMS</p><h1 id="hero-title">Machine<br>learning.<br><span class="serif-accent">Data, decoded.</span></h1><p class="hero-intro">I’m <strong>Alejandro Suárez Durán</strong>, currently specializing in Machine Learning and the world of data, with a foundation in systems, private cloud and web development.</p><p class="hero-specialty"><span aria-hidden="true">&gt; </span>`);
			_push(ssrRenderComponent(TypewriterText_default, { phrases: [
				"private cloud infrastructure",
				"automation with Ansible",
				"machine learning & data",
				"web development"
			] }, null, _parent));
			_push(`</p>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				class: "pill-link",
				to: {
					path: "/",
					hash: "#work"
				}
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`Explore my experience <span${_scopeId}>`);
						_push(ssrRenderComponent(unref(ArrowRight), { size: 17 }, null, _parent, _scopeId));
						_push(`</span>`);
					} else return [createTextVNode("Explore my experience "), createVNode("span", null, [createVNode(unref(ArrowRight), { size: 17 })])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="hero-footnote"><span>VMWARE VSPHERE</span><span>ANSIBLE · WINDOWS SERVER</span></div></div><div class="landscape-panel">`);
			_push(ssrRenderComponent(_component_NuxtImg, {
				src: "/img/nebulosa.avif",
				class: "landscape-image",
				sizes: "100vw md:55vw",
				format: "avif,webp",
				preload: { fetchPriority: "high" },
				loading: "eager",
				fetchpriority: "high",
				placeholder: "",
				"placeholder-class": "is-placeholder",
				alt: "A colorful nebula surrounded by stars",
				onLoad: markHeroImageLoaded
			}, null, _parent));
			_push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
			_push(`<div class="landscape-caption"><div><span class="caption-index">MACHINE LEARNING / DATA</span><h2>From data<br>to understanding.</h2></div>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: {
					path: "/",
					hash: "#about"
				},
				class: "round-arrow",
				"aria-label": "Read about me"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(unref(ArrowDown), { size: 18 }, null, _parent, _scopeId));
					else return [createVNode(unref(ArrowDown), { size: 18 })];
				}),
				_: 1
			}, _parent));
			_push(`</div><span class="landscape-coordinate">DATA · MACHINE LEARNING</span></div>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				class: "hero-note panel",
				to: {
					path: "/",
					hash: "#work"
				}
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<span class="note-symbol"${_scopeId}>`);
						_push(ssrRenderComponent(_sfc_main$13, {
							to: 99,
							suffix: "%"
						}, null, _parent, _scopeId));
						_push(`</span><span class="note-copy"${_scopeId}><strong${_scopeId}>356 CIS controls,<br${_scopeId}>audited and remediated.</strong><small${_scopeId}>Automated with Ansible for Windows Server 2025.</small><span class="text-link"${_scopeId}>VIEW EXPERIENCE `);
						_push(ssrRenderComponent(unref(ArrowRight), { size: 13 }, null, _parent, _scopeId));
						_push(`</span></span>`);
					} else return [createVNode("span", { class: "note-symbol" }, [createVNode(_sfc_main$13, {
						to: 99,
						suffix: "%"
					})]), createVNode("span", { class: "note-copy" }, [
						createVNode("strong", null, [
							createTextVNode("356 CIS controls,"),
							createVNode("br"),
							createTextVNode("audited and remediated.")
						]),
						createVNode("small", null, "Automated with Ansible for Windows Server 2025."),
						createVNode("span", { class: "text-link" }, [createTextVNode("VIEW EXPERIENCE "), createVNode(unref(ArrowRight), { size: 13 })])
					])];
				}),
				_: 1
			}, _parent));
			_push(`</section>`);
			_push(ssrRenderComponent(MarqueeStrip_default, null, null, _parent));
			_push(ssrRenderComponent(SignalStage_default, null, null, _parent));
			_push(ssrRenderComponent(_sfc_main$10, null, null, _parent));
			_push(ssrRenderComponent(SkillsSection_default, null, null, _parent));
			_push(`<section id="about" class="about-section wrap"><div${ssrRenderAttrs(mergeProps({ class: "section-heading" }, ssrGetDirectiveProps(_ctx, _directive_reveal, void 0, void 0, { fade: true })))}><p class="eyebrow">03 / PROFILE &amp; EDUCATION</p><h2>Grounded in systems.<br><span class="serif-accent">Always learning.</span></h2><figure class="profile-visual">`);
			_push(ssrRenderComponent(_component_NuxtPicture, {
				src: "/img/jupiter.jpeg",
				format: "avif,webp",
				sizes: "100vw md:45vw",
				loading: "lazy",
				placeholder: "",
				alt: "Jupiter and its cloud bands, including the Great Red Spot"
			}, null, _parent));
			_push(`<figcaption>LEARNING SYSTEMS · UNDERSTANDING DATA</figcaption></figure></div><div${ssrRenderAttrs(mergeProps({ class: "about-body" }, ssrGetDirectiveProps(_ctx, _directive_reveal, void 0, void 0, { right: true })))}><p class="about-lede">My current focus is Machine Learning and the world of data, building on a technical background in Systems, Web Development and private cloud infrastructure.</p><p class="about-copy">I’m pursuing a Machine Learning Specialization with a focus on data management and model training. My previous experience includes VMware cloud infrastructure, automation, web maintenance and technical support.</p><div class="profile-details"><div class="profile-block"><h3>Education</h3>`);
			_push(ssrRenderComponent(EducationTimeline_default, null, null, _parent));
			_push(`</div><div class="profile-block languages-block"><h3>Languages</h3>`);
			_push(ssrRenderComponent(LanguageMeter_default, null, null, _parent));
			_push(`</div></div></div></section>`);
			_push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
			_push(`</main>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=pages-Cb0YRL1r.mjs.map
