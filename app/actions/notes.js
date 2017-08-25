const loadNotes = (payload)=> {
        return {
            type: 'LOAD_NOTES',
            payload // JSON object as a payload
        };
    },
    addNote = (payload)=> {
        return {
            type: 'ADD_NOTE',
            payload // note object as a payload
        };
    },
    deleteNote = (payload)=> {
        return {
            type: 'DELETE_NOTE',
            payload // id of the elem as a payload
        };
    };

export { loadNotes, addNote, deleteNote };
