module.exports = function resultData(resultCode, message, data = undefined) {
    return {
        resultCode, message, ...data
    }
}