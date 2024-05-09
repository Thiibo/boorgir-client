<script setup lang="ts">
    import ItemSelection from '@/components/item-selection/ItemSelection.vue';
    import { getAllAdmin as getAllBurgersAdmin } from '@/modules/api-services/burgers';
</script>

<template>
    <main>
        <ItemSelection :item-getter="getAllBurgersAdmin" />
    </main>
</template>

<style lang="scss" scoped>
    main {
        flex: 1;
        padding: 3rem;
    }
</style>
