import React from 'react';

const Todos = (props)=> (
    <table className='table'>
        <tbody>
            {props.todos && props.todos.map((elem, i)=> (
                <tr
                    onMouseOver={()=> props.handleCurrent(i)}
                    key={i}
                    className={'elem elem-todo text-justify ' + (elem.checked && 'elem-checked')}
                >
                    <td onClick={()=> props.handleCheck(i)}>
                        {elem.text}
                    </td>
                    {
                        // show delete button next to hovered elem (current-hovered)
                        props.current && (props.current.id !== elem.id ? (<td></td>)
                            : (
                                <td>
                                    <span onClick={props.handleDelete} className='button-delete fa fa-times' />
                                </td>
                            ))
                    }

                </tr>
            ))}
        </tbody>
    </table>
);

export default Todos;
