
import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary/70 border-t border-border py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-semibold font-display">
              <span className="text-primary">Warren</span>
              <span className="text-muted-foreground">Okumu</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Software Engineer with 3+ years of experience creating modern web applications and enterprise solutions.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">Navigation</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-primary text-sm">Home</Link>
              <Link to="/projects" className="text-muted-foreground hover:text-primary text-sm">Projects</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary text-sm">About</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm">Contact</Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">Contact</h3>
            <div className="flex flex-col space-y-2">
              <a href="tel:+254707168578" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2">
                <Phone size={16} /> +254 707 168 578
              </a>
              <a href="mailto:warrenokumu98@gmail.com" className="text-muted-foreground hover:text-primary text-sm flex items-center gap-2">
                <Mail size={16} /> warrenokumu98@gmail.com
              </a>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                Nairobi, Kenya
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">Social</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition">
                <Linkedin size={18} />
              </a>
              <a href="mailto:warrenokumu98@gmail.com" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Warren Okumu. All rights reserved.
          </p>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-primary mt-4 md:mt-0">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
