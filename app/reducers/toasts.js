const toasts = (state = [], action)=> {
    switch (action.type) {
    case 'ADD_TOAST':
        return state.concat({
            message: action.payload
        });
        break;
    case 'REMOVE_TOAST':
        return state.slice(1, state.length);
        break;
    default:
        return state;
    }
};

export default toasts;
