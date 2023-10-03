import React from "react";
import "./BookTable.css";
import { Book } from "../types/Book";

interface BookTableProps {
  books: Book[] | null;
  onRemoveBook: (bookId: number) => void;
}

const BookTable: React.FC<BookTableProps> = ({ books, onRemoveBook }) => {
  function filterBookProperties(book: Book): Partial<Book> {
    const { loans, bookAuthors, ...filteredBook } = book;
    return filteredBook;
  }

  const filteredBooks = books?.map(filterBookProperties);

  const headers = filteredBooks?.length ? Object.keys(filteredBooks[0]) : [];

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {books!.map((book, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, cellIndex) => (
              <td key={cellIndex}>{book[header as keyof Book]}</td>
            ))}
            <td>
              <button
                className="button-small"
                onClick={() => onRemoveBook(book.bookId)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
