var BookSearchCondition = function () {};

BookSearchCondition.prototype.searchData = {};

BookSearchCondition.prototype.andHaveId = function (id) {
    this.searchData.id = id;
    return this;
};

BookSearchCondition.prototype.haveName = function (name) {
    this.searchData.name = name;
    return this;
};

BookSearchCondition.prototype.haveAuthor = function (author) {
    this.searchData.author = author;
    return this;
};

BookSearchCondition.prototype.haveCategory = function (category) {
    this.searchData.category = category;
    return this;
};

BookSearchCondition.prototype.toMongoCondition = function () {
    return this.searchData;
};

module.exports = BookSearchCondition;
