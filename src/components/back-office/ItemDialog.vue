<script setup lang="ts">
    import { ItemService } from '@/modules/api-services/items';
    import { currentLocale } from '@/modules/core/localization';
    import { faClose } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { computed, onMounted, ref } from 'vue';

    const props = defineProps<{
        itemId: number,
        itemService: ItemService
    }>();

    const dialogElement = ref<HTMLDialogElement | null>(null);

    const itemData = ref<{[key: string]: any}>();
    const itemName = computed(() => (itemData.value?.translations as StringKeyValueObject[])?.find(item => item.lang === currentLocale.value)?.name)

    onMounted(async () => {
        dialogElement.value?.showModal();
        dialogElement.value?.focus();
        itemData.value = await props.itemService.getItem(props.itemId);
    });

    function preventClosing(e: KeyboardEvent) {
        if (e.key === "Escape") e.preventDefault();
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
    <dialog ref="dialogElement" @keydown="preventClosing" @click.self="closeDialog">
        <div>
            <div class="title">
                <button @click="closeDialog">
                    <FontAwesomeIcon :icon="faClose" />
                </button>
                <h2>{{ itemName }}</h2>
            </div>
            {{ itemData }}
        </div>
    </dialog>
</template>

<style lang="scss" scoped>
    dialog {
        top: 0;
        right: 0;
        bottom: unset;
        left: unset;
        width: 40%;
        height: 100%;
        border: none;
        padding: 0;
        background-color: var(--color-background-mute);
        color: var(--color-text);

        &::backdrop {
            background-color: rgba(0, 0, 0, .6);
        }

        > div {
            width: 100%;
            height: 100%;
            padding: 1rem;
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
</style>
