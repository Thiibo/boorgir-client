import { computed, ref } from "vue";

const AVAILABLE_LOCALES = {
    "en": {
        name: "English",
        unicodeFlag: "🇬🇧"
    },
    "nl": {
        name: "Nederlands",
        unicodeFlag: "🇳🇱"
    },
    "fr": {
        name: "Français",
        unicodeFlag: "🇫🇷"
    },
};

type Locale = keyof typeof AVAILABLE_LOCALES;

let currentLocale = ref<Locale>("en");
let staticTranslations: StringKeyValueObject = {};
refreshStaticTranslations();

function setLocale(locale: Locale) {
    currentLocale.value = locale;
}

function getLocale() {
    return currentLocale;
}

function refreshStaticTranslations() {
    staticTranslations = {};
}

function translate(key: string) {
    return computed(() => staticTranslations[key]);
}

export { AVAILABLE_LOCALES, type Locale, setLocale, getLocale, translate };
