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
        <ControlBar v-model:is-grid-view="isGridView" v-model:page="page" v-model:max-page="maxPage" v-model:per-page="perPage" v-model:search-query="searchQuery" />
    </div>
</template>
