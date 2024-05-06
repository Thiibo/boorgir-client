<script setup lang="ts">
  import SideForm from '../components/SideForm.vue';

  function submit() {

  }
</script>

<template>
  <main>
    <SideForm title="Register">
      <form @submit.prevent="submit">
        <label for="email">Email address:</label>
        <input type="text" name="email" id="email">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password">
        <label for="repeat-password">Repeat password:</label>
        <input type="repeat-password" name="repeat-password" id="repeat-password">
        <button>Register</button>
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
