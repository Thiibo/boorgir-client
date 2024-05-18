<script setup lang="ts">
    import { translate } from '@/modules/core/localization';
    import ItemSelectionTable from '@/components/general/item-selection/ItemSelectionTable.vue';
    import { ItemService, type IngredientData, getItemTranslatedProperties } from '@/modules/api-services/items';
    import { ref } from 'vue';
    import BurgerIngredientDialog from './BurgerIngredientDialog.vue';

    defineProps<{
        itemName: string,
        ingredients: IngredientData[]
    }>();

    const service = new ItemService('ingredients', false, {
        'general.itemselection.column.ingredients.name': item => getItemTranslatedProperties(item)?.name
    });
    const editDialogOpen = ref(false);

    const emit = defineEmits([
        "update"
    ]);
</script>

<template>
    <div>
        <p>{{ translate('general.itemselection.column.burgers.ingredients') }}</p>
        <div class="content">
            <ItemSelectionTable
                class="current-ingredients-table"
                :data="ingredients"
                :item-service="service"
                :column-names-to-hide="['description']"
                v-if="ingredients.length > 0"
            />
            <button type="button" @click="editDialogOpen = !editDialogOpen">{{ translate('backoffice.itemselection.action.editingredients') }}</button>
            <BurgerIngredientDialog
                :item-name="itemName"
                :initial-ingredients="ingredients"
                :item-service="service"
                @update="newIngredients => $emit('update', newIngredients)"
                @close="editDialogOpen = false" v-if="editDialogOpen"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .content {
        display: inline-block;

        .current-ingredients-table {
            display: inline-block;
            width: unset;
            max-height: 20rem;
            overflow: auto;
            border: .1rem solid var(--color-border);
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
