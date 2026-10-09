import { u as useState } from './state-DfWu8L74.mjs';
import { computed } from 'vue';

//#region app/data/consent.js
var consentCategories = [{
	id: "necessary",
	label: "Strictly necessary",
	required: true,
	description: "Storage required to remember your cookie choices."
}, {
	id: "analytics",
	label: "Analytics",
	required: false,
	description: "Anonymous usage statistics to improve the site. Off unless you accept."
}];
var consentItems = [{
	name: "portfolio-cookie-consent",
	type: "First-party local storage",
	purpose: "Stores your cookie consent choices.",
	category: "Strictly necessary",
	duration: "Until deleted or 12 months"
}];
//#endregion
//#region app/composables/useConsent.js
var callbacks = /* @__PURE__ */ new Map();
function useConsent() {
	const consent = useState("cookieConsent", () => null);
	const initialized = useState("cookieConsentInitialized", () => false);
	const preferencesOpen = useState("cookiePreferencesOpen", () => false);
	const hasDecided = computed(() => consent.value !== null);
	function notify() {
		for (const [category, listeners] of callbacks) {
			if (!consent.value?.categories?.[category]) continue;
			for (const callback of listeners) callback();
			listeners.clear();
		}
	}
	function save(categories) {
		const record = {
			version: 1,
			timestamp: Date.now(),
			categories: Object.fromEntries(consentCategories.map(({ id, required }) => [id, required || categories[id] === true]))
		};
		consent.value = record;
		preferencesOpen.value = false;
		notify();
	}
	function acceptAll() {
		save(Object.fromEntries(consentCategories.map(({ id }) => [id, true])));
	}
	function rejectAll() {
		save({
			necessary: true,
			analytics: false
		});
	}
	function openPreferences() {
		preferencesOpen.value = true;
	}
	function onConsent(category, callback) {
		if (consent.value?.categories?.[category]) callback();
		else {
			if (!callbacks.has(category)) callbacks.set(category, /* @__PURE__ */ new Set());
			callbacks.get(category).add(callback);
		}
		return () => callbacks.get(category)?.delete(callback);
	}
	return {
		consent,
		initialized,
		preferencesOpen,
		hasDecided,
		acceptAll,
		rejectAll,
		save,
		openPreferences,
		onConsent
	};
}

export { consentCategories as a, consentItems as c, useConsent as u };
//# sourceMappingURL=useConsent-BXTBb7Bp.mjs.map
