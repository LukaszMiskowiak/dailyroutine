import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import App from './components/App';
import reducers from './reducers';
require('./styles/main.css');

let initialState = {
        notes: {notes: [
            {note: 'First Note'},
            {note: 'Second note '},
            {note: 'Third note, a little bit longer one'},
            {note: 'fourth note, again a little bit longer one, even longer than the previous one'}
        ]},
        todos: {todos: [
            {todo: 'Buy Milk'},
            {todo: 'Do something else'},
            {todo: 'Style this Single Page Application'},
            {todo: 'Create form to make adding elements possiblle'},
            {todo: 'Get some rest'}
        ]}
    },
    store = ((window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) === undefined) ?
        createStore(reducers, initialState) :
        createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
);
