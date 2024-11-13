import React from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUp from './signup';

function App() {
  return (
    // <div className="App">
    //     <h2>Welcome Bro</h2>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
