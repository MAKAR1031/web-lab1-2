const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
let idCounter = 1;
let tasks = [];

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    console.log('GET request');
    res = setHeaders(res);
    res.send(tasks);
});

app.post('/todos/add', (req, res) => {
    const body = req.body;
    console.log('POST request: ', body);
    res = setHeaders(res);
    if (body && body.text) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].text.trim() === body.text) {
                sendError(res, 'You have already added such a task!');
                return;
            }
        }
        tasks = addTodo(body.text);
        res.send(tasks);
    } else {
        sendError(res, 'Invalid data');
    }
});

app.post('/todos/priority', (req, res) => {
    const body = req.body;
    console.log('POST request: ', body);
    res = setHeaders(res);
    if (body && body.id) {
        tasks = tasks.map(todo => {
            if (todo.id === body.id) {
                return {
                    ...todo,
                    priority: !todo.priority
                }
            } else {
                return todo
            }
        });
        res.send(tasks);
    } else {
        sendError(res, 'Todo not found');
    }
});

app.delete('/todos', (req, res) => {
    console.log('DELETE request');
    tasks = [];
    idCounter = 1;
    res = setHeaders(res);
    res.send({success: true})
});

app.listen(3000, err => {
    if (err) {
        throw err;
    }
    console.log('Server started on port 3000');
});

function setHeaders(response) {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Content-Type', 'application/json');
    return response;
}

function sendError(response, error) {
    response.send({error});
}

function addTodo(text) {
    return [
        ...tasks,
        {
            id: idCounter++,
            text,
            priority: false
        }
    ]
}
