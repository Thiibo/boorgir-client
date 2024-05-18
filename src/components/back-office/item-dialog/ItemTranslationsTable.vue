<script setup lang="ts">
    import { getItemTranslatedProperties, type ItemData, type ItemService } from '@/modules/api-services/items';
    import { AVAILABLE_LOCALES, type Locale } from '@/modules/core/localization';
    import { computed } from 'vue';

    const props = defineProps<{
        itemService: ItemService,
        item: ItemData
    }>();

    const availableLocaleCodes = computed(() => Object.keys(AVAILABLE_LOCALES) as Locale[]);
    const itemTranslationProperties = computed(() => Object.keys(props.item.translations![0]).filter(property => property !== 'lang'));

    function getTranslationProperty(lang: Locale, property: string) {
        const translationData = getItemTranslatedProperties(props.item, lang) as AnyKeyValueObject;
        return translationData ? translationData[property] : "";
    }

    function setTranslationProperty(lang: Locale, property: string, value: any) {
        const translationData = getItemTranslatedProperties(props.item, lang) as AnyKeyValueObject;
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
