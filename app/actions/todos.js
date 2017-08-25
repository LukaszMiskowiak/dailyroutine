const loadTodos = (payload)=> {
        return {
            type: 'LOAD_TODOS',
            payload // JSON object as a payload
        };
    },
    checkTodo = (payload)=> {
        return {
            type: 'CHECK_TODO',
            payload // id of elem as a payload
        };
    },
    deleteTodo = (payload)=> {
        return {
            type: 'DELETE_TODO',
            payload  // id of elem as a payload
        };
    },
    addTodo = (payload)=> {
        return {
            type: 'ADD_TODO',
            payload // todo object as a payload 
        };
    };


export { loadTodos, checkTodo, deleteTodo, addTodo };
