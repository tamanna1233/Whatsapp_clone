/* The class `apiResponse` is a JavaScript class that represents an API response with status code,
data, message, and success status. */
class apiResponse {
    constructor(statuscode, data, message = 'success', success = true) {
        (this.statuscode = statuscode),
            (this.data = data),
            (this.message = message),
            (this.success = success);
    }
}
export { apiResponse };
