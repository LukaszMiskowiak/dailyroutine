const notes = (state = [], action) => {
    switch (action.type) {
    // using curly braces to create local scope for let declarations
    case 'LOAD_NOTES': {
        return state = Object.assign([], action.payload); // save new state
        break;
    }
    case 'ADD_NOTE': {
        let newState = state;
        newState.push(action.payload); // push new note to state
        return state = Object.assign([], newState); // save new state
        break;
    }
    case 'DELETE_NOTE': {
        let newState = state;
        delete newState[action.payload]; //deletes elem but does not affect length of array
        return state = Object.assign([], newState); // save new state
        break;
    }
    default:
        return state;
    }
};

export default notes;
