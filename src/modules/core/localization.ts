import { ref, watch } from "vue";
import API from '../core/api-methods';
import { getFromLocalStorage, saveToLocalStorage } from "./local-storage";

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

const currentLocale = ref<Locale>(getFromLocalStorage('locale') ?? 'en');
const loadedLocale = ref<Locale>();
const staticTranslations = ref<StringKeyValueObject>({});

async function refreshStaticTranslations() {
    saveToLocalStorage('locale', currentLocale.value);
    staticTranslations.value = await API.get('translations') as StringKeyValueObject;
    loadedLocale.value = currentLocale.value;
}
refreshStaticTranslations();
watch(currentLocale, refreshStaticTranslations);

function translate(key: string) {
    return staticTranslations.value[key] ?? key;
}

export { AVAILABLE_LOCALES, type Locale, currentLocale, loadedLocale, translate };
