<script setup lang="ts">
  import ItemSelection from '@/components/item-selection/ItemSelection.vue';
  import { ItemService } from '@/modules/api-services/items';
  import { translate } from '@/modules/core/localization';

  const itemService = new ItemService('ingredients');
</script>

<template>
  <main>
    <ItemSelection id="item-selection" :item-service="itemService" />
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
