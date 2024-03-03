const validateString = (value) => {
    let validateValue = value.trim(),
        result = { status: false, error: 'Value should not be empty' };

    if (!validateValue || validateValue.length === 0) {
        return result;
    }

    if (validateValue.length > 10) {
        return result.error = 'Status max allowed characters = 10';
    }

    return { status: true, error: 'All Good...' }
}

module.exports = {
    validateString
};