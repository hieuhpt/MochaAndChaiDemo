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
    return this.collection.find(condition).toArray()
        .then(function (booksSearched) {
            return booksSearched;
        });
};

BookTable.prototype.delete = function (bookId) {

};

module.exports = BookTable;
