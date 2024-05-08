<script setup lang="ts">
  import { ref } from 'vue';
  import { login } from '@/modules/api-services/auth';
  import SideForm from '@/components/SideForm.vue';
  import ValidationErrors from '@/components/ValidationErrors.vue';
  import type { ValidationError } from '@/modules/core/validation-error';

  const validationErrors = ref<StringArrayKeyValueObject>();

  const email = ref("");
  const password = ref("");
  function submit() {
    login(email.value, password.value)
      .then(res => console.log(res))
      .catch((error: ValidationError) => validationErrors.value = error.errors);
  }
</script>

<template>
  <div>
    <SideForm title="Log in">
      <form @submit.prevent="submit">
        <label for="email">Email address:</label>
        <input id="email" name="email" type="email" required v-model="email">
        <ValidationErrors :errors="validationErrors?.email" />

        <label for="password">Password:</label>
        <input id="password" name="password" type="password" required v-model="password">
        <ValidationErrors :errors="validationErrors?.password" />

        <button>Log in</button>
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
