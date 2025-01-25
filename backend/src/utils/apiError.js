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
