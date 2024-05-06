<script setup lang="ts">
    import { ref, computed } from "vue";
    import { getValidationErrorsRef } from "@/modules/core/validation-errors";

    // Get validation errors of which the key matches the input id
    // If not inputs found for the input id, we assume there are no errors for this input
    const validationErrors = computed(() => getValidationErrorsRef().value[props.id] ?? []);
    
    const props = defineProps<{
        id: string,
        label: string,
        type: string,
        required?: boolean,
        modelValue?: string
    }>();

    const emit = defineEmits(["update:modelValue"]);

    const inputValue = ref(props.modelValue);
    function input() {
        emit('update:modelValue', inputValue.value);
    }
</script>

<template>
    <div>
        <label :for="id">{{ label }}</label>
        <input :id="id" :name="id" :type="type" v-model="inputValue" @input="input" :required="required">
        <ul class="validation-errors" v-if="validationErrors.length > 0">
            <li v-for="error in validationErrors">{{ error }}</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
    div {
        margin-bottom: 1rem;
    }
    label {
        display: block;
        margin-bottom: .4rem;
    }
    .validation-errors {
        margin-top: .4rem;
        padding-left: 2ex;
        list-style: symbols('-');
        color: rgb(253, 67, 67);
    }
</style>
