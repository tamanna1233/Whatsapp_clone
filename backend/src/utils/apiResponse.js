class apiResponse {
    constructor (statuscode, data, message ='success',
        success= true)
    {
        this.statuscode=statuscode,
        this.data=data,
        this.message=message,
        this.success=success
    }
}
export {apiResponse}