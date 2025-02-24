import logo from './logo.svg';
import Encrypt from './Encrypt';
import Decrypt from './Decrypt';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li>
              <Link to="/decrypt" className="nav-link" onMouseOver={(e) => e.target.style.backgroundColor = '#ccc'} 
                  onMouseOut={(e) => e.target.style.backgroundColor = ''}>Decrypt</Link>
            </li>
            <li>
              <Link to="/encrypt" className="nav-link" onMouseOver={(e) => e.target.style.backgroundColor = '#ccc'} 
                   onMouseOut={(e) => e.target.style.backgroundColor = ''}>Encrypt</Link>
            </li>
          </ul>
        </nav>
        <div className={`main-content ${menuOpen ? 'open' : ''}`}>
          <h1 style={{textAlign:'center'}}>String Encryption and Decryption App</h1>
          <Routes>
            <Route path="/decrypt" element={<Decrypt />} />
            <Route path="/encrypt" element={<Encrypt />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
