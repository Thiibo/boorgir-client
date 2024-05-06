<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/order">Order</RouterLink>
      </div>
      <h1>Boorgir</h1>
      <div>
        <!-- Language button -->
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
