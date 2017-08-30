import React from 'react';
import crud from '../scripts/crud';
import Current from '../components/Current';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Info from '../components/Info';
import Todos from '../components/Todos';
import Notes from '../components/Notes';


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
            notes_from: 0, // index of starting point
            notes_to: 7, // index of ending point
            edit: false // show or hide edit panel
        };
    }


    handleNotesRange(direction) {
        let num = this.state.notes_from;
        if (direction === 'left') {
            this.setState({
                notes_from: (num - 7),
                notes_to: num
            });
        } else if (direction === 'right')  {
            this.setState({
                notes_from: num + 7,
                notes_to: num + 14
            });
        }
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
        crud.update('note', id, payload.new.text);
    }

    render() {
        return (
            <div className='row' onMouseLeave={()=> this.handleMouseOut.bind(this)('note')}>
                <section className='panel-current col-sm-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2 jumbotron'>
                    <Notes
                        notes={this.props.notes}
                        note={this.state.note}
                        from={this.state.notes_from}
                        to={this.state.notes_to}
                        handleCurrent={(i)=> this.handleCurrentElem.bind(this)('note', i)}
                        handleEdit={this.handleEdit.bind(this)}
                        handleRange={(dir)=> this.handleNotesRange.bind(this)(dir)}
                    />
                    <div className='panel-current-display col-sm-12' onClick={this.handleEdit.bind(this)}>
                        {/* if edit is trigerred show it */}
                        {this.state.edit ?
                            (<div className='panel-current-edit'>
                                <textarea onChange={(e)=> this.handleInputChange.bind(this)(e, 'edit-text')} placeholder={this.state.note.text} value={this.state.value.edit.text} className='form-control'/>
                                <input onChange={(e)=> this.handleInputChange.bind(this)(e, 'edit-date')} placeholder={this.state.note.text} value={this.state.value.edit.date} className='form-control'/>
                                <button onClick={this.handleUpdate.bind(this)} className='btn btn-success'> Update </button>
                                <button onClick={()=> this.handleDeleteElem.bind(this)('note')} className='btn btn-danger'> Delete </button>
                            </div>)
                            // if note is hovered show it, otherwise show Info component
                            : this.state.note ?
                                <Current elem={this.state.note}/>
                                : <Info />
                        }

                    </div>
                    {/* add note form */}
                    <ul className='list-inline mt-2'>
                        <li className='list-inline-item'>
                            <input
                                className='form-control'
                                onChange={(e)=> this.handleInputChange.bind(this)(e, 'note')} // using closure for passing params
                                placeholder={'Add new note'}
                                value={this.state.value.note.text} // value from state
                            />
                        </li>
                        <li className='list-inline-item'>
                            <button onClick={()=> this.handleAddElem.bind(this)('note')} className='btn fa fa-plus'/>
                        </li>
                    </ul>
                </section>
                <section className='col-sm-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2 jumbotron panel-todos'>
                    <Todos
                        handleDelete={()=> this.handleDeleteElem.bind(this)('todo')}
                        handleCurrent={(i)=> this.handleCurrentElem.bind(this)('todo', i)}
                        handleCheck={(i)=> this.handleCheckTodo.bind(this)(i)}
                        edited={this.state.todo && this.state.todo.id}
                        todos={this.props.todos}
                        current={this.state.todo && this.state.todo}
                    />
                    {/* add Todo form */}
                    <ul className='list-inline'>
                        <li className='list-inline-item'>
                            <input
                                className='form-control'
                                onChange={(e)=> this.handleInputChange.bind(this)(e, 'todo')} // using closure for passing params
                                placeholder={'Add new todo'}
                                value={this.state.value.todo.text} // value from state
                            />
                        </li>
                        <li className='list-inline-item'>
                            <button onClick={()=> this.handleAddElem.bind(this)('todo')} className='btn fa fa-plus'/>
                        </li>
                    </ul>
                </section>
            </div>
        );
    }
};

export default Main;
