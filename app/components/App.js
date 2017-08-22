import React from 'react';
import { connect } from 'react-redux';
import { loadTodos } from '../actions/todos';
import { loadNotes } from '../actions/notes';

import crud from '../scripts/crud';
import Nav from './Nav';
import Main from '../containers/Main';

class App extends React.Component {
    render() {
        return (
            <div>
                {/* <Nav /> */}
                {/* <div className='col-sm-6'> */}
                <Main
                    notes={this.props.notes}
                    todos={this.props.todos}
                    handleLoadTodos={this.props.loadTodos}
                    handleLoadNotes={this.props.loadNotes}
                />
                {/* </div> */}
            </div>
        );
    }
};

const mapStateToProps = (state)=> {
        return {
            notes: state.notes,
            todos: state.todos
        };
    },
    mapDispatchToProps = (dispatch)=> {
        return {
            loadNotes: (notes)=> {
                dispatch(loadNotes(notes));
            },
            loadTodos: (todos)=> {
                dispatch(loadTodos(todos));
            }
        };
    };

// crud.create('todo', 'jestem todo');
// crud.create('note', 'jestem note');
// crud.read('todo');

export default connect(mapStateToProps, mapDispatchToProps)(App);
