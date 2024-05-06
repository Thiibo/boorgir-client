<template>
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/order">Order</RouterLink>
        <div class="wrapper">
          <h1>Boorgir</h1>
        </div>
        <!-- Language button -->
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/login" class="button">Login</RouterLink>
      </nav>
    </header>
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  position: relative;
  font-size: 1.2rem;
  gap: 4rem;

  .wrapper {
    flex: 1;
    
    h1 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-size: 2em;
      font-weight: bold;
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
</style>
