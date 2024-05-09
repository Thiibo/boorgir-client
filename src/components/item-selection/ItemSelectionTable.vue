<script setup lang="ts">
    import type { ItemType } from '@/modules/api-services/items';
    import { translate } from '@/modules/core/localization';
    import { computed } from 'vue';

    const props = defineProps<{
        data: Object[],
        itemType: ItemType
    }>();

    const columns = computed(() => {
        const dataKeys = Object.keys(props.data[0]);

        return dataKeys.map(key => {
            const translationKey = `general.itemselection.column.${props.itemType}.${key}`;
            return translate(translationKey);
        })
    });

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
            <th v-for="column in columns">{{ column }}</th>
        </thead>
        <tbody>
            <tr v-for="item in data">
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
