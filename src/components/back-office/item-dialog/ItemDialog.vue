<script setup lang="ts">
    import { ItemService, type ItemData, getItemTranslatedProperties } from '@/modules/api-services/items';
    import { translate } from '@/modules/core/localization';
    import { computed, onMounted, ref } from 'vue';
    import ImageInput from './ImageInput.vue';
    import ValidationErrors from '@/components/general/ValidationErrors.vue';
    import type { ValidationError } from '@/modules/core/validation-error';
    import NonTranslationInput from './NonTranslationInput.vue';
    import ItemTranslationsTable from './ItemTranslationsTable.vue';
    import BurgerIngredientInput from './BurgerIngredientInput.vue';
    import AppDialog from '@/components/general/AppDialog.vue';

    const props = defineProps<{
        itemId: number,
        itemService: ItemService
    }>();

    const dialogElement = ref();

    const item = ref<ItemData | null>(null);
    const isNewItem = ref(false);
    const thumbnail = ref<File>();
    const thumbnailChanged = ref(false);
    const validationErrors = ref<StringArrayKeyValueObject>();

    const itemNonTranslationData = computed(() => {
        const data: AnyKeyValueObject = Object.assign({}, item.value);
        delete data['id'];
        delete data['translations'];
        delete data['ingredients'];
        return data;
    });
    const itemName = computed(() => {
        const name = getItemTranslatedProperties(item.value!)?.name ?? '';
        return name === '' ? translate("backoffice.itemselection.title.unnamed") : name;
    });

    function setItemProperty(property: string, value: any) {
        const oldValue = (item.value as AnyKeyValueObject)[property];
        const correctlyTypedValue = typeof oldValue === 'number' ? parseFloat(value) : value;
        item.value = { ...item.value!, [property]: correctlyTypedValue}
    }

    function deleteItem() {
        props.itemService.deleteItem(props.itemId);
        closeDialog();
    }

    function saveItem() {
        const promises = [];
        if (isNewItem.value) {
            promises.push(props.itemService.createItem(item.value!));
        } else {
            promises.push(props.itemService.updateItem(props.itemId, item.value!));
        }

        if (thumbnailChanged.value && thumbnail.value) {
            promises.push(props.itemService.uploadThumbnail(props.itemId, thumbnail.value));
        }

        Promise.all(promises)
            .then(() => closeDialog())
            .catch(errors => validationErrors.value = (errors as ValidationError).errors)
    }

    function uploadThumbnail(file: File) {
        thumbnail.value = file;
        thumbnailChanged.value = true;
    }

    onMounted(async () => {
        if (props.itemId === -1) {
            item.value = props.itemService.getBlankItem();
            isNewItem.value = true;
        } else {
            item.value = await props.itemService.getItem(props.itemId);
            props.itemService.getThumbnail(props.itemId)
                .then(res => thumbnail.value = res as File)
                .catch(validationErrors => { if (!(validationErrors as ValidationError).errors.file) throw validationErrors; })
            isNewItem.value = false;
        }
    });

    const emit = defineEmits([
        "close"
    ]);

    function closeDialog() {
        if (dialogElement.value.open) dialogElement.value.close();
        emit('close');
    }
</script>

<template>
    <AppDialog :title="itemName" @close="closeDialog" ref="dialogElement" class="dialog" v-if="item">
        <form @submit.prevent="saveItem">
            <ItemTranslationsTable :item-service="itemService" :item="item" />
            <div v-for="column in Object.keys(itemNonTranslationData)">
                <NonTranslationInput
                    :item-service="itemService"
                    :column="column"
                    :value="itemNonTranslationData[column]"
                    @update="value => setItemProperty(column, value)"
                />
                <ValidationErrors :errors="validationErrors ? validationErrors[column] : undefined" />
            </div>
            <BurgerIngredientInput
                :item-name="itemName"
                :ingredients="item['ingredients']"
                @update="newIngredients => setItemProperty('ingredients', newIngredients)"
                v-if="'ingredients' in item"
            />
            <div class="thumbnail">
                <label for="thumbnail">{{ translate('general.itemselection.column.thumbnail') }}</label>
                <ImageInput :file="thumbnail" :alt="itemName" @upload="uploadThumbnail" />
            </div>
            <ValidationErrors :errors="validationErrors?.file" />
            <div class="controls">
                <button @click.prevent="deleteItem" type="button">{{ translate('backoffice.itemselection.action.delete') }}</button>
                <button @click.prevent="closeDialog" type="button">{{ translate('backoffice.itemselection.action.cancel') }}</button>
                <button>{{ translate('backoffice.itemselection.action.save') }}</button>
            </div>
        </form>
    </AppDialog>
</template>

<style lang="scss" scoped>
    .dialog {
        top: 0;
        right: 0;
        left: unset;
        height: 100%;
        max-height: unset;
        transform: unset;
        animation: slide-in-right .6s cubic-bezier(0.19, 1, 0.22, 1);
    }

    @keyframes slide-in-right {
        from {
            opacity: 0;
            transform: translateX(20%);
        }
    }

    form {
        padding: 1rem;

        > div {
            margin-top: 2rem;
        }

        .thumbnail label {
            display: inline-block;
            vertical-align: top;
            width: 8rem;
        }

        .controls {
            display: flex;
            position: absolute;
            padding: 2rem;
            bottom: 0;
            left: 0;
            gap: 1rem;
            width: 100%;
            justify-content: flex-end;

            button:first-child {
                margin-right: auto;
            }
        }
    }

</style>
