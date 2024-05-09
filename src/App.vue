<script setup lang="ts">
  import { RouterView, useRoute } from 'vue-router';
  import SiteHeader from '@/components/front/SiteHeader.vue';
  import { computed } from 'vue';
  import NavigationSidebar from './components/back-office/NavigationSidebar.vue';

  const route = useRoute();
  const isFront = computed(() => route?.meta?.isFront ?? true);
</script>

<template>
  <div>
    <div class="front" v-if="isFront">
      <SiteHeader />
      <RouterView />
    </div>
    <div class="back-office" v-else>
      <NavigationSidebar />
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  div {
    flex-direction: column;
    position: relative;

    .front {
      width: 90%;
      margin: 0 auto;
      padding: 2rem;
    }

    .back-office {
      display: flex;
      flex-direction: row;
      height: 100vh;
    }
  }
</style>
