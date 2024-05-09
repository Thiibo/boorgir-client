<script setup lang="ts">
    import ItemSelection from '@/components/item-selection/ItemSelection.vue';
    import { getAllAdmin as getAllIngredientsAdmin } from '@/modules/api-services/ingredients';
</script>

<template>
    <main>
        <ItemSelection :item-getter="getAllIngredientsAdmin" />
    </main>
</template>

<style lang="scss" scoped>
    main {
        flex: 1;
        padding: 3rem;
    }
</style>