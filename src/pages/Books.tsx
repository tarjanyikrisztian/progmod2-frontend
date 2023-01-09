import { useEffect, useState } from "react";
import AddEditBookModal from "../components/AddEditBookModal";
import Navbar from "../components/Navbar";
import { Pencil, Trash } from "tabler-icons-react";

export type Book = {
  id?: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
};

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editedBook, setEditedBook] = useState<Book>();

  useEffect(() => {
    fetchBooks(setBooks);
  }, []);

  return (
    <div>
      <Navbar />
      <AddEditBookModal modalId="edit-book-modal" editedBook={editedBook} />
      <div className="p-5">
        <div className="overflow-x-auto">
          {books.length === 0 ? (
            <div className="text-center">Books will appear here</div>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>ISBN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={index}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td>{book.isbn}</td>
                    <td align="right">
                      <label
                        className="btn"
                        onClick={() => {
                          setEditedBook(book);
                        }}
                        htmlFor="edit-book-modal"
                      >
                        <Pencil className="w-5 h-5" />
                      </label>
                      <button
                        className="btn ml-5"
                        onClick={() => {
                          deleteBook(book.id!!);
                        }}
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const fetchBooks = async (callback: (books: Book[]) => void) => {
  const response = await fetch("http://localhost:8080/book/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await response.json();
  callback(res.data as Book[]);
};

const deleteBook = async (id: number) => {
  const response = await fetch(`http://localhost:8080/book/delete/${id}`, {
    method: "DELETE",
  });

  if (response.status === 200) {
    window.location.reload();
  }
};

export default Books;
