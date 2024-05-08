<script setup lang="ts">
  import ItemSelection from '@/components/item-selection/ItemSelection.vue';
</script>

<template>
  <main>
    <ItemSelection id="item-selection" />
    <div id="order">
      <h2>Your order</h2>
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
