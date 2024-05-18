<script setup lang="ts">
  import OrderDialog from '@/components/front/OrderDialog.vue';
  import ItemSelection from '@/components/item-selection/ItemSelection.vue';
  import { ItemService } from '@/modules/api-services/items';
  import { translate } from '@/modules/core/localization';
  import { computed, ref } from 'vue';

  const itemAmounts = ref<{[id: string]: { data: AnyKeyValueObject, amount: number }}>({})
  const itemIdOpen = ref<number | null>(null);
  const itemService = new ItemService('burgers', false, { "front.page.order.amountColumn": (id) => itemAmounts.value[id]?.amount ?? 0 });
  const subTotal = computed(() => Object.values(itemAmounts.value).reduce((acc, curr) => acc + curr.amount * curr.data.price, 0));

  function setToOrderAmount(itemData: AnyKeyValueObject, amount: number) {
    if (amount > 0) {
      itemAmounts.value[itemData.id] = {
        data: itemData,
        amount: amount
      };
    } else {
      delete itemAmounts.value[itemData.id]
    }
  }
</script>

<template>
  <main>
    <ItemSelection id="item-selection" :item-service="itemService" :item-id-editing="itemIdOpen" :default-view-is-grid="true" @click-item="itemId => itemIdOpen = itemId" />
    <OrderDialog :item-service="itemService" :item-id="itemIdOpen" :order-amount="itemAmounts[itemIdOpen]?.amount ?? 0" @close="itemIdOpen = null" @set-order-amount="setToOrderAmount" v-if="itemIdOpen" />
    <div id="order">
      <h2>{{ translate('front.page.order.receipttitle') }}</h2>
      <ul>
        <li v-for="itemAmount in itemAmounts">
          {{ itemAmount.data.name }}:
          {{ itemAmount.amount }}x
          € {{ itemAmount.data.price.toFixed(2) }}
          = € {{ (itemAmount.amount * itemAmount.data.price).toFixed(2) }}
        </li>
      </ul>
      <div class="subtotal">
        {{ translate('front.itemselection.subtotal') }}: € {{ subTotal.toFixed(2) }}
      </div>
      <button>{{ translate('front.itemselection.action.order') }}</button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    display: flex;
    gap: 3rem;

    > div {
      height: 80vh;
    }
  }

  #item-selection {
    flex: 1;
  }

  #order {
    width: 20rem;
    padding: 3rem;
    background-color: var(--color-background-mute);
    height: min-content;
    border-radius: 1rem;

    h2 {
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
    }

    ul {
      padding-left: 1rem;
      margin-top: 1rem;
    }

    .subtotal {
      border-top: .1rem solid gray;
      margin-top: 2rem;
      padding: 1rem;
    }

    button {
      display: block;
      z-index: 5;
      margin: 2rem auto 0;
    }
  }
</style>
