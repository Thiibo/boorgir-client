<script setup lang="ts">
    defineProps<{
        title: string
    }>();
</script>

<template>
    <div id="component">
        <img src="../assets/images/background.jpg" alt="Atmospheric photo">
        <div id="form">
            <h2>{{ title }}</h2>
            <slot></slot>
        </div>
    </div>    
</template>

<style lang="scss" scoped>
#component {
    display: flex;
    gap: 3rem;
}

img {
    height: 80vh;
    width: 0;
    border-radius: 1rem;
    flex: 1;
    object-fit: cover;
    opacity: .2;
}

#form {
    width: 23rem;
    border-radius: 1rem;
    background: var(--color-background-mute);
    padding: 3rem;
    
    h2 {
        font-size: 2rem;
        font-weight: bold;
    }
}
</style>
