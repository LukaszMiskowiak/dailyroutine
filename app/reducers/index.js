import { combineReducers } from 'redux';
import todos from './todos';
import notes from './notes';

const reducers = combineReducers({
    todos: todos,
    notes: notes
});

export default reducers;
