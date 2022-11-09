import './App.scss';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import FoodDetail from './components/FoodDetail/FoodDetail';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Favorite from './components/Favorite/Favorite';


function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/product/:_id' element={<FoodDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;