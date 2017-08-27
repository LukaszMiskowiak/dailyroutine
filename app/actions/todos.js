const loadTodos = (payload)=> {
        return {
            type: 'LOAD_TODOS',
            payload // JSON object
        };
    },
    checkTodo = (payload)=> {
        return {
            type: 'CHECK_TODO',
            payload // id of elem
        };
    },
    deleteTodo = (payload)=> {
        return {
            type: 'DELETE_TODO',
            payload  // id of elem
        };
    },
    addTodo = (payload)=> {
        return {
            type: 'ADD_TODO',
            payload // todo object
        };
    };


export { loadTodos, checkTodo, deleteTodo, addTodo };
