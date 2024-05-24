<script setup lang="ts">
    import Notification from '@/modules/core/notifications';
    import { faClose } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    const props = defineProps<{
        notification: Notification
    }>();

    const autoDismissProgress = ref(0);

    let updateInterval: number;
    onMounted(() => {
        updateInterval = setInterval(() => {
            const progress = props.notification.autoDismissProgress;
            if (progress >= 100) props.notification.dismiss();
            autoDismissProgress.value = progress;
        }, 20)
    });

    onBeforeUnmount(() => clearInterval(updateInterval));
</script>

<template>
    <div :class="[ 'notification', notification.type ]">
        <p>{{ notification.message }}</p>
        <button @click="notification.dismiss" class="icon-button" type="button">
            <FontAwesomeIcon :icon="faClose" />
        </button>
        <div :style="{ '--progress': `${autoDismissProgress}%` }" class="progress"></div>
    </div>
</template>

<style lang="scss" scoped>
    .notification {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        padding: .5rem 1rem;
        margin-top: 1rem;
        border-radius: .5rem;
        background-color: var(--color-background-surface);
        overflow: hidden;
        z-index: 10;
        animation: fly-in-bottom .6s cubic-bezier(0.165, 0.84, 0.44, 1);

        .progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: .2rem;
            width: var(--progress);
            background-color: var(--color-background-surface-hover);
        }

        &.error {
            background-color: rgb(184, 51, 51);
            .progress { background-color: rgb(255, 124, 124); }
        }
    }

    @keyframes fly-in-bottom {
        from {
            transform: translateY(2rem);
            opacity: 0;
        }
    }
</style>
