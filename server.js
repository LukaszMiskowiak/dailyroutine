const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 8080;


const db = new sqlite3.Database('./db.sqlite', (err)=>console.log('err:', err));

app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, ()=> console.log('listening on port', port));

app.get('/', (req, res)=> {
    res.sendFile( __dirname + '/dist/index.html');
});
app.use('/index_bundle.js', express.static(__dirname + '/dist/index_bundle.js'));

db.serialize(()=> {
    db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, todo TEXT, date TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT, date TEXT)');

    app.post('/todo-add', (req,res,next)=> {
        const date = new Date().toString();
        const stmt = db.prepare('INSERT INTO todos (todo, date) VALUES ($todo, $date)');
        stmt.run(req.body.todo, date);
        stmt.finalize();
        console.log(req.body);
    });
    app.post('/note-add', (req,res,next)=> {
        const date = new Date().toString();
        const stmt = db.prepare('INSERT INTO notes (note, date) VALUES ($note, $date)');
        stmt.run(req.body.note, date);
        stmt.finalize();
        console.log(req.body);
    });

    app.get('/todo-select', (req, res)=> {
        console.log('selecting todos');
        db.all('SELECT * FROM todos', (err, rows)=> {
            res.send(rows);
        });
    });
    app.get('/note-select', (req, res)=> {
        console.log('a do work just fine');
        db.all('SELECT * FROM notes', (err, rows)=> {
            res.send(rows);
        });
    });

    app.post('/todo-delete', (req,res,next)=> {
        console.log('element deleted');
        const stmt = db.prepare('DELETE FROM todos WHERE rowid = ($index)');
        stmt.run(req.body.index);
        stmt.finalize();
    });
    app.post('/note-delete', (req,res,next)=> {
        console.log('element deleted');
        const stmt = db.prepare('DELETE FROM notes WHERE rowid = ($index)');
        stmt.run(req.body.index);
        stmt.finalize();
    });

    // app.post('/todo-update', (req,res,next)=> {
    //     // there is some problem with server on too many update/read requests
    //     console.log('element updated');
    //     console.log(req.body);
    //     const stmt = db.prepare('UPDATE todos SET text = $text, priority = $priority WHERE rowid = ($index)');
    //     stmt.run(req.body.text, req.body.priority, req.body.id);
    //     stmt.finalize();
    // });
    // app.post('/note-update', (req,res,next)=> {
    //     // there is some problem with server on too many update/read requests
    //     console.log('element updated');
    //     console.log(req.body);
    //     const stmt = db.prepare('UPDATE notes SET text = $text, priority = $priority WHERE rowid = ($index)');
    //     stmt.run(req.body.text, req.body.priority, req.body.id);
    //     stmt.finalize();
    // });
});

// db.close();
