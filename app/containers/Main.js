import React from 'react';
import crud from '../scripts/crud';
import Current from '../components/Current';
import Info from '../components/Info';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        // loading data form database
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
                note: {},
                todo: {}
            }
        };
    }

    handleCurrentElem(type, i) {
        let elem = this.props[type + 's'][i];
        type === 'todo' && this.setState({
            todo: elem
        });
        type === 'note' && this.setState({
            note: elem
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

    // check 'checked' value of clicked todo and invert it
    handleCheckTodo(i) {
        let id = this.state.todo.id, // taking id from current todo (current is saved in state)
            value = this.state.todo.checked ? 0 : 1;
        // update database
        crud.update('todo', id, value); // type of data, id of elem, value (0 or 1)
        this.props.handleCheckTodo(i); // update Redux state
    }

    handleDeleteElem(type) {
        let id = this.state[type].id,
            index = this.props[type + 's'].indexOf(this.state[type]);

        crud.delete(type, id);
        this.props['handleDelete' + type.capitalize()](index); // handleDeleteNote || handleDeleteTodo
    }

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

        crud.create(type, elem.text);
        this.props['handleAdd' + type.capitalize()](elem);
    }

    handleInputChange(e, type) {
        let value = e.target.value,
            state = this.state.value;
        state[type].text = value;
        this.setState({
            value: state
        });
    }

    renderData(type) {
        return (
            <table className='table'>
                <tbody>
                    {this.props[type + 's'] && this.props[type + 's'].map((elem, i)=> (
                        <tr key={i}>
                            <td
                                onMouseOver={()=> {
                                    this.handleCurrentElem.bind(this)(type, i);
                                }}
                                className={'elem ' + (elem.checked && 'checked')}
                                onClick={type === 'todo' && (()=> this.handleCheckTodo.bind(this)(i))}
                            >
                                {/* in case of notes i want to display date of note
                                    todos do not have date so it goes to elem.text
                                */}
                                {elem.date || elem.text}
                            </td>
                            {/* If elem is not hover render empty cell */}
                            {(!this.state[type] || this.state[type].id !== elem.id) && (<td />)}
                            {/* If elem is hovered give it a delete button */}
                            {(this.state[type] && this.state[type].id === elem.id) && (
                                <td className='delete text-center'>
                                    <span onClick={()=> this.handleDeleteElem.bind(this)(type)} className='fa fa-times' />
                                </td>
                            )}
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <input
                                className='form-control'
                                onChange={(e)=> this.handleInputChange.bind(this)(e, type)}
                                placeholder={'Add new' + type}
                                value={this.state.value[type].text}
                            />
                        </td>
                        <td className='delete text-center'>
                            <span onClick={()=> this.handleAddElem.bind(this)(type)} className='fa fa-plus'/>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className='row' onMouseLeave={()=> this.handleMouseOut.bind(this)('note')}>
                <div className='col-sm-6 row'>
                    <section className='col-sm-12'>
                        <Info />
                    </section>
                    <section className='col-sm-12 ' onMouseLeave={()=> this.handleMouseOut.bind(this)('todo')}>
                        {this.renderData('todo')}
                    </section>
                </div>
                <div className='col-sm-6 row'>
                    <section className='col-sm-12 jumbotron notes'>
                        {this.renderData('note')}
                    </section>
                    <section className='col-sm-12 current jumbotron'>
                        {this.state.note && <Current elem={this.state.note.text}/>}
                    </section>
                </div>
            </div>
        );
    }
};

export default Main;
