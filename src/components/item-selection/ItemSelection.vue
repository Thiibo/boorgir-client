<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import ControlBar from './ControlBar.vue';
    import ItemSelectionGrid from './ItemSelectionGrid.vue';
    import ItemSelectionTable from './ItemSelectionTable.vue';
    import { currentLocale } from '@/modules/core/localization';

    const props = defineProps<{
        itemGetter: (perPage: number, page: number) => Promise<PaginatedApiResult>,
        defaultViewIsGrid?: boolean
    }>();

    const isGridView = ref(props.defaultViewIsGrid);
    const page = ref(1);
    const maxPage = ref(1);
    const perPage = ref(10);
    const searchQuery = ref("");

    const data = ref();

    async function refreshPage() {
        const results = await props.itemGetter(perPage.value, page.value);
        
        maxPage.value = results.last_page;
        if (results.last_page < page.value) {
            page.value = results.last_page;
        } else {
            data.value = results.data;
        }
    }

    watch([page, perPage, searchQuery, currentLocale], refreshPage);
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
        <ItemSelectionTable :data="data" v-if="data && !isGridView" />
    </div>
</template>
