const addToast = (payload)=> {
        return {
            type: 'ADD_TOAST',
            payload // toast message
        };
    },
    removeToast = ()=> {
        return {
            type: 'REMOVE_TOAST'
        };
    };

export {addToast, removeToast};
