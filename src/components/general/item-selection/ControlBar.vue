<script setup lang="ts">
    import { faAngleLeft, faAngleRight, faFilter, faList, faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { computed } from 'vue';
    import SearchBar from '@/components/general/item-selection/SearchBar.vue';
    import { translate } from '@/modules/core/localization';

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
        <button class="icon-button" @click="$emit('toggleView')" type="button">
            <FontAwesomeIcon :icon="viewButtonIcon" />
        </button>

        <div class="control-group">
            <label for="page">{{ translate('general.itemselection.controlbar.page') }}</label>
            <input type="number" name="page" id="page" :value="page" min="1" :max="maxPage" @input="$emit('update:page', parseInt(($event.target as HTMLInputElement).value))">
            <span>/ {{ maxPage }}</span>
        </div>

        <div class="control-group">
            <button class="icon-button" :disabled="page < 2" @click="$emit('prevPage')" :aria-label="translate('general.itemselection.controlbar.previousPage')" type="button">
                <FontAwesomeIcon :icon="faAngleLeft" />
            </button>
            <button class="icon-button" :disabled="page >= maxPage" @click="$emit('nextPage')" :aria-label="translate('general.itemselection.controlbar.nextPage')" type="button">
                <FontAwesomeIcon :icon="faAngleRight" />
            </button>
        </div>

        <div class="control-group">
            <label for="perPage">{{ translate('general.itemselection.controlbar.perPage') }}</label>
            <input type="number" name="perPage" id="perPage" min="1" :value="perPage" @input="$emit('update:perPage', Math.max(1, parseInt(($event.target as HTMLInputElement).value)) || 1)">
        </div>

        <div class="control-group">
            <button class="icon-button" :aria-label="translate('general.itemselection.controlbar.filter')" type="button">
                <FontAwesomeIcon :icon="faFilter" />
            </button>
            <SearchBar id="search-bar" :model-value="searchQuery" @update:model-value="value => $emit('update:searchQuery', value)" />
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
        border: .1rem solid var(--color-border);

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
        transition: background-color .2s ease-in-out;

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
        color: var(--color-text);
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
