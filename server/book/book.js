var Book = function () {
};


Book.prototype.setId = function (id) {
    this.id = id;
    return this;
};

Book.prototype.getId = function () {
    return this.id;
};

Book.prototype.setName = function (name) {
    this.name = name;
    return this;
};

Book.prototype.getName = function () {
    return this.name;
};

Book.prototype.setAuthor = function (author) {
    this.author = author;
    return this;
};

Book.prototype.getAuthor = function () {
    return this.author;
};

Book.prototype.setCategory = function (category) {
    this.category = category;
    return this;
};

Book.prototype.getCategory = function () {
    return this.category;
};

Book.prototype.toJSON = function () {
    return {
        id: this.getId(),
        name: this.getName(),
        author: this.getAuthor(),
        category: this.getCategory()
    };
};

Book.makeFromQuery = function (query) {
    var book = new Book();
    book.setName(query.name).setAuthor(query.author).setCategory(query.category);
    return book;
};

module.exports = Book;

