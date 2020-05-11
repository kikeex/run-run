import React from 'react';
import SearchForm from './components/SearchForm';
import Footer from './components/Footer';
import Logo from './assets/logo-car.png'
import './App.css';

const App = () => (
  <div className='container mt-4' >
    <h4 className='display-4 text-center mb-4'>
      <img src={Logo} className="logo-image" alt="Chiper logo" />
    </h4>
    <SearchForm />
    <Footer />
  </div>
);

export default App;
