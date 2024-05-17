<script setup lang="ts">
    import { ItemService } from '@/modules/api-services/items';
    import { currentLocale, translate } from '@/modules/core/localization';
    import { faClose } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { computed, onMounted, ref } from 'vue';
    import ImageInput from './ImageInput.vue';
    import ValidationErrors from '../ValidationErrors.vue';
    import type { ValidationError } from '@/modules/core/validation-error';
    import NonTranslationInput from './NonTranslationInput.vue';
    import ItemTranslationsTable from './ItemTranslationsTable.vue';

    const props = defineProps<{
        itemId: number,
        itemService: ItemService
    }>();

    const dialogElement = ref<HTMLDialogElement | null>(null);

    const itemData = ref<{[key: string]: any}>({});
    const isNewItem = ref(false);
    const thumbnail = ref<File>();
    const thumbnailChanged = ref(false);
    const validationErrors = ref<StringArrayKeyValueObject>();

    const itemTranslations = computed(() => itemData.value?.translations as StringKeyValueObject[]);
    const itemNonTranslationData = computed(() => {
        const data = Object.assign({}, itemData.value);
        delete data['id'];
        delete data['translations'];
        return data;
    });
    const itemName = computed(() => {
        const name = itemTranslations.value?.find(item => item.lang === currentLocale.value)?.name ?? '';
        return name === '' ? translate("backoffice.itemselection.title.unnamed") : name;
    });

    function setRegularProperty(property: string, value: any) {
        const correctlyTypedValue = typeof itemData.value![property] === 'number' ? parseInt(value) : value;
        itemData.value = { ...itemData.value, [property]: correctlyTypedValue}
    }

    function deleteItem() {
        props.itemService.deleteItem(props.itemId);
        closeDialog();
    }

    function saveItem() {
        const promises = [];
        if (isNewItem.value) {
            promises.push(props.itemService.createItem(itemData.value));
        } else {
            promises.push(props.itemService.updateItem(props.itemId, itemData.value));
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
        dialogElement.value?.showModal();
        dialogElement.value?.focus();

        if (props.itemId === -1) {
            itemData.value = props.itemService.getBlankItem();
            isNewItem.value = true;
        } else {
            itemData.value = await props.itemService.getItem(props.itemId);
            props.itemService.getThumbnail(props.itemId)
                .then(res => thumbnail.value = res as File)
                .catch(validationErrors => { if (!(validationErrors as ValidationError).errors.file) throw validationErrors; })
            isNewItem.value = false;
        }
    });

    function closeWithEscape(e: KeyboardEvent) {
        if (e.key === "Escape") {
            e.preventDefault();
            closeDialog();
        };
    }

    const emit = defineEmits([
        "close"
    ]);

    function closeDialog() {
        dialogElement.value?.close();
        emit('close');
    }
</script>

<template>
    <dialog ref="dialogElement" @keydown="closeWithEscape" @click.self="closeDialog">
        <div>
            <div class="title">
                <button @click="closeDialog" :title="translate('general.action.closedialog')">
                    <FontAwesomeIcon :icon="faClose" />
                </button>
                <h2>{{ itemName }}</h2>
            </div>
            <form @submit.prevent="saveItem">
                <ItemTranslationsTable :item-service="itemService" :itemTranslations="itemTranslations" v-if="itemTranslations" />
                <div v-for="column in Object.keys(itemNonTranslationData)">
                    <NonTranslationInput
                        :item-service="itemService"
                        :column="column"
                        :value="itemNonTranslationData[column]"
                        @update="value => setRegularProperty(column, value)"
                    />
                    <ValidationErrors :errors="validationErrors ? validationErrors[column] : undefined" />
                </div>
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
        </div>
    </dialog>
</template>

<style lang="scss" scoped>
    dialog {
        top: 0;
        right: 0;
        bottom: unset;
        left: unset;
        width: 50rem;
        height: 100%;
        max-height: unset;
        padding: 0;
        border: none;
        box-shadow: 0 0 0 100vw rgba(0, 0, 0, .3);
        background-color: var(--color-background-mute);
        color: var(--color-text);
        animation: slide-in-right .6s cubic-bezier(0.19, 1, 0.22, 1);

        > div {
            width: 100%;
            height: 100%;
            padding: 1rem;
        }
    }

    @keyframes slide-in-right {
        from {
            opacity: 0;
            transform: translateX(20%);
        }
    }

    .title {
        display: flex;
        align-items: center;
        border-bottom: .1rem solid var(--color-text);

        button {
            font-size: 2rem;
            width: 4rem;
            height: 4rem;
            padding: 0;
            color: var(--color-text);

            &::before, &::after {
                display: none;
            }
        }
    }

    form {
        padding: 1rem;

        > div {
            margin-top: 2rem;
        }

        .thumbnail label {
            vertical-align: top;
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
