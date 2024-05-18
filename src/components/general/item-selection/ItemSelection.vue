<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import ControlBar from './ControlBar.vue';
    import ItemSelectionGrid from './ItemSelectionGrid.vue';
    import ItemSelectionTable from './ItemSelectionTable.vue';
    import { loadedLocale, translate } from '@/modules/core/localization';
    import type { ItemActionNameGenerator, ItemData, ItemService } from '@/modules/api-services/items';

    const props = defineProps<{
        itemService: ItemService,
        itemIdEditing?: number | null,
        defaultViewIsGrid?: boolean,
        actionNameGenerator?: ItemActionNameGenerator
    }>();

    const isGridView = ref(props.defaultViewIsGrid);
    const page = ref(1);
    const maxPage = ref(1);
    const perPage = ref(10);
    const searchQuery = ref("");

    const data = ref<ItemData[] | null>(null);

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
        "itemAction"
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
        <div v-if="data && data.length > 0">
            <ItemSelectionGrid class="grid" :data="data" :item-service="itemService" :action-name-generator="actionNameGenerator" @item-action="item => $emit('itemAction', item)" v-if="isGridView" />
            <ItemSelectionTable class="table" :data="data" :item-service="itemService" :action-name-generator="actionNameGenerator" @item-action="item => $emit('itemAction', item)" v-else />
        </div>
        <p v-else>{{ translate("general.itemselection.noitems") }}</p>
    </div>
</template>

<style lang="scss" scoped>
    p {
        margin: 2rem 0;
        text-align: center;
    }

    .grid {
        margin: 2rem;
    }

    .table {
        margin-top: 1rem;
    }
</style>
