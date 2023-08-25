import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import FormComponet from './components/FormBuilder';
import FormRenderComponent from './components/form';
import FormEditBuilderComponent from './components/EditFormBuilder';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ul>
      <li className="nav-item">
              <Link to="/form" className="nav-link">Form</Link>
        </li>
        <li className="nav-item">
              <Link to="/formbuilder" className="nav-link">New Formbuilder</Link>
        </li>
        <li className="nav-item">
              <Link to="/editFormbuilder" className="nav-link">Edit Formbuilder</Link>
        </li>    
      </ul>
      <div className="container mt-5">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link to="/signup" className="nav-link">Signup</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li> */}
          </ul>
        </nav>
        <Routes>
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/form" element={<FormRenderComponent />} />
          <Route path="/formbuilder" element={<FormComponet />} />
          <Route path='/editFormbuilder' element={< FormEditBuilderComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
