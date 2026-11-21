export interface Project {
  id: number;
  title: string;
  category: string; // 'Residential', 'Villa', '3D Elevation', 'Commercial', 'Interior'
  status: 'Completed' | 'Ongoing';
  location: string;
  area: string;
  completion_year: string;
  image_url: string;
  before_image_url?: string | null;
  description: string;
  features: string[];
  is_featured: boolean;
  created_at?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  caption?: string;
  created_at?: string;
}

export interface YouTubeVideo {
  id: number;
  title: string;
  category: 'Completed Projects' | 'Construction Progress' | '3D Elevation Designs' | string;
  youtube_url: string;
  video_id: string;
  description?: string;
  is_approved?: boolean;
  created_at?: string;
}

export interface InstagramReel {
  id: number;
  title: string;
  tag: string;
  handle: string;
  reel_url: string;
  reel_code: string;
  thumbnail_url: string;
  brand_label?: string;
}

export interface Enquiry {
  id?: number;
  name: string;
  phone: string;
  email?: string;
  location?: string;
  service_required: string;
  budget_range?: string;
  message?: string;
  status?: string;
  created_at?: string;
}

export interface Testimonial {
  id: number;
  client_name: string;
  project_type: string;
  location: string;
  feedback: string;
  rating: number;
  is_approved: boolean;
  created_at?: string;
}

export interface Settings {
  company_name: string;
  tagline: string;
  address: string;
  phone_primary: string;
  phone_secondary: string;
  whatsapp_number: string;
  email: string;
  google_maps_url: string;
  directions_url?: string;
  youtube_url?: string;
  instagram_url?: string;
  facebook_url?: string;
}

export interface DashboardStats {
  total_projects: number;
  completed_projects: number;
  ongoing_projects: number;
  total_enquiries: number;
  new_enquiries: number;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  benefits: string[];
  isConfirmed: boolean;
}
