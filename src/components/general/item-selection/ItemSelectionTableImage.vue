<script setup lang="ts">
    import { ItemService, type ItemData, getItemName } from '@/modules/api-services/items';
    import { onMounted, ref, watch } from 'vue';
    import ItemImage from '../ItemImage.vue';

    const props = defineProps<{
        itemService: ItemService,
        item: ItemData
    }>();

    const image = ref<File>();

    function refreshImage() {
        props.itemService.getThumbnail(props.item.id)
            .then(res => image.value = res as File)
            .catch(() => image.value = undefined); // image not found, so ignore error
    }

    onMounted(refreshImage);
    watch(() => props.item, refreshImage);
</script>

<template>
    <ItemImage class="item-image" :file="image" :alt="getItemName(item)" />
</template>

<style lang="scss" scoped>
    .item-image {
        width: 5rem;
        height: 5rem;
        border-radius: 1rem;
    }
</style>
