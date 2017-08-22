// const crud = {
//     create: ()=> {
//         console.log('create');
//     },
//     read: ()=> {
//         console.log('read');
//     },
//     update: ()=> {
//         console.log('update');
//     },
//     delete: ()=> {
//         console.log('delete');
//     }
// };

const crud = (function () {
    let crud = {},
        xhr = new XMLHttpRequest();
    crud.data = {
        todos: [],
        notes: []
    };
    crud.create = (type, value)=> {
        if (typeof type !== 'string' || typeof value !== 'string') {
            throw new Error('Type || value is not a string');
        }
        let vars = type + '=' + value;
        xhr.open('POST', type + '-add', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(vars);
        console.log('create');
    };
    crud.read = (type)=> {
        if (typeof type !== 'string') {
            throw new Error('type is not a string');
        }
        return new Promise((resolve, reject)=> {
            xhr.open('GET', type + '-select');
            xhr.onload = ()=> resolve(crud.data[type + 's'] = JSON.parse(xhr.responseText));
            xhr.onError = ()=> reject(xhr.statusText);
            xhr.send();
        });
    };
    crud.update = (type, id, value)=> {

    };
    crud.delete = (type, id)=> {

    };
    console.log(crud);
    return crud;
}());


export default crud;
