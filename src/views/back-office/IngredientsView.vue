<script setup lang="ts">
    import ItemSelection from '@/components/item-selection/ItemSelection.vue';
    import ItemDialog from '@/components/back-office/ItemDialog.vue';
    import { ItemService } from '@/modules/api-services/items';
    import { ref } from 'vue';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faPlus } from '@fortawesome/free-solid-svg-icons';
    import { translate } from '@/modules/core/localization';

    const itemIdEditing = ref<number | null>(null);
    const itemService = new ItemService('ingredients', true);
</script>

<template>
    <main>
        <ItemSelection :item-service="itemService" :item-id-editing="itemIdEditing" @click-item="id => itemIdEditing = id" />
        <ItemDialog :item-id="itemIdEditing" :item-service="itemService" @close="itemIdEditing = null" v-if="itemIdEditing" />
        <button id="new-item" :aria-label="translate('backoffice.itemselection.action.new')" @click="itemIdEditing = -1">
            <FontAwesomeIcon :icon="faPlus" />
        </button>
    </main>
</template>

<style lang="scss" scoped>
    main {
        flex: 1;
        padding: 3rem;
        overflow: scroll;
    }

    #new-item {
        position: fixed;
        right: 3rem;
        bottom: 3rem;
        width: 4rem;
        height: 4rem;
        padding: 0;
        z-index: 10;
        font-size: 1.3rem;
        border-radius: 50%;
        box-shadow: .3rem .3rem 1rem 0 rgba(0, 0, 0, .9);
    }
</style>