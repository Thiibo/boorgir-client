<script setup lang="ts">
    import { ItemService, type ItemData } from '@/modules/api-services/items';
    import ItemSelectionGridItem from './ItemSelectionGridItem.vue';

    defineProps<{
        data: ItemData[],
        itemService: ItemService,
        actionName: string
    }>();

    defineEmits([
        "clickItem"
    ]);
</script>

<template>
    <div class="selection-grid" v-if="data">
        <ItemSelectionGridItem v-for="item in data" :item-service="itemService" :item="item" :action-name="actionName" @click-item="id => $emit('clickItem', id)" />
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/mixins/grid-auto-columns.scss';

    .selection-grid {
        display: grid;
        gap: 4rem;
        @include gridAutoColumns(8rem, 2%);
    }
</style>
