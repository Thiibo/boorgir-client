<script setup lang="ts">
    import type { ItemType } from '@/modules/api-services/items';
    import { AVAILABLE_LOCALES, translate, type Locale } from '@/modules/core/localization';
    import { computed } from 'vue';

    const props = defineProps<{
        data: Object[],
        itemType: ItemType
    }>();

    const displayData = computed(() => {
        // Take a deep copy
        const data: Object[] = JSON.parse(JSON.stringify(props.data));

        data.forEach((item) => transformAllColumns(item));
        return data;
    });

    function transformAllColumns(item: {[key: string]: any}) {
        const untranslatedColumnNames = Object.keys(item);
        for (const untranslatedColumnName of untranslatedColumnNames) {
            if (untranslatedColumnName === 'translations') {
                transformTranslationsColumn(item);
            } else {
                const translatedColumnName = translateColumn(untranslatedColumnName);
                item[translatedColumnName] = item[untranslatedColumnName];
                if (translatedColumnName !== untranslatedColumnName) delete item[untranslatedColumnName];
            }
        }
    }

    function transformTranslationsColumn(item: {[key: string]: any}) {
        const translations = item['translations'] as Record<string, any>[];
        translations.forEach(translationData => {
            const localeName = AVAILABLE_LOCALES[translationData.lang as Locale].name

            for (const [untranslatedLocaleColumnName, localeColumnData] of Object.entries(translationData)) {
                if (untranslatedLocaleColumnName === 'lang') break;
                const localeColumnName = translateColumn(untranslatedLocaleColumnName);
                item[`${localeColumnName} (${localeName})`] = localeColumnData;
            }
        });
        
        delete item['translations'];
    }

    function translateColumn(untranslatedColumnName: string) {
        return translate(`general.itemselection.column.${props.itemType}.${untranslatedColumnName}`);
    }

    const tableColumns = computed(() => Object.keys(displayData.value[0]));

    function formatCell(data: any) {
        if (typeof data === 'boolean') {
            return data ? '✅' : '❌';
        }

        return data;
    }
</script>

<template>
    <table>
        <thead>
            <th v-for="column in tableColumns">{{ column }}</th>
        </thead>
        <tbody>
            <tr v-for="item in displayData">
                <td v-for="columnValue in Object.values(item)">
                    {{ formatCell(columnValue) }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
    table {
        width: 100%;
        background-color: var(--color-background-mute);
        margin-top: 1rem;
        border-radius: 1rem;
        padding: .5rem;

        th {
            border-bottom: .1rem solid gray;
            padding: .5rem;
        }

        tr:nth-child(even) {
            background-color: var(--color-background-soft);
        }

        td {
            padding: .2rem .3rem;
        }
    }
</style>
