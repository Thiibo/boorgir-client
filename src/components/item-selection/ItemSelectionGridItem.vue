<script setup lang="ts">
    import { computed, onMounted, ref, watch } from 'vue';
    import { ItemService, type ItemData } from '../../modules/api-services/items';
    import { currentLocale, translate } from '@/modules/core/localization';
    import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import ItemImage from './ItemImage.vue';

    const props = defineProps<{
        itemService: ItemService,
        item: ItemData,
        actionName: string
    }>();

    const thumbnail = ref<File>();
    const itemName = computed(() => props.item.translations?.find(translation => translation.lang === currentLocale.value)!.name ?? props.item.name!);
    const extraColumns = props.itemService.getExtraTableColumns(props.item);
    
    async function refreshThumbnail() {
        props.itemService.getThumbnail(props.item.id)
            .then(res => thumbnail.value = res as File)
            .catch(() => undefined); // image not found, so ignore error
    }
    onMounted(refreshThumbnail);
    watch(() => props.item, refreshThumbnail);

    defineEmits([
        "clickItem"
    ]);
</script>

<template>
    <div class="grid-item">
        <div class="top">
            <ItemImage class="item-image" :file="thumbnail" :alt="itemName" />
            <span class="price">€ {{ (item.price ?? 0).toFixed(2) }}</span>
            <div class="vegetarian" :title="translate('general.itemselection.column.ingredients.vegetarian')" v-if="'vegetarian' in item && item.vegetarian">
                <FontAwesomeIcon :icon="faAppleWhole" />
            </div>
            <span class="order-amount" v-if="extraColumns.amount?.length > 0">x{{ extraColumns.amount }}</span>
        </div>
        <h3>{{ itemName }}</h3>
        <button @click="$emit('clickItem', item.id)">{{ actionName }}</button>
    </div>
</template>

<style lang="scss" scoped>
    .grid-item {
        position: relative;
        background-color: var(--color-background-mute);
        border: .1rem solid gray;
        border-radius: 1rem;
        overflow: hidden;

        .item-image {
            width: 100%;
            height: 8rem;
            object-fit: cover;

            &:is(img) {
                background-color: white;
            }
        }

        h3 {
            padding: .2rem 1rem;
            font-weight: bold;
            font-size: 1.4rem;
        }

        .top {
            position: relative;
        }

        .price, .vegetarian, .order-amount {
            position: absolute;
            top: 1rem;
            left: 1rem;
            font-size: .8rem;
            padding: .2rem .4rem;
            border-radius: .6rem;
            background-color: var(--color-background-mute);
        }

        .vegetarian, .order-amount {
            left: unset;
            right: 1rem;
        }

        .order-amount {
            top: unset;
            bottom: 1rem;
        }

        button {
            display: block;
            z-index: 3;
            margin: .6rem 1rem;
            margin-left: auto;
        }
    }
</style>
