module.exports.postCreate = (req, res, next) => {
    var errors = [];
    if(!req.body.name) {
        errors.push('Name is requires!');
    }

    if(!req.body.phone) {
        errors.push('Phone is requires!');
    }

    if(errors.length) {
        res.render('users/create', {
            errors: errors
        })
        return;
    }

    next();
}