var express = require('express');
var shortid = require('shortid');

var db = require('../db');

var router = express.Router();

router.get('/', (req, res)=>res.render('users/index', {
    users: db.get('users').value()
}));

router.get('/search', (req, res)=>{
    var q = req.query.q;
    var users = db.get('users').value();
    var matchedUser = users.filter(user=>user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);

    res.render('users/index', {
        users: matchedUser,
        inputValue: q
    })
});

router.get('/create', (req, res)=>{
    res.render('users/create');
})

router.get('/:id', (req, res)=>{
    var id = req.params.id;
    
    var user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user
    })
})

router.post('/create', (req, res)=>{
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

module.exports = router;