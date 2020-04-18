var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');

var authMiddleWare = require('./middlewares/auth.middleware');

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));

app.get('/', (req, res)=>res.render('index', {
    name: 'Hoang'
}));

app.use('/users', authMiddleWare.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, ()=>console.log('Server on port ' + port));