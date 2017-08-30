import React from 'react';

const Todos = (props)=> (
    <table className='table'>
        <tbody>
            {props.todos && props.todos.map((elem, i)=> (
                <tr key={i}>
                    <td
                        onMouseOver={()=> props.handleCurrent(i)}
                        className={'elem ' + (elem.checked && 'elem-checked')}
                        onClick={()=> props.handleCheck(i)}
                    >
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
