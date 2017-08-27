import React from 'react';
import crud from '../scripts/crud';
import Current from '../components/Current';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Info from '../components/Info';


// it is used inside deleteElem and addElem methods
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        // loading data from database
        // using Redux actions to handle it
        async function load() {
            let a = await crud.read('todo'),
                b = await crud.read('note');
            props.handleLoadTodos(a);
            props.handleLoadNotes(b);
        };
        load();
        this.state = {
            note: undefined, // this is for saving current (hovered) note
            todo: undefined, // this is for saving current (hovered) todo
            // value object is for saving input from user on the run (when adding new elem)
            value: {
                note: {}, // note.text - new note text (note.date is added automatically)
                todo: {}, // todo.text - new todo text
                edit: {} // edited note object (text and date)
            },
            edit: false // show or hide edit panel
        };
    }

    // save current elem to state
    // type - 'note' / type = 'todo'
    // i - index of element
    handleCurrentElem(type, i) {
        let elem = this.props[type + 's'][i];
        type === 'todo' && this.setState({
            todo: elem
        });
        type === 'note' && this.setState({
            note: elem,
            edit: false // get rid of edit panel when changing note
        });
    }
    // toggle on edit
    handleEdit() {
        let state = this.state.value; // new state.value
        // assigning current note properties to new state
        state.edit.text = this.state.note.text;
        state.edit.date = this.state.note.date;
        this.setState({
            edit: true,
            value: state
        });
    }

    // reset current todo/note
    handleMouseOut(type) {
        type === 'todo' && this.setState({
            todo: undefined
        });
        type === 'note' && this.setState({
            note: undefined
        });
    }

    // check 'checked' value of clicked todo and invert it (0/1)
    handleCheckTodo(i) {
        let id = this.state.todo.id, // taking id from current todo (current is saved in state)
            value = this.state.todo.checked ? 0 : 1;
        // update database
        crud.update('todo', id, value); // type of data, id of elem, value (0 or 1)
        this.props.handleCheckTodo(i); // update Redux state
    }

    // delete elem from database and from store aswell
    handleDeleteElem(type) {
        let id = this.state[type].id,
            index = this.props[type + 's'].indexOf(this.state[type]);

        type === 'note' && this.state.edit && this.setState({edit: false});
        // save to database and to store
        crud.delete(type, id);
        this.props['handleDelete' + type.capitalize()](index); // handleDeleteNote || handleDeleteTodo
    }

    // add elem to database and to store aswell
    handleAddElem(type) {
        let elem = {},
            id = this.props[type + 's'].length ? (this.props[type + 's'][this.props[type + 's'].length - 1].id + 1) : 1; // find id of last elem and add 1 to it

        elem.text = this.state.value[type].text;
        // todo does not have date
        if (type === 'note') {
            let date = new Date().toLocaleDateString();
            elem.date = date;
        } else elem.checked = 0;
        elem.id = id;

        // this.setState({
        //     value: {
        //         note: undefined,
        //         todo:
        //     }
        // })

        // save to database and to store
        crud.create(type, elem.text);
        this.props['handleAdd' + type.capitalize()](elem);
    }

    // save input value to state.value
    handleInputChange(e, type) {
        let value = e.target.value,
            state = this.state.value;
        // update state with value of input
        type === 'edit-text' ? // edit panel first input
        state.edit.text = value
            : type === 'edit-date' ? // edit panel second input
            state.edit.date = value
                : state[type].text = value; // add new todo/note input
        // saving data from inputs to state
        this.setState({
            value: state
        });
    }
    // update edited note elem
    handleUpdate() {
        let payload = {}, // payload is an obj with old note object (current one) and the new one (edited one)
            id = this.state.note.id;
        payload.old = this.state.note;
        payload.new = this.state.note;
        // getting values from inputs
        payload.new.text = this.state.value.edit.text;
        payload.new.date = this.state.value.edit.date;
        // toggling of the panel
        this.setState({edit: false});
        // Redux dispatch update and database update
        this.props.handleUpdateNote(payload);
        console.log(id);
        crud.update('note', id, payload.new.text);
    }

    // render method, creates table with notes/todos
    renderData(type) {
        return (
            <table className='table row'>
                <tbody>
                    <tr className='jumbotron'>
                        <td>
                            <input
                                className='form-control'
                                onChange={(e)=> this.handleInputChange.bind(this)(e, type)} // using closure for passing params
                                placeholder={'Add new ' + type}
                                value={this.state.value[type].text} // value from state
                            />
                        </td>
                        <td className='text-center'>
                            <span onClick={()=> this.handleAddElem.bind(this)(type)} className='fa fa-plus'/>
                        </td>
                    </tr>
                    {/*  map through Redux state.notes or state.todos */}
                    {this.props[type + 's'] && this.props[type + 's'].map((elem, i)=> (
                        <tr key={i}>
                            <td
                                onMouseOver={()=> {
                                    this.handleCurrentElem.bind(this)(type, i); // using closure for passing params
                                }}
                                className={'elem ' + (elem.checked ? 'elem-checked ' : '') + (type === 'note' ? 'elem-note' : '') } // when it is todo and todo is checked change it's style
                                onClick={type === 'todo' &&
                                    (()=> this.handleCheckTodo.bind(this)(i)) ||
                                    type === 'note' && this.handleEdit.bind(this)
                                } // using closure for passing params
                            >
                                {/* in case of notes i want to display date of note
                                    todos do not have date so it goes to elem.text
                                */}
                                {elem.date && new Date(elem.date).toLocaleDateString()  || elem.text}
                            </td>
                            {/* If elem is not hover render empty cell */}
                            {(!this.state[type] || this.state[type].id !== elem.id) && (<td />)}
                            {/* If elem is hovered give it a delete button */}
                            {(this.state[type] && this.state[type].id === elem.id) && (
                                <td className='text-center'>
                                    <span onClick={()=> this.handleDeleteElem.bind(this)(type)} className='button-delete fa fa-times' />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className='row' onMouseLeave={()=> this.handleMouseOut.bind(this)('note')}>
                <section className='col-sm-6 jumbotron panel-notes'>
                    <div className='float-right'>
                        {this.renderData('note')}
                    </div>
                </section>
                <section className='panel-current col-sm-6 jumbotron'>
                    <ul className='panel-current-nav list-inline'>
                        {this.props.notes && this.props.notes.map((note, i) => {
                            if (i < 7) {
                                return (
                                    <li key={i}
                                        className='list-inline-item text-muted'
                                        onMouseOver={()=> {
                                            this.handleCurrentElem.bind(this)('note', i); // using closure for passing params
                                        }}
                                        onClick={this.handleEdit.bind(this)}
                                    >
                                        {(new Date(note.date).getDate()) + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][new Date(note.date).getMonth()]}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                    <div className='panel-current-display'>
                        {this.state.edit ?
                            (<div className='panel-current-edit'>
                                <textarea onChange={(e)=> this.handleInputChange.bind(this)(e, 'edit-text')} placeholder={this.state.note.text} value={this.state.value.edit.text} className='form-control'/>
                                <input onChange={(e)=> this.handleInputChange.bind(this)(e, 'edit-date')} placeholder={this.state.note.text} value={this.state.value.edit.date} className='form-control'/>
                                <button onClick={this.handleUpdate.bind(this)} className='btn btn-success'> Update </button>
                            </div>)
                            : this.state.note ?
                                <Current elem={this.state.note} />
                                : <Info />
                        }
                    </div>
                </section>
                <section className='col-sm-6 offset-sm-6 jumbotron panel-todos'>
                    {this.renderData('todo')}
                </section>
            </div>
        );
    }
};

export default Main;
