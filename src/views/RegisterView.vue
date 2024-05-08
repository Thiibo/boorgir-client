<script setup lang="ts">
  import { ref } from 'vue';
  import { register } from '@/modules/api-services/auth';
  import SideForm from '../components/SideForm.vue';
  import ValidationErrors from '@/components/ValidationErrors.vue';
  import type { ValidationError } from '@/modules/core/validation-error';

  const validationErrors = ref<StringArrayKeyValueObject>();

  const name = ref("");
  const email = ref("");
  const password = ref("");
  const passwordConfirmation = ref("");
  function submit() {
    register(name.value, email.value, password.value, passwordConfirmation.value)
      .then(res => console.log(res))
      .catch((error: ValidationError) => validationErrors.value = error.errors);
  }
</script>

<template>
  <div>
    <SideForm title="Register">
      <form @submit.prevent="submit">
        <label for="name">Name:</label>
        <input id="name" name="name" type="text" required v-model="name">
        <ValidationErrors :errors="validationErrors?.name" />

        <label for="email">Email address:</label>
        <input id="email" name="email" type="email" required v-model="email">
        <ValidationErrors :errors="validationErrors?.email" />

        <label for="password">Password:</label>
        <input id="password" name="password" type="password" required v-model="password">
        <ValidationErrors :errors="validationErrors?.password" />

        <label for="password-confirm">Repeat Password:</label>
        <input id="password-confirm" name="password-confirm" type="password" required v-model="passwordConfirmation">
        <ValidationErrors :errors="validationErrors?.password" />

        <button>Register</button>
        <ValidationErrors :errors="validationErrors?.general" />
      </form>
    </SideForm>
  </div>
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
