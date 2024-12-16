import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/items/CartPage";
import CheckoutPage from "../pages/items/CheckoutPage";
import SingleItem from "../pages/items/SingleItem";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/items/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageItems from "../pages/dashboard/manageItems/ManageItems";
import AddItem from "../pages/dashboard/addItem/AddItem";
import UpdateItem from "../pages/dashboard/EditItem/UpdateItem";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import BookDetails from "../pages/doctors/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/orders", element: <PrivateRoute><OrderPage /></PrivateRoute> },
      { path: "/about", element: <div>About</div> },
      { path: "/login", element: <Login /> },
      { path: "/test", element: <div>Test Page</div> },
      { path: "/register", element: <Register /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <PrivateRoute><CheckoutPage /></PrivateRoute> },
      { path: "/items/:id", element: <SingleItem /> },
      { path: "/user-dashboard", element: <PrivateRoute><UserDashboard /></PrivateRoute> },
      { path: "book-details", element: <BookDetails /> }
    ]
  },
  {
    path: "/admin",
    element: <AdminLogin />
  },
  {
    path: "/dashboard",
    element: <AdminRoute><DashboardLayout /></AdminRoute>,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "add-new-item", element: <AddItem /> },
      { path: "edit-item/:id", element: <UpdateItem /> },
      { path: "manage-items", element: <ManageItems /> },
      { path: "book-details", element: <BookDetails /> }
    ]
  }
]);

export default router;
