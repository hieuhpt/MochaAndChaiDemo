var BookTable = require('./../book/book-table');
var Book = require('./../book/book');
var BookSearchCondition = require('./../book/book-search-condition');
var expect = require('chai').expect;


describe('Do test book table', function () {

    var bookTable = null;
    var book = null;

    beforeEach(function (done) {

        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect('mongodb://localhost:27017/test', function (error, connection) {
            bookTable = new BookTable(connection.collection('books'));
            book = new Book();
            book.setAuthor('Some author')
                .setName('Some book name')
                .setCategory('Some category');
            done(error);
        });


    });

    it('do add a book and added book must have correct values', function (done) {
        bookTable.add(book).then(function (addedBook) {
            expect(addedBook.getName()).to.equal('Some book name');
            expect(addedBook.getAuthor()).to.equal('Some author');
            expect(addedBook.getCategory()).to.equal('Some category');
            expect(addedBook.getId()).to.be.ok;
        }).then(function () {
            done();
        }).catch(function (error) {
            done(error)
        })
    });

    it('do edit a book and edited book must have correct values', function (done) {

        bookTable.add(book).then(function (book) {

            book.setName('updated book name');
            book.setAuthor('updated book author');
            book.setCategory('updated book category');

            return bookTable.edit(book);

        }).then(function (editedBook) {

            expect(editedBook.getName()).to.equal('updated book name');
            expect(editedBook.getAuthor()).to.equal('updated book author');
            expect(editedBook.getCategory()).to.equal('updated book category');
            expect(editedBook.getId()).to.equal(book.getId());

        }).then(function () {
            done();
        }).catch(function (error) {
            done(error);
        });
    });

    it('do search book by name and books are searched are correct with condition', function (done) {
        var searchName = 'Some book name';
        var bookSearchCondition = new BookSearchCondition();
        var searchBooksHaveSomeName = bookSearchCondition.haveName(searchName).toMongoCondition();

        bookTable.search(searchBooksHaveSomeName).then(function (searchedBooks) {
            for (var i = 0; i < searchedBooks.length; i++) {
                expect(searchedBooks[i].name).to.equal(searchName);
            }
        }).then(function () {
            done();
        }).catch(function (error) {
            done(error);
        });
    });


    it('do search book by multi condition and books are searched are correct with condition', function (done) {
        var someName = 'Best Book';
        var someAuthor = 'Nguyen Van A';
        var someCategory = 'Manga';
        var bookSearchConditions = new BookSearchCondition();
        var searchBooksConditions = bookSearchConditions
            .haveName(someName)
            .haveAuthor(someAuthor)
            .haveCategory(someCategory).toMongoCondition();

        var book2 = new Book();
        book2.setName(someName);
        book2.setAuthor(someAuthor);
        book2.setCategory(someCategory);

        var addingBook = bookTable.add(book2);

        addingBook.then(function () {
            bookTable.search(searchBooksConditions).then(function (searchedBooks) {

                expect(searchedBooks.length).to.be.above(0);

                for (var i = 0; i < searchedBooks.length; i++) {
                    expect(searchedBooks[i].name).to.equal(someName);
                    expect(searchedBooks[i].author).to.equal(someAuthor);
                    expect(searchedBooks[i].category).to.equal(someCategory);
                }
            });
        }).then(function () {
            done();
        }).catch(function (error) {
            done(error);
        });

    });

});
