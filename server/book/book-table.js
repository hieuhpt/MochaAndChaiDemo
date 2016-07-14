var Book = require('./book');
var BookTable = function (bookMongoDBCollection) {
    this.collection = bookMongoDBCollection;
};

BookTable.prototype.add = function (book) {
    return this.collection.insertOne({
        name: book.getName(),
        author: book.getAuthor(),
        category: book.getCategory()
    }).then(function (result) {
        book.setId(result.insertedId);
        return book;
    });
};

BookTable.prototype.edit = function (book) {
    return this.collection.updateOne({id: book.getId()}, {
        $set: {
            name: book.getName(),
            author: book.getAuthor(),
            category: book.getCategory()
        }
    }).then(function () {
        return book;
    });
};

BookTable.prototype.search = function (condition) {
    return this.collection.find(condition.toMongoCondition()).toArray();
};

BookTable.prototype.detail = function (id) {
    return this.collection.find({_id: id}).limit(1).toArray().then(function (foundBooks) {
        if (!foundBooks.length) {
            throw new Error('Book not found');
        }
        return foundBooks[0];
    }).then(function (foundBook) {
        return new Book()
            .setAuthor(foundBook.author)
            .setName(foundBook.name)
            .setId(foundBook._id)
            .setCategory(foundBook.category);
    });
};

BookTable.prototype.delete = function (bookId) {

};

module.exports = BookTable;
