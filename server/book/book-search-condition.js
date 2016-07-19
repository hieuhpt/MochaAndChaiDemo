var BookSearchCondition = function () {
};

BookSearchCondition.prototype.searchData = {};

BookSearchCondition.prototype.andHaveId = function (id) {
    if (id) {
        this.searchData.id = id;
    }
    return this;
};

BookSearchCondition.prototype.haveName = function (name) {
    if (name) {
        this.searchData.name = name;
    }
    return this;
};

BookSearchCondition.prototype.haveAuthor = function (author) {
    if (author) {
        this.searchData.author = author;
    }
    return this;
};

BookSearchCondition.prototype.haveCategory = function (category) {
    if (category) {
        this.searchData.category = category;
    }
    return this;
};

BookSearchCondition.prototype.toMongoCondition = function () {
    return this.searchData;
};

BookSearchCondition.makeFromQuery = function (query) {
    var condition = new BookSearchCondition();
    condition.haveName(query.name).haveAuthor(query.author).haveCategory(query.category).andHaveId(query.id);
    return condition;
};

module.exports = BookSearchCondition;
