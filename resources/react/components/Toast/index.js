import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ toastError, toastSuccess, resetToasts, autoClose = 1500 }) => {

    useEffect(() => {
        if(toastError.length) {
            toast.error(toastError, { style: {}});
        }else if(toastSuccess.length) {
            toast.success(toastSuccess, { style: {}});
        }

        resetToasts();
    }, [toastError, toastSuccess]);

    return (
        <ToastContainer 
            position="top-center"
            autoClose={autoClose}
            hideProgressBar
            closeOnClick
            oPauseOnHover={false}
            draggable
            progress={undefined}
        />
    );
}

export default Toast;