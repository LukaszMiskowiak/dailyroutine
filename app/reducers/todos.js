const todos = (state = [], action) => {
    switch (action.type) {
    case 'LOAD_TODOS':
        return state = Object.assign({}, state, {todos: action.payload});
        break;
    default:
        return state;
    }
};

export default todos;
