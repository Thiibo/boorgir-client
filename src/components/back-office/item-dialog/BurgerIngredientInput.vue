<script setup lang="ts">
    import { translate } from '@/modules/core/localization';
    import ItemSelectionTable from '@/components/general/item-selection/ItemSelectionTable.vue';
    import { ItemService, type IngredientData, type ItemData, getItemTranslatedProperties } from '@/modules/api-services/items';
    import { onMounted, ref, watch } from 'vue';

    defineProps<{
        ingredients: IngredientData[]
    }>();

    const currentIngredientsService = new ItemService('ingredients', false, {
        'general.itemselection.column.ingredients.name': item => getItemTranslatedProperties(item)?.name
    });
    const addIngredientsService = new ItemService('ingredients', false);
    const data = ref<ItemData[]>();
    const searchQuery = ref('');

    async function refreshData() {
        const requestData = await addIngredientsService.getItems(10, 1, searchQuery.value);
        data.value = requestData.data;
    }
    onMounted(refreshData);
    watch(searchQuery, refreshData);

    const emit = defineEmits([
        "update"
    ]);
</script>

<template>
    <div v-if="data">
        <p>{{ translate('general.itemselection.column.burgers.ingredients') }}</p>
        <div class="content">
            <ItemSelectionTable
                class="current-ingredients-table"
                :data="ingredients"
                :item-service="currentIngredientsService"
                :column-names-to-hide="['description']"
                v-if="ingredients.length > 0"
            />
            <button type="button">{{ translate('backoffice.itemselection.action.editingredients') }}</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .content {
        display: inline-block;

        .current-ingredients-table {
            display: inline-block;
            width: unset;
            border: .1rem solid gray;
        }

        button {
            vertical-align: top;
            margin-left: 2rem;
        }
    }

    p {
        display: inline-block;
        width: 8rem;
        vertical-align: top;
    }
</style>
