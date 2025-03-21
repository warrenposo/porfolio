
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { X, Plus, Upload } from 'lucide-react';
import { Project } from './ProjectCard';
import { useProjects } from '@/hooks/useProjects';

interface AdminProjectFormProps {
  project?: Project;
  onSubmit: (project: Omit<Project, 'id'>) => void;
  isLoading: boolean;
}

const AdminProjectForm: React.FC<AdminProjectFormProps> = ({ 
  project, 
  onSubmit,
  isLoading
}) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    image: project?.image || '',
    tags: project?.tags?.join(', ') || '',
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
    featured: project?.featured || false,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(project?.image || null);
  const [tagInput, setTagInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const { uploadImage } = useProjects();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      try {
        // First, show a local preview
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result as string;
          setImagePreview(imageUrl);
        };
        reader.readAsDataURL(file);
        
        // Then upload to Supabase
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setFormData((prev) => ({ ...prev, image: imageUrl }));
          toast({
            title: "Image uploaded successfully",
            description: "Your image has been saved to the cloud.",
          });
        } else {
          toast({
            title: "Upload failed",
            description: "There was a problem uploading your image. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error handling image:', error);
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadingImage(true);
      try {
        // First, show a local preview
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result as string;
          setImagePreview(imageUrl);
        };
        reader.readAsDataURL(file);
        
        // Then upload to Supabase
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setFormData((prev) => ({ ...prev, image: imageUrl }));
          toast({
            title: "Image uploaded successfully",
            description: "Your image has been saved to the cloud.",
          });
        } else {
          toast({
            title: "Upload failed",
            description: "There was a problem uploading your image. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error handling image:', error);
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your image. Please try again.",
          variant: "destructive",
        });
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      const currentTags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
      const newTags = [...currentTags, tagInput.trim()].filter(Boolean);
      setFormData((prev) => ({ ...prev, tags: newTags.join(', ') }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = formData.tags.split(',').map(tag => tag.trim());
    const newTags = currentTags.filter(tag => tag !== tagToRemove);
    setFormData((prev) => ({ ...prev, tags: newTags.join(', ') }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.image) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    
    onSubmit({
      title: formData.title,
      description: formData.description,
      image: formData.image,
      tags,
      liveUrl: formData.liveUrl || undefined,
      githubUrl: formData.githubUrl || undefined,
      featured: formData.featured,
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Project Title <span className="text-destructive">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="My Awesome Project"
          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all duration-200"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description <span className="text-destructive">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Describe your project..."
          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all duration-200 resize-none"
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Project Image <span className="text-destructive">*</span>
        </label>
        <div 
          className="border-2 border-dashed border-input rounded-lg p-4"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={imagePreview ? undefined : handleImageClick}
        >
          {imagePreview ? (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Project preview" 
                className="w-full h-48 object-cover rounded-md"
              />
              <button
                type="button"
                disabled={uploadingImage}
                onClick={() => {
                  setImagePreview(null);
                  setFormData((prev) => ({ ...prev, image: '' }));
                }}
                className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
              >
                <X size={16} />
              </button>
              {uploadingImage && (
                <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                  <div className="text-center">
                    <p className="mb-2">Uploading image...</p>
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 bg-secondary/40 rounded-md cursor-pointer">
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Drag & drop an image or click to browse</p>
              <input
                id="image-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
              >
                Select Image
              </label>
              {uploadingImage && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Uploading...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Project Tags</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add a tag"
            className="flex-1 px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all duration-200"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
        
        {formData.tags && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.split(',').map((tag, index) => (
              tag.trim() && (
                <div
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                >
                  {tag.trim()}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag.trim())}
                    className="p-0.5 hover:bg-secondary-foreground/10 rounded-full"
                  >
                    <X size={12} />
                  </button>
                </div>
              )
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="liveUrl" className="text-sm font-medium">
            Live URL
          </label>
          <input
            id="liveUrl"
            name="liveUrl"
            type="url"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="githubUrl" className="text-sm font-medium">
            GitHub URL
          </label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="url"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/username/repo"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all duration-200"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          checked={formData.featured}
          onChange={handleCheckboxChange}
          className="h-4 w-4 border border-input rounded focus:ring-2 focus:ring-ring"
        />
        <label htmlFor="featured" className="text-sm font-medium">
          Featured Project
        </label>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
      </button>
    </form>
  );
};

export default AdminProjectForm;
