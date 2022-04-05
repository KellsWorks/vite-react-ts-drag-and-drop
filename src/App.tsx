import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ConfigurationPage from './components/ConfigurationPage';
import LayoutsPage from './components/LayoutsPage';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <Link className="navbar-brand btn" to="/">
              Home
            </Link>
          </div>
        </nav>

        <div className="mt-5 pt-5 container">
          <Routes>
            <Route path="/configuration/:id" element={<ConfigurationPage/>} />
            <Route path="/" element={<LayoutsPage/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
