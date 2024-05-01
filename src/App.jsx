import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayOut from "./Modules/SharedModule/Components/AuthLayOut/AuthLayOut";
import MasterLayOut from "./Modules/SharedModule/Components/MasterLayOut/MasterLayOut";
import LogIn from "./Modules/AuthenticationModules/Components/LogIn/LogIn";
import Register from "./Modules/AuthenticationModules/Components/Register/Register";
import ForgetPassword from "./Modules/AuthenticationModules/Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Modules/AuthenticationModules/Components/ResetPassword/ResetPassword";
import ChangePassword from "./Modules/AuthenticationModules/Components/ChangePassword/ChangePassword";
import Dashboard from "./Modules/HomeModules/Conponents/Dashboard/Dashboard";
import RecipesList from "./Modules/RecipesModule/Components/RecipesList/RecipesList";
import CategoresList from "./Modules/CategoresModule/Components/CategoresList/CategoresList";
import UsersList from "./Modules/UsersModule/Components/UsersList/UsersList";
import NotFound from "./Modules/SharedModule/Components/NotFound/NotFound";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import ProtectedRoutes from "./Modules/SharedModule/Components/ProtectedRoutes/ProtectedRoutes";
import PrivateRouteAuth from "./Modules/SharedModule/Components/PrivateRouteAuth/PrivateRouteAuth";

function App() {
  let [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState(null);

  let saveLoginData = () => {
    let encodedToken = localStorage.getItem("token");
    let decodedToken = jwtDecode(encodedToken);
    if (decodedToken) {
      setLoading(true);
      setLoginData(decodedToken);
      console.log(loginData);
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoginData(null);
    <Navigate to="/LogIn"/>
    
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);

  let routes = createBrowserRouter([
    {
      path: "MasterLayOut",
      element: (
        <ProtectedRoutes loginData={loginData}>
          <MasterLayOut loginData={loginData} logout={logout} />
        </ProtectedRoutes>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "Dashboard", element: <Dashboard /> },
        { path: "RecipesList", element: <RecipesList /> },
        { path: "CategoresList", element: <CategoresList /> },
        { path: "UsersList", element: <UsersList /> },
        { path: "ChangePassword", element: <ChangePassword /> },
      ],
    },
    {
      path: "/",
      element: (
        <PrivateRouteAuth loginData={loginData}>
          <AuthLayOut loginData={loginData} />
        </PrivateRouteAuth>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <LogIn saveLoginData={saveLoginData} /> },
        { path: "LogIn", element: <LogIn saveLoginData={saveLoginData} /> },
        { path: "Register", element: <Register /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "ChangePassword", element: <ChangePassword /> },
      ],
    },
  ]);

  if (loading) {
    return <i className="fa fa-spin fa-spinner"></i>;
  }

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer theme={"colored"} autoClose={1000} />
    </>
  );
}

export default App;
