<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    defineProps<{
        itemId: number
    }>();

    const dialogElement = ref<HTMLDialogElement | null>(null);

    onMounted(() => {
        dialogElement.value?.showModal();
        dialogElement.value?.focus();
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
            {{ itemId }}
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
        box-sizing: content-box;
        border: none;
        padding: 0;
        background-color: var(--color-background-mute);

        &::backdrop {
            background-color: rgba(0, 0, 0, .6);
        }

        > div {
            width: 100%;
            height: 100%;
        }
    }
</style>
