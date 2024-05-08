<script setup lang="ts">
    import { faAngleLeft, faAngleRight, faFilter, faList, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { computed, ref } from 'vue';
    import SearchBar from '@/components/SearchBar.vue';

    const isGrid = ref(true);
    const page = ref(0);
    const maxPage = ref(2);
    const perPage = ref(10);
    const searchQuery = ref("");

    const viewButtonIcon = computed(() => isGrid.value ? faTableCellsLarge : faList);
</script>

<template>
    <div id="control-bar">
        <button @click="isGrid = !isGrid">
            <FontAwesomeIcon :icon="viewButtonIcon" />
        </button>

        <div class="control-group">
            <label for="page">Page:</label>
            <input type="number" name="page" id="page" v-model="page">
            <span>/ {{ maxPage }}</span>
        </div>

        <div class="control-group">
            <button>
                <FontAwesomeIcon :icon="faAngleLeft" />
            </button>
            <button>
                <FontAwesomeIcon :icon="faAngleRight" />
            </button>
        </div>

        <div class="control-group">
            <label for="perPage">Per page:</label>
            <input type="number" name="perPage" id="perPage" v-model="perPage">
        </div>

        <div class="control-group">
            <button>
                <FontAwesomeIcon :icon="faFilter" />
            </button>
            <SearchBar id="search-bar" v-model="searchQuery" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $button-height: 2.5rem;
    $control-group-gap-between: 2rem;
    $control-group-gap-within: .5rem;

    #control-bar {
        display: flex;
        align-items: center;
        gap: $control-group-gap-between;
        padding: 1rem;
        border-radius: 1rem;
        background-color: var(--color-background-mute);

        .control-group {
            display: flex;
            gap: $control-group-gap-within;
            align-items: center;

            // Align last item to the right
            &:nth-last-child(2) {
                flex: 1;
            }
        }
    }

    button {
        background-color: var(--color-background-surface);
        height: $button-height;
        width: $button-height;
        padding: 0;
        z-index: 10;
        transition: background-color .2s ease-in-out;

        &::before, &::after {
            display: none;
        }

        &:hover {
            background-color: var(--color-background-surface-hover);
        }
    }

    input, #search-bar {
        height: $button-height;
    }

    input[type=number] {
        width: 3.2rem;
        background-color: var(--color-background-surface);
        appearance: textfield;

        &:hover {
            appearance: initial;
        }
    }
</style>
