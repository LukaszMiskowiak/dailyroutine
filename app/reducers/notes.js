const notes = (state = [], action) => {
    switch (action.type) {
    case 'LOAD_NOTES': {
        return state = Object.assign([], action.payload);
        break;
    }
    case 'ADD_NOTE': {
        let newState = state;
        newState.push(action.payload);
        return state = Object.assign([], newState);
        break;
    }
    case 'DELETE_NOTE': {
        let newState = state;
        delete newState[action.payload]; //deletes elem but does not affect length of array
        return state = Object.assign([], newState);
        break;
    }
    default:
        return state;
    }
};

export default notes;
