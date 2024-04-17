import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Root from "./Root";
import Explore from "./Pages/Explore";
import Offers from "./Pages/Offers";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import PrivateRoutes from "./Pages/PrivateRoutes";
import ForgotPass from "./Pages/ForgotPass";
import Category from "./Pages/Category";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Explore />} />
        <Route path="category/:categoryName" element={<Category />} />
        <Route path="offers" element={<Offers />} />
        <Route path="profile" element={<PrivateRoutes />} />
        <Route path="sign-in" element={<SignIn />} />
        {/* <Route path="sign-in" element={<SignIn />}>
          <Route path="forgot-password" element={<ForgotPass />} />
        </Route> */}
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPass />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
