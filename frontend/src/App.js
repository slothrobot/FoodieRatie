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
import MyList from './components/MyList/MyList';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './routing/ProtectedRoute';

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
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedRoute />}>
            <Route path='/user-profile' element={<Profile />} />
            <Route path='/list' element={<MyList />} />
          </Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
