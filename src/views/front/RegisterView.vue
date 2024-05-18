<script setup lang="ts">
  import { ref } from 'vue';
  import { register } from '@/modules/api-services/auth';
  import SideForm from '@/components/front/SideForm.vue';
  import ValidationErrors from '@/components/general/ValidationErrors.vue';
  import type { ValidationError } from '@/modules/core/validation-error';
  import { translate } from '@/modules/core/localization';

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
    <SideForm :title="translate('front.page.register')">
      <form @submit.prevent="submit">
        <label for="name">{{ translate('general.form.name') }}</label>
        <input id="name" name="name" type="text" required v-model="name">
        <ValidationErrors :errors="validationErrors?.name" />

        <label for="email">{{ translate('general.form.email') }}</label>
        <input id="email" name="email" type="email" required v-model="email">
        <ValidationErrors :errors="validationErrors?.email" />

        <label for="password">{{ translate('general.form.password') }}</label>
        <input id="password" name="password" type="password" required v-model="password">
        <ValidationErrors :errors="validationErrors?.password" />

        <label for="password-confirm">{{ translate('general.form.passwordconfirmation') }}</label>
        <input id="password-confirm" name="password-confirm" type="password" required v-model="passwordConfirmation">
        <ValidationErrors :errors="validationErrors?.password" />

        <button>{{ translate('front.page.register.submit') }}</button>
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
