/**
 * The asyncHandler function is a higher-order function in JavaScript that wraps asynchronous route
 * handlers and handles any errors that occur during their execution.
 * @param fn - The `fn` parameter in the `asyncHandler` function is a function that represents the
 * asynchronous operation that you want to handle. This function takes `req`, `res`, and `next` as
 * parameters, which are typical in Express.js middleware functions. The `asyncHandler` function wraps
 * around this
 */
export const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(error.statuscode || 500).json({
            success: false,
            messag: error.message,
        });
    }
};
