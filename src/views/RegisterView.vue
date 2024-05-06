<script setup lang="ts">
  import { ref } from 'vue';
  import SideForm from '../components/SideForm.vue';
  import ValidatedInput from '@/components/ValidatedInput.vue';

  const email = ref("");
  const password = ref("");
  const password_confirmation = ref("");
  function submit() {

  }
</script>

<template>
  <main>
    <SideForm title="Register">
      <form @submit.prevent="submit">
        <ValidatedInput id="email" label="Email address:" required type="text" v-model="email" />
        <ValidatedInput id="password" label="Password:" required type="password" v-model="password" />
        <ValidatedInput id="password_confirmation" label="Repeat password:" required type="password" v-model="password_confirmation" />
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
