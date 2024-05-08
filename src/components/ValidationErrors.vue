<script setup lang="ts">
    defineProps<{
        errors?: string[]
    }>();
</script>

<template>
    <ul class="validation-errors" v-if="errors">
        <li v-for="error in errors">{{ error }}</li>
    </ul>
</template>

<style lang="scss" scoped>
    .validation-errors {
        margin-top: .4rem;
        padding-left: 2ex;
        list-style: symbols('-');
        color: rgb(253, 67, 67);
    }
</style>
