<script setup lang="ts">
    import { translate } from '@/modules/core/localization';
    import ItemSelectionTable from '../item-selection/ItemSelectionTable.vue';
    import { ItemService, type IngredientData, type ItemData } from '@/modules/api-services/items';
    import { onMounted, ref, watch } from 'vue';

    defineProps<{
        ingredients?: IngredientData[]
    }>();

    const ingredientsService = new ItemService('ingredients', false);
    const data = ref<ItemData[]>();
    const searchQuery = ref('');

    async function refreshData() {
        const requestData = await ingredientsService.getItems(10, 1, searchQuery.value);
        data.value = requestData.data;
    }
    onMounted(refreshData);
    watch(searchQuery, refreshData);

    defineEmits([
        "update"
    ]);
</script>

<template>
    <div v-if="data">
        <label for="burger-ingredients">{{ translate('general.itemselection.column.burgers.ingredients') }}</label>
        <ItemSelectionTable
            :data="data"
            :item-service="ingredientsService"
            :action-name="translate('backoffice.itemselection.action.delete')"
        />
    </div>
</template>
