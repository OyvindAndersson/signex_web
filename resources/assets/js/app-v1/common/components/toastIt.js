import React from 'react'
import { toast } from 'react-toastify'

const TOAST_SUCCESS = 'success'
const TOAST_ERROR = 'error'
const TOAST_INFO = 'info'

export const toastIt = ({ message, title, status }, ...rest) => {
    switch(status){
        case TOAST_SUCCESS:
            return toast.success(<ToastWrapper message={message} title={title} />)
        case TOAST_ERROR:
            return toast.error(<ToastWrapper message={message} title={title} />)
        case TOAST_INFO:
            return toast.info(<ToastWrapper message={message} title={title} />)
        default:
            return toast(<ToastWrapper message={message} title={title} />)
    }
}

export const ToastWrapper = ({ closeToast, title, message }) => {
    if(title){
        return (
            <div>
                { title ? (<strong>{title} </strong>) : null }
                {message}
            </div>
        )
    } else {
        return (
            <div>
                {message}
            </div>
        )
    }
    
}