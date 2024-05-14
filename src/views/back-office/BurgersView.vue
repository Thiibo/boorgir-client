<script setup lang="ts">
    import ItemSelection from '@/components/item-selection/ItemSelection.vue';
    import { ItemService } from '@/modules/api-services/items';

    const itemService = new ItemService('burgers', true);
</script>

<template>
    <main>
        <ItemSelection :item-service="itemService" @click-item="id => console.log(id)" />
    </main>
</template>

<style lang="scss" scoped>
    main {
        flex: 1;
        padding: 3rem;
        overflow: scroll;
    }
</style>
