import React from 'react';
import { connect } from 'react-redux';
import { loadTodos, checkTodo, deleteTodo, addTodo } from '../actions/todos';
import { loadNotes, addNote, deleteNote, updateNote} from '../actions/notes';
import { addToast, removeToast} from '../actions/toasts';
import Info from '../components/Info';
import crud from '../scripts/crud';
import Main from '../containers/Main';
import Toasts from '../containers/Toasts';

class App extends React.Component {
    render() {
        return (
            <div className='container-fluid col-sm-12 col-lg-10 col-xl-8'>
                <Main
                    notes={this.props.notes}
                    todos={this.props.todos}
                    handleLoadTodos={this.props.loadTodos}
                    handleCheckTodo={this.props.checkTodo}
                    handleDeleteTodo={this.props.deleteTodo}
                    handleAddTodo={this.props.addTodo}
                    handleLoadNotes={this.props.loadNotes}
                    handleAddNote={this.props.addNote}
                    handleDeleteNote={this.props.deleteNote}
                    handleUpdateNote={this.props.updateNote}
                    handleAddToast={this.props.addToast}
                />
                <Toasts
                    handleRemoveToast={this.props.removeToast}
                    toasts={this.props.toasts}
                />
            </div>
        );
    }
};


// Redux staff for adding redux's state to react props
// Redux staff for adding actions to react
const mapStateToProps = (state)=> {
        return {
            notes: state.notes,
            todos: state.todos,
            toasts: state.toasts
        };
    },
    mapDispatchToProps = (dispatch)=> {
        return {
            loadNotes: (notes)=> {
                dispatch(loadNotes(notes));
            },
            deleteNote: (id)=> {
                dispatch(deleteNote(id));
            },
            addNote: (note)=> {
                dispatch(addNote(note));
            },
            updateNote: (payload)=> {
                dispatch(updateNote(payload));
            },
            loadTodos: (todos)=> {
                dispatch(loadTodos(todos));
            },
            checkTodo: (id)=> {
                dispatch(checkTodo(id));
            },
            deleteTodo: (id)=> {
                dispatch(deleteTodo(id));
            },
            addTodo: (todo)=> {
                dispatch(addTodo(todo));
            },
            addToast: (message)=> {
                dispatch(addToast(message));
            },
            removeToast: ()=> {
                dispatch(removeToast());
            }
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(App);
