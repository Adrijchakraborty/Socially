export const createError = (status,message)=>{
    const err = new Error();
    err.status = status;
    err.message = message;
    err.success = false;

    return err;
}