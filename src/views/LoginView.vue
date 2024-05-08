<script setup lang="ts">
  import { ref } from 'vue';
  import { login } from '@/modules/api-services/auth';
  import SideForm from '@/components/SideForm.vue';
  import ValidationErrors from '@/components/ValidationErrors.vue';
  import type { ValidationError } from '@/modules/core/validation-error';
  import { translate } from '@/modules/core/localization';

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
    <SideForm :title="translate('front.page.login')">
      <form @submit.prevent="submit">
        <label for="email">{{ translate('general.form.email') }}</label>
        <input id="email" name="email" type="email" required v-model="email">
        <ValidationErrors :errors="validationErrors?.email" />

        <label for="password">{{ translate('general.form.password') }}</label>
        <input id="password" name="password" type="password" required v-model="password">
        <ValidationErrors :errors="validationErrors?.password" />

        <button>{{ translate('front.page.login.submit') }}</button>
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

  input {
    width: 100%;
  }
</style>
