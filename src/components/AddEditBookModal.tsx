import { useEffect, useState } from "react";
import { Book } from "../pages/Books";
import ErrorAlert from "./ErrorAlert";
import FormInput from "./FormInput";

interface BookModalProps {
  modalId: string;
  editedBook?: Book;
}

const AddEditBookModal: React.FC<BookModalProps> = ({ modalId, editedBook }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (editedBook) {
      setTitle(editedBook.title);
      setAuthor(editedBook.author);
      setPublisher(editedBook.publisher);
      setIsbn(editedBook.isbn);
    }
  }, [editedBook]);

  return (
    <div>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          {error && <ErrorAlert message={errorMsg} />}
          <h3 className="text-lg font-bold">
            {editedBook ? `Editing ${editedBook.title}` : "Adding new book"}
          </h3>
          <FormInput
            type="text"
            label="Name"
            placeholder="Enter book name"
            value={title}
            onChange={setTitle}
          />
          <FormInput
            type="text"
            label="Author"
            placeholder="Enter author name"
            value={author}
            onChange={setAuthor}
          />
          <FormInput
            type="text"
            label="Publisher"
            placeholder="Enter publisher name"
            value={publisher}
            onChange={setPublisher}
          />
          <FormInput
            type="text"
            label="ISBN"
            placeholder="Enter ISBN"
            value={isbn}
            onChange={setIsbn}
          />
          <div className="form-control mt-6">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                addEditBook(
                  { id: editedBook?.id, title, author, publisher, isbn },
                  setError,
                  setErrorMsg
                );
              }}
            >
              {editedBook ? "Edit book" : "Save book"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const addEditBook = async (
  { id, title, author, publisher, isbn }: Book,
  errorStatusCallback: (errorStatus: boolean) => void,
  errorMsgCallback: (errorMsg: string) => void
) => {
  console.log(id ? "Editing" : "Adding");
  const serverUrl = id
    ? `http://localhost:8080/book/edit/${id}`
    : "http://localhost:8080/book/save";
  const response = await fetch(serverUrl, {
    method: id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title,
      author,
      publisher,
      isbn,
    }),
  });
  const res = await response.json();
  console.log(res);

  if (response.status === 200) {
    errorStatusCallback(false);
    window.location.reload();
  } else {
    errorStatusCallback(true);
    errorMsgCallback(res.message);
  }
};

export default AddEditBookModal;
