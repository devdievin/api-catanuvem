module.exports = {
    validateData(data) {
        if (data === '' || data === null || data === undefined) return false;
        return true;
    }
}