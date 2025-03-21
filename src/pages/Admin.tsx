
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, AlertTriangle, X } from 'lucide-react';
import { useProjects } from '@/hooks/useProjects';
import AdminProjectForm from '@/components/AdminProjectForm';
import { Project } from '@/components/ProjectCard';
import TransitionWrapper from '@/components/TransitionWrapper';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    projects, 
    isLoading, 
    error, 
    addProject, 
    updateProject, 
    deleteProject 
  } = useProjects();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    // Simple client-side auth check - replace with a proper authentication system in production
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/admin-login');
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  const handleAddProject = async (project: Omit<Project, 'id'>) => {
    const result = await addProject(project);
    if (result) {
      toast({
        title: "Project added successfully",
        description: `"${project.title}" has been added to your portfolio.`,
      });
      setIsAddingProject(false);
    } else {
      toast({
        title: "Failed to add project",
        description: error || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProject = async (project: Omit<Project, 'id'>) => {
    if (!editingProject) return;
    
    const result = await updateProject(editingProject.id, project);
    if (result) {
      toast({
        title: "Project updated successfully",
        description: `"${project.title}" has been updated.`,
      });
      setEditingProject(null);
    } else {
      toast({
        title: "Failed to update project",
        description: error || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteConfirm = async (id: string) => {
    const result = await deleteProject(id);
    if (result) {
      toast({
        title: "Project deleted successfully",
        description: "The project has been removed from your portfolio.",
      });
      setShowDeleteConfirm(null);
    } else {
      toast({
        title: "Failed to delete project",
        description: error || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <TransitionWrapper>
      <div className="min-h-screen pt-24 pb-16 bg-secondary/30">
        <div className="container-custom">
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold font-display mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your portfolio projects</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setIsAddingProject(true);
                  setEditingProject(null);
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <Plus size={18} /> Add Project
              </button>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          
          {isAddingProject && (
            <div className="mb-8">
              <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Add New Project</h2>
                  <button
                    onClick={() => setIsAddingProject(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <AdminProjectForm
                  onSubmit={handleAddProject}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}
          
          {editingProject && (
            <div className="mb-8">
              <div className="glass-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Edit Project</h2>
                  <button
                    onClick={() => setEditingProject(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <AdminProjectForm
                  project={editingProject}
                  onSubmit={handleUpdateProject}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}
          
          <div className="glass-card">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold">Your Projects ({projects.length})</h2>
            </div>
            
            {projects.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <p>You don't have any projects yet. Click "Add Project" to create your first project.</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {projects.map((project) => (
                  <div key={project.id} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-16 h-16 rounded-md bg-cover bg-center"
                          style={{ backgroundImage: `url(${project.image})` }}
                        />
                        <div>
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                          {project.featured && (
                            <span className="inline-block px-2 py-0.5 mt-1 text-xs bg-primary/10 text-primary rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => {
                            setEditingProject(project);
                            setIsAddingProject(false);
                          }}
                          className="p-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                          aria-label="Edit project"
                        >
                          <Edit size={18} />
                        </button>
                        
                        <button
                          onClick={() => setShowDeleteConfirm(project.id)}
                          className="p-2 bg-destructive/10 text-destructive rounded-md hover:bg-destructive/20 transition-colors"
                          aria-label="Delete project"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {showDeleteConfirm === project.id && (
                      <div className="mt-4 p-4 bg-destructive/10 rounded-md">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="text-destructive mt-0.5" size={20} />
                          <div>
                            <h4 className="font-medium text-destructive">Delete this project?</h4>
                            <p className="text-sm text-muted-foreground mt-1 mb-3">
                              This action cannot be undone. This will permanently delete "{project.title}" from your portfolio.
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleDeleteConfirm(project.id)}
                                className="px-3 py-1.5 bg-destructive text-destructive-foreground text-sm rounded-md hover:bg-destructive/90 transition-colors"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm rounded-md hover:bg-secondary/80 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </TransitionWrapper>
  );
};

export default Admin;
