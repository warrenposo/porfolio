
import { useState, useEffect } from 'react';
import projectStore, { ProjectStore } from '@/lib/projects';
import { Project } from '@/components/ProjectCard';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(projectStore.getProjects());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = projectStore.subscribe(() => {
      setProjects(projectStore.getProjects());
    });
    
    return () => unsubscribe();
  }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const imageUrl = await projectStore.uploadImage(file);
      if (!imageUrl) {
        throw new Error('Failed to upload image');
      }
      return imageUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      setError(errorMessage);
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate that the image exists
      if (!project.image) {
        throw new Error('Project image is required');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProject = await projectStore.addProject(project);
      return newProject;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add project';
      setError(errorMessage);
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (id: string, project: Omit<Project, 'id'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate that the image exists
      if (!project.image) {
        throw new Error('Project image is required');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedProject = await projectStore.updateProject(id, project);
      if (!updatedProject) {
        throw new Error('Project not found');
      }
      
      return updatedProject;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project';
      setError(errorMessage);
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const result = await projectStore.deleteProject(id);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete project';
      setError(errorMessage);
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getProject = (id: string) => {
    return projectStore.getProject(id);
  };

  const getFeaturedProjects = () => {
    return projectStore.getFeaturedProjects();
  };

  return {
    projects,
    isLoading,
    error,
    uploadImage,
    addProject,
    updateProject,
    deleteProject,
    getProject,
    getFeaturedProjects,
  };
};
