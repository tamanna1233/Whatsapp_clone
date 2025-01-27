/* The `apiError` class is a custom error class in JavaScript that allows for creating error objects
with specific status codes, messages, and additional error data. */
class apiError extends Error {
    constructor(statuscode, message = 'Something went wrong', error = [], stack = '') {
        super(message);
        this.statuscode = statuscode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.error = error;
        if (stack) {
            this.stack;
        } else {
            Error.captureStackTrace(this, this.consructor);
        }
    }
}
export { apiError };
