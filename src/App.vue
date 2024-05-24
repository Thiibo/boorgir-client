<script setup lang="ts">
  import { RouterView, useRoute } from 'vue-router';
  import SiteHeader from '@/components/front/SiteHeader.vue';
  import { computed } from 'vue';
  import NavigationSidebar from './components/back-office/NavigationSidebar.vue';
  import NotificationComponent from '@/components/general/Notification.vue';
  import Notification from './modules/core/notifications';

  const route = useRoute();
  const isFront = computed(() => route?.meta?.isFront ?? true);
</script>

<template>
  <div>
    <ul class="notifications">
        <li v-for="notification in Notification.instances.value">
          <NotificationComponent :notification="notification" />
        </li>
    </ul>
    <div class="front" v-if="isFront">
      <SiteHeader />
      <RouterView />
    </div>
    <div class="back-office" v-else>
      <NavigationSidebar />
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .notifications {
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    list-style: none;
    z-index: 6;
  }

  div {
    flex-direction: column;
    position: relative;

    .front {
      width: 90%;
      margin: 0 auto;
      padding: 2rem;
    }

    .back-office {
      display: flex;
      flex-direction: row;
      height: 100vh;
      max-height: 100vh;
      overflow: hidden;
    }
  }
</style>
