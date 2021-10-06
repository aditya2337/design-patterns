// Flyweight and data layer

// Normal non-optimized Object
class Book {
  constructor(
    id,
    title,
    author,
    genre,
    pageCount,
    publisherID,
    ISBN,
    checkoutDate,
    checkoutMember,
    dueReturnDate,
    availability,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.publisherID = publisherID;
    this.ISBN = ISBN;
    this.checkoutDate = checkoutDate;
    this.checkoutMember = checkoutMember;
    this.dueReturnDate = dueReturnDate;
    this.availability = availability;
  }
  getTitle() {
    return this.title;
  }
  getAuthor() {
    return this.author;
  }
  getISBN() {
    return this.ISBN;
  }
  // Other getters not shown for brevity
  updateCheckoutStatus(
    bookID,
    newStatus,
    checkoutDate,
    checkoutMember,
    newReturnDate,
  ) {
    this.id = bookID;
    this.availability = newStatus;
    this.checkoutDate = checkoutDate;
    this.checkoutMember = checkoutMember;
    this.dueReturnDate = newReturnDate;
  }
  extendCheckoutPeriod(bookID, newReturnDate) {
    this.id = bookID;
    this.dueReturnDate = newReturnDate;
  }
  isPastDue() {
    var currentDate = new Date();
    return currentDate.getTime() > Date.parse(this.dueReturnDate);
  }
}

// flyweight optimized version (Extrinsic states removed)
class FlyweightBook {
  constructor(title, author, genre, pageCount, publisherID, ISBN) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pageCount = pageCount;
    this.publisherID = publisherID;
    this.ISBN = ISBN;
  }
}

// Extrinsic factory for the Book library
const BookFactory = (function () {
  const existingBooks = {};

  return {
    createBook: function (title, author, genre, pageCount, publisherID, ISBN) {
      // Find if a book meta-data combination has been created before
      const existingBook = existingBooks[ISBN];
      if (existingBook) {
        return existingBook;
      }

      // if not, let's create a new instance of it and store it
      const book = new FlyweightBook(
        title,
        author,
        genre,
        pageCount,
        publisherID,
        ISBN,
      );
      existingBooks[ISBN] = book;
      return book;
    },
  };
})();

const BookRecordManager = (function () {
  const bookRecordDatabase = {};
  return {
    // add a new book in the library system
    addBookRecord: function (
      id,
      title,
      author,
      genre,
      pageCount,
      publisherID,
      ISBN,
      checkoutDate,
      checkoutMember,
      dueReturnDate,
      availability,
    ) {
      const book = BookFactory.createBook(
        title,
        author,
        genre,
        pageCount,
        publisherID,
        ISBN,
      );
      bookRecordDatabase[id] = {
        checkoutMember: checkoutMember,
        checkoutDate: checkoutDate,
        dueReturnDate: dueReturnDate,
        availability: availability,
        book: book,
      };
    },
    updateCheckoutStatus: function (
      bookID,
      newStatus,
      checkoutDate,
      checkoutMember,
      newReturnDate,
    ) {
      const record = bookRecordDatabase[bookID];
      record.availability = newStatus;
      record.checkoutDate = checkoutDate;
      record.checkoutMember = checkoutMember;
      record.dueReturnDate = newReturnDate;
    },
    extendCheckoutPeriod: function (bookID, newReturnDate) {
      bookRecordDatabase[bookID].dueReturnDate = newReturnDate;
    },
    isPastDue: function (bookID) {
      var currentDate = new Date();
      return (
        currentDate.getTime() >
        Date.parse(bookRecordDatabase[bookID].dueReturnDate)
      );
    },
  };
})();
