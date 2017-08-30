import React from 'react';

const Current = (props)=> (
    <article className='col-sm-12'>
        <h1>
            {(new Date(props.elem.date).getDate()) + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][new Date(props.elem.date).getMonth()]}
        </h1>
        <p className='lead text-justify'>
            {props.elem && props.elem.text}
        </p>
    </article>
);

export default Current;
