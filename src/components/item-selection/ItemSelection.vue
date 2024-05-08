<script setup lang="ts">
    import { ref } from 'vue';
    import ControlBar from './ControlBar.vue';

    const isGridView = ref(true);
    const page = ref(0);
    const maxPage = ref(2);
    const perPage = ref(10);
    const searchQuery = ref("");
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
