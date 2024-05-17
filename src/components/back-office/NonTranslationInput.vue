<script setup lang="ts">
    import type { ItemService } from '@/modules/api-services/items';
    import { computed } from 'vue';

    const props = defineProps<{
        itemService: ItemService,
        column: string,
        value: any
    }>();

    const emit = defineEmits([
        "update"
    ]);

    const valueType = computed(() => typeof props.value);

    function input(e: Event) {
        const target = e.target as HTMLInputElement;
        const newValue = valueType.value === 'boolean' ? target.checked : target.value;
        emit('update', newValue);
    }
</script>

<template>
    <div v-if="valueType === 'boolean'">
        <label :for="column">{{ itemService.translateColumnName(column) }}</label>
        <input
            type="checkbox"
            :name="column"
            :id="column"
            :checked="value"
            @input="input"
        >
    </div>
    <div v-else>
        <label :for="column">{{ itemService.translateColumnName(column) }}</label>
        <input
            :type="valueType === 'number' ? 'number' : 'text'"
            :name="column"
            :id="column"
            :value="value"
            step="any"
            required
            @input="input"
        >
    </div>
</template>

<style lang="scss" scoped>
    label {
        display: inline-block;
        width: 8rem;
    }
</style>
