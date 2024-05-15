<script setup lang="ts">
    import type { ItemService } from '@/modules/api-services/items';
    import { translate } from '@/modules/core/localization';
    import { faClose } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { computed, onMounted, ref } from 'vue';

    const props = defineProps<{
        itemService: ItemService,
        itemId: number,
        orderAmount: number
    }>();

    const itemType = computed(() => props.itemService.getItemType());
    const itemData = ref<{[key: string]: any}>();
    const itemAmount = ref(props.orderAmount);
    const dialogElement = ref();

    onMounted(async () => {
        itemData.value = await props.itemService.getItem(props.itemId);
        dialogElement.value.showModal();
    });

    function closeWithEscape(e: KeyboardEvent) {
        if (e.key === "Escape") {
            e.preventDefault();
            closeDialog();
        };
    }

    const emit = defineEmits([
        "close",
        "setOrderAmount"
    ]);

    function closeDialog() {
        dialogElement.value?.close();
        emit('close');
    }

    function setOrderAmount() {
        emit('setOrderAmount', itemData.value, itemAmount.value);
        emit('close');
    }
</script>

<template>
    <dialog ref="dialogElement" @keydown="closeWithEscape" @click.self="closeDialog">
        <div>
            <div class="title">
                <h2>{{ itemData?.name }}</h2>
                <button @click="closeDialog" :title="translate('general.action.closedialog')">
                    <FontAwesomeIcon :icon="faClose" />
                </button>
            </div>
            <h3>{{ translate('general.itemselection.column.burgers.description') }}:</h3>
            <p>{{ itemData?.description }}</p>
            <h3>{{ translate('general.itemselection.column.burgers.ingredients') }}:</h3>
            <ul v-if="itemData?.ingredients.length > 0">
                <li v-for="ingredient in itemData?.ingredients">{{ ingredient }}</li>
            </ul>
            <p v-else>{{ translate('front.itemselection.noingredients') }}</p>
            <div class="order-amount">
                <span>€ {{ itemData?.price.toFixed(2) }} x</span>
                <input type="number" name="amount" id="amount" min="0" max="99" v-model="itemAmount">
                <span>= € {{ (itemData?.price * itemAmount).toFixed(2) }}</span>
            </div>
            <button class="continue" @click="setOrderAmount">{{ translate('front.itemselection.continue') }}</button>
        </div>
    </dialog>
</template>

<style lang="scss" scoped>
    dialog {
        padding: 0;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background-color: var(--color-background-mute);
        border: none;
        color: var(--color-text);

        > div {
            width: 100%;
            height: 100%;
            padding: 1rem;
            padding: 2rem;
        }

        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: .1rem solid var(--color-text);
            margin-bottom: 1rem;

            h2 {
                font-size: 2rem;
            }

            button {
                font-size: 2rem;

                &::before, &::after {
                    display: none;
                }
            }
        }

        h3 {
            margin: 1rem 0;
            text-transform: capitalize;
        }

        .order-amount {
            margin-top: 2rem;
            border-top: .1rem solid gray;
            border-bottom: .1rem solid gray;
            padding: 1rem 0;
        
            input {
                margin: 0 1ex;
            }
        }


        .continue {
            display: block;
            margin: 2rem auto 0;
        }
    }
</style>
