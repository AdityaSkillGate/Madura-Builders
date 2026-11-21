import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Settings } from '../../models/models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <!-- Header Banner -->
    <section class="page-banner">
      <div class="container">
        <span class="section-tag">{{ 'nav.about' | translate }}</span>
        <h1 class="page-title">{{ 'intro.title' | translate }}</h1>
        <p class="page-subtitle">
          {{ 'intro.desc' | translate }}
        </p>
      </div>
    </section>

    <!-- Company Profile & Verified Storefront -->
    <section class="about-profile-section">
      <div class="container profile-grid">
        <div class="profile-image-col">
          <div class="image-frame">
            <img src="/assets/images/logo/madhura-company-promo.jpg" alt="Madhura Builders Office in Sankarankovil" class="profile-img" />
            <div class="office-caption">
              <strong>Madhura Builders &amp; Architects</strong>
              <span>#9, Muppidathi Amman Complex, Sankarankovil</span>
            </div>
          </div>
        </div>

        <div class="profile-text-col">
          <span class="section-tag">{{ 'intro.tag' | translate }}</span>
          <h2 class="section-title">Madhura Builders &amp; Architects</h2>
          <p class="lead-text">
            {{ 'intro.desc' | translate }}
          </p>
          <p class="body-text">
            {{ 'why.reason1.desc' | translate }} {{ 'why.reason2.desc' | translate }}
          </p>

          <div class="address-box">
            <h4 class="box-title">{{ 'contact.office_address' | translate }}</h4>
            <p>
              {{ settings.address }}
            </p>
            <div class="phones">
              <span>Primary: <a [href]="'tel:' + settings.phone_primary">{{ settings.phone_primary }}</a></span>
              <span>Alternate: <a [href]="'tel:' + settings.phone_secondary">{{ settings.phone_secondary }}</a></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="mission-vision-section">
      <div class="container mv-grid">
        <div class="mv-card">
          <div class="mv-badge">Our Mission</div>
          <h3>Architectural Clarity &amp; Honest Construction</h3>
          <p>
            To deliver thoughtfully planned homes and commercial spaces with complete structural integrity, transparent cost estimates, and meticulous site supervision in Sankarankovil and Tenkasi.
          </p>
        </div>

        <div class="mv-card gold-border">
          <div class="mv-badge">Our Vision</div>
          <h3>Setting Regional Standards for Modern Living</h3>
          <p>
            To be recognized across Tenkasi District and Tamil Nadu as the most dependable architectural builder—celebrated for innovative 3D elevation designs and resilient engineering craftsmanship.
          </p>
        </div>
      </div>
    </section>

    <!-- Architectural Philosophy & Construction Approach -->
    <section class="philosophy-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">{{ 'why.tag' | translate }}</span>
          <h2 class="section-title">{{ 'why.title' | translate }}</h2>
        </div>

        <div class="approach-grid">
          <div class="approach-card">
            <div class="step-num">01</div>
            <h4>{{ 'why.reason1.title' | translate }}</h4>
            <p>{{ 'why.reason1.desc' | translate }}</p>
          </div>

          <div class="approach-card">
            <div class="step-num">02</div>
            <h4>{{ 'why.reason2.title' | translate }}</h4>
            <p>{{ 'why.reason2.desc' | translate }}</p>
          </div>

          <div class="approach-card">
            <div class="step-num">03</div>
            <h4>{{ 'why.reason3.title' | translate }}</h4>
            <p>{{ 'why.reason3.desc' | translate }}</p>
          </div>

          <div class="approach-card">
            <div class="step-num">04</div>
            <h4>{{ 'why.reason4.title' | translate }}</h4>
            <p>{{ 'why.reason4.desc' | translate }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team & Consultation Note -->
    <section class="team-note-section">
      <div class="container text-center">
        <span class="section-tag">{{ 'cta.tag' | translate }}</span>
        <h2 class="section-title">{{ 'cta.title' | translate }}</h2>
        <p class="section-subtitle mx-auto">
          {{ 'cta.desc' | translate }}
        </p>
        <div class="team-cta">
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
      font-size: clamp(2.2rem, 5vw, 3.5rem);
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

    .about-profile-section {
      padding: 90px 0;
      background-color: #FFFFFF;
    }

    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 50px;
      align-items: center;
    }

    .image-frame {
      position: relative;
      border: 2px solid rgba(235, 90, 30, 0.25);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 16px 36px rgba(11, 43, 99, 0.1);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .image-frame:hover {
      transform: translateY(-8px) scale(1.015);
      box-shadow: 0 28px 56px rgba(11, 43, 99, 0.2);
      border-color: #EB5A1E;
    }

    .profile-img {
      width: 100%;
      height: 440px;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .image-frame:hover .profile-img {
      transform: scale(1.06);
    }

    .office-caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(11, 43, 99, 0.92);
      color: #FFFFFF;
      padding: 14px 20px;
      display: flex;
      flex-direction: column;
      font-size: 12px;
      backdrop-filter: blur(6px);
      border-top: 2px solid #EB5A1E;
    }

    .office-caption strong {
      color: #EB5A1E;
      font-size: 13.5px;
    }

    .section-title {
      font-size: 30px;
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 16px;
    }

    .lead-text {
      font-size: 16px;
      color: #0F172A;
      line-height: 1.7;
      margin-bottom: 16px;
      font-weight: 500;
    }

    .body-text {
      font-size: 14.5px;
      color: #64748B;
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .address-box {
      padding: 24px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-left: 5px solid #EB5A1E;
      border-radius: 10px;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .address-box:hover {
      transform: translateY(-6px);
      background: #FFFFFF;
      box-shadow: 0 16px 36px rgba(11, 43, 99, 0.1);
      border-color: rgba(235, 90, 30, 0.4);
      border-left-color: #EB5A1E;
    }

    .box-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #0B2B63;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .address-box p {
      font-size: 13.5px;
      color: #475569;
      line-height: 1.6;
      margin-bottom: 12px;
    }

    .phones {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
      color: #0F172A;
      font-weight: 600;
    }

    .phones a {
      color: #EB5A1E;
      font-weight: 700;
    }

    /* Mission & Vision */
    .mission-vision-section {
      padding: 80px 0;
      background-color: #F8FAFC;
    }

    .mv-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }

    .mv-card {
      background: #FFFFFF;
      padding: 36px 30px;
      border-radius: 14px;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 18px rgba(11, 43, 99, 0.04);
      border-top: 5px solid #0B2B63;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mv-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 24px 48px -10px rgba(11, 43, 99, 0.18), 0 0 0 1.5px rgba(11, 43, 99, 0.25);
    }

    .mv-card.gold-border {
      border-top-color: #EB5A1E;
    }

    .mv-card.gold-border:hover {
      box-shadow: 0 24px 48px -10px rgba(11, 43, 99, 0.18), 0 0 0 1.5px rgba(235, 90, 30, 0.35);
    }

    .mv-badge {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: #EB5A1E;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }

    .mv-card h3 {
      font-size: 20px;
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 12px;
      transition: color 0.3s ease;
    }

    .mv-card:hover h3 {
      color: #EB5A1E;
    }

    .mv-card p {
      font-size: 14px;
      color: #64748B;
      line-height: 1.6;
    }

    /* Philosophy */
    .philosophy-section {
      padding: 90px 0;
      background-color: #FFFFFF;
    }

    .approach-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-top: 40px;
    }

    .approach-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 30px 24px;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .approach-card:hover {
      transform: translateY(-8px) scale(1.03);
      background: #FFFFFF;
      border-color: #EB5A1E;
      box-shadow: 0 20px 40px rgba(11, 43, 99, 0.12), 0 0 0 1.5px rgba(235, 90, 30, 0.3);
    }

    .step-num {
      font-size: 24px;
      font-weight: 900;
      color: #EB5A1E;
      margin-bottom: 12px;
      display: inline-block;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .approach-card:hover .step-num {
      transform: scale(1.2) rotate(6deg);
    }

    .approach-card h4 {
      font-size: 16px;
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 8px;
      transition: color 0.3s ease;
    }

    .approach-card:hover h4 {
      color: #EB5A1E;
    }

    .approach-card p {
      font-size: 13px;
      color: #64748B;
      line-height: 1.6;
    }

    /* Team Note */
    .team-note-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #0B2B63 0%, #153E8A 100%);
      color: #FFFFFF;
    }

    .team-note-section .section-title {
      color: #FFFFFF;
    }

    .team-note-section .section-subtitle {
      color: #CBD5E1;
    }

    .team-cta {
      margin-top: 28px;
    }

    .btn-primary {
      padding: 13px 26px;
      background: #EB5A1E;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 14px;
      border-radius: 6px;
      text-decoration: none;
      display: inline-block;
      transition: background 0.2s, transform 0.15s;
    }

    .btn-primary:hover {
      background: #D9480C;
      transform: translateY(-1px);
    }

    @media (max-width: 960px) {
      .profile-grid,
      .mv-grid {
        grid-template-columns: 1fr;
      }
      .approach-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 640px) {
      .approach-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent implements OnInit {
  translationService = inject(TranslationService);
  private api = inject(ApiService);

  settings: Settings = {
    company_name: 'Madhura Builders & Architects',
    tagline: 'Building Dreams Into Reality',
    address: '#9, Muppidathi Amman Complex, Upstairs, Opposite Hatsun Dairy, Near Geethalaya Theatre, Sankarankovil, Tenkasi District, Tamil Nadu - 627756, India',
    phone_primary: '+91 90034 43196',
    phone_secondary: '+91 99626 26231',
    whatsapp_number: '919003443196',
    email: 'info@madhurabuilders.com',
    google_maps_url: 'https://www.google.com/maps?q=9.1798265,77.5386246'
  };

  ngOnInit(): void {
    this.api.getSettings().subscribe(s => {
      if (s) this.settings = s;
    });
  }
}
