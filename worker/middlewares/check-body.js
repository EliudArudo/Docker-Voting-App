module.exports = function (req, res, next) {

    if (!req.body) {
        res.status(401).send('Wrong request');
        return;
    }

    if ((!req.body.id || req.body.id.length === 0) || (!req.body.vote || req.body.vote.length === 0)) {
        res.status(401).send('Wrong request');
        return;
    }


    if (!(req.body.vote === 'cat' || req.body.vote === 'cat')) {
        res.status(406).send('Please choose between a cat or a dog');
        return;
    }

    next();
}