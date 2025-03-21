
import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import ProjectCard from '@/components/ProjectCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TransitionWrapper from '@/components/TransitionWrapper';

const Projects: React.FC = () => {
  const { projects } = useProjects();
  const [filter, setFilter] = useState<string | null>(null);
  
  // Extract unique tags from all projects
  const allTags = Array.from(
    new Set(
      projects.flatMap(project => project.tags)
    )
  ).sort();
  
  const filteredProjects = filter 
    ? projects.filter(project => project.tags.includes(filter))
    : projects;

  return (
    <>
      <Navbar />
      <TransitionWrapper>
        <main className="pt-24 pb-16">
          {/* Header */}
          <section className="section-padding bg-secondary/30">
            <div className="container-custom">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-primary rounded-full mb-3">
                  Portfolio
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">My Projects</h1>
                <p className="text-muted-foreground text-lg">
                  Browse through my latest work spanning web development, Oracle ERP implementation, and mobile applications.
                </p>
              </div>
            </div>
          </section>
          
          {/* Filter Tags */}
          <section className="py-8 bg-white border-b border-border">
            <div className="container-custom">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setFilter(null)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    filter === null 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                  }`}
                >
                  All Projects
                </button>
                
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setFilter(tag)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                      filter === tag 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </section>
          
          {/* Projects Grid */}
          <section className="section-padding bg-white">
            <div className="container-custom">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                  <p className="text-muted-foreground">
                    No projects match the selected filter. Try another category or view all projects.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      featured={false} 
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </TransitionWrapper>
    </>
  );
};

export default Projects;
