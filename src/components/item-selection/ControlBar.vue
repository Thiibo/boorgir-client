<script setup lang="ts">
    import { faAngleLeft, faAngleRight, faFilter, faList, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { computed } from 'vue';
    import SearchBar from '@/components/SearchBar.vue';

    const props = defineProps<{
        isGridView: boolean,
        page: number,
        maxPage: number,
        perPage: number,
        searchQuery: string
    }>();

    defineEmits([
        "toggleView",
        "update:page",
        "update:maxPage",
        "update:perPage",
        "update:searchQuery",
        "prevPage",
        "nextPage"
    ]);

    const viewButtonIcon = computed(() => props.isGridView ? faTableCellsLarge : faList);
</script>

<template>
    <div id="control-bar">
        <button @click="$emit('toggleView')">
            <FontAwesomeIcon :icon="viewButtonIcon" />
        </button>

        <div class="control-group">
            <label for="page">Page:</label>
            <input type="number" name="page" id="page" :value="page" min="1" :max="maxPage" @input="$emit('update:page', parseInt(($event.target as HTMLInputElement).value))">
            <span>/ {{ maxPage }}</span>
        </div>

        <div class="control-group">
            <button :disabled="page < 2" @click="$emit('prevPage')">
                <FontAwesomeIcon :icon="faAngleLeft" />
            </button>
            <button :disabled="page >= maxPage" @click="$emit('nextPage')">
                <FontAwesomeIcon :icon="faAngleRight" />
            </button>
        </div>

        <div class="control-group">
            <label for="perPage">Per page:</label>
            <input type="number" name="perPage" id="perPage" min="1" :value="perPage" @input="$emit('update:perPage', Math.max(1, parseInt(($event.target as HTMLInputElement).value)) || 1)">
        </div>

        <div class="control-group">
            <button>
                <FontAwesomeIcon :icon="faFilter" />
            </button>
            <SearchBar id="search-bar" :model-value="searchQuery" @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)" />
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

        &:disabled {
            opacity: .3;
            pointer-events: none;
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
