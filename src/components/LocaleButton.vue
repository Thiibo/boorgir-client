<script setup lang="ts">
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faEarthAmerica } from '@fortawesome/free-solid-svg-icons';
    import { AVAILABLE_LOCALES, getLocale, type Locale } from '@/modules/core/localization';
    import { computed } from 'vue';

    const currentLocale = getLocale();
    const currentLocaleInformation = computed(() => AVAILABLE_LOCALES[currentLocale.value]);
    const availableLocaleCodes = computed(() => Object.keys(AVAILABLE_LOCALES) as Locale[]);
</script>

<template>
    <div id="locale-button">
        <div>
            <FontAwesomeIcon :icon="faEarthAmerica" />
            <span>{{ currentLocaleInformation.unicodeFlag }}</span>
        </div>
        <select name="locale" id="locale" v-model="currentLocale">
            <option v-for="localeCode in availableLocaleCodes" :value="localeCode" :selected="localeCode === currentLocale">{{ AVAILABLE_LOCALES[localeCode].name }}</option>
        </select>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/mixins/text-outline.scss';

    #locale-button {
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
        pointer-events: none;

        div {
            position: relative;
            display: inline-block;
            font-size: 1.5rem;
            font-weight: normal;
            padding: 0;
            z-index: -1;
            pointer-events: none;
    
            &::before, &::after {
                display: none;
            }
    
            span {
                position: absolute;
                bottom: -20%;
                right: -30%;
                font-size: 1.1rem;
                @include textOutline(.05rem, white);
            }
        }

        &:has(:focus-visible) {
            outline: var(--outline-style);
        }
    }

    select {
        position: absolute;
        inset: 0;
        opacity: 0;
        width: 100%;
        z-index: 20;
        pointer-events: all;
    }
</style>
