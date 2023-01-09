import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const ProtectedRoute = ({ authenticationPath, element, ...rest }: any) => {
  const isAuthenticated = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    return token !== undefined;
  };

  if (isAuthenticated()) {
    return element;
  } else {
    return <Navigate to={authenticationPath} />;
  }
};

export default ProtectedRoute;
