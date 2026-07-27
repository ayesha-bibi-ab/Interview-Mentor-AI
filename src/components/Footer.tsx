import React from 'react';
import { Bot, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-4 border-top border-secondary border-opacity-25">
      <div className="container">
        <div className="row align-items-center gy-3">
          <div className="col-md-6 text-center text-md-start">
            <a href="#home" className="d-inline-flex align-items-center gap-2 text-white text-decoration-none fw-bold fs-6">
              <div className="bg-primary text-white p-1.5 rounded-2 d-flex align-items-center justify-content-center">
                <Bot size={18} />
              </div>
              <span>Interview Mentor AI</span>
            </a>
            <p className="text-secondary small mb-0 mt-1">
              University Final Project • AI-Powered Practice for Students & Graduates
            </p>
          </div>

          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3 small mb-1">
              <a href="#home" className="text-secondary text-decoration-none hover:text-white">Home</a>
              <a href="#practice" className="text-secondary text-decoration-none hover:text-white">Practice</a>
              <a href="#history" className="text-secondary text-decoration-none hover:text-white">History</a>
              <a href="#about" className="text-secondary text-decoration-none hover:text-white">About</a>
            </div>
            <p className="text-secondary fs-8 mb-0">
              © {new Date().getFullYear()} Interview Mentor AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
