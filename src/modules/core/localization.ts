import { ref, watch } from "vue";
import API from '../core/api-methods';

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

const currentLocale = ref<Locale>("en");
const staticTranslations = ref<StringKeyValueObject>({});

function setLocale(locale: Locale) {
    currentLocale.value = locale;
}

function getLocale() {
    return currentLocale;
}

async function refreshStaticTranslations() {
    staticTranslations.value = await API.get('translations') as StringKeyValueObject;
}
refreshStaticTranslations();
watch(currentLocale, refreshStaticTranslations);

function translate(key: string) {
    return staticTranslations.value[key];
}

export { AVAILABLE_LOCALES, type Locale, setLocale, getLocale, translate };
