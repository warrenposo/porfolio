import { useState, useEffect } from 'react';
import projectStore from '@/lib/projects';
import { Project } from '@/components/ProjectCard';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await projectStore.getProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const imageUrl = await projectStore.uploadImage(file);
      if (!imageUrl) throw new Error('Failed to upload image');
      return imageUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const newProject = await projectStore.addProject(project);
      if (newProject) setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add project');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProject = async (id: number, project: Omit<Project, 'id'>) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedProject = await projectStore.updateProject(id, project);
      if (updatedProject) {
        setProjects(prev => prev.map(p => (p.id === id ? updatedProject : p)));
      }
      return updatedProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const success = await projectStore.deleteProject(id);
      if (success) setProjects(prev => prev.filter(p => p.id !== id));
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    projects,
    isLoading,
    error,
    uploadImage,
    addProject,
    updateProject,
    deleteProject,
  };
};