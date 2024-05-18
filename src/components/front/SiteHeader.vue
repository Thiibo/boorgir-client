<script setup lang="ts">
  import { translate } from '@/modules/core/localization';
  import LocaleButton from '@/components/LocaleButton.vue';
  import { computed, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { isLoggedIn, logout, profileData } from '@/modules/api-services/auth';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faArrowRight, faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
  
  const route = useRoute();
  const routeName = computed(() => route.name);

  const profileElement = ref();
  const profileDialogOpen = ref(false);

  function clickedSomewhere(e: MouseEvent) {
    if (profileElement.value && e.target !== profileElement.value && !profileElement.value.contains(e.target)) {
      profileDialogOpen.value = false;
    }
  }
  onMounted(() => document.addEventListener('click', clickedSomewhere));
  onBeforeUnmount(() => document.removeEventListener('click', clickedSomewhere));
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">{{ translate('front.page.home') }}</RouterLink>
      <RouterLink to="/order">{{ translate('front.page.order') }}</RouterLink>
      <div class="wrapper">
        <h1 :class="{ enlarge: routeName === 'home' }">Boorgir</h1>
      </div>
      <LocaleButton />
      <RouterLink to="/register" v-if="!isLoggedIn">{{ translate('front.page.register') }}</RouterLink>
      <RouterLink to="/login" class="button" v-if="!isLoggedIn">{{ translate('front.page.login') }}</RouterLink>

      <div class="profile" ref="profileElement" v-else>
        <button class="icon-button" @click="profileDialogOpen = !profileDialogOpen">
          <FontAwesomeIcon :icon="faUser" />
        </button>
        <div class="popup" v-show="profileDialogOpen">
          <span>{{ profileData?.name }}</span>
          <span class="email">{{ profileData?.email }}</span>
          <RouterLink to="/admin/ingredients" v-if="profileData?.is_admin">
            {{ translate("front.page.admin") }}
            <FontAwesomeIcon :icon="faArrowRight" />
          </RouterLink>
          <button class="logout" @click="logout">
            <FontAwesomeIcon :icon="faArrowRightFromBracket" />
            {{ translate("general.action.profile.logout") }}
          </button>
        </div>
      </div>
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

.profile {
  position: relative;

  > button {
    padding: .5rem;
  }

  .popup {
    position: absolute;
    top: 3.2rem;
    right: -.2rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: var(--color-background-mute);
    box-shadow: 0 0 2rem 0 rgba(0, 0, 0, .6);
    
    &::before {
      $size: .6rem;
      content: '';
      position: absolute;
      top: -$size * .5;
      display: block;
      right: 1rem;
      width: $size;
      height: $size;
      background-color: var(--color-background-mute);
      transform: rotate(45deg);
    }

    span {
      display: block;

      &.email {
        font-size: .9rem;
        color: gray;
      }
    }

    a {
      display: block;
      font-size: 1rem;
      margin-top: 1rem;
      white-space: nowrap;
      width: min-content;

      svg {
        display: inline-block;
        margin-left: .5rem;
      }
    }

    button {
      display: block;
      margin-top: 1rem;
      width: 100%;
      white-space: nowrap;
      z-index: 1;

      svg {
        margin-right: .3rem;
      }
    }
  }
}
</style>
