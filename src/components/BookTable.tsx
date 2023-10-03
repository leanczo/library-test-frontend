import React from "react";

interface Book {
  bookId: number;
  code: string;
  title: string;
  publisher: string;
  loans: any[];
  bookAuthors: any[];
}

interface BookTableProps {
  books: Book[] | null;
}

const BookTable: React.FC<BookTableProps> = ({ books }) => {
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
