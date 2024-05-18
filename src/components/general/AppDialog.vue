<script setup lang="ts">
    import { translate } from '@/modules/core/localization';
    import { faClose } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { onMounted, ref } from 'vue';

    defineProps<{
        title: string
    }>();

    const dialogElement = ref();
    onMounted(async () => {
        dialogElement.value.showModal();
    });

    function closeWithEscape(e: KeyboardEvent) {
        if (e.key === "Escape") {
            e.preventDefault();
            close();
        };
    }

    const emit = defineEmits([
        "close"
    ]);

    function close() {
        dialogElement.value?.close();
        emit('close');
    }

    defineExpose({ close });
</script>

<template>
    <dialog ref="dialogElement" @keydown.stop="closeWithEscape" @click.self="close">
        <div>
            <div class="title">
                <h2>{{ title }}</h2>
                <button @click="close" :title="translate('general.action.closedialog')" type="button">
                    <FontAwesomeIcon :icon="faClose" />
                </button>
            </div>
            <slot></slot>
        </div>
    </dialog>
</template>

<style lang="scss" scoped>
    dialog {
        padding: 0;
        box-shadow: 0 0 0 100vw rgba(0, 0, 0, .3);
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background-color: var(--color-background-mute);
        border: none;
        color: var(--color-text);
        animation: slide-in-bottom .6s cubic-bezier(0.19, 1, 0.22, 1);

        > div {
            width: 100%;
            height: 100%;
            padding: 1rem;
            padding: 2rem;
        }

        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: .1rem solid var(--color-text);
            margin-bottom: 1rem;
            font-size: 1.6rem;

            h2 {
                font-size: inherit;
            }

            button {
                font-size: inherit;
                color: var(--color-text);

                &::before, &::after {
                    display: none;
                }
            }
        }
    }

    @keyframes slide-in-bottom {
        from {
            opacity: 0;
            top: 60%;
        }
    }
</style>
