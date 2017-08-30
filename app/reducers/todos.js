const todos = (state = [], action) => {
    switch (action.type) {
    // using curly braces to create block scope for let declarations
    case 'LOAD_TODOS': {
        return state = Object.assign([], action.payload); // save new state
        break;
    }
    case 'CHECK_TODO': {
        let elem = state[action.payload],
            newState = state;
        elem.checked = elem.checked ? 0 : 1; // change checked value
        newState[action.payload] = elem; // modify elem
        return state = Object.assign([], newState); // save state
        break;
    }
    case 'ADD_TODO': {
        let newState = state;
        newState.push(action.payload); // push elem to state
        return state = Object.assign([], newState); // save state
        break;
    }
    case 'DELETE_TODO': {
        let newState = state;
        delete newState[action.payload]; //deletes elem but does not affect length of array
        return state = Object.assign([], newState); // save state
        break;
    }
    default:
        return state;
    }
};

export default todos;
