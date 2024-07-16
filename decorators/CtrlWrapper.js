module.exports = function (controller) {
    return async function (req, res, next) {
        try {
            await controller(req, res);
        } catch (e) {
            next(e);
        }
    }
}