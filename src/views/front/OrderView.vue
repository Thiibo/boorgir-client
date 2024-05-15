<script setup lang="ts">
  import OrderDialog from '@/components/front/OrderDialog.vue';
  import ItemSelection from '@/components/item-selection/ItemSelection.vue';
  import { ItemService } from '@/modules/api-services/items';
  import { translate } from '@/modules/core/localization';
  import { ref } from 'vue';

  const itemAmounts = ref<{[id: string]: { data: StringKeyValueObject, amount: number }}>({})
  const itemIdOpen = ref<number | null>(null);
  const itemService = new ItemService('burgers', false, { "front.page.order.amountColumn": (id) => itemAmounts.value[id]?.amount ?? 0 });

  function setToOrderAmount(itemData: {[key: string]: any}, amount: number) {
    itemAmounts.value[itemData.id] = {
      data: itemData,
      amount: amount
    };
  }
</script>

<template>
  <main>
    <ItemSelection id="item-selection" :item-service="itemService" :item-id-editing="itemIdOpen" :default-view-is-grid="true" @click-item="itemId => itemIdOpen = itemId" />
    <OrderDialog :item-service="itemService" :item-id="itemIdOpen" :order-amount="itemAmounts[itemIdOpen]?.amount ?? 0" @close="itemIdOpen = null" @set-order-amount="setToOrderAmount" v-if="itemIdOpen" />
    <div id="order">
      <h2>{{ translate('front.page.order.receipttitle') }}</h2>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    display: flex;
    gap: 3rem;

    div {
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
  }
</style>
