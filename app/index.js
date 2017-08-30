import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux';
import App from './components/App';
import reducers from './reducers';
require('./styles/main.css');

const initialState = {
        notes: [
            {text: 'First Note', date: 'Fri Aug 25 2017 00:00:00 GMT+0200 (CEST)', id: 1},
            {text: 'Second note', date: 'Sat Aug 26 2017 20:02:31 GMT+0200 (CEST)', id: 2},
            {text: 'Third note, a little bit longer one', date: 'Sun Aug 27 2017 00:00:00 GMT+0200 (CEST)', id: 3},
            {text: 'fourth note, again a little bit longer one, even longer than the previous one', date: 'Mon Aug 28 2017 00:00:00 GMT+0100 (CET)', id: 4},
            {text: 'So I spent over 9 hours on this project today... I`ve created whole crud system, server in express, database in SQLite3. What is more I have used Bootstrap 4 and I have written some front-end in React and Redux. Well... Today was a good day.', date: 'Tue Aug 29 2017 00:00:00 GMT+0100 (CET)', id: 5},
            {text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: 'Wed Aug 30 2017 00:00:00 GMT+0100 (CET)', id: 6},
            {text: 'Fusce non erat non lorem efficitur lobortis.', date: 'Thu Aug 31 2017 00:00:00 GMT+0100 (CET)', id: 7},
            {text: 'Vivamus vehicula libero sit amet lacus sollicitudin bibendum.', date: 'Thu Aug 24 2017 00:00:00 GMT+0100 (CET)', id: 8},
            {text: 'Nunc dignissim eros a pellentesque sodales.', date: 'Wed Aug 23 2017 00:00:00 GMT+0100 (CET)', id: 9},
            {text: 'In rutrum lectus tincidunt risus accumsan dignissim.', date: 'Tue Aug 22 2017 00:00:00 GMT+0100 (CET)', id: 10},
            {text: 'Sed rutrum metus at libero lacinia vehicula.', date: 'Wed Aug 29 2017 00:00:00 GMT+0100 (CET)', id: 11},
            {text: 'Aliquam lobortis erat sit amet lorem semper egestas.', date: 'Mon Aug 21 2017 00:00:00 GMT+0100 (CET)', id: 12},
            {text: 'Curabitur posuere ex sed eros dictum, viverra tempor enim viverra.', date: 'Sun Aug 20 2017 00:00:00 GMT+0100 (CET)', id: 13},
            {text: 'Sed vel tortor ut felis pulvinar faucibus.', date: 'Sat Aug 19 2017 00:00:00 GMT+0100 (CET)', id: 14},
            {text: 'Maecenas vehicula mi a neque volutpat, quis eleifend neque consequat.', date: 'Fri Aug 18 2017 00:00:00 GMT+0100 (CET)', id: 15},
            {text: 'Nunc ultrices arcu a arcu ornare interdum ut et arcu.', date: 'Thur Aug 17 2017 00:00:00 GMT+0100 (CET)', id: 16},
            {text: 'Morbi congue purus nec ornare tincidunt.', date: 'Wed Aug 16 2017 00:00:00 GMT+0100 (CET)', id: 17},
            {text: 'Vestibulum faucibus felis nec purus ultrices, ut tristique enim feugiat.', date: 'Tue Aug 15 2017 00:00:00 GMT+0100 (CET)', id: 18},
            {text: 'Aliquam elementum erat a eros viverra, eu faucibus velit fringilla.', date: 'Mon Aug 14 2017 00:00:00 GMT+0100 (CET)', id: 19}
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
