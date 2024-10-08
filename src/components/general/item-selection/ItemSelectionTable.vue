<script setup lang="ts">
    import { getItemTranslatedProperties, type ItemActionNameGenerator, type ItemData, type ItemService } from '@/modules/api-services/items';
    import { translate } from '@/modules/core/localization';
    import { computed } from 'vue';
    import ItemSelectionTableImage from './ItemSelectionTableImage.vue';

    const props = defineProps<{
        data: ItemData[],
        itemService: ItemService,
        actionNameGenerator?: ItemActionNameGenerator,
        columnNamesToHide?: string[]
    }>();

    const itemType = computed(() => props.itemService.getItemType());

    const columnsToHide = computed(() => props.columnNamesToHide ?? []);
    const tableColumnNames = computed(() => Object.keys(props.data[0]).filter(column => column !== 'translations' && !columnsToHide.value.includes(column)));
    const extraTableColumnNames = computed(() => Object.keys(props.itemService.getExtraTableColumns(props.data[0])));

    function getColumnValues(item: AnyKeyValueObject) {
        return tableColumnNames.value.map(column => item[column]);
    }

    function formatCell(data: any) {
        if (typeof data === 'boolean') {
            return data ? '✅' : '❌';
        } else if (Array.isArray(data)) {
            if (data[0]?.hasOwnProperty('translations')) {
                return (data as ItemData[]).map(item => getItemTranslatedProperties(item)?.name).join(', ');
            } else {
                return (data as ItemData[]).map(item => item.name).join(', ');
            }
        }

        return data;
    }

    defineEmits([
        "itemAction"
    ]);
</script>

<template>
    <table>
        <thead>
            <th>{{ translate('general.itemselection.column.thumbnail') }}</th>
            <th v-for="columnName in tableColumnNames">{{ translate(`general.itemselection.column.${itemType}.${columnName}`) }}</th>
            <th v-for="columnName in extraTableColumnNames">{{ columnName }}</th>
            <th v-if="actionNameGenerator">{{ translate("general.itemselection.column.action") }}</th>
        </thead>
        <tbody>
            <tr v-for="item in data">
                <td>
                    <ItemSelectionTableImage :item-service="itemService" :item="item" />
                </td>
                <td v-for="columnValue in getColumnValues(item)">
                    {{ formatCell(columnValue) }}
                </td>
                <td v-for="columnValue in itemService.getExtraTableColumns(item)">
                    {{ formatCell(columnValue) }}
                </td>
                <td v-if="actionNameGenerator">
                    <button @click="$emit('itemAction', item)" type="button">{{ actionNameGenerator(item) }}</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
    table {
        width: 100%;
        background-color: var(--color-background-mute);
        border-radius: 1rem;
        padding: .5rem;
        border: .1rem solid var(--color-border);

        th {
            border-bottom: .1rem solid gray;
            padding: .5rem;
        }

        tr:nth-child(even) {
            background-color: var(--color-background-soft);
        }

        td {
            padding: .2rem .3rem;

            button {
                width: 100%;
                z-index: 1;
            }
        }
    }
</style>
