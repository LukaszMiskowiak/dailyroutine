const todos = (state = [], action) => {
    switch (action.type) {
    case 'LOAD_TODOS': {
        // return state = Object.assign({}, state, {todos: action.payload});
        return state = Object.assign([], action.payload);
        break;
    }
    case 'CHECK_TODO': {
        let elem = state[action.payload],
            newState = state;
        elem.checked = elem.checked ? 0 : 1;
        newState[action.payload] = elem;
        return state = Object.assign([], newState);
        break;
    }
    case 'ADD_TODO': {
        let newState = state;
        newState.push(action.payload);
        return state = Object.assign([], newState);
        break;
    }
    case 'DELETE_TODO': {
        let newState = state;
        delete newState[action.payload]; //deletes elem but does not affect length of array
        return state = Object.assign([], newState);
        break;
    }
    default:
        return state;
    }
};

export default todos;
