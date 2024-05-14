<script setup lang="ts">
    import { computed, onMounted, ref, watch } from 'vue';
    import ControlBar from './ControlBar.vue';
    import ItemSelectionGrid from './ItemSelectionGrid.vue';
    import ItemSelectionTable from './ItemSelectionTable.vue';
    import { loadedLocale } from '@/modules/core/localization';
    import type { ItemService } from '@/modules/api-services/items';

    const props = defineProps<{
        itemService: ItemService,
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
        const results = await props.itemService.getItems(perPage.value, page.value, searchQuery.value);
        
        maxPage.value = results.lastPage;
        if (results.lastPage < page.value) {
            page.value = results.lastPage;
        } else {
            data.value = results.data;
        }
    }

    watch([page, perPage, searchQuery, loadedLocale], refreshPage);
    onMounted(refreshPage);
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
        <ItemSelectionGrid :data="data" v-if="data && isGridView" />
        <ItemSelectionTable :data="data" :item-type="itemType" v-if="data && !isGridView" />
    </div>
</template>
