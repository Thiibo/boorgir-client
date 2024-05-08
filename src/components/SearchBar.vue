<script setup lang="ts">
    import { faSearch } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    defineProps<{
        modelValue?: string
    }>();

    defineEmits(["update:modelValue"]);
</script>

<template>
    <div>
        <FontAwesomeIcon class="icon" :icon="faSearch" />
        <input type="text" name="query" id="query" placeholder="Search..." :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    </div>
</template>

<style lang="scss" scoped>
    $icon-width: 2.3rem;

    div {
        position: relative;
        background-color: var(--color-background-surface);
        border-radius: .3rem;
        width: min-content;
    }

    .icon {
        position: absolute;
        width: $icon-width;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
    }

    input {
        padding: .5rem 1rem;
        padding-left: $icon-width;
        width: 100%;
        height: 100%;
        min-width: 10rem;
    }
</style>
