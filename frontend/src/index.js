import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import HomePage from './landing_page/home/HomePage';
// import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import Pricing from './landing_page/home/Pricing';
// import About from './landing_page/about/About';
// import SignUp from './landing_page/signup/SignUp';
// import Support from './landing_page/support/Support';
// import ProductsPage from './landing_page/products/ProductsPage';
// import PricingPage from './landing_page/pricing/PricingPage';
// import NotFound from './NotFound';
// import Home from './components/Home';
// import { useLocation } from "react-router-dom";
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//   <Navbar></Navbar>
//   <Routes>
//     <Route path="/" element={<HomePage></HomePage>}></Route>
//     <Route path="/about" element={<About></About>}></Route>
//     <Route path="/pricing" element={<PricingPage></PricingPage>}></Route>
//     <Route path="/product" element={<ProductsPage/>}></Route>
//     <Route path="/signup" element={<SignUp></SignUp>}></Route>
//     <Route path="/support" element={<Support></Support>}></Route>
//     <Route path="/dashboard/*" element={<Home />} />
//     <Route path="/*" element={<NotFound/>}></Route>
//   </Routes>
//   <Footer></Footer>
//   </BrowserRouter>
// );

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from './App'
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);