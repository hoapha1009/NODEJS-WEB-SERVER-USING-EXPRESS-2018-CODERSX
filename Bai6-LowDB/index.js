var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = [
    {
        id: 1,
        name: 'Uyen'
    },
    {
        id: 2,
        name: 'Thu'
    },
    {
        id: 3,
        name: 'Tuc'
    }
];

app.get('/', (req, res)=>res.render('index', {
    name: 'Hoang'
}));

app.get('/users', (req, res)=>res.render('users/index', {
    users: users
}));

app.get('/users/search', (req, res)=>{
    var q = req.query.q;
    var matchedUser = users.filter(user=>user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);

    res.render('users/index', {
        users: matchedUser,
        inputValue: q
    })
});

app.get('/users/create', (req, res)=>{
    res.render('users/create');
})

app.post('/users/create', (req, res)=>{
    users.push(req.body);
    res.redirect('/users');
})

app.listen(port, ()=>console.log('Server on port ' + port));