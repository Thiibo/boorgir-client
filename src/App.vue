<script setup lang="ts">
import { RouterView } from 'vue-router';
import SiteHeader from '@/components/front/SiteHeader.vue';
</script>

<template>
  <div>
    <SiteHeader />
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
  div {
    position: relative;
  }
</style>
