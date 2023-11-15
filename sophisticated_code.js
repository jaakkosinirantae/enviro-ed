// filename: sophisticated_code.js

/*
 * This code demonstrates a complex and sophisticated example of a web application for managing a library.
 * It includes data models, business logic, and a user interface for adding, updating, and deleting books.
 * The code has been purposely shortened for readability, but in a real-world scenario it would be much longer.
 * This is just a sample representation.
 */

// Data Models
class Author {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class Book {
  constructor(id, title, authorId) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
  }
}

// Business Logic
class Library {
  constructor() {
    this.authors = [];
    this.books = [];
  }

  addAuthor(name) {
    const id = this.authors.length + 1;
    const author = new Author(id, name);
    this.authors.push(author);
    return author;
  }

  addBook(title, authorId) {
    const id = this.books.length + 1;
    const book = new Book(id, title, authorId);
    this.books.push(book);
    return book;
  }

  deleteBook(id) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
      return true;
    }
    return false;
  }
}

// User Interface
class LibraryUI {
  constructor(library) {
    this.library = library;
  }

  displayAuthors() {
    console.log("Authors:");
    this.library.authors.forEach((author) => console.log(`${author.id}: ${author.name}`));
    console.log("------------------------");
  }

  displayBooks() {
    console.log("Books:");
    this.library.books.forEach((book) => {
      const author = this.library.authors.find((author) => author.id === book.authorId);
      console.log(`${book.id}: ${book.title} by ${author.name}`);
    });
    console.log("------------------------");
  }

  addAuthor() {
    const name = prompt("Enter author name: ");
    if (name) {
      const author = this.library.addAuthor(name);
      console.log(`Added author: ${author.name}`);
    }
  }

  addBook() {
    const title = prompt("Enter book title: ");
    const authorId = prompt("Enter author ID: ");
    if (title && authorId) {
      const book = this.library.addBook(title, parseInt(authorId));
      console.log(`Added book: ${book.title}`);
    }
  }

  deleteBook() {
    const id = prompt("Enter book ID to delete: ");
    if (id) {
      const result = this.library.deleteBook(parseInt(id));
      if (result) {
        console.log("Book deleted successfully");
      } else {
        console.log("No book found with the specified ID");
      }
    }
  }
}

// Usage Example
const library = new Library();
const libraryUI = new LibraryUI(library);

libraryUI.addAuthor();
libraryUI.addAuthor();
libraryUI.displayAuthors();

libraryUI.addBook();
libraryUI.addBook();
libraryUI.displayBooks();

libraryUI.deleteBook();
libraryUI.displayBooks();

// More code...
// ...
// ...

// End of sophisticated_code.js