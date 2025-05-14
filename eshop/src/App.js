import "./App.css";
import "./index.css";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header"
import Home from "./components/Home";
import Product from "./components/Product";
import About from "./components/About";
import Contact from "./components/Contact";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import Order from "./components/Order";
import CheckoutDelivery from "./components/CheckoutDelivery";
import CheckoutDetailDelivery from "./components/CheckoutDetailDelivery";
import LogIn from "./components/LogIn";
import CreateAccount from "./components/CreateAccount";
import ResetPassword from "./components/ResetPassword";
import ConfirmEmail from "./components/ConfirmEmail";
import AlmostDone from "./components/AlmostDone";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import AdminOrders from "./components/Admin/AdminOrders.jsx";
import AdminProducts from "./components/Admin/AdminProducts.jsx";
import AdminCategories from "./components/Admin/AdminCategories.jsx";
import AdminCustomers from "./components/Admin/AdminCustomers.jsx";
import AdminMain from "./components/Admin/AdminLayout.jsx";
import AdminCustomerDetail from"./components/Admin/AdminCustomerDetail.jsx";
import AdminAddCustomer from "./components/Admin/AdminAddCustomer.jsx";
import AdminAddProducts from "./components/Admin/AdminAddProducts.jsx";
import AdminAddCategories from "./components/Admin/AdminAddCategories.jsx";


function App() {
  return (
    <Router>
      <Header />
      <div className="pt-16"> {/* Padding to prevent content overlap */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckoutDelivery />} />
          <Route path="/createaccount" element={<CreateAccount />} />
          <Route path="/login" element={<LogIn/>} />
          <Route path="/order" element={<Order/>}/>
          <Route path="/checkoutDelivery" element={<CheckoutDelivery/>}/>
          <Route path="/paymentDetail" element={<CheckoutDetailDelivery/>}/> 
          <Route path="/orderNow" element={<Checkout/>}/>
          <Route path="/orderStatus" element={<CheckoutDelivery/>}/>
          <Route path="/resetpassword" element={<ResetPassword/>}/>
          <Route path="/confirmemail" element={<ConfirmEmail/>}/>
          <Route path="/almostdone" element={<AlmostDone/ >}/>
          {/* <Route path="/admindashboard" element={<AdminDashboard/ >}/> */}
          <Route path="/customer-details/:id" element={<AdminCustomerDetail />} />
          <Route path="/admin/add-customer" element={<AdminAddCustomer />} /> 
          <Route path="/admin/add-products" element={<AdminAddProducts />} /> 
          <Route path="/admin/categories/add-categories" element={<AdminAddCategories />} /> 
          <Route path="/admin" element={<AdminMain/>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="customers" element={<AdminCustomers />} />
          </Route> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

