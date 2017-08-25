// CRUD = Create, Read, Update, Delete
// IIFE return an object
const crud = (function () {
    const crud = {},
        xhr = new XMLHttpRequest();
    crud.data = {
        todos: [],
        notes: []
    };
    crud.create = (type, value, date)=> {
        if (typeof type !== 'string' || typeof value !== 'string') throw new Error('Type || value is not a string');
        let vars = date ? ('text' + '=' + value + '&date=' + date) : ('text' + '=' + value);
        xhr.open('POST', type + '-add', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(vars);
        console.log('create');
    };
    crud.read = (type)=> {
        if (typeof type !== 'string') throw new Error('type is not a string');
        return new Promise((resolve, reject)=> {
            xhr.open('GET', type + '-select');
            xhr.onload = ()=> resolve(crud.data[type + 's'] = JSON.parse(xhr.responseText));
            xhr.onError = ()=> reject(xhr.statusText);
            xhr.send();
        });
    };
    crud.update = (type, id, value)=> {
        if (typeof type !== 'string') throw new Error('Type is not a string');
        if (typeof id !== 'number') throw new Error('id is not a number');
        let vars = 'id=' + id + '&value=' + value;
        xhr.open('POST', type + '-update', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(vars);
    };
    crud.delete = (type, id)=> {
        if (typeof type !== 'string') throw new Error('type is not a string');
        if (typeof id !== 'number') throw new Error('id is not a number');
        let vars = 'id=' + id;
        xhr.open('POST', type + '-delete', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(vars);
    };
    return crud;
}());


export default crud;
