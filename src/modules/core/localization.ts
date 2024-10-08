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
const loadedLocale = ref<Locale>(currentLocale.value);
const staticTranslations = ref<StringKeyValueObject>({});

async function refreshStaticTranslations() {
    saveToLocalStorage('locale', currentLocale.value);
    staticTranslations.value = await API.get('translations') as StringKeyValueObject;
    loadedLocale.value = currentLocale.value;
}
refreshStaticTranslations();
watch(currentLocale, refreshStaticTranslations);

function translate(key: string, ...args: string[]) {
    let translation = staticTranslations.value[key] ?? key;
    args.forEach(arg => translation = translation.replace('%s', arg));
    return translation;
}

export { AVAILABLE_LOCALES, type Locale, currentLocale, loadedLocale, translate };
