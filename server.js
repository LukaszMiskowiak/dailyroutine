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
    db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, checked INTEGER)');
    db.run('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, date TEXT)');

    app.post('/todo-add', (req,res,next)=> {
        const date = new Date().toString(),
            stmt = db.prepare('INSERT INTO todos (text, checked) VALUES ($text, $checked)');
        stmt.run(req.body.text, 0);
        stmt.finalize();
        console.log(req.body);
    });
    app.post('/note-add', (req,res,next)=> {
        const date = new Date().toString(),
            stmt = db.prepare('INSERT INTO notes (text, date) VALUES ($text, $date)');
        stmt.run(req.body.text, date);
        stmt.finalize();
        console.log(req.body);
    });

    app.get('/todo-select', (req, res)=> {
        console.log('todos loaded');
        db.all('SELECT * FROM todos', (err, rows)=> {
            res.send(rows);
            console.log(rows);
        });
    });
    app.get('/note-select', (req, res)=> {
        console.log('notes loaded');
        db.all('SELECT * FROM notes', (err, rows)=> {
            res.send(rows);
        });
    });

    app.post('/todo-delete', (req,res,next)=> {
        console.log('todo deleted');
        const stmt = db.prepare('DELETE FROM todos WHERE rowid = ($index)');
        stmt.run(req.body.id);
        stmt.finalize();
    });
    app.post('/note-delete', (req,res,next)=> {
        console.log('note deleted');
        const stmt = db.prepare('DELETE FROM notes WHERE rowid = ($index)');
        stmt.run(req.body.id);
        stmt.finalize();
    });

    app.post('/todo-update', (req,res,next)=> {
        console.log('todo updated');
        const stmt = db.prepare('UPDATE todos SET checked = $checked WHERE rowid = ($index)');
        stmt.run(req.body.value, req.body.id);
        stmt.finalize();
    });
    app.post('/note-update', (req,res,next)=> {
        console.log('note updated');
        console.log(req.body.value);
        const stmt = db.prepare('UPDATE notes SET text = $text WHERE rowid = ($index)');
        stmt.run(req.body.value, req.body.id);
        stmt.finalize();
    });
});

// db.close();
