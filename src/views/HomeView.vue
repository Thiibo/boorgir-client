<script setup lang="ts">
</script>

<template>
  <main>
    <section id="intro">
      <div class="wrapper">
        <p>I would love a...</p>
        <RouterLink to="/order" class="button">Continue</RouterLink>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
  main {
    position: absolute;
    top: 0;
    width: 100%;
  }

  #intro {
    text-align: center;
    font-size: 1.2rem;
    background-image: url('../assets/images/home-background.jpg');
    background-size: cover;
    border-radius: 1rem;
    overflow: hidden;

    .wrapper {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(.3rem);
      padding-top: 10rem;
      padding-bottom: 10rem;
    }
  }
</style>
