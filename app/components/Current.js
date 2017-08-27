import React from 'react';

const Current = (props)=> (
    <div className='lead'>
        {props.elem && props.elem.text}
    </div>
);

export default Current;
