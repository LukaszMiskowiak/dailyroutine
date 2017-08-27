const loadNotes = (payload)=> {
        return {
            type: 'LOAD_NOTES',
            payload // JSON object
        };
    },
    addNote = (payload)=> {
        return {
            type: 'ADD_NOTE',
            payload // note object
        };
    },
    updateNote = (payload)=> {
        return {
            type: 'UPDATE_NOTE',
            payload // note object
        };
    },
    deleteNote = (payload)=> {
        return {
            type: 'DELETE_NOTE',
            payload // id of the elem
        };
    };

export { loadNotes, addNote, deleteNote, updateNote };
