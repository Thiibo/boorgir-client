<script setup lang="ts">
  import { translate } from '@/modules/core/localization';
</script>

<template>
  <main>
    <section id="intro">
      <div class="wrapper">
        <RouterLink to="/order" class="button">{{ translate('front.page.home.cta') }}</RouterLink>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
  main {
    position: absolute;
    top: 2rem;
    left: 0;
    width: 100%;
  }

  #intro {
    text-align: center;
    font-size: 1.2rem;
    background-image: url('@/assets/images/background.jpg');
    background-size: cover;
    border-radius: 1rem;
    overflow: hidden;

    .wrapper {
      background-color: var(--color-home-intro-overlay);
      backdrop-filter: blur(.5rem);
      padding-top: 10rem;
      padding-bottom: 10rem;
    }
  }
</style>
