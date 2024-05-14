<script setup lang="ts">
    import { ItemService } from '@/modules/api-services/items';
    import { AVAILABLE_LOCALES, currentLocale, translate, type Locale } from '@/modules/core/localization';
    import { faClose } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { computed, onMounted, ref } from 'vue';

    const props = defineProps<{
        itemId: number,
        itemService: ItemService
    }>();

    const dialogElement = ref<HTMLDialogElement | null>(null);

    const itemData = ref<{[key: string]: any}>({});
    const isNewItem = ref(false);

    const itemTranslations = computed(() => itemData.value?.translations as StringKeyValueObject[]);
    const itemTranslationProperties = computed(() => Object.keys(itemTranslations.value ? itemTranslations.value[0] : []).filter(property => property !== 'lang'));
    const itemNonTranslationData = computed(() => {
        const data = Object.assign({}, itemData.value);
        delete data['id'];
        delete data['translations'];
        return data;
    });
    const itemName = computed(() => {
        const name = itemTranslations.value?.find(item => item.lang === currentLocale.value)?.name;
        return name === '' ? translate("backoffice.itemselection.title.unnamed") : name;
    });

    function getTranslationProperty(lang: Locale, property: string) {
        const translationData = itemTranslations.value.find(translation => translation.lang === lang);
        return translationData ? translationData[property] : "";
    }

    function setTranslationProperty(lang: Locale, property: string, value: any) {
        const translationData = itemTranslations.value.find(translation => translation.lang === lang);
        translationData![property] = value;
    }

    function setRegularProperty(property: string, value: any) {
        const correctlyTypedValue = typeof itemData.value![property] === 'number' ? parseInt(value) : value;
        itemData.value = { ...itemData.value, [property]: correctlyTypedValue}
    }

    function deleteItem() {
        props.itemService.deleteItem(props.itemId);
        closeDialog();
    }

    function saveItem() {
        if (isNewItem.value) {
            props.itemService.createItem(itemData.value);
        } else {
            props.itemService.updateItem(props.itemId, itemData.value);
        }

        closeDialog();
    }

    onMounted(async () => {
        dialogElement.value?.showModal();
        dialogElement.value?.focus();

        if (props.itemId === -1) {
            itemData.value = props.itemService.getBlankItem();
            isNewItem.value = true;
        } else {
            itemData.value = await props.itemService.getItem(props.itemId);
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
                <button @click="closeDialog">
                    <FontAwesomeIcon :icon="faClose" />
                </button>
                <h2>{{ itemName }}</h2>
            </div>
            <form @submit.prevent="saveItem">
                <table class="translations" v-if="itemTranslations">
                    <thead>
                        <th></th>
                        <th scope="col" v-for="lang in AVAILABLE_LOCALES">{{ lang.name }}</th>
                    </thead>
                    <tbody>
                        <tr v-for="property in itemTranslationProperties">
                            <th scope="row">{{ property }}</th>
                            <td v-for="lang in Object.keys(AVAILABLE_LOCALES)">
                                <textarea
                                    :value="getTranslationProperty(lang as Locale, property)"
                                    :lang="lang"
                                    @input="e => setTranslationProperty(lang as Locale, property, (e.target as HTMLInputElement).value)"
                                ></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-for="key in Object.keys(itemNonTranslationData)">
                    <div v-if="typeof itemNonTranslationData[key] === 'boolean'">
                        <label :for="key">{{ itemService.translateColumnName(key) }}</label>
                        <input
                            type="checkbox"
                            :name="key"
                            :id="key"
                            :checked="itemNonTranslationData[key]"
                            @input="e => setRegularProperty(key, (e.target as HTMLInputElement).checked)"
                        >
                    </div>
                    <div v-else>
                        <label :for="key">{{ itemService.translateColumnName(key) }}</label>
                        <input
                            :type="typeof itemNonTranslationData[key] === 'number' ? 'number' : 'text'"
                            :name="key"
                            :id="key"
                            :value="itemNonTranslationData[key]"
                            @input="e => setRegularProperty(key, (e.target as HTMLInputElement).value)"
                        >
                    </div>
                </div>
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

            &::before, &::after {
                display: none;
            }
        }
    }

    form {
        padding: 1rem;

        table {
            thead th {
                padding-bottom: .5rem;
            }

            tr th {
                padding-top: .5rem;
            }

            td {
                padding: .3rem;
                vertical-align: top;

                textarea {
                    resize: vertical;
                }
            }
        }

        table tr th, label {
            display: inline-block;
            width: 8rem;
            text-align: left;
        }

        > div {
            margin-top: 2rem;
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
