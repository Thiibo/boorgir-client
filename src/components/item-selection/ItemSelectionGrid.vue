<script setup lang="ts">
    import { ItemService } from '@/modules/api-services/items';
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

    function getItemTranslatedColumn(item: {[key: string]: any}, column: string) {
        const nameColumnTranslated = props.itemService.translateColumnName(column);
        return item[nameColumnTranslated] ?? item[`${column} (${AVAILABLE_LOCALES[currentLocale.value].name})`];
    }

    function getItemAmount(item: {[key: string]: any}) {
        const nameColumnTranslated = translate('front.page.order.amountColumn');
        return item[nameColumnTranslated] as number;
    }

    defineEmits([
        "clickItem"
    ]);
</script>

<template>
    <div class="selection-grid" v-if="data">
        <div v-for="(item, key) in data">
            <div class="top" v-if="getItemTranslatedColumn(item, 'name')">
                <ItemImage class="item-image" :file="thumbnails[key]" :alt="getItemTranslatedColumn(item, 'name')" />
                <span class="price">€ {{ (getItemTranslatedColumn(item, 'price') ?? 0).toFixed(2) }}</span>
                <div class="vegetarian" :title="translate('general.itemselection.column.ingredients.vegetarian')" v-if="getItemTranslatedColumn(item, 'vegetarian')">
                    <FontAwesomeIcon :icon="faAppleWhole" />
                </div>
                <span class="order-amount" v-if="getItemAmount(item) > 0">x{{ getItemAmount(item) }}</span>
            </div>
            <h3>{{ getItemTranslatedColumn(item, 'name') }}</h3>
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
                background-color: var(--color-background-soft);
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
    }
</style>
