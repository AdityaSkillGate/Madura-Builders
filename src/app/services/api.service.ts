import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project, GalleryItem, YouTubeVideo, InstagramReel, Enquiry, Testimonial, Settings } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Built-in verified data for standalone frontend operation
  private settings: Settings = {
    company_name: 'Madhura Builders & Architects',
    tagline: 'Building Dreams Into Reality',
    address: '#9, Muppidathi Amman Complex, Upstairs, Opposite Hatsun Dairy, Near Geethalaya Theatre, Sankarankovil, Tenkasi District, Tamil Nadu - 627756, India',
    phone_primary: '+91 90034 43196',
    phone_secondary: '+91 99626 26231',
    whatsapp_number: '919003443196',
    email: 'info@madhurabuilders.com',
    google_maps_url: 'https://www.google.com/maps?q=9.1798265,77.5386246',
    directions_url: 'https://www.google.com/maps/dir/?api=1&destination=9.1798265%2C77.5386246',
    youtube_url: 'https://www.youtube.com/@madhurabuilders',
    instagram_url: 'https://www.instagram.com/madhura.builders',
    facebook_url: 'https://www.facebook.com/madhurabuilders'
  };

  private projects: Project[] = [
    {
      id: 1,
      title: 'Modern Minimalist Villa',
      category: 'Villa',
      status: 'Completed',
      location: 'Sankarankovil, Tamil Nadu',
      area: '3,200 sq.ft',
      completion_year: '2024',
      image_url: '/assets/images/projects/modern-elevation-01.jpg',
      before_image_url: '/assets/images/architecture/3d-elevation-showcase-01.jpg',
      description: 'Contemporary two-story luxury residential villa featuring cantilevered balconies, natural stone veneer, and climate-responsive shading louvers.',
      features: ['Vastu Compliant Design', 'Open Courtyard Concept', 'Double-Height Living Hall', 'Energy Efficient Glazing'],
      is_featured: true
    },
    {
      id: 2,
      title: 'Contemporary White Cubic Residence',
      category: 'Residential',
      status: 'Completed',
      location: 'Tenkasi District, Tamil Nadu',
      area: '2,650 sq.ft',
      completion_year: '2023',
      image_url: '/assets/images/projects/modern-elevation-02.jpg',
      before_image_url: '/assets/images/floor-plans/architectural-plan-01.jpg',
      description: 'Modern geometric residential home combining pristine white stucco with warm teakwood louvers and expansive terrace gardens.',
      features: ['3 BHK Configuration', 'Modular Kitchen Integration', 'Landscaped Terrace', 'Rainwater Harvesting'],
      is_featured: true
    },
    {
      id: 3,
      title: 'Parametric Linear 3D Elevation',
      category: '3D Elevation',
      status: 'Completed',
      location: 'Sankarankovil, Tamil Nadu',
      area: '2,800 sq.ft',
      completion_year: '2024',
      image_url: '/assets/images/projects/modern-elevation-03.jpg',
      before_image_url: null,
      description: 'Custom 3D exterior architectural elevation design focusing on clean horizontal lines, concealed ambient lighting, and textured boundary walls.',
      features: ['Photorealistic 3D Render', 'Material Palette Guide', 'Exterior Illumination Map', 'Structural Coordination'],
      is_featured: true
    },
    {
      id: 4,
      title: 'Courtyard Family Estate',
      category: 'Villa',
      status: 'Completed',
      location: 'Tirunelveli Region, Tamil Nadu',
      area: '4,100 sq.ft',
      completion_year: '2023',
      image_url: '/assets/images/projects/villa-residence-01.jpg',
      before_image_url: null,
      description: 'Spacious family villa arranged around a central open-to-sky courtyard providing natural ventilation and traditional spatial warmth.',
      features: ['Traditional Thinnai Concept', 'Central Biophilic Atrium', 'Granite Paving', 'Teakwood Pillars'],
      is_featured: true
    },
    {
      id: 5,
      title: 'Sankarankovil Commercial Complex',
      category: 'Commercial',
      status: 'Ongoing',
      location: 'Near Geethalaya Theatre, Sankarankovil',
      area: '6,500 sq.ft',
      completion_year: '2026 (In Progress)',
      image_url: '/assets/images/projects/ongoing-commercial-01.jpg',
      before_image_url: null,
      description: 'Three-story retail and office commercial development engineered with reinforced concrete frame, basement parking, and modern glass storefronts.',
      features: ['Grade C30 Concrete Frame', 'Column-Free Retail Spans', 'Elevator Core Integration', 'Fire Safety Compliant'],
      is_featured: true
    }
  ];

  private gallery: GalleryItem[] = [
    { id: 1, title: 'Luxury Villa Exterior', category: 'Elevation', image_url: '/assets/images/gallery/gallery-01.jpg', caption: 'Front elevation sunset view' },
    { id: 2, title: 'Parametric 3D Elevation', category: 'Elevation', image_url: '/assets/images/projects/modern-elevation-03.jpg', caption: 'Clean linear architectural elevation design' },
    { id: 3, title: 'Contemporary Villa Elevation', category: 'Elevation', image_url: '/assets/images/projects/modern-elevation-01.jpg', caption: 'Contemporary two-story luxury villa elevation' },

    { id: 4, title: 'Geometric Volumes', category: 'Architecture', image_url: '/assets/images/gallery/gallery-02.jpg', caption: 'Clean lines and modern minimalist forms' },
    { id: 5, title: 'Modern Cubic Architecture', category: 'Architecture', image_url: '/assets/images/projects/modern-elevation-02.jpg', caption: 'Geometric residential architecture' },
    { id: 6, title: 'Architectural Blueprint Planning', category: 'Architecture', image_url: '/assets/images/architecture/architectural-planning-01.jpg', caption: 'Precision structural draft & floor layout' },

    { id: 7, title: 'Double Height Living', category: 'Interior', image_url: '/assets/images/gallery/gallery-04.jpg', caption: 'Living hall with natural skylight' },
    { id: 8, title: 'Master Bedroom Suite', category: 'Interior', image_url: '/assets/images/interiors/luxury-interior-03.jpg', caption: 'Minimalist wooden millwork' },
    { id: 9, title: 'Contemporary Modular Lounge', category: 'Interior', image_url: '/assets/images/interiors/luxury-interior-01.jpg', caption: 'Bespoke ceiling details & ambient lighting' },

    { id: 10, title: 'Structural Foundation Engineering', category: 'Construction', image_url: '/assets/images/construction/construction-site-01.jpg', caption: 'Reinforced concrete foundation works' },
    { id: 11, title: 'Masonry & Slab Execution', category: 'Construction', image_url: '/assets/images/construction/construction-site-02.jpg', caption: 'Precision masonry craftsmanship' },
    { id: 12, title: 'Site Supervision & Safety', category: 'Construction', image_url: '/assets/images/construction/construction-site-03.jpg', caption: 'Active site supervision and quality assurance' },

    { id: 13, title: 'Terrace Pergola Detail', category: 'Exterior', image_url: '/assets/images/gallery/gallery-03.jpg', caption: 'Shading pergola and balcony space' },
    { id: 14, title: 'Courtyard Family Estate Exterior', category: 'Exterior', image_url: '/assets/images/projects/villa-residence-01.jpg', caption: 'Exterior garden landscaping & sit-out' },
    { id: 15, title: 'Executive Villa Compound', category: 'Exterior', image_url: '/assets/images/projects/villa-residence-02.jpg', caption: 'Boundary wall lighting & entrance foyer' }
  ];

  private testimonials: Testimonial[] = [
    {
      id: 1,
      client_name: 'P. Murugan',
      project_type: 'Residential Villa Construction',
      location: 'Sankarankovil',
      feedback: 'Madhura Builders executed our family house with excellent structural quality. Their 3D elevation design came out exactly as built. Transparent communication throughout.',
      rating: 5,
      is_approved: true
    },
    {
      id: 2,
      client_name: 'S. Jayakumar',
      project_type: 'House Plan & 3D Elevation',
      location: 'Tenkasi',
      feedback: 'Very thoughtful architectural planning with complete Vastu compliance. The team accommodated all our requirements patiently.',
      rating: 5,
      is_approved: true
    }
  ];

  private videos: YouTubeVideo[] = [
    {
      id: 1,
      title: 'Cinematic 3D Elevation & Residential Architecture Walkthrough',
      category: '3D Elevation Designs',
      youtube_url: 'https://youtu.be/O2CWQsoglTc?si=bH8QeWe0CHYZue8p',
      video_id: 'O2CWQsoglTc',
      description: 'Official 3D exterior elevation visualization, spatial planning, and architectural modeling by Madhura Builders & Architects, Sankarankovil.',
      is_approved: true
    },
    {
      id: 2,
      title: 'Modern House Construction & Structural Progress Showcase',
      category: 'Construction Progress',
      youtube_url: 'https://youtu.be/cBpF3NUe6DM?si=aPvzAX6FuErfJCtL',
      video_id: 'cBpF3NUe6DM',
      description: 'On-site structural execution, foundation works, and quality residential engineering across Tenkasi District.',
      is_approved: true
    }
  ];

  private reels: InstagramReel[] = [
    {
      id: 1,
      title: 'Structural Column & Beam Framework Execution',
      tag: 'Site Progress 🏗️',
      handle: '@madhura.builders',
      reel_url: 'https://www.instagram.com/reel/C7lAObFpemA/?cnvx=bmYyZDA3ZXRmOWU5',
      reel_code: 'C7lAObFpemA',
      thumbnail_url: '/assets/images/construction/construction-site-01.jpg',
      brand_label: 'Madhura Builders & Architects'
    },
    {
      id: 2,
      title: 'Ultra-Realistic 3D Elevation & Material Palette Guide',
      tag: '3D Elevation ✨',
      handle: '@madhura.builders',
      reel_url: 'https://www.instagram.com/reel/DVeJ8-QE6pz/?knvt=emM3YXplY3oyYjVl',
      reel_code: 'DVeJ8-QE6pz',
      thumbnail_url: '/assets/images/projects/modern-elevation-03.jpg',
      brand_label: 'Madhura Builders & Architects'
    },
    {
      id: 3,
      title: 'Contemporary Luxury Villa Elevation & Balcony Detail',
      tag: 'Villa Architecture 🏡',
      handle: '@madhura.builders',
      reel_url: 'https://www.instagram.com/reel/Cp5aeDjASJ9/?jplx=czRzMjRidzN5aXd0',
      reel_code: 'Cp5aeDjASJ9',
      thumbnail_url: '/assets/images/projects/modern-elevation-01.jpg',
      brand_label: 'Madhura Builders & Architects'
    },
    {
      id: 4,
      title: 'Explore Our Complete Portfolio on Instagram',
      tag: 'Official Profile 📸',
      handle: '@madhura.builders',
      reel_url: 'https://www.instagram.com/madhura.builders',
      reel_code: 'profile',
      thumbnail_url: '/assets/images/logo/madhura-company-promo.jpg',
      brand_label: 'Follow on Instagram'
    }
  ];

  getSettings(): Observable<Settings> {
    return of(this.settings);
  }

  getProjects(category?: string, status?: string): Observable<Project[]> {
    let list = this.projects;
    if (category && category !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (status && status !== 'All') {
      list = list.filter(p => p.status.toLowerCase() === status.toLowerCase());
    }
    return of(list);
  }

  getProjectById(id: number | string): Observable<Project | null> {
    const found = this.projects.find(p => String(p.id) === String(id)) || null;
    return of(found);
  }

  getGallery(category?: string): Observable<GalleryItem[]> {
    if (category && category !== 'All') {
      return of(this.gallery.filter(g => g.category.toLowerCase() === category.toLowerCase()));
    }
    return of(this.gallery);
  }

  getVideos(category?: string): Observable<YouTubeVideo[]> {
    if (category && category !== 'All') {
      return of(this.videos.filter(v => v.category.toLowerCase() === category.toLowerCase()));
    }
    return of(this.videos);
  }

  getReels(): Observable<InstagramReel[]> {
    return of(this.reels);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return of(this.testimonials);
  }

  submitEnquiry(enquiry: Enquiry): Observable<any> {
    return of({ success: true, message: 'Thank you! Your enquiry has been received.' });
  }
}
