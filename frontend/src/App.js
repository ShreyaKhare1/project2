
import './index.css';
import HomePage from './landing_page/home/HomePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Pricing from './landing_page/home/Pricing';
import About from './landing_page/about/About';
import SignUp from './landing_page/signup/SignUp';
import Support from './landing_page/support/Support';
import ProductsPage from './landing_page/products/ProductsPage';
import PricingPage from './landing_page/pricing/PricingPage';
import NotFound from './NotFound';
import Home from './components/Home';
import { useLocation } from "react-router-dom";

import Login from './landing_page/signup/Login';

function App() {
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/support" element={<Support />} />
        <Route path="/dashboard/*" element={<Home />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
}
export default App;