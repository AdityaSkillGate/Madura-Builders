import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'ta';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'madhura_preferred_lang';
  
  // Reactive Signal for current language
  currentLang = signal<Language>('en');

  // Computed helper to check if Tamil
  isTamil = computed(() => this.currentLang() === 'ta');

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem(this.STORAGE_KEY) as Language;
      if (saved === 'ta' || saved === 'en') {
        this.setLanguage(saved);
      }
    }
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    if (typeof window !== 'undefined') {
      if (window.localStorage) {
        localStorage.setItem(this.STORAGE_KEY, lang);
      }
      document.documentElement.lang = lang;
      if (lang === 'ta') {
        document.body.classList.add('lang-tamil');
      } else {
        document.body.classList.remove('lang-tamil');
      }
    }
  }

  toggleLanguage(): void {
    this.setLanguage(this.currentLang() === 'en' ? 'ta' : 'en');
  }

  t(key: string): string {
    const lang = this.currentLang();
    const translation = this.translations[lang]?.[key] || this.translations['en']?.[key] || key;
    return translation;
  }

  // Complete Bilingual Dictionary (English + Tamil)
  private readonly translations: Record<Language, Record<string, string>> = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About Us',
      'nav.services': 'Services',
      'nav.projects': 'Projects',
      'nav.gallery': 'Gallery',
      'nav.reels': 'Reels',
      'nav.contact': 'Contact',
      'nav.get_quote': 'Get a Quote',
      'nav.call_now': 'Call Now',
      'nav.directions': 'Get Directions',

      // Hero Section
      'hero.badge': 'MADHURA BUILDERS & ARCHITECTS • SANKARANKOVIL',
      'hero.title_line1': 'BUILDING',
      'hero.title_line2': 'DREAMS',
      'hero.title_line3': 'INTO REALITY',
      'hero.subtitle': 'Thoughtful Designs. Quality Construction. Beautiful Homes. Operating in Sankarankovil & Tenkasi District.',
      'hero.scroll_prompt': 'Scroll to construct',
      'hero.autoplay': 'Auto Play',
      'hero.auto_scroll': 'Auto Scroll',
      'hero.auto_scroll_anim': 'Auto Scroll Animation',
      'hero.speed': 'Speed',
      'hero.pause': 'Pause',
      'hero.replay': 'Replay',
      'hero.explore_projects': 'Explore Projects',
      'hero.contact_us': 'Contact Us',
      'hero.whatsapp_enquiry': 'WhatsApp Enquiry',
      'hero.frame': 'FRAME',
      'hero.phase': 'PHASE',

      // Construction Stages (HUD)
      'stage.01.code': 'PHASE 01',
      'stage.01.name': 'Groundwork & Soil Stabilization',
      'stage.02.code': 'PHASE 02',
      'stage.02.name': 'Raft Foundation & Substructure',
      'stage.03.code': 'PHASE 03',
      'stage.03.name': 'Structural Steel Core & Columns',
      'stage.04.code': 'PHASE 04',
      'stage.04.name': 'Floor Slabs & Superstructure',
      'stage.05.code': 'PHASE 05',
      'stage.05.name': 'Curtain Wall Facade & Glazing',
      'stage.06.code': 'PHASE 06',
      'stage.06.name': 'Architectural Crown & Commissioning',

      // Introduction
      'intro.tag': 'Madhura Builders & Architects',
      'intro.title': 'Building Dreams Into Reality.',
      'intro.desc': 'Madhura Builders & Architects provides architectural and building-related solutions with a focus on thoughtful planning and beautiful spaces. Operating from Sankarankovil, we bring contemporary residential design, 3D elevations, and engineering excellence to clients across Tenkasi District and Tamil Nadu.',
      'intro.stat1.num': '100%',
      'intro.stat1.label': 'Vastu-Aligned Planning',
      'intro.stat1.desc': 'Harmonious architectural layouts respecting traditional geometry and modern space flow.',
      'intro.stat2.num': '3D',
      'intro.stat2.label': 'Elevation Visualization',
      'intro.stat2.desc': 'Photorealistic preview of your building\'s exterior before excavation begins.',
      'intro.stat3.num': 'Turnkey',
      'intro.stat3.label': 'Construction Delivery',
      'intro.stat3.desc': 'Comprehensive site supervision, material procurement, and structural execution.',

      // Services Preview
      'services.preview_tag': 'Our Core Disciplines',
      'services.preview_title': 'Architectural & Building Solutions',
      'services.view_all': 'View All 6 Services',
      'services.learn_more': 'Learn Details',

      // Services List
      'services.s1.title': 'Architectural Planning',
      'services.s1.desc': 'Comprehensive residential master planning, floor layout optimization, natural ventilation analysis, and regulatory building approvals.',
      'services.s1.feat1': 'Site topography integration',
      'services.s1.feat2': 'Vastu Shastra alignment',
      'services.s1.feat3': 'Sanction drawing preparation',

      'services.s2.title': 'Residential Building Construction',
      'services.s2.desc': 'End-to-end structural engineering and residential construction. Quality materials, on-site civil engineers, and disciplined milestones.',
      'services.s2.feat1': 'Reinforced concrete framing',
      'services.s2.feat2': 'Certified branded raw materials',
      'services.s2.feat3': 'Rigorous structural quality testing',

      'services.s3.title': '3D Elevation Design',
      'services.s3.desc': 'State-of-the-art photorealistic exterior elevation renderings. Visualize textures, lighting, compound walls, and architectural massing.',
      'services.s3.feat1': 'Ultra-HD daytime & night renders',
      'services.s3.feat2': 'Material & color palettes',
      'services.s3.feat3': 'Compound wall & landscape design',

      'services.s4.title': 'House Plan Design',
      'services.s4.desc': 'Bespoke custom floor plans tailored to your family size, plot dimensions, budget constraints, and future expansion possibilities.',
      'services.s4.feat1': 'Optimized space utilization',
      'services.s4.feat2': 'Electrical & plumbing schematics',
      'services.s4.feat3': 'Detailed dimensioned blueprints',

      'services.s5.title': 'Interior Design',
      'services.s5.desc': 'Thoughtful interior concepts, modular kitchen design, bespoke wardrobes, false ceiling layouts, and spatial ambiance creation.',
      'services.s5.feat1': 'Modular kitchen planning',
      'services.s5.feat2': 'Wardrobes & TV units',
      'services.s5.feat3': 'False ceiling & ambient lighting',

      'services.s6.title': 'Construction Consultation',
      'services.s6.desc': 'Expert engineering guidance on soil testing, structural integrity, material cost estimation, renovation feasibility, and site evaluation.',
      'services.s6.feat1': 'Detailed bill of quantities (BOQ)',
      'services.s6.feat2': 'Structural safety audits',
      'services.s6.feat3': 'Site selection & foundation guidance',

      // Featured Projects
      'projects.tag': 'Portfolio Highlights',
      'projects.title': 'Curated Architectural Works',
      'projects.all': 'All Projects',
      'projects.completed': 'Completed Projects',
      'projects.ongoing': 'Ongoing Projects',
      'projects.residential': 'Residential Buildings',
      'projects.villas': 'Villa Projects',
      'projects.elevations': '3D Elevation Designs',
      'projects.interiors': 'Interior Projects',
      'projects.view_full': 'Explore Full Portfolio',
      'projects.area': 'Area',
      'projects.year': 'Year',
      'projects.location': 'Location',
      'projects.view_details': 'View Project Details',
      'projects.before_after': 'Before & After (3D vs Reality)',
      'projects.visualized_3d': 'Visualized in 3D',
      'projects.built_reality': 'Perfected in Reality',

      // Why Choose Us
      'why.tag': 'Verified Business Strengths',
      'why.title': 'Why Choose Madhura Builders & Architects?',
      'why.reason1.title': 'Sankarankovil Local Expertise',
      'why.reason1.desc': 'Deep understanding of local soil profiles, groundwater conditions, municipal regulations, and regional microclimate in Tenkasi District.',
      'why.reason2.title': 'Vastu & Contemporary Harmony',
      'why.reason2.desc': 'Seamlessly combining traditional Vastu Shastra principles with modern minimalist aesthetics, expansive windows, and open layouts.',
      'why.reason3.title': 'Transparent Material Standards',
      'why.reason3.desc': 'Strict adherence to specified cement, TMT steel, river sand, and electrical fixtures. No hidden compromises or quality substitutions.',
      'why.reason4.title': 'Direct Architect Communication',
      'why.reason4.desc': 'Direct accessibility to the planning and engineering team throughout design, excavation, structural casting, and finishing stages.',

      // Videos / Walkthroughs
      'video.tag': 'Cinematic Motion Showcase',
      'video.title': 'Experience Our Works In Motion.',
      'video.subtitle': 'Watch 3D architectural elevations, foundation progress, and completed home walkthroughs in Tamil Nadu.',
      'video.view_all': 'View All Walkthroughs',
      'video.play': 'Play Walkthrough',
      'video.channel_title': 'Official Madhura Builders YouTube Channel',
      'video.channel_desc': 'Subscribe for new 3D elevation releases, site progress videos, and home building tips.',
      'video.channel_btn': 'Explore YouTube Channel',

      // Instagram Reels Section
      'reels.tag': 'INSTAGRAM REELS • @MADHURA.BUILDERS',
      'reels.title': 'Trending Construction & 3D Reels',
      'reels.subtitle': 'Catch our latest construction updates, 3D elevation walkthroughs, and site reels.',
      'reels.watch_btn': 'Watch Reel',
      'reels.follow_btn': 'Follow on Instagram',
      'gallery.reels_tab': 'Instagram Reels',

      // Gallery Page
      'gallery.tag': 'Visual & Motion Archives',
      'gallery.title': 'Architectural Gallery',
      'gallery.subtitle': 'Explore high-definition photographs, cinematic 3D elevation walkthroughs, and active construction site inspections across Sankarankovil and Tenkasi District.',
      'gallery.photos_tab': 'Photo Archives',
      'gallery.videos_tab': 'Video Walkthroughs & 3D Tours',
      'gallery.cat_all': 'All',
      'gallery.cat_elevation': 'Elevation',
      'gallery.cat_architecture': 'Architecture',
      'gallery.cat_interior': 'Interior',
      'gallery.cat_construction': 'Construction',
      'gallery.cat_exterior': 'Exterior',
      'gallery.view_fullscreen': 'View Fullscreen',
      'gallery.play_video': 'Play Cinematic Video',
      'gallery.no_photos': 'No photographs found in this category.',
      'gallery.no_videos': 'No video walkthroughs found in this category.',
      'gallery.videos_empty_title': 'Official Video Walkthroughs Coming Soon',
      'gallery.videos_empty_desc': 'We are currently producing high-definition 3D elevation walkthroughs and construction progress tours for our projects across Sankarankovil & Tenkasi District.',
      'gallery.videos_channel_cta': 'Visit Official YouTube Channel',
      'gallery.videos_back_photos': 'Browse Photo Archives',
      'gallery.watch_yt': 'Watch on YouTube',

      // Testimonials
      'testimonials.tag': 'Client Experiences',
      'testimonials.title': 'Trusted by Homeowners Across Tenkasi District',

      // CTA Banner
      'cta.tag': 'Turn Your Vision Into Reality',
      'cta.title': 'Ready to Begin Your Dream Construction?',
      'cta.desc': 'Book an architectural consultation at our Sankarankovil office or submit your plot dimensions online.',
      'cta.btn_contact': 'Schedule Office Visit',
      'cta.btn_whatsapp': 'Instant WhatsApp Enquiry',

      // Contact Page & Form
      'contact.title': 'Contact Madhura Builders & Architects',
      'contact.subtitle': 'Have a plot in Sankarankovil or surrounding Tenkasi areas? Let us discuss your architectural plan and construction requirements.',
      'contact.find_us': 'Find us',
      'contact.visit_office': 'Visit the office',
      'contact.directions_btn': 'Get directions',
      'contact.sankarankovil_loc': 'Sankarankovil, Tamil Nadu, India',
      'contact.office_address': 'Office Address',
      'contact.phone_numbers': 'Direct Phone Lines',
      'contact.whatsapp': 'WhatsApp Chat',
      'contact.business_hours': 'Business Hours',
      'contact.hours_val': 'Monday – Saturday: 9:00 AM – 8:00 PM',
      'contact.get_directions': 'Get Directions on Google Maps',
      
      // Form fields
      'form.name': 'Full Name',
      'form.name_ph': 'Enter your full name',
      'form.phone': 'Phone Number',
      'form.phone_ph': '10-digit mobile number',
      'form.email': 'Email Address',
      'form.email_ph': 'yourname@example.com (optional)',
      'form.city': 'City / Location of Plot',
      'form.city_ph': 'e.g. Sankarankovil, Tenkasi, Puliyangudi',
      'form.service': 'Required Service',
      'form.service_select': 'Select a service',
      'form.property_type': 'Property Type',
      'form.budget': 'Estimated Budget Range',
      'form.budget_select': 'Select budget range',
      'form.message': 'Project Details / Plot Size',
      'form.message_ph': 'Tell us about your plot dimensions (e.g. 30x40 ft), number of floors, requirements...',
      'form.submit': 'Submit Project Enquiry',
      'form.submitting': 'Submitting...',
      'form.success': 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
      'form.error': 'Unable to submit enquiry. Please call us directly or message on WhatsApp.',
      'form.whatsapp_followup': 'Continue on WhatsApp',

      // Validation
      'val.name_req': 'Name is required (minimum 3 characters)',
      'val.phone_req': 'Valid 10-digit phone number is required',
      'val.service_req': 'Please select a required service',
      'val.message_req': 'Please provide details about your project (minimum 10 characters)',

      // Chatbot
      'bot.name': 'Madhura Assistant',
      'bot.tagline': 'Bilingual Architectural Assistant',
      'bot.welcome': 'Hello! Welcome to Madhura Builders & Architects. How can we help you build your dream home in Sankarankovil or Tenkasi District?',
      'bot.input_ph': 'Ask about house plans, 3D elevations, construction, Vastu, costs...',
      'bot.send': 'Send',
      'bot.clear': 'Clear Chat',
      'bot.suggested': 'Suggested Questions',
      'bot.q1': 'What services do you provide?',
      'bot.q2': 'I need a house plan design.',
      'bot.q3': 'I need a 3D elevation design.',
      'bot.q4': 'I want to construct a new house.',
      'bot.q5': 'What is your construction cost per sq.ft?',
      'bot.q6': 'Do you design plans based on 100% Vastu?',
      'bot.q7': 'How long does it take to construct a house?',
      'bot.q8': 'Do you help with bank loan estimates and municipal approval?',
      'bot.q9': 'Do you undertake house renovation and remodeling?',
      'bot.q10': 'Do you provide interior design and modular kitchens?',
      'bot.q11': 'Can I view your completed projects & site photos?',
      'bot.q12': 'Where is your office located?',
      'bot.q13': 'How can I contact or call you?',
      'bot.q14': 'I want to request a free quotation.',

      // Footer
      'footer.desc': 'Premium architectural planning, 3D elevations, residential building construction, and bespoke floor plans in Sankarankovil, Tenkasi District, Tamil Nadu.',
      'footer.quick_links': 'Quick Navigation',
      'footer.services': 'Our Services',
      'footer.contact_info': 'Contact Information',
      'footer.rights': 'All Rights Reserved. Madhura Builders & Architects.',
      'footer.developed_by': 'Developed by',
      'footer.engineered': 'Designed & Engineered with Architectural Precision.'
    },

    ta: {
      // Navigation
      'nav.home': 'முகப்பு',
      'nav.about': 'எங்களைப் பற்றி',
      'nav.services': 'சேவைகள்',
      'nav.projects': 'திட்டங்கள்',
      'nav.gallery': 'படத்தொகுப்பு',
      'nav.reels': 'ரீல்ஸ்',
      'nav.contact': 'தொடர்பு',
      'nav.get_quote': 'மதிப்பீடு பெற',
      'nav.call_now': 'அழைக்க',
      'nav.directions': 'வழிகாட்டுதல்',

      // Hero Section
      'hero.badge': 'மதுரா பில்டர்ஸ் & ஆர்கிடெக்ட்ஸ் • சங்கரன்கோவில்',
      'hero.title_line1': 'கனவு',
      'hero.title_line2': 'இல்லங்களை',
      'hero.title_line3': 'நிஜமாக்குகிறோம்',
      'hero.subtitle': 'சிந்தனைமிக்க வடிவமைப்பு. தரமான கட்டுமானம். அழகான இல்லங்கள். சங்கரன்கோவில் & தென்காசி மாவட்டம்.',
      'hero.scroll_prompt': 'கட்டமைப்பை காண உருட்டவும்',
      'hero.autoplay': 'தானாக இயக்கு',
      'hero.auto_scroll': 'தானியங்கி நகர்வு',
      'hero.auto_scroll_anim': 'தானியங்கி கட்டுமான நகர்வு',
      'hero.speed': 'வேகம்',
      'hero.pause': 'இடைநிறுத்து',
      'hero.replay': 'மீண்டும் இயக்கு',
      'hero.explore_projects': 'திட்டங்களை காண்க',
      'hero.contact_us': 'தொடர்பு கொள்ள',
      'hero.whatsapp_enquiry': 'வாட்ஸ்அப் விசாரணை',
      'hero.frame': 'ஃபிரேம்',
      'hero.phase': 'கட்டம்',

      // Construction Stages (HUD)
      'stage.01.code': 'கட்டம் 01',
      'stage.01.name': 'தரைமட்ட ஆய்வு & அஸ்திவார உறுதிப்பாடு',
      'stage.02.code': 'கட்டம் 02',
      'stage.02.name': 'அடித்தள அமைப்பு & கான்கிரீட் வார்ப்பு',
      'stage.03.code': 'கட்டம் 03',
      'stage.03.name': 'கட்டமைப்பு தூண்கள் & சட்டக வேலை',
      'stage.04.code': 'கட்டம் 04',
      'stage.04.name': 'தள அடுக்குகள் & மேற்கட்டுமானம்',
      'stage.05.code': 'கட்டம் 05',
      'stage.05.name': 'முகப்பு வடிவமைப்பு & கண்ணாடிகள்',
      'stage.06.code': 'கட்டம் 06',
      'stage.06.name': 'இறுதி அலங்காரம் & ஒப்படைப்பு',

      // Introduction
      'intro.tag': 'மதுரா பில்டர்ஸ் & ஆர்கிடெக்ட்ஸ்',
      'intro.title': 'உங்கள் கனவு இல்லத்தை நிஜமாக்குகிறோம்.',
      'intro.desc': 'மதுரா பில்டர்ஸ் & ஆர்கிடெக்ட்ஸ் நிறுவனம் சிறந்த கட்டிடக்கலை திட்டமிடல் மற்றும் கட்டுமான தீர்வுகளை வழங்குகிறது. சங்கரன்கோவிலில் இருந்து இயங்கி வரும் நாங்கள், நவீன குடியிருப்பு வடிவமைப்பு, 3D எலிவேஷன்கள் மற்றும் பொறியியல் தரத்துடன் தென்காசி மற்றும் தமிழகம் முழுவதும் வாடிக்கையாளர்களுக்கு சேவை செய்கிறோம்.',
      'intro.stat1.num': '100%',
      'intro.stat1.label': 'வாஸ்து சார்ந்த திட்டமிடல்',
      'intro.stat1.desc': 'பாரம்பரிய வாஸ்து சாஸ்திர விதிகளுடன் நவீன வசதிகள் இணைந்த கட்டிட வரைபடங்கள்.',
      'intro.stat2.num': '3D',
      'intro.stat2.label': 'எலிவேஷன் காட்சிப்படுத்தல்',
      'intro.stat2.desc': 'கட்டுமானம் தொடங்குவதற்கு முன்பே உங்கள் வீட்டின் வெளிப்புற தோற்றத்தை துல்லியமாக 3D-யில் பார்க்கலாம்.',
      'intro.stat3.num': 'முழுமை',
      'intro.stat3.label': 'நேரடி தரமான கட்டுமானம்',
      'intro.stat3.desc': 'தரமான மூலப்பொருட்கள், அனுபவமிக்க பொறியாளர்கள் மற்றும் சரியான காலக்கெடுவில் பணி முடிப்பு.',

      // Services Preview
      'services.preview_tag': 'எங்கள் முக்கிய சேவைகள்',
      'services.preview_title': 'கட்டிடக்கலை & கட்டுமான தீர்வுகள்',
      'services.view_all': 'அனைத்து 6 சேவைகளையும் காண்க',
      'services.learn_more': 'விவரங்கள் அறிய',

      // Services List
      'services.s1.title': 'கட்டிடக்கலை திட்டமிடல் (Architectural Planning)',
      'services.s1.desc': 'முழுமையான குடியிருப்பு வரைபடங்கள், இட பயன்பாட்டு உகப்பாக்கம், இயற்கை காற்றோட்ட வடிவமைப்பு மற்றும் அரசு ஒப்புதல் வரைபடங்கள்.',
      'services.s1.feat1': 'நிலத்தின் அமைப்பிற்கேற்ப திட்டம்',
      'services.s1.feat2': 'முறையான வாஸ்து சாஸ்திர அமைப்பு',
      'services.s1.feat3': 'அங்கீகரிக்கப்பட்ட ஒப்புதல் வரைபடம்',

      'services.s2.title': 'குடியிருப்பு கட்டிட கட்டுமானம் (Residential Construction)',
      'services.s2.desc': 'அஸ்திவாரம் முதல் ஃபினிஷிங் வரை முழுமையான குடியிருப்பு கட்டுமானம். பிராண்டட் மூலப்பொருட்கள் மற்றும் பொறியாளர் நேரடி மேற்பார்வை.',
      'services.s2.feat1': 'உறுதியான ஆர்.சி.சி கான்கிரீட் கட்டமைப்பு',
      'services.s2.feat2': 'அங்கீகரிக்கப்பட்ட தரமான பொருட்கள்',
      'services.s2.feat3': 'துல்லியமான தர பரிசோதனைகள்',

      'services.s3.title': '3D எலிவேஷன் டிசைன் (3D Elevation Design)',
      'services.s3.desc': 'வீட்டின் வெளிப்புற அழகை தத்ரூபமாக காட்டும் அதிநவீன 3D எலிவேஷன் வடிவமைப்பு. வண்ணங்கள், விளக்குகள் மற்றும் சுவர் அலங்காரங்கள்.',
      'services.s3.feat1': 'பகல் மற்றும் இரவு நேர 3D காட்சிகள்',
      'services.s3.feat2': 'வண்ணங்கள் மற்றும் டைல்ஸ் தேர்வு வழிகாட்டி',
      'services.s3.feat3': 'காம்பவுண்ட் சுவர் மற்றும் நுழைவாயில் வடிவமைப்பு',

      'services.s4.title': 'ஹவுஸ் பிளான் வடிவமைப்பு (House Plan Design)',
      'services.s4.desc': 'குடும்பத்தின் தேவை, நிலத்தின் அளவு மற்றும் பட்ஜெட்டுக்கு ஏற்ப தனிப்பயனாக்கப்பட்ட வீட்டு வரைபடங்கள்.',
      'services.s4.feat1': 'இட விரயமற்ற திறமையான திட்டமிடல்',
      'services.s4.feat2': 'எலக்ட்ரிக்கல் & பிளம்பிங் வரைபடங்கள்',
      'services.s4.feat3': 'துல்லியமான அளவுகளுடன் கூடிய வரைபடங்கள்',

      'services.s5.title': 'உள்துறை வடிவமைப்பு (Interior Design)',
      'services.s5.desc': 'நவீன மாடுலர் கிச்சன், அழகிய வார்ட்ரோப்கள், ஃபால்ஸ் சீலிங் மற்றும் மனதிற்கு இதமளிக்கும் உள் அலங்கார வடிவமைப்பு.',
      'services.s5.feat1': 'மாடுலர் கிச்சன் திட்டமிடல்',
      'services.s5.feat2': 'வார்ட்ரோப் மற்றும் டிவி யூனிட்கள்',
      'services.s5.feat3': 'ஃபால்ஸ் சீலிங் மற்றும் லைட்டிங்',

      'services.s6.title': 'கட்டுமான ஆலோசனை (Construction Consultation)',
      'services.s6.desc': 'மண் பரிசோதனை, கட்டமைப்பு உறுதி, உத்தேச செலவு மதிப்பீடு (Estimation/BOQ) மற்றும் நில தேர்வு குறித்த நிபுணர் ஆலோசனை.',
      'services.s6.feat1': 'துல்லியமான கட்டுமான மதிப்பீட்டு பட்டியல்',
      'services.s6.feat2': 'கட்டமைப்பு பாதுகாப்பு ஆலோசனைகள்',
      'services.s6.feat3': 'அஸ்திவார தேர்வு மற்றும் வழிகாட்டுதல்',

      // Featured Projects
      'projects.tag': 'சிறந்த திட்டங்கள்',
      'projects.title': 'எங்களின் கட்டிடக்கலை படைப்புகள்',
      'projects.all': 'அனைத்து திட்டங்கள்',
      'projects.completed': 'முடிக்கப்பட்ட திட்டங்கள்',
      'projects.ongoing': 'நடைபெறும் திட்டங்கள்',
      'projects.residential': 'குடியிருப்பு வீடுகள்',
      'projects.villas': 'வில்லா திட்டங்கள்',
      'projects.elevations': '3D எலிவேஷன் டிசைன்கள்',
      'projects.interiors': 'உள்துறை திட்டங்கள்',
      'projects.view_full': 'முழு தொகுப்பை காண்க',
      'projects.area': 'பரப்பளவு',
      'projects.year': 'ஆண்டு',
      'projects.location': 'இடம்',
      'projects.view_details': 'திட்ட விவரங்களை காண்க',
      'projects.before_after': 'முன் & பின் (3D vs நிஜம்)',
      'projects.visualized_3d': '3D-யில் திட்டமிடப்பட்டது',
      'projects.built_reality': 'நிஜத்தில் உருவானது',

      // Why Choose Us
      'why.tag': 'எங்கள் தனித்துவங்கள்',
      'why.title': 'மதுரா பில்டர்ஸ் & ஆர்கிடெக்ட்ஸ் ஏன்?',
      'why.reason1.title': 'சங்கரன்கோவில் உள்ளூர் அனுபவம்',
      'why.reason1.desc': 'தென்காசி மாவட்டத்தின் மண் அமைப்பு, நிலத்தடி நீர் நிலை மற்றும் தட்பவெப்ப நிலைக்கு ஏற்ற சிறந்த கட்டிடக்கலை அனுபவம்.',
      'why.reason2.title': 'வாஸ்து & நவீன அழகு ஒருங்கிணைப்பு',
      'why.reason2.desc': 'பாரம்பரிய வாஸ்து விதிகளையும் நவீன காலத்து காற்றோட்டமான கவர்ச்சிகரமான வடிவமைப்பையும் கச்சிதமாக இணைக்கிறோம்.',
      'why.reason3.title': 'வெளிப்படையான பொருள் தரம்',
      'why.reason3.desc': 'ஒப்பந்தத்தில் உறுதிப்படுத்திய சிமெண்ட், TMT ஸ்டீல் மற்றும் இதர தரமான பொருட்களை மட்டுமே பயன்படுத்துகிறோம்.',
      'why.reason4.title': 'நேரடி பொறியாளர் தொடர்பு',
      'why.reason4.desc': 'பிளான் போடுவது முதல் சாவி கொடுக்கும் வரை எந்த நேரமும் எங்கள் நிறுவன பொறியாளர்களுடன் நேரடியாக பேசலாம்.',

      // Videos / Walkthroughs
      'video.tag': 'வீடியோ காட்சிப் பதிவு',
      'video.title': 'எங்கள் படைப்புகளை வீடியோவில் பாருங்கள்',
      'video.subtitle': '3D எலிவேஷன் வீடியோக்கள், அஸ்திவார முன்னேற்றம் மற்றும் முடிக்கப்பட்ட வீடுகளின் வாக்குகளை கண்டு மகிழுங்கள்.',
      'video.view_all': 'அனைத்து வீடியோக்களையும் காண்க',
      'video.play': 'வீடியோவை இயக்கு',
      'video.channel_title': 'மதுரா பில்டர்ஸ் அதிகாரப்பூர்வ YouTube சேனல்',
      'video.channel_desc': 'புதிய 3D எலிவேஷன்கள், தள மேம்பாடுகள் மற்றும் வீடு கட்டும் குறிப்புகளுக்கு சப்ஸ்கிரைப் செய்யுங்கள்.',
      'video.channel_btn': 'YouTube சேனலை காண்க',

      // Instagram Reels Section
      'reels.tag': 'இன்ஸ்டாகிராம் ரீல்ஸ் • @MADHURA.BUILDERS',
      'reels.title': 'ட்ரெண்டிங் கட்டுமான & 3D ரீல்ஸ்',
      'reels.subtitle': 'எங்கள் நேரடி கட்டுமான முன்னேற்றம், 3D எலிவேஷன் மற்றும் தள வீடியோக்களை காணுங்கள்.',
      'reels.watch_btn': 'ரீல்ஸ் பார்க்க',
      'reels.follow_btn': 'இன்ஸ்டாகிராமில் பின்தொடர',
      'gallery.reels_tab': 'இன்ஸ்டாகிராம் ரீல்ஸ்',

      // Gallery Page
      'gallery.tag': 'காட்சி & வீடியோ தொகுப்புகள்',
      'gallery.title': 'கட்டிடக்கலை படத்தொகுப்பு',
      'gallery.subtitle': 'சங்கரன்கோவில் மற்றும் தென்காசி மாவட்டத்தின் உயர் வரையறை புகைப்படங்கள், 3D எலிவேஷன் வீடியோக்கள் மற்றும் கட்டுமான காட்சிகளை காண்க.',
      'gallery.photos_tab': 'புகைப்பட தொகுப்பு',
      'gallery.videos_tab': 'வீடியோக்கள் & 3D சுற்றுப்பயணம்',
      'gallery.cat_all': 'அனைத்தும்',
      'gallery.cat_elevation': 'எலிவேஷன்',
      'gallery.cat_architecture': 'கட்டிடக்கலை',
      'gallery.cat_interior': 'உள்துறை',
      'gallery.cat_construction': 'கட்டுமானம்',
      'gallery.cat_exterior': 'வெளிப்புறம்',
      'gallery.view_fullscreen': 'முழுத்திரை பார்வை',
      'gallery.play_video': 'வீடியோவை பார்க்க',
      'gallery.no_photos': 'இப்பிரிவில் புகைப்படங்கள் இல்லை.',
      'gallery.no_videos': 'இப்பிரிவில் வீடியோக்கள் இல்லை.',
      'gallery.videos_empty_title': 'அதிகாரப்பூர்வ வீடியோக்கள் விரைவில்',
      'gallery.videos_empty_desc': 'சங்கரன்கோவில் மற்றும் தென்காசி மாவட்ட திட்டங்களுக்கான உயர்தர 3D எலிவேஷன் மற்றும் நேரடி கட்டுமான வீடியோக்கள் தயாரிப்பில் உள்ளன.',
      'gallery.videos_channel_cta': 'அதிகாரப்பூர்வ YouTube பக்கத்தை பார்க்க',
      'gallery.videos_back_photos': 'புகைப்படங்களை பார்வையிட',
      'gallery.watch_yt': 'YouTube-ல் பார்க்க',

      // Testimonials
      'testimonials.tag': 'வாடிக்கையாளர் கருத்துக்கள்',
      'testimonials.title': 'தென்காசி மாவட்ட மக்களின் நம்பிக்கையைப் பெற்ற நிறுவனம்',

      // CTA Banner
      'cta.tag': 'உங்கள் கனவை நிஜமாக்குங்கள்',
      'cta.title': 'கனவு இல்லத்தை உருவாக்க தயாரா?',
      'cta.desc': 'சங்கரன்கோவிலில் உள்ள எங்கள் அலுவலகத்தில் ஆலோசனை பெறலாம் அல்லது உங்கள் நிலத்தின் அளவுகளை ஆன்லைனில் அனுப்பலாம்.',
      'cta.btn_contact': 'அலுவலகம் வர முன்பதிவு செய்ய',
      'cta.btn_whatsapp': 'உடனடி வாட்ஸ்அப் தொடர்பு',

      // Contact Page & Form
      'contact.title': 'மதுரா பில்டர்ஸ் & ஆர்கிடெக்ட்ஸ் தொடர்பு',
      'contact.subtitle': 'சங்கரன்கோவில் அல்லது தென்காசி சுற்றுவட்டாரத்தில் நிலம் வைத்துள்ளீர்களா? உங்கள் புதிய வீட்டின் திட்டமிடல் குறித்து ஆலோசிக்க உடனே தொடர்பு கொள்ளுங்கள்.',
      'contact.find_us': 'எங்களை காண',
      'contact.visit_office': 'அலுவலகத்திற்கு வருக',
      'contact.directions_btn': 'வழியைப் பெற',
      'contact.sankarankovil_loc': 'சங்கரன்கோவில், தமிழ்நாடு, இந்தியா',
      'contact.office_address': 'அலுவலக முகவரி',
      'contact.phone_numbers': 'தொலைபேசி எண்கள்',
      'contact.whatsapp': 'வாட்ஸ்அப் எண்',
      'contact.business_hours': 'பணி நேரம்',
      'contact.hours_val': 'திங்கள் – சனி: காலை 9:00 – இரவு 8:00',
      'contact.get_directions': 'Google Maps-ல் வழியைப் பெற',

      // Form fields
      'form.name': 'முழு பெயர்',
      'form.name_ph': 'உங்கள் முழு பெயரை உள்ளிடவும்',
      'form.phone': 'தொலைபேசி எண்',
      'form.phone_ph': '10 இலக்க மொபைல் எண்',
      'form.email': 'மின்னஞ்சல் முகவரி',
      'form.email_ph': 'உங்கள் மின்னஞ்சல் (விருப்பத்திற்குரியது)',
      'form.city': 'நிலம் உள்ள ஊர் / பகுதி',
      'form.city_ph': 'உதா: சங்கரன்கோவில், தென்காசி, புளியங்குடி',
      'form.service': 'தேவைப்படும் சேவை',
      'form.service_select': 'சேவையை தேர்ந்தெடுக்கவும்',
      'form.property_type': 'கட்டிட வகை',
      'form.budget': 'உத்தேச பட்ஜெட் அளவு',
      'form.budget_select': 'பட்ஜெட்டை தேர்வு செய்யவும்',
      'form.message': 'திட்ட விவரம் / நிலத்தின் அளவு',
      'form.message_ph': 'நிலத்தின் அளவுகள் (எ.கா: 30x40 அடி), எத்தனை தளங்கள், தேவைகள் பற்றி குறிப்பிடவும்...',
      'form.submit': 'விசாரணையை சமர்ப்பிக்க',
      'form.submitting': 'சமர்ப்பிக்கப்படுகிறது...',
      'form.success': 'நன்றி! உங்கள் தகவல் பெறப்பட்டது. எங்கள் குழுவினர் விரைவில் உங்களை தொடர்புகொள்வர்.',
      'form.error': 'தகவலை சமர்ப்பிக்க இயலவில்லை. தயவுசெய்து எங்களை நேரடியாக அழைக்கவும் அல்லது வாட்ஸ்அப்பில் தொடர்பு கொள்ளவும்.',
      'form.whatsapp_followup': 'வாட்ஸ்அப்பில் தொடரவும்',

      // Validation
      'val.name_req': 'பெயர் தேவை (குறைந்தது 3 எழுத்துக்கள்)',
      'val.phone_req': 'சரியான 10 இலக்க மொபைல் எண் தேவை',
      'val.service_req': 'தயவுசெய்து ஒரு சேவையை தேர்ந்தெடுக்கவும்',
      'val.message_req': 'உங்கள் திட்ட விவரங்களை உள்ளிடவும் (குறைந்தது 10 எழுத்துக்கள்)',

      // Chatbot
      'bot.name': 'மதுரா அசிஸ்டெண்ட்',
      'bot.tagline': 'கட்டிடக்கலை & கட்டுமான உதவியாளர்',
      'bot.welcome': 'வணக்கம்! Madhura Builders & Architects-க்கு வரவேற்கிறோம். சங்கரன்கோவில் அல்லது தென்காசி மாவட்டத்தில் உங்கள் கனவு இல்லத்தை உருவாக்க நாங்கள் எப்படி உதவலாம்?',
      'bot.input_ph': 'ஹவுஸ் பிளான், 3D எலிவேஷன், வாஸ்து, பட்ஜெட் பற்றி கேளுங்கள்...',
      'bot.send': 'அனுப்பு',
      'bot.clear': 'அரட்டையை அழிக்க',
      'bot.suggested': 'பரிந்துரைக்கப்பட்ட கேள்விகள்',
      'bot.q1': 'நீங்கள் என்ன சேவைகளை வழங்குகிறீர்கள்?',
      'bot.q2': 'எனக்கு ஒரு வீட்டு வரைபடம் (House Plan) வேண்டும்.',
      'bot.q3': 'எனக்கு 3D எலிவேஷன் டிசைன் வேண்டும்.',
      'bot.q4': 'நான் புதிய வீடு கட்ட விரும்புகிறேன்.',
      'bot.q5': 'சதுர அடிக்கு (per sq.ft) கட்டுமான கட்டணம் எவ்வளவு?',
      'bot.q6': '100% வாஸ்து முறைப்படி வரைபடம் வரைந்து தருவீர்களா?',
      'bot.q7': 'வீடு கட்டி முடிக்க எவ்வளவு காலம் ஆகும்?',
      'bot.q8': 'வங்கி கடன் மற்றும் அரசு கட்டிட அனுமதிக்கு வரைபடம் தருவீர்களா?',
      'bot.q9': 'பழைய வீடுகளை புதுப்பிக்கும் (Renovation) பணிகளை செய்கிறீர்களா?',
      'bot.q10': 'உள்துறை வடிவமைப்பு (Interior Design) சேவைகள் உள்ளதா?',
      'bot.q11': 'உங்கள் நிறைவடைந்த திட்டங்களை (Projects) பார்க்கலாமா?',
      'bot.q12': 'உங்கள் அலுவலகம் எங்குள்ளது?',
      'bot.q13': 'உங்களை எவ்வாறு தொடர்பு கொள்வது?',
      'bot.q14': 'நான் மதிப்பீடு (Quotation) பெற விரும்புகிறேன்.',

      // Footer
      'footer.desc': 'சிறந்த கட்டிடக்கலை திட்டமிடல், 3D எலிவேஷன்கள், தரமான குடியிருப்பு கட்டுமானம் மற்றும் வீட்டு வரைபடங்கள். சங்கரன்கோவில், தென்காசி மாவட்டம், தமிழ்நாடு.',
      'footer.quick_links': 'முக்கிய இணைப்புகள்',
      'footer.services': 'எங்கள் சேவைகள்',
      'footer.contact_info': 'தொடர்பு முகவரி',
      'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. மதுரா பில்டர்ஸ் & ஆர்கிடெக்ட்ஸ்.',
      'footer.developed_by': 'வடிவமைப்பு & உருவாக்கம்',
      'footer.engineered': 'கட்டிடக்கலை துல்லியத்துடன் வடிவமைக்கப்பட்டது.'
    }
  };
}
