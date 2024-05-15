<script setup lang="ts">
    import { type ItemService } from '@/modules/api-services/items';
    import ItemImage from './ItemImage.vue';
    import { onMounted, ref } from 'vue';
    import { AVAILABLE_LOCALES, currentLocale, translate } from '@/modules/core/localization';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faAppleWhole } from '@fortawesome/free-solid-svg-icons';

    const props = defineProps<{
        data: {[key: string]: any}[],
        itemService: ItemService,
        actionName: string
    }>();

    const thumbnails = ref<(File | undefined)[]>([]);

    onMounted(() => {
        Promise.all(props.data.map(item => props.itemService.getThumbnail(item.ID).catch(() => undefined)))
            .then(res => thumbnails.value = res as File[]);
    })

    function getItemName(item: StringKeyValueObject) {
        return item.name ?? item[`name (${AVAILABLE_LOCALES[currentLocale.value].name})`];
    }

    defineEmits([
        "clickItem"
    ]);
</script>

<template>
    <div class="selection-grid" v-if="data">
        <div v-for="(item, key) in data">
            <ItemImage class="item-image" :file="thumbnails[key]" :alt="getItemName(item)" />
            <h3>{{ getItemName(item) }}</h3>
            <span class="price">€ {{ item.price.toFixed(2) }}</span>
            <div class="vegetarian" :title="translate('general.itemselection.column.ingredients.vegetarian')" v-if="item.vegetarian">
                <FontAwesomeIcon :icon="faAppleWhole" />
            </div>
            <button @click="$emit('clickItem', item.ID)">{{ actionName }}</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/mixins/grid-auto-columns.scss';

    .selection-grid {
        display: grid;
        gap: 4rem;
        margin: 2rem;
        @include gridAutoColumns(8rem, 2%);

        > div {
            position: relative;
            background-color: var(--color-background-soft);
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

            .price, .vegetarian {
                position: absolute;
                top: 1rem;
                left: 1rem;
                font-size: .8rem;
                padding: .2rem .4rem;
                border-radius: .6rem;
                background-color: var(--color-background-soft);
            }

            .vegetarian {
                left: unset;
                right: 1rem;
            }

            button {
                display: block;
                z-index: 3;
                margin: .6rem 1rem;
                margin-left: auto;
            }
        }
    }
</style>
