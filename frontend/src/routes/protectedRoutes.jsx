import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, role } = useSelector((state) => state.userState);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  if (role !== "admin" && rest.path === "/admin") {
    return <Redirect to="/403" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;