const notes = (state = [], action) => {
    switch (action.type) {
    // using curly braces to create block scope for let declarations
    case 'LOAD_NOTES': {
        let notes = action.payload.filter((e)=> e.date);
        console.log(notes);
        console.log(action.payload);
        return state = Object.assign([], notes); // save new state
        break;
    }
    case 'ADD_NOTE': {
        let newState = state;
        newState.push(action.payload); // push new note to state
        return state = Object.assign([], newState); // save new state
        break;
    }
    case 'UPDATE_NOTE': {
        let newState = state,
            index = newState.indexOf(action.payload.old);
        newState[index] = action.payload.new;
        return state = Object.assign([], newState);
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
