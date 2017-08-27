import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import App from './components/App';
import reducers from './reducers';
require('./styles/main.css');

const initialState = {
        notes: [
            {text: 'First Note', date: 'Wed Jul 26 2017 00:00:00 GMT+0200 (CEST)', id: 1},
            {text: 'Second note', date: 'Sat Aug 26 2017 20:02:31 GMT+0200 (CEST)', id: 2},
            {text: 'Third note, a little bit longer one', date: 'Thu Oct 26 2017 00:00:00 GMT+0200 (CEST)', id: 3},
            {text: 'fourth note, again a little bit longer one, even longer than the previous one', date: 'Sun Nov 26 2017 00:00:00 GMT+0100 (CET)', id: 4},
            {text: 'So I spent over 9 hours on this project today... I`ve created whole crud system, server in express, database in SQLite3. What is more I have used Bootstrap 4 and I have written some front-end in React and Redux. Well... Today was a good day.', date: 'Tue Dec 26 2017 00:00:00 GMT+0100 (CET)', id: 5}
        ],
        todos: [
            {text: 'Buy sugar', checked: 0, id: 0},
            {text: 'Buy Milk', checked: 0, id: 1},
            {text: 'Do something else', checked: 0, id: 2},
            {text: 'Style this Single Page Application', checked: 0, id: 3},
            {text: 'Create form to make adding elements possiblle', checked: 0, id: 4},
            {text: 'Get some rest', checked: 0, id: 5}
        ]
    },
    // creating Redux'store and adding devtools extension
    store = ((window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) === undefined) ?
        createStore(reducers, initialState) :
        createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
);
