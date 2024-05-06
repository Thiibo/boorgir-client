import { ref, type Ref } from "vue";

const validationErrors: Ref<StringArrayKeyValueObject> = ref({});

function clearValidationErrors() {
    validationErrors.value = {};
}

function setValidationErrors(errors: StringArrayKeyValueObject) {
    validationErrors.value = errors;
}

function getValidationErrorsRef() {
    return validationErrors;
}

export { setValidationErrors, clearValidationErrors, getValidationErrorsRef };
