<script setup lang="ts">
    import { translate } from '@/modules/core/localization';
    import { computed } from 'vue';

    const props = defineProps<{
        file?: File,
        alt: string
    }>();

    const imagePreviewURL = computed(() => props.file ? URL.createObjectURL(props.file) : '');
</script>

<template>
    <img :src="imagePreviewURL" :alt="alt" v-if="imagePreviewURL !== ''">
    <div class="image-not-provided" v-else>
        <span>{{ translate('general.itemselection.image.unavailable') }}</span>
    </div>
</template>

<style lang="scss" scoped>
    img, .image-not-provided {
        height: 100%;
        border-radius: .3rem;
        pointer-events: none;
        border: .1rem solid var(--color-border);
    }

    .image-not-provided {
        position: relative;
        font-style: italic;
        background: var(--color-background-surface);

        span {
            position: absolute;
            font-size: 80%;
            top: 50%;
            left: 10%;
            width: 80%;
            transform: translateY(-50%);
            text-align: center;
        }
    }
</style>
