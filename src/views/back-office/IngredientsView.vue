<script setup lang="ts">
    import ItemSelection from '@/components/item-selection/ItemSelection.vue';
    import ItemDialog from '@/components/back-office/ItemDialog.vue';
    import { ItemService } from '@/modules/api-services/items';
    import { ref } from 'vue';

    const itemIdEditing = ref<number | null>(null);
    const itemService = new ItemService('ingredients', true);
</script>

<template>
    <main>
        <ItemSelection :item-service="itemService" @click-item="id => itemIdEditing = id" />
        <ItemDialog :item-id="itemIdEditing" :item-service="itemService" @close="itemIdEditing = null" v-if="itemIdEditing" />
    </main>
</template>

<style lang="scss" scoped>
    main {
        flex: 1;
        padding: 3rem;
        overflow: scroll;
    }
</style>