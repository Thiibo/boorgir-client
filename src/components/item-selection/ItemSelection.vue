<script setup lang="ts">
    import { computed, onMounted, ref, watch } from 'vue';
    import ControlBar from './ControlBar.vue';
    import ItemSelectionGrid from './ItemSelectionGrid.vue';
    import ItemSelectionTable from './ItemSelectionTable.vue';
    import { loadedLocale } from '@/modules/core/localization';
    import type { ItemService } from '@/modules/api-services/items';

    const props = defineProps<{
        itemService: ItemService,
        itemIdEditing?: number | null,
        defaultViewIsGrid?: boolean
    }>();

    const itemType = computed(() => props.itemService.getItemType());

    const isGridView = ref(props.defaultViewIsGrid);
    const page = ref(1);
    const maxPage = ref(1);
    const perPage = ref(10);
    const searchQuery = ref("");

    const data = ref();

    async function refreshPage() {
        if (props.itemIdEditing && props.itemIdEditing !== null) return;
        const results = await props.itemService.getItems(perPage.value, page.value, searchQuery.value);
        
        maxPage.value = results.lastPage;
        if (results.lastPage < page.value) {
            page.value = results.lastPage;
        } else {
            data.value = results.data;
        }
    }

    watch([page, perPage, searchQuery, loadedLocale, () => props.itemIdEditing], refreshPage);
    onMounted(refreshPage);

    defineEmits([
        "clickItem"
    ]);
</script>

<template>
    <div>
        <ControlBar
            :is-grid-view="isGridView"
            @toggle-view="isGridView = !isGridView"
            v-model:page="page"
            v-model:max-page="maxPage"
            v-model:per-page="perPage"
            v-model:search-query="searchQuery"
            @prev-page="page -= 1"
            @next-page="page += 1"
        />
        <div v-if="data">
            <ItemSelectionGrid :data="data" :item-service="itemService" :action-name="itemService.getActionName()" @click-item="id => $emit('clickItem', id)" v-if="isGridView" />
            <ItemSelectionTable :data="data" :item-type="itemType" :action-name="itemService.getActionName()" @click-item="id => $emit('clickItem', id)" v-else />
        </div>
    </div>
</template>
