const loadTodos = (payload)=> {
    return {
        type: 'LOAD_TODOS',
        payload
    };
};

export { loadTodos };
