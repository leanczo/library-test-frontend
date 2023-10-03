import { useState } from "react";
import "./App.css";
import CustomSelect from "./components/CustomSelect";
import useApi from "./hooks/useApi";
import BookTable from "./components/BookTable";
import postInvoice from "./hooks/postInvoice";
interface Customer {
  customerId: number;
  firstName: string;
  lastName: string;
}

interface Book {
  bookId: number;
  code: string;
  title: string;
  publisher: string;
  loans: any[];
  bookAuthors: any[];
}

function App() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [booksList, setBooksList] = useState<Book[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [postError, setPostError] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  const [customers, loading, error] = useApi<Customer[]>(
    "http://localhost:38668/api/customers"
  );
  const [books] = useApi<Book[]>("http://localhost:38668/api/books");

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const options = customers!.map((customer: any) => ({
    value: customer.customerId,
    label: `${customer.firstName} ${customer.lastName}`,
  }));

  const optionsBooks =
    books?.map((book: any) => ({
      value: book.bookId,
      label: `${book.title}`,
    })) || [];

  const handleSelectChange = (selectedOption: any) => {
    const customer = customers!.find(
      (c) => c.customerId === selectedOption.value
    );
    if (customer) {
      setSelectedCustomer(customer.customerId);
    }
  };

  const isBookAlreadyAdded = (bookId: number): boolean => {
    return !!booksList.find((book) => book.bookId === bookId);
  };

  const handleSelectBookChange = (selectedOption: any) => {
    const book = books!.find((book) => book.bookId === selectedOption.value);
    if (book) {
      setSelectedBook(book);
    } else {
      console.error("Book not found!");
      setSelectedBook(null);
    }
  };

  const handlePostClick = async () => {
    if (!selectedBook || !selectedCustomer) {
      setPostError("Por favor, selecciona al menos un libro y un autor.");
      return;
    }

    try {
      const bookIds = booksList.map(book => book.bookId);
      await postInvoice(selectedCustomer, bookIds);
      setSuccessMessage('¡Se envió correctamente!');
      setPostError(null); // Limpiar cualquier mensaje de error anterior
    } catch (error) {
      setPostError((error as Error).message);
      setSuccessMessage(null); // Limpiar cualquier mensaje de éxito anterior
    }
  };

  return (
    <div className="App">
      <header className="App-grid">
        <div className="grid-item-client">
          <p>Cliente</p>
          <CustomSelect options={options} onChange={handleSelectChange} />
        </div>
        <div className="grid-item-books">
          <p>Books</p>
          <CustomSelect
            options={optionsBooks}
            onChange={handleSelectBookChange}
          />
          <button
            className="button-style"
            onClick={() => {
              if (selectedBook && !isBookAlreadyAdded(selectedBook.bookId)) {
                setBooksList([...booksList, selectedBook]);
              } else {
                console.warn("Book is already added or not selected.");
              }
            }}
          >
            Agregar libro
          </button>
        </div>
        <div className="grid-item-table">
          <BookTable books={booksList} />
        </div>
        <div className="grid-item-button">
          {postError && <p className="message-error">{postError}</p>}
          {successMessage && (
            <p className="message-success">{successMessage}</p>
          )}
          <button className="button-style" onClick={handlePostClick}>
            Post
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
