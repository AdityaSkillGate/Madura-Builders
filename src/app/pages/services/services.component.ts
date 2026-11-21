import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ServiceItem } from '../../models/models';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <!-- Header Banner -->
    <section class="page-banner">
      <div class="container">
        <span class="section-tag">{{ 'services.preview_tag' | translate }}</span>
        <h1 class="page-title">{{ 'services.preview_title' | translate }}</h1>
        <p class="page-subtitle">
          {{ 'hero.subtitle' | translate }}
        </p>
      </div>
    </section>

    <!-- Services Detailed Showcase -->
    <section class="services-list-section">
      <div class="container">
        <div class="service-detail-item" *ngFor="let s of services; let odd = odd" [id]="s.id" [class.reverse]="odd">
          <div class="service-visual">
            <img [src]="s.image" [alt]="s.titleKey | translate" class="service-photo" />
            <span class="service-badge">{{ s.number }}</span>
            <div class="status-pill" [class.confirmed]="s.isConfirmed">
              {{ s.isConfirmed ? 'Verified Active Offering' : 'Confirm With Owner' }}
            </div>
          </div>

          <div class="service-content">
            <span class="service-tag">{{ 'hero.phase' | translate }} {{ s.number }}</span>
            <h2 class="service-heading">{{ s.titleKey | translate }}</h2>
            <p class="service-lead">{{ s.descKey | translate }}</p>
            <p class="service-full">{{ s.fullDesc }}</p>

            <div class="benefits-box">
              <h4>Key Deliverables:</h4>
              <ul class="benefits-list">
                <li *ngFor="let b of s.benefits">&check; {{ b }}</li>
              </ul>
            </div>

            <div class="service-actions">
              <a [routerLink]="['/contact']" [queryParams]="{ service: s.titleKey | translate }" class="btn-primary">
                {{ 'cta.btn_contact' | translate }} &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Consultation Banner -->
    <section class="services-cta-section">
      <div class="container text-center">
        <span class="section-tag">{{ 'cta.tag' | translate }}</span>
        <h2 class="section-title">{{ 'cta.title' | translate }}</h2>
        <p class="section-subtitle mx-auto">
          {{ 'cta.desc' | translate }}
        </p>
        <div class="mt-8">
          <a routerLink="/contact" class="btn-primary">{{ 'cta.btn_contact' | translate }}</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-banner {
      padding: 130px 0 60px;
      background: linear-gradient(135deg, #081325 0%, #0B2B63 100%);
      color: #FFFFFF;
      border-bottom: 3.5px solid #EB5A1E;
    }

    .section-tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #EB5A1E;
      background: rgba(235, 90, 30, 0.12);
      padding: 4px 10px;
      border-radius: 4px;
      margin-bottom: 12px;
    }

    .page-title {
      font-size: clamp(2.2rem, 5vw, 3.75rem);
      color: #FFFFFF;
      margin-bottom: 16px;
      font-weight: 800;
    }

    .page-subtitle {
      font-size: 16px;
      color: #CBD5E1;
      max-width: 680px;
      line-height: 1.7;
    }

    /* Service Items */
    .services-list-section {
      padding: 90px 0;
      background-color: #F8FAFC;
    }

    .service-detail-item {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 50px;
      align-items: center;
      margin-bottom: 60px;
      background: #FFFFFF;
      padding: 36px;
      border-radius: 16px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 8px 25px rgba(11, 43, 99, 0.05);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-detail-item:hover {
      transform: translateY(-8px);
      box-shadow: 0 24px 50px -12px rgba(11, 43, 99, 0.16), 0 0 0 1.5px rgba(235, 90, 30, 0.35);
      border-color: rgba(235, 90, 30, 0.4);
    }

    .service-detail-item.reverse {
      grid-template-columns: 1.2fr 1fr;
    }

    .service-detail-item.reverse .service-visual {
      order: 2;
    }

    .service-detail-item.reverse .service-content {
      order: 1;
    }

    .service-visual {
      position: relative;
      height: 380px;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #E2E8F0;
    }

    .service-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-detail-item:hover .service-photo {
      transform: scale(1.08);
    }

    .service-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      background: #0B2B63;
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 6px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-detail-item:hover .service-badge {
      background: #EB5A1E;
      transform: scale(1.15) rotate(-3deg);
    }

    .status-pill {
      position: absolute;
      bottom: 14px;
      left: 14px;
      background: rgba(11, 43, 99, 0.85);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 4px;
      backdrop-filter: blur(4px);
    }

    .status-pill.confirmed {
      background: rgba(16, 185, 129, 0.9);
      color: #FFFFFF;
    }

    .service-tag {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      color: #EB5A1E;
      display: block;
      margin-bottom: 8px;
    }

    .service-heading {
      font-size: 26px;
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 14px;
      transition: color 0.3s ease;
    }

    .service-detail-item:hover .service-heading {
      color: #EB5A1E;
    }

    .service-lead {
      font-size: 15px;
      color: #334155;
      font-weight: 600;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .service-full {
      font-size: 14px;
      color: #64748B;
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .benefits-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-left: 3.5px solid #EB5A1E;
      border-radius: 8px;
      padding: 18px 20px;
      margin-bottom: 24px;
      transition: transform 0.3s ease;
    }

    .service-detail-item:hover .benefits-box {
      transform: translateX(4px);
    }

    .benefits-box h4 {
      font-size: 13.5px;
      font-weight: 700;
      color: #0B2B63;
      margin-bottom: 10px;
    }

    .benefits-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .benefits-list li {
      font-size: 13px;
      color: #475569;
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .benefits-list li:hover {
      transform: translateX(4px);
      color: #0B2B63;
    }

    .btn-primary {
      padding: 12px 24px;
      background: #EB5A1E;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 13.5px;
      border-radius: 6px;
      text-decoration: none;
      display: inline-block;
      transition: background 0.2s, transform 0.15s;
    }

    .btn-primary:hover {
      background: #D9480C;
      transform: translateY(-1px);
    }

    .services-cta-section {
      padding: 80px 0;
      background-color: #FFFFFF;
      border-top: 1px solid #E2E8F0;
    }

    .section-title {
      font-size: 28px;
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 12px;
    }

    .section-subtitle {
      font-size: 15px;
      color: #64748B;
      max-width: 650px;
      line-height: 1.6;
    }

    .mt-8 {
      margin-top: 24px;
    }

    @media (max-width: 960px) {
      .service-detail-item,
      .service-detail-item.reverse {
        grid-template-columns: 1fr;
        padding: 24px;
      }
      .service-detail-item.reverse .service-visual {
        order: 1;
      }
      .service-detail-item.reverse .service-content {
        order: 2;
      }
      .service-visual {
        height: 280px;
      }
    }
  `]
})
export class ServicesComponent {
  translationService = inject(TranslationService);

  readonly services = [
    {
      id: 'architectural-planning',
      number: '01',
      titleKey: 'services.s1.title',
      descKey: 'services.s1.desc',
      fullDesc: 'We develop precision CAD blueprints, structural foundation designs, and municipal sanction drawings tailored to your plot and local Tenkasi district building codes.',
      image: '/assets/images/architecture/architectural-planning-01.jpg',
      benefits: [
        'Site Topography & Solar Orientation Analysis',
        'Strict 100% Vastu Compliance Verification',
        'Structural Working Drawings & Plinth Beam Calculations',
        'Local Municipal Sanction Documentation Preparation'
      ],
      isConfirmed: true
    },
    {
      id: 'residential-construction',
      number: '02',
      titleKey: 'services.s2.title',
      descKey: 'services.s2.desc',
      fullDesc: 'End-to-end residential civil construction from foundation excavation to finishing plaster and roofing. Daily site monitoring by qualified civil engineers.',
      image: '/assets/images/construction/construction-site-01.jpg',
      benefits: [
        'Turnkey Construction (Material + Labor Contracts)',
        'Certified Branded Cement & High-Yield TMT Steel',
        'Water-Curing Protocols & Anti-Termite Treatment',
        'Transparent Milestone-Based Billing Linked to Output'
      ],
      isConfirmed: true
    },
    {
      id: '3d-elevation-design',
      number: '03',
      titleKey: 'services.s3.title',
      descKey: 'services.s3.desc',
      fullDesc: 'Visualize your house before pouring concrete. Our 3D elevation studio renders contemporary architectural forms with authentic textures—brick cladding, wood louvers, glass railings, and evening illumination.',
      image: '/assets/images/architecture/3d-elevation-showcase-01.jpg',
      benefits: [
        'High-Resolution Photorealistic 3D Perspective Renders',
        'Complete Exterior Color Palette & Texture Guide',
        'Balcony Shading, Pergola & Boundary Gate Integration',
        'Exact Architectural Working Drawings for On-Site Masons'
      ],
      isConfirmed: true
    },
    {
      id: 'house-plan-design',
      number: '04',
      titleKey: 'services.s4.title',
      descKey: 'services.s4.desc',
      fullDesc: 'Whether you have a 30x40 urban plot or an expansive property, our house plans maximize usable carpet area, eliminate wasted hallway space, and prioritize functional storage and room privacy.',
      image: '/assets/images/floor-plans/architectural-plan-01.jpg',
      benefits: [
        'Zero-Wastage Room Layouts & Efficient Spatial Utility',
        'Double-Height Living Rooms & Private Pooja Niches',
        'Ventilated Kitchen-cum-Utility Zoning',
        'Provision for Future Vertical Expansion (Floor-Over-Floor)'
      ],
      isConfirmed: true
    },
    {
      id: 'interior-design',
      number: '05',
      titleKey: 'services.s5.title',
      descKey: 'services.s5.desc',
      fullDesc: 'We harmonize interior spatial aesthetics with structural architecture. From custom modular kitchens and wardrobe layouts to false ceiling ambient illumination and acoustic paneling. (Offered subject to client scope confirmation).',
      image: '/assets/images/interiors/luxury-interior-01.jpg',
      benefits: [
        'Modular Kitchen Spatial Planning & Appliance Zoning',
        'Living Hall False Ceiling & Concealed Warm LED Profiles',
        'Custom Teakwood Wardrobes & TV Console Millwork',
        'Luxury Bathroom Ceramic & Sanitary Fixture Layouts'
      ],
      isConfirmed: false
    },
    {
      id: 'construction-consultation',
      number: '06',
      titleKey: 'services.s6.title',
      descKey: 'services.s6.desc',
      fullDesc: 'Already have a contractor or managing construction yourself? We provide independent structural supervision, foundation depth verification, rebar spacing checks, and objective material testing audits.',
      image: '/assets/images/architecture/structural-consultation-01.jpg',
      benefits: [
        'Independent Stage-by-Stage Site Inspection Audits',
        'Reinforcement & Concrete Pour Verification',
        'Detailed Bill of Quantities (BOQ) & Cost Estimation Checks',
        'Structural Troubleshooting & Crack Prevention Advisory'
      ],
      isConfirmed: true
    }
  ];
}
