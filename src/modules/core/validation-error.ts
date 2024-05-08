class ValidationError extends Error {
    errors: StringArrayKeyValueObject

    constructor(errors: StringArrayKeyValueObject) {
        super("A validation error occured.")
        this.errors = errors;
    }
}

export { ValidationError };
