<script setup lang="ts">
  import { ref } from 'vue';
  import { login } from '@/modules/auth/authservice';
  import SideForm from '@/components/SideForm.vue';
  import ValidatedInput from '@/components/ValidatedInput.vue';

  const email = ref("");
  const password = ref("");
  function submit() {
    login(email.value, password.value);
  }
</script>

<template>
  <main>
    <SideForm title="Log in">
      <form @submit.prevent="submit">
        <ValidatedInput id="email" label="Email address:" type="text" required v-model="email" />
        <ValidatedInput id="password" label="Password:" type="password" required v-model="password" />
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
