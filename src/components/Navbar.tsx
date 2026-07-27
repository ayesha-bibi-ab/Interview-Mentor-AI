import React, { useState, useEffect } from 'react';
import { Bot, Play, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all ${scrolled ? 'bg-white shadow-sm py-2' : 'bg-white/90 backdrop-blur-md border-bottom py-3'}`}>
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2 text-primary fw-bold" href="#home">
          <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
            <Bot size={22} />
          </div>
          <span className="fs-5 text-dark tracking-tight fw-bold">
            Interview<span className="text-primary">Mentor</span> AI
          </span>
        </a>

        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <a className="nav-link px-3" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#practice">Practice</a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#history">History</a>
            </li>
            <li className="nav-item">
              <a className="nav-link px-3" href="#about">About</a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <a href="#practice" className="btn btn-primary d-inline-flex align-items-center gap-2 shadow-sm fs-6">
              <Sparkles size={16} />
              <span>Start Practice</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
