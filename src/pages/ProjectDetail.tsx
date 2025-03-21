
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Clock, Calendar } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import TransitionWrapper from '@/components/TransitionWrapper';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProject, projects } = useProjects();
  const [project, setProject] = useState(id ? getProject(id) : undefined);
  
  useEffect(() => {
    if (id) {
      const foundProject = getProject(id);
      if (foundProject) {
        setProject(foundProject);
      } else {
        navigate('/projects', { replace: true });
      }
    }
  }, [id, getProject, navigate]);
  
  if (!project) {
    return null;
  }
  
  // Get related projects (projects with matching tags, excluding current one)
  const relatedProjects = projects
    .filter(p => 
      p.id !== project.id && 
      p.tags.some(tag => project.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <TransitionWrapper>
        <main className="pt-24 pb-16">
          {/* Hero Image */}
          <div className="h-[40vh] md:h-[60vh] relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            
            <div className="container-custom absolute bottom-0 left-0 right-0 pb-8">
              <Link 
                to="/projects"
                className="inline-flex items-center text-sm font-medium px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-primary hover:bg-white transition-colors mb-4"
              >
                <ArrowLeft size={16} className="mr-2" /> Back to Projects
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold font-display text-white drop-shadow-md">{project.title}</h1>
            </div>
          </div>
          
          {/* Project Details */}
          <section className="py-12 bg-white border-b border-border">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground">
                      {project.description}
                    </p>
                    
                    {/* In a real app, you'd have more detailed content here */}
                    <p className="mt-6">
                      This project demonstrates my ability to create effective, user-friendly solutions that meet client needs. Using the latest technologies and best practices, I delivered a product that exceeded expectations and provides ongoing value.
                    </p>
                    
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Key Features</h2>
                    <ul className="space-y-2">
                      <li>Responsive design optimized for all devices</li>
                      <li>Intuitive user interface for seamless navigation</li>
                      <li>Performance optimized for fast loading times</li>
                      <li>Secure implementation with data protection</li>
                      <li>Scalable architecture for future growth</li>
                    </ul>
                  </div>
                </div>
                
                <div className="glass-card p-6 h-fit">
                  <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Timeline</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock size={16} className="mr-2" /> 4 weeks
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar size={16} className="mr-2" /> Completed in 2024
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-border">
                      <div className="flex flex-col gap-3">
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                          >
                            Visit Live Site <ExternalLink size={16} />
                          </a>
                        )}
                        
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                          >
                            View Source Code <Github size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <section className="section-padding bg-secondary/30">
              <div className="container-custom">
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-8">Related Projects</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedProjects.map((relatedProject) => (
                    <ProjectCard key={relatedProject.id} project={relatedProject} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </TransitionWrapper>
    </>
  );
};

export default ProjectDetail;
