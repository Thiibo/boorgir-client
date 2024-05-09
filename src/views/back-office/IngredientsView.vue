<script setup lang="ts">
    import ItemSelection from '@/components/item-selection/ItemSelection.vue';
    import { ItemService } from '@/modules/api-services/items';

    const itemService = new ItemService('ingredients', true);
</script>

<template>
    <main>
        <ItemSelection :item-service="itemService" />
    </main>
</template>

<style lang="scss" scoped>
    main {
        flex: 1;
        padding: 3rem;
    }
</style>