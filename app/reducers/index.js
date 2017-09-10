import { combineReducers } from 'redux';
import todos from './todos';
import notes from './notes';
import toasts from './toasts';

const reducers = combineReducers({
    todos,
    notes,
    toasts
});

export default reducers;
