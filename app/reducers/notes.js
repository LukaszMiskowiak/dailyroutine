const notes = (state = [], action) => {
    switch (action.type) {
    case 'LOAD_NOTES':
        return state = Object.assign({}, state, {notes: action.payload});
        break;
    default:
        return state;
    }
};

export default notes;
