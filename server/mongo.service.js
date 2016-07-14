var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var BookTable = require('./book/book-table');

module.exports = (function (req, res, next) {
    MongoClient.connect('mongodb://localhost:27017/test', function (err, connection) {
        req.app.set('mongoConnection', connection);
        req.app.set('bookTable', new BookTable(connection.collection('books')));
        next();
    });
});
