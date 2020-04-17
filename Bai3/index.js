var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

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

app.listen(port, ()=>console.log('Server on port ' + port));