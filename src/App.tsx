import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container mt-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Signup</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
