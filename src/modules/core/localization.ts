import { computed } from "vue";

const AVAILABLE_LOCALES = {
    "en": "English",
    "nl": "Nederlands",
    "fr": "Français",
};

type Locale = keyof typeof AVAILABLE_LOCALES;

let currentLocale: Locale = "en";
let staticTranslations: StringKeyValueObject = {};
refreshStaticTranslations();

function setLocale(locale: Locale) {
    currentLocale = locale;
}

function getLocale(): Locale {
    return currentLocale;
}

function refreshStaticTranslations() {
    staticTranslations = {};
}

function translate(key: string) {
    return computed(() => staticTranslations[key]);
}

export { AVAILABLE_LOCALES, setLocale, getLocale, translate };
