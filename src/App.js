import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import FoodDetail from './components/FoodDetail/FoodDetail';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <div className='container'>
        <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/product/:_id' element={<FoodDetail />} />
        <Route path="*" element={<PageNotFound />} />
        </Routes>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
