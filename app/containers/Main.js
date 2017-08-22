import React from 'react';
import crud from '../scripts/crud';
import Current from '../components/Current';
import Info from '../components/Info';

class Main extends React.Component {
    constructor(props) {
        super(props);
        async function load() {
            let a = await crud.read('todo'),
                b = await crud.read('note');
            props.handleLoadTodos(a);
            props.handleLoadNotes(b);
        };
        this.state = {
            elem: undefined
        };
        load();
    }
    handleCurrentElem(i, type) {
        let elem = (type === 'note') ? this.props.notes.notes[i].note : this.props.todos.todos[i].todo;
        this.setState({
            elem: elem
        });
    }
    render() {
        return (
            <div className='row'>
                <div className='col-sm-7'><Info /></div>
                <div className='col-sm-5'><Current elem={this.state.elem}/></div>
                <ul className='col-sm-6 list-unstyled text-center'>
                    {this.props.todos.todos && this.props.todos.todos.map((todo, i)=> (
                        <li
                            onMouseOver={()=> {
                                this.handleCurrentElem.bind(this)(i, 'todo');
                            }}
                            key={i}
                            className='elem'>
                            {todo.todo}
                        </li>
                    ))}
                </ul>
                <ul className='col-sm-6 list-unstyled text-center'>
                    {this.props.notes.notes && this.props.notes.notes.map((note, i)=> (
                        <li
                            onMouseOver={()=> {
                                this.handleCurrentElem.bind(this)(i, 'note');
                            }}
                            key={i}
                            className='elem'>
                            {note.note}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default Main;
