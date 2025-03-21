
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useProjects } from '@/hooks/useProjects';
import TransitionWrapper from '@/components/TransitionWrapper';

const Index: React.FC = () => {
  const { projects } = useProjects();
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);
  const recentProjects = projects.slice(0, 3);

  return (
    <>
      <Navbar />
      <TransitionWrapper>
        <main>
          <Hero />
          
          {/* Featured Projects Section */}
          {featuredProjects.length > 0 && (
            <section className="section-padding bg-white">
              <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-primary rounded-full mb-3">
                      Featured Work
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold font-display">Highlighted Projects</h2>
                  </div>
                  <Link 
                    to="/projects" 
                    className="mt-4 md:mt-0 inline-flex items-center text-primary hover:underline"
                  >
                    View All Projects <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} featured={true} />
                  ))}
                </div>
              </div>
            </section>
          )}
          
          {/* Recent Projects Section */}
          <section className="section-padding bg-secondary/30">
            <div className="container-custom">
              <div className="text-center mb-12">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-primary rounded-full mb-3">
                  Recent Work
                </span>
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Latest Projects</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore my most recent work showcasing expertise in web development, ERP implementation, and mobile applications.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link 
                  to="/projects" 
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2 button-effect"
                >
                  Explore All Projects <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>
          
          {/* About Section Preview */}
          <section className="section-padding bg-white">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-primary rounded-full mb-3">
                    About Me
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Software Engineer with 3+ Years Experience</h2>
                  <p className="text-muted-foreground mb-6">
                    I'm a software engineer specializing in building exceptional digital experiences. My expertise spans frontend development, Oracle ERP customization, and full-stack web applications.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">React.js</span>
                    <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">Angular</span>
                    <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">Vue.js</span>
                    <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">Oracle EBS</span>
                    <span className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">WordPress</span>
                  </div>
                  <Link 
                    to="/about" 
                    className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:shadow-sm transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    Learn More About Me <ArrowRight size={18} />
                  </Link>
                </div>
                
                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary rounded-full opacity-20"></div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary rounded-full opacity-20"></div>
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1655&auto=format&fit=crop" 
                        alt="Warren Okumu" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Contact CTA */}
          <section className="section-padding bg-primary text-primary-foreground">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Let's Build Something Amazing Together</h2>
                <p className="text-primary-foreground/80 mb-8">
                  Have a project in mind or looking for a skilled software engineer? Let's connect and discuss how I can help turn your ideas into reality.
                </p>
                <Link 
                  to="/contact" 
                  className="px-8 py-3 rounded-full bg-white text-primary font-medium hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Get in Touch <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </TransitionWrapper>
    </>
  );
};

export default Index;
