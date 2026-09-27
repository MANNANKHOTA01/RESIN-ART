// ResinArt Core Type Definitions

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url?: string;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
}

export interface Article {
  id: string;
  category_id?: string;
  category?: Category;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_id?: string;
  author_name?: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  reading_time: string;
  seo_title?: string;
  seo_description?: string;
  canonical_url?: string;
  published_at?: string;
  created_at: string;
  updated_at?: string;
  tags?: Tag[];
}

export interface ProjectMaterial {
  id?: string;
  project_id?: string;
  name: string;
  quantity: string;
  notes?: string;
}

export interface ProjectStep {
  id?: string;
  project_id?: string;
  step_number: number;
  title: string;
  content: string;
  image_url?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimated_time: string;
  featured: boolean;
  seo_title?: string;
  seo_description?: string;
  status: 'draft' | 'published' | 'archived';
  materials?: ProjectMaterial[];
  steps?: ProjectStep[];
  created_at: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  subscribed_at: string;
  unsubscribed_at?: string;
}

export interface MediaItem {
  id: string;
  file_name: string;
  storage_path: string;
  public_url: string;
  alt_text: string;
  uploaded_by?: string;
  created_at: string;
}

export interface SiteSettings {
  site_name: string;
  site_description: string;
  default_seo_title: string;
  default_seo_description: string;
  contact_email: string;
  support_phone: string;
  studio_location: string;
  instagram_url: string;
  pinterest_url: string;
  youtube_url: string;
}
