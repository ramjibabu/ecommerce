import React from 'react';

import './App.css';
import Footer from './components/layouts/footer';
import Header from './components/layouts/header';
import Home from './components/home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import ProductDetail from './components/productDetail';


function App() {
  return (

    <Router>
       
      <div className="App">
     
          <Header />
          
          <div className="container container-fluid">
          <ToastContainer theme='dark'/>
          <Routes>
          
          <Route path='/' element={<Home />} />
          <Route path='/product/:id' element={<ProductDetail />} />
            
         
          </Routes>
          </div>
          <Footer />
       
      </div>
      
    </Router>

  );
}

export default App;
