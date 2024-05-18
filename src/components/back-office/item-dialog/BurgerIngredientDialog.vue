<script setup lang="ts">
    import { computed, ref } from 'vue';
    import AppDialog from '@/components/general/AppDialog.vue';
    import { ItemService, type ItemData } from '@/modules/api-services/items';
    import ItemSelection from '@/components/general/item-selection/ItemSelection.vue';
    import ItemSelectionTable from '@/components/general/item-selection/ItemSelectionTable.vue';
    import { translate } from '@/modules/core/localization';

    const props = defineProps<{
        itemName: string,
        initialIngredients: ItemData[],
        itemService: ItemService
    }>();

    const dialogElement = ref();
    const dialogTitle = computed(() => translate('backoffice.itemselection.ingredientsdialog.title', props.itemName));

    const ingredients = ref([...props.initialIngredients]);
    const service = new ItemService('ingredients', false);

    function closeDialog() {
        if (dialogElement.value.open) dialogElement.value.close();
        emit('close');
    }

    function getActionName(item: ItemData): string {
        const isInList = ingredients.value.some(ingredient => ingredient.id === item.id);
        return translate(`backoffice.itemselection.ingredientsdialog.${isInList ? 'remove' : 'add'}`);
    }

    function toggleItem(item: ItemData) {
        const ingredientIndex = ingredients.value.findIndex(ingredient => ingredient.id === item.id);
        if (ingredientIndex > -1) {
            ingredients.value.splice(ingredientIndex, 1);
        } else {
            ingredients.value.push(item);
        }
    }

    function save() {
        emit('update', ingredients.value);
        closeDialog();
    }

    const emit = defineEmits([
        "close",
        "update"
    ]);
</script>

<template>
    <AppDialog :title="dialogTitle" @close="closeDialog" class="dialog" ref="dialogElement">
        <div class="content">
            <ItemSelection
                :item-service="service"
                class="item-selection"
                :action-name-generator="getActionName"
                @item-action="toggleItem"
            />
            <div class="current-items">
                <h2>{{ translate('backoffice.itemselection.ingredientsdialog.currentitems') }}</h2>
                <ItemSelectionTable
                    class="current-items-table"
                    :data="ingredients"
                    :item-service="itemService"
                    :action-name-generator="() => translate('backoffice.itemselection.action.delete')"
                    :column-names-to-hide="['description']"
                    @item-action="item => ingredients = ingredients.filter(ingredient => ingredient.id !== item.id)"
                    v-if="ingredients.length > 0"
                />
                <p v-else>{{ translate('general.itemselection.noingredients') }}</p>
                <div class="controls">
                    <button @click.prevent="closeDialog" type="button">{{ translate('backoffice.itemselection.action.cancel') }}</button>
                    <button class="save" type="button" @click="save">{{ translate('backoffice.itemselection.action.save') }}</button>
                </div>
            </div>
        </div>
    </AppDialog>
</template>

<style lang="scss" scoped>
    .dialog {
        width: 90vw;

        .content {
            display: flex;
            gap: 2rem;

            .item-selection {
                flex: 1;
                height: 80vh;
                overflow-y: auto;
            }

            .current-items {
                height: 100%;
                width: 20vw;
                min-width: 30rem;

                h2 {
                    margin-bottom: 1rem;
                }

                .current-items-table {
                    display: block;
                    max-height: calc(75vh - 5rem);
                    overflow: auto;
                }

                p {
                    font-style: italic;
                }

                .controls {
                    position: absolute;
                    bottom: 3rem;
                    right: 3rem;

                    button {
                        margin-left: 1rem;
                    }
                }
            }
        }
    }
</style>
