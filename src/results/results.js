module.exports = new class Results {
    successful(message) {
        return {
            resultCode: 0,
            message: message
        }
    }

    unsuccessful(message = "Error") {
        return {
            resultCode: 0,
            message: message
        }
    }
}