import React from 'react';

const Notes = (props)=> (
    <ul className='panel-current-nav list-inline col-sm-12 d-flex justify-content-center flex-row text-center'>
        {/* show button if there are more elements */}
        {props.from > 0 && (<span onClick={()=> props.handleRange('left')} className='justify-content-start fa arrow fa-toggle-left mt-1' />) || (<span className='justify-content-start' />) }
        {/* map trough notes and display them */}
        <div className='justify-content-between '>
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
        </div>
        {/* show button if there are more elements */}
        {props.to < props.notes.length && (<span onClick={()=> props.handleRange('right')} className='justify-content-end fa arrow fa-toggle-right mt-1' />) || (<span className='justify-content-end' />)}
    </ul>
);

export default Notes;
