<script setup lang="ts">
    import type { ItemService } from '@/modules/api-services/items';
    import { AVAILABLE_LOCALES, type Locale } from '@/modules/core/localization';
    import { computed } from 'vue';

    const props = defineProps<{
        itemService: ItemService,
        itemTranslations: StringKeyValueObject[]
    }>();

    const availableLocaleCodes = computed(() => Object.keys(AVAILABLE_LOCALES) as Locale[]);
    const itemTranslationProperties = computed(() => Object.keys(props.itemTranslations ? props.itemTranslations[0] : []).filter(property => property !== 'lang'));

    function getTranslationProperties(lang: Locale) {
        return props.itemTranslations.find(translation => translation.lang === lang);
    }

    function getTranslationProperty(lang: Locale, property: string) {
        const translationData = getTranslationProperties(lang);
        return translationData ? translationData[property] : "";
    }

    function setTranslationProperty(lang: Locale, property: string, value: any) {
        const translationData = getTranslationProperties(lang);
        translationData![property] = value;
    }
</script>

<template>
    <table class="translations">
        <thead>
            <th></th>
            <th scope="col" v-for="lang in AVAILABLE_LOCALES">{{ lang.name }}</th>
        </thead>
        <tbody>
            <tr v-for="property in itemTranslationProperties">
                <th scope="row">{{ itemService.translateColumnName(property) }}</th>
                <td v-for="localeCode in availableLocaleCodes">
                    <textarea
                        :value="getTranslationProperty(localeCode, property)"
                        :lang="localeCode"
                        required
                        @input="e => setTranslationProperty(localeCode, property, (e.target as HTMLInputElement).value)"
                    ></textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
    table {
        thead th {
            padding-bottom: .5rem;
        }

        tr th {
            display: inline-block;
            width: 8rem;
            text-align: left;
            padding-top: .5rem;
        }

        td {
            padding: .3rem;
            vertical-align: top;

            textarea {
                resize: vertical;
            }
        }
    }
</style>
