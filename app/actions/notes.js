const loadNotes = (payload)=> {
    return {
        type: 'LOAD_NOTES',
        payload
    };
};

export { loadNotes };
