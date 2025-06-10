import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import store from "./redux/store";

// Components
import Header from "./components/Header";
import Home from "./components/Home";
// import Search from "./components/Search";
import Product from "./components/Product";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Order from "./components/Order";
import Checkout from "./components/Checkout";
import CheckoutPayment from "./components/CheckoutPayment";
import PaymentSuccess from "./components/PaymentSuccess";
import OrderDetail from "./components/OrderDetail";
import LogIn from "./components/LogIn";
import CreateAccount from "./components/CreateAccount";
import ResetPassword from "./components/ResetPassword";
import ConfirmEmail from "./components/ConfirmEmail";
import AlmostDone from "./components/AlmostDone";
import Profile from "./components/Profile";
import UpdatePassword from "./components/UpdatePassword";

// Admin
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminCategories from "./components/Admin/AdminCategories";
import AdminCustomers from "./components/Admin/AdminCustomers";
import AdminMain from "./components/Admin/AdminLayout";
import AdminCustomerDetail from "./components/Admin/AdminCustomerDetail";
import AdminAddCustomer from "./components/Admin/AdminAddCustomer";
import AdminAddProducts from "./components/Admin/AdminAddProducts";
import AdminProductDetail from "./components/Admin/AdminProductDetail"
import AdminAddCategories from "./components/Admin/AdminAddCategories";
import AdminContactUs from "./components/Admin/AdminContactUs";

// Load Stripe with your public key
const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY); // replace with your key

function App() {
  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <Router>
          <Header />
          <div className="pt-16">
            <Toaster position="top-right" duration={3000} offset={80} />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/search" element={<Search/>}/> */}
              <Route path="/product" element={<Product />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<CreateAccount />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/order" element={<Order />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout-payment" element={<CheckoutPayment />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/orderDetail" element={<OrderDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/updatePassword" element={<UpdatePassword />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/confirmemail" element={<ConfirmEmail />} />
              <Route path="/almostdone" element={<AlmostDone />} />
              <Route path="/customer-details/:id" element={<AdminCustomerDetail />} />
              <Route path="/admin/add-customer" element={<AdminAddCustomer />} />
              <Route path="/admin/add-products" element={<AdminAddProducts />} />
              <Route path="/products/:id" element={<AdminProductDetail />} />
              <Route path="/admin/categories/add-categories" element={<AdminAddCategories />} />
              <Route path="/admin" element={<AdminMain />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="customers" element={<AdminCustomers />} />
                <Route path="contactUs" element={<AdminContactUs />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </Elements>
    </Provider>
  );
}

export default App;
