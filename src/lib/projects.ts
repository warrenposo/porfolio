import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lizkalsahbpmznkajjyr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpemthbHNhaGJwbXpua2FqanlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NDA5NTcsImV4cCI6MjA1ODExNjk1N30.iv9rCs5qcaufM6hEPEl5QalcsvIu5sBHAr5YfGzD1KI';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Project {
  id: number;
  name: string;
  description: string;
  image?: string;
  created_at: string;
}

class ProjectStore {
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
    return data || [];
  }

  async addProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project | null> {
    const { data, error } = await supabase.from('projects').insert([{ ...project }]).select().single();
    if (error) {
      console.error('Error adding project:', error);
      return null;
    }
    return data;
  }

  async updateProject(id: number, project: Omit<Project, 'id' | 'created_at'>): Promise<Project | null> {
    const { data, error } = await supabase.from('projects').update(project).eq('id', id).select().single();
    if (error) {
      console.error('Error updating project:', error);
      return null;
    }
    return data;
  }

  async deleteProject(id: number): Promise<boolean> {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      console.error('Error deleting project:', error);
      return false;
    }
    return true;
  }
}

export default new ProjectStore();