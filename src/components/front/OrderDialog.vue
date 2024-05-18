<script setup lang="ts">
    import type { ItemService } from '@/modules/api-services/items';
    import { translate } from '@/modules/core/localization';
    import { onMounted, ref } from 'vue';
    import AppDialog from '../general/AppDialog.vue';

    const props = defineProps<{
        itemService: ItemService,
        itemId: number,
        orderAmount: number
    }>();

    const itemData = ref<AnyKeyValueObject>();
    const itemAmount = ref(props.orderAmount);
    const dialogElement = ref();

    onMounted(async () => {
        itemData.value = await props.itemService.getItem(props.itemId);
    });

    const emit = defineEmits([
        "close",
        "setOrderAmount"
    ]);

    function closeDialog() {
        if (dialogElement.value.open) dialogElement.value.close();
        emit('close');
    }

    function setOrderAmount() {
        emit('setOrderAmount', itemData.value, itemAmount.value);
        closeDialog();
    }
</script>

<template>
    <AppDialog :title="itemData.name" @close="closeDialog" ref="dialogElement" v-if="itemData">
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
    </AppDialog>
</template>

<style lang="scss" scoped>
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
</style>
