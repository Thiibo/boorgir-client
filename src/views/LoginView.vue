<script setup lang="ts">
  import SideForm from '../components/SideForm.vue';

  function submit() {
    
  }
</script>

<template>
  <main>
    <SideForm title="Log in">
      <form @submit.prevent="submit">
        <label for="email">Email address:</label>
        <input type="text" name="email" id="email">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password">
        <button>Log in</button>
      </form>
    </SideForm>
  </main>
</template>

<style lang="scss" scoped>
  label {
    display: block;
    margin-top: 2rem;
  }

  button {
    margin-top: 3rem;
    z-index: 1;
  }
</style>
