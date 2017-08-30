import React from 'react';

const Notes = (props)=> (
    <ul className='panel-current-nav list-inline col-sm-12'>
        {/* show button if there are more elements */}
        {props.from > 0 && (<span onClick={()=> props.handleRange('left')} className='pull-left fa fa-toggle-left' />)}
        {/* map trough notes and display them */}
        {props.notes && props.notes.map((note, i) => {
            if (props.from <= i && i < props.to) {
                return (
                    <li key={i}
                        className={'list-inline-item elem elem-note ' + (props.note && props.note.id === note.id ? 'elem-edited ' : '')}
                        onMouseOver={()=> props.handleCurrent(i)}
                        onClick={props.handleEdit}
                    >
                        {/* convert numbers to months */}
                        {(new Date(note.date).getDate()) + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][new Date(note.date).getMonth()]}
                    </li>
                );
            }
        })}
        {/* show button if there are more elements */}
        {props.to < props.notes.length && (<span onClick={()=> props.handleRange('right')} className='pull-right fa fa-toggle-right' />)}
    </ul>
);

export default Notes;
