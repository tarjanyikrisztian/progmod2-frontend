import Cookies from "universal-cookie";
import AddEditBookModal from "./AddEditBookModal";

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100 px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/books">Books</a>
            </li>
            <li>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  const cookies = new Cookies();
                  cookies.remove("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <p className="font-bold normal-case text-xl">Library management system</p>
      </div>
      <div className="navbar-end">
        <AddEditBookModal modalId="add-book-modal" />
        <label className="btn btn-primary" htmlFor="add-book-modal">
          Add new book
        </label>
      </div>
    </div>
  );
};

export default Navbar;
