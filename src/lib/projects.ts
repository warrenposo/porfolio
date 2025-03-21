import { Project } from '@/components/ProjectCard';
import { supabase } from './supabase';

// Sample projects data - in a real app, this would come from a database
const projects: Project[] = [
  {
    id: '1',
    title: 'Vision Plus Kenya',
    description: 'An e-commerce website for selling electronic equipment built with WordPress, WooCommerce, and Firebase. Over 2500 people have used it, with 500+ queries being saved and shared, resulting in improved search results.',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1470&auto=format&fit=crop',
    tags: ['WordPress', 'WooCommerce', 'Firebase', 'E-commerce'],
    liveUrl: 'https://visionplus.co.ke',
    featured: true,
  },
  {
    id: '2',
    title: 'PetStore Kenya',
    description: 'An e-commerce website that sells pet animal products using WordPress and WooCommerce that serves over 300 customers daily.',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1364&auto=format&fit=crop',
    tags: ['WordPress', 'WooCommerce', 'E-commerce', 'Pet Products'],
    liveUrl: 'https://petstorekenya.com',
  },
  {
    id: '3',
    title: 'FarajaRafting',
    description: 'A team building website that raises funds for cancer patients, built using React.js and related frameworks and technologies.',
    image: 'https://images.unsplash.com/photo-1520853504280-249b72dc947c?q=80&w=1374&auto=format&fit=crop',
    tags: ['React.js', 'Fundraising', 'Team Building', 'Healthcare'],
    liveUrl: 'https://farajarafting.org',
    githubUrl: 'https://github.com/warrenokumu/farajarafting',
  },
  {
    id: '4',
    title: 'PetStore Kenya App',
    description: 'A mobile application as a second option for selling animal pet products, built using React Native and related frameworks and technologies.',
    image: 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?q=80&w=1335&auto=format&fit=crop',
    tags: ['React Native', 'Mobile App', 'E-commerce', 'Pet Products'],
    githubUrl: 'https://github.com/warrenokumu/petstorekenya-app',
  },
];

// Create a class to store and manipulate projects
export class ProjectStore {
  private static instance: ProjectStore;
  private projects: Project[] = [...projects];
  private listeners: (() => void)[] = [];

  private constructor() {}

  public static getInstance(): ProjectStore {
    if (!ProjectStore.instance) {
      ProjectStore.instance = new ProjectStore();
    }
    return ProjectStore.instance;
  }

  public getProjects(): Project[] {
    return [...this.projects];
  }

  public getProject(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  public getFeaturedProjects(): Project[] {
    return this.projects.filter(project => project.featured);
  }

  // Upload an image to Supabase storage with enhanced error handling
  public async uploadImage(file: File): Promise<string | null> {
    try {
      // Check if Supabase is properly initialized
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }
      
      // Create a unique file name
      const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
      
      console.log('Uploading image to Supabase:', fileName);
      
      // Check if storage is accessible
      const { data: bucketData, error: bucketError } = await supabase.storage
        .getBucket('projects')
        .catch(err => {
          console.error('Error accessing storage bucket:', err);
          return { data: null, error: err };
        });
        
      if (bucketError) {
        console.error('Supabase bucket access error:', bucketError);
        console.log('Please make sure the "projects" bucket exists in your Supabase project');
        // Return a placeholder image URL for now to prevent white screen
        return 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1476&auto=format&fit=crop';
      }
      
      // Upload the file to the 'projects' bucket
      const { data, error } = await supabase.storage
        .from('projects')
        .upload(fileName, file);
      
      if (error) {
        console.error('Supabase upload error:', error);
        // Return a placeholder image URL instead of throwing
        return 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1476&auto=format&fit=crop';
      }
      
      // Get the public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(data.path);
      
      console.log('Image uploaded successfully:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      // Return a placeholder image URL to prevent white screen
      return 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1476&auto=format&fit=crop';
    }
  }

  public async addProject(project: Omit<Project, 'id'>): Promise<Project> {
    const newProject = {
      ...project,
      id: Date.now().toString(), // Simple ID generation
    };
    this.projects = [...this.projects, newProject];
    this.notifyListeners();
    return newProject;
  }

  public async updateProject(id: string, project: Omit<Project, 'id'>): Promise<Project | null> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    // Create the updated project with the same ID
    const updatedProject = { ...project, id };
    
    // Update the projects array
    this.projects = [
      ...this.projects.slice(0, index),
      updatedProject,
      ...this.projects.slice(index + 1)
    ];
    
    this.notifyListeners();
    return updatedProject;
  }

  public async deleteProject(id: string): Promise<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;

    // If the project has an image URL from Supabase, we should delete it
    const project = this.projects[index];
    if (project.image && project.image.includes('supabase.co')) {
      try {
        // Extract the file name from the URL
        const fileName = project.image.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('projects')
            .remove([fileName]);
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    this.projects = [
      ...this.projects.slice(0, index),
      ...this.projects.slice(index + 1)
    ];
    this.notifyListeners();
    return true;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }
}

export default ProjectStore.getInstance();
