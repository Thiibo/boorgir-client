<script setup lang="ts">
  import LocaleButton from './LocaleButton.vue';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const routeName = computed(() => route.name);
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/order">Order</RouterLink>
      <div class="wrapper">
        <h1 :class="{ enlarge: routeName === 'home' }">Boorgir</h1>
      </div>
      <LocaleButton />
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/login" class="button">Login</RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  position: relative;
  font-size: 1.2rem;
  gap: 4rem;
  padding: 1.5rem 3rem;
  margin-bottom: 2rem;
  z-index: 10;

  .wrapper {
    flex: 1;
    
    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-size: 2em;
      font-weight: bold;
      transition: transform .3s ease-in-out, font-size .3s ease-in-out;

      &.enlarge {
        transform: translateX(-50%);
        font-size: 3.5em;
      }
    }
  }

  a:not(.button) {
    &::after {
      content: '';
      display: block;
      height: .2ex;
      width: 0;
      background-color: var(--color-text);
      transition: width .2s ease-in-out;
    }

    &.router-link-active::after {
      width: 100%;
    }
  }
}
</style>./LocaleButton.vue
