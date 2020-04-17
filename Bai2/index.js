var express = require('express');
var app = express();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res)=>res.render('index', {
    name: 'Hoang'
}));

app.get('/users', (req, res)=>res.render('users/index', {
    users: [
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
    ]
}));


app.listen(port, ()=>console.log('Server on port ' + port));