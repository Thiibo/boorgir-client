<script setup lang="ts">
    import type { ItemType } from '@/modules/api-services/items';
    import { computed } from 'vue';

    const props = defineProps<{
        data: StringKeyValueObject[],
        actionName: string,
        itemType: ItemType
    }>();

    const tableColumns = computed(() => Object.keys(props.data[0]));

    function formatCell(data: any) {
        if (typeof data === 'boolean') {
            return data ? '✅' : '❌';
        }

        return data;
    }

    defineEmits([
        "clickItem"
    ]);
</script>

<template>
    <table v-if="data.length > 0">
        <thead>
            <th v-for="column in tableColumns">{{ column }}</th>
            <th>Action</th>
        </thead>
        <tbody>
            <tr v-for="item in data">
                <td v-for="columnValue in Object.values(item)">
                    {{ formatCell(columnValue) }}
                </td>
                <td>
                    <button @click="$emit('clickItem', item.ID)">{{ actionName }}</button>
                </td>
            </tr>
        </tbody>
    </table>
    <p v-else>No data to display.</p>
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

            button {
                z-index: 1;
            }
        }
    }

    p {
        margin: 2rem 0;
        text-align: center;
    }
</style>
