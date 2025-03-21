
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Server, Layout } from 'lucide-react';

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (headingRef.current) {
      const text = headingRef.current.innerText;
      headingRef.current.innerHTML = '';
      
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.style.setProperty('--index', index.toString());
        span.textContent = char === ' ' ? '\u00A0' : char;
        headingRef.current?.appendChild(span);
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 dot-pattern opacity-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 top-1/4 w-64 h-64 rounded-full bg-secondary/30 filter blur-3xl animate-spin-slow"></div>
        <div className="absolute -left-32 top-2/3 w-72 h-72 rounded-full bg-secondary/20 filter blur-3xl animate-spin-slow"></div>
      </div>
      
      <div className="container-custom relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-10">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-primary rounded-full mb-5 animate-slide-down">
              Software Engineer & Oracle Developer
            </span>
            
            <h1 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6 reveal-text">
              Crafting Digital Experiences
            </h1>
            
            <p className="text-muted-foreground text-pretty text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              I design and develop applications that look amazing, work fast, and solve real problems.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              <Link
                to="/projects"
                className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 button-effect"
              >
                View Projects <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:shadow-sm transition-all duration-300 flex items-center justify-center"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          
          {/* Skills Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
            <div className="glass-card p-6 text-left hover-lift">
              <div className="mb-4 p-2 bg-secondary/70 inline-block rounded-lg">
                <Layout size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Frontend Development</h3>
              <p className="text-muted-foreground text-sm">Building responsive interfaces with React, Angular, and Vue.js</p>
            </div>
            
            <div className="glass-card p-6 text-left hover-lift">
              <div className="mb-4 p-2 bg-secondary/70 inline-block rounded-lg">
                <Server size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ERP Development</h3>
              <p className="text-muted-foreground text-sm">Oracle EBS, SAP, Microsoft Dynamics implementation and customization</p>
            </div>
            
            <div className="glass-card p-6 text-left hover-lift">
              <div className="mb-4 p-2 bg-secondary/70 inline-block rounded-lg">
                <Code size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Web Applications</h3>
              <p className="text-muted-foreground text-sm">Full-stack solutions with RESTful APIs and responsive design</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
