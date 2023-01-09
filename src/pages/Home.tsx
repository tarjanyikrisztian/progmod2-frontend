import Catalogue from "../components/Catalogue";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-9xl font-bold">library.io</h1>
            <p className="py-6">
              A library management system built with React TypeScript and Spring Boot
            </p>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/login";
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <Catalogue />
      <Footer />
    </div>
  );
};

export default Home;
