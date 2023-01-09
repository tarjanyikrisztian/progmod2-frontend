import { useEffect, useState } from "react";
import { Book } from "../pages/Books";

const Catalogue: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks(setBooks);
  }, []);

  return (
    <div>
      <div className="text-5xl font-bold text-center pt-20">Available books</div>
      {books.length === 0 ? (
        ""
      ) : (
        <div>
          {books.slice(0, 3).map((book, index) => (
            <div key={index} className="hero p-10 my-10">
              <div className="hero-content flex-col lg:flex-row">
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
                  className="max-w-sm rounded-lg shadow-2xl mr-16"
                  alt={`Book cover of ${book.title}`}
                />
                <div>
                  <h1 className="text-5xl font-bold mb-3">{book.title}</h1>
                  <h2 className="text-xl mb-3">{book.author}</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quia quibusdam
                    sapiente accusamus exercitationem, harum vero dicta, officiis amet unde aliquam
                    vitae fugit hic quam, nemo perferendis tempora corrupti veritatis! Voluptas
                    vitae nobis nam quas possimus ullam aut, quidem laudantium velit quod deleniti!
                    Odit id ex ipsam iure atque quibusdam tenetur impedit, obcaecati tempore
                    consequatur ullam ratione nisi minima nemo. Blanditiis at facere ea quae a
                    suscipit praesentium placeat minus amet doloribus sequi magni vero, laborum
                    fugit delectus sapiente nam odit, nesciunt ullam molestiae nostrum, et sunt.
                    Doloremque, suscipit eveniet?
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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

export default Catalogue;
