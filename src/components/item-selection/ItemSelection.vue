<script setup lang="ts">
    import { ref, watch } from 'vue';
    import ControlBar from './ControlBar.vue';

    const props = defineProps<{
        itemGetter: (perPage: number, page: number) => Promise<PaginatedApiResult>
    }>();

    const isGridView = ref(true);
    const page = ref(1);
    const maxPage = ref(2);
    const perPage = ref(10);
    const searchQuery = ref("");

    function refreshPage() {
        props.itemGetter(perPage.value, page.value)
            .then(res => console.log(res));
    }

    watch([page, perPage, searchQuery], refreshPage);
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
    </div>
</template>
