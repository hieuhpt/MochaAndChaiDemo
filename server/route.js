var router = require('express').Router();
var mongodb = require('mongodb');
var book = require('./book');

var bookRequiredMiddleware = function (request, response, next) {
    try {
        var bookId = mongodb.ObjectID(request.params.id);
    } catch (err) {
        return response.status(422).json({
            message: "id  be a single String of 12 bytes or a string of 24 hex characters",
            code: "E_INVALID_ID"
        });
    }

    request.app.get('bookTable').detail(bookId).then(function (foundBook) {
        request.book = foundBook;
        next();
    }).catch(function (error) {
        if (error.message == 'Book not found') {
            return response.status(404).json({
                message: "Book not existed",
                code: "E_BOOK_NOT_EXISTED"
            });
        }
        return next(error);
    });
};

router.get('/book', function (req, res) {
    req.app.get('bookTable').search(book.BookSearchCondition.makeFromQuery(req.query)).then(function (listBook) {
        res.json(listBook);
    });
});

router.post('/book', function (req, res) {
    req.app.get('bookTable').add(book.Book.makeFromQuery(req.body)).then(function (newBook) {
        res.status(201).json(newBook);
    });
});

router.put('/book/:id', bookRequiredMiddleware, function (req, res) {
    req.book.setAuthor(req.body.author).setName(req.body.name).setCategory(req.body.category);
    req.app.get('bookTable').edit(req.book).then(function (bookEdited) {
        res.json(bookEdited);
    });
});

router.get('/book/:id', bookRequiredMiddleware, function (req, res) {
    return res.json(req.book);
});

module.exports = router;