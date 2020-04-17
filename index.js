var express = require('express');
var router = express.Router();
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var shortid = require('shortid');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');

const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res)=>res.render('index', {
    name: 'Hoang'
}));

app.get('/users', (req, res)=>res.render('users/index', {
    users: db.get('users').value()
}));

app.get('/users/search', (req, res)=>{
    var q = req.query.q;
    var users = db.get('users').value();
    var matchedUser = users.filter(user=>user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);

    res.render('users/index', {
        users: matchedUser,
        inputValue: q
    })
});

app.get('/users/create', (req, res)=>{
    res.render('users/create');
})

app.get('/users/:id', (req, res)=>{
    var id = req.params.id;
    
    var user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user
    })
})

app.post('/users/create', (req, res)=>{
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

app.listen(port, ()=>console.log('Server on port ' + port));