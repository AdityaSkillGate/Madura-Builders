import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Settings } from '../../models/models';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslatePipe],
  template: `
    <!-- Header Banner -->
    <section class="page-banner">
      <div class="container">
        <span class="section-tag">{{ 'contact.office_address' | translate }}</span>
        <h1 class="page-title">{{ 'contact.title' | translate }}</h1>
        <p class="page-subtitle">
          {{ 'contact.subtitle' | translate }}
        </p>
      </div>
    </section>

    <!-- Main Contact Grid -->
    <section class="contact-section">
      <div class="container">
        <!-- 2-Column Grid: Contact Info & Enquiry Form (Perfect Side-by-Side Balance) -->
        <div class="contact-grid">
          <!-- Left Column: Business Location & Direct Access -->
          <div class="contact-info-card">
            <span class="section-tag">Madhura Builders &amp; Architects</span>
            <h2 class="card-title">Sankarankovil Office</h2>

            <!-- Address -->
            <div class="detail-block">
              <span class="detail-label">{{ 'contact.office_address' | translate | uppercase }}:</span>
              <address class="office-address">
                <strong>#9, Muppidathi Amman Complex, Upstairs,</strong><br />
                Opposite Hatsun Dairy, Near Geethalaya Theatre,<br />
                Sankarankovil, Tenkasi District,<br />
                Tamil Nadu - 627756, India.
              </address>
              <div class="map-actions">
                <a [href]="settings.google_maps_url" target="_blank" rel="noopener noreferrer" class="link-btn">
                  Google Maps &rarr;
                </a>
                <a [href]="settings.directions_url || settings.google_maps_url" target="_blank" rel="noopener noreferrer" class="link-btn secondary">
                  {{ 'contact.get_directions' | translate }} &rarr;
                </a>
              </div>
            </div>

            <!-- Phone Numbers -->
            <div class="detail-block">
              <span class="detail-label">{{ 'contact.phone_numbers' | translate | uppercase }}:</span>
              <div class="phones-list">
                <a [href]="'tel:' + settings.phone_primary" class="phone-link">
                  <strong>Primary:</strong> {{ settings.phone_primary }}
                </a>
                <a [href]="'tel:' + settings.phone_secondary" class="phone-link">
                  <strong>Alternate:</strong> {{ settings.phone_secondary }}
                </a>
              </div>
            </div>

            <!-- Office Hours -->
            <div class="detail-block">
              <span class="detail-label">{{ 'contact.business_hours' | translate | uppercase }}:</span>
              <p class="hours-text">
                {{ 'contact.hours_val' | translate }}
              </p>
            </div>

            <!-- Official Social Channels -->
            <div class="detail-block">
              <span class="detail-label">OFFICIAL SOCIAL CHANNELS:</span>
              <div class="contact-social-row">
                <!-- Instagram -->
                <a [href]="settings.instagram_url || 'https://www.instagram.com/madhura.builders'"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="contact-social-badge ig"
                   title="Madhura Builders on Instagram"
                   aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>

                <!-- Facebook -->
                <a [href]="settings.facebook_url || 'https://www.facebook.com/madhurabuilders'"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="contact-social-badge fb"
                   title="Madhura Builders on Facebook"
                   aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>

                <!-- YouTube -->
                <a [href]="settings.youtube_url || 'https://www.youtube.com/@madhurabuilders'"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="contact-social-badge yt"
                   title="Madhura Builders on YouTube"
                   aria-label="YouTube">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>YouTube</span>
                </a>
              </div>
            </div>

            <!-- Direct WhatsApp Quick Chat Box -->
            <div class="whatsapp-direct-box">
              <div class="wa-left">
                <strong>{{ 'cta.btn_whatsapp' | translate }}</strong>
                <span>+91 90034 43196 (Direct Architectural Desk)</span>
              </div>
              <a [href]="quickWhatsappUrl" target="_blank" rel="noopener noreferrer" class="wa-btn">
                WhatsApp
              </a>
            </div>
          </div>

          <!-- Right Column: Validated Consultation Form -->
          <div class="form-card">
            <span class="section-tag">{{ 'cta.tag' | translate }}</span>
            <h2 class="card-title">{{ 'form.submit' | translate }}</h2>
            <p class="form-intro">
              {{ 'contact.subtitle' | translate }}
            </p>

            <!-- Success State -->
            <div class="success-alert" *ngIf="submittedSuccess">
              <div class="success-icon">&check;</div>
              <div>
                <h4>{{ 'form.success' | translate }}</h4>
                <p>Thank you, {{ contactForm.value.name }}. Our team will review your specifications and contact you shortly.</p>
                <a [href]="lastGeneratedWhatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-send mt-3">
                  💬 {{ 'form.whatsapp_followup' | translate }} &rarr;
                </a>
              </div>
            </div>

            <!-- Form -->
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" *ngIf="!submittedSuccess" class="enquiry-form">
              <!-- Name & Phone -->
              <div class="form-row">
                <div class="form-group">
                  <label for="name">{{ 'form.name' | translate }} <span class="required">*</span></label>
                  <input
                    id="name"
                    type="text"
                    formControlName="name"
                    [placeholder]="'form.name_ph' | translate"
                    [class.invalid]="isFieldInvalid('name')"
                  />
                  <small class="error-msg" *ngIf="isFieldInvalid('name')">{{ 'val.name_req' | translate }}</small>
                </div>

                <div class="form-group">
                  <label for="phone">{{ 'form.phone' | translate }} <span class="required">*</span></label>
                  <input
                    id="phone"
                    type="tel"
                    formControlName="phone"
                    [placeholder]="'form.phone_ph' | translate"
                    [class.invalid]="isFieldInvalid('phone')"
                  />
                  <small class="error-msg" *ngIf="isFieldInvalid('phone')">{{ 'val.phone_req' | translate }}</small>
                </div>
              </div>

              <!-- Email & City/Location -->
              <div class="form-row">
                <div class="form-group">
                  <label for="email">{{ 'form.email' | translate }}</label>
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    [placeholder]="'form.email_ph' | translate"
                  />
                </div>

                <div class="form-group">
                  <label for="location">{{ 'form.city' | translate }}</label>
                  <input
                    id="location"
                    type="text"
                    formControlName="location"
                    [placeholder]="'form.city_ph' | translate"
                  />
                </div>
              </div>

              <!-- Service Required & Property Type -->
              <div class="form-row">
                <div class="form-group">
                  <label for="service_required">{{ 'form.service' | translate }} <span class="required">*</span></label>
                  <select id="service_required" formControlName="service_required">
                    <option value="Residential Building Construction">{{ 'services.s2.title' | translate }}</option>
                    <option value="Architectural Planning">{{ 'services.s1.title' | translate }}</option>
                    <option value="3D Elevation Design">{{ 'services.s3.title' | translate }}</option>
                    <option value="House Plan Design">{{ 'services.s4.title' | translate }}</option>
                    <option value="Interior Design Consultation">{{ 'services.s5.title' | translate }}</option>
                    <option value="Construction Consultation">{{ 'services.s6.title' | translate }}</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="property_type">{{ 'form.property_type' | translate }}</label>
                  <select id="property_type" formControlName="property_type">
                    <option value="Individual Residential Villa">Individual Residential Villa</option>
                    <option value="Multi-Story Residential Home">Multi-Story Residential Home</option>
                    <option value="Commercial Complex / Shop">Commercial Complex / Shop</option>
                    <option value="Farmhouse / Modern Cottage">Farmhouse / Modern Cottage</option>
                    <option value="Renovation / Additional Floor">Renovation / Additional Floor</option>
                  </select>
                </div>
              </div>

              <!-- Budget Range -->
              <div class="form-group">
                <label for="budget_range">{{ 'form.budget' | translate }}</label>
                <select id="budget_range" formControlName="budget_range">
                  <option value="₹25 Lakhs - ₹40 Lakhs">₹25 Lakhs - ₹40 Lakhs</option>
                  <option value="₹40 Lakhs - ₹60 Lakhs">₹40 Lakhs - ₹60 Lakhs</option>
                  <option value="₹60 Lakhs - ₹1 Crore">₹60 Lakhs - ₹1 Crore</option>
                  <option value="₹1 Crore+">₹1 Crore+</option>
                  <option value="Design & Plan Only Consultation">Design &amp; Plan Only Consultation</option>
                </select>
              </div>

              <!-- Message / Plot details -->
              <div class="form-group">
                <label for="message">{{ 'form.message' | translate }}</label>
                <textarea
                  id="message"
                  rows="4"
                  formControlName="message"
                  [placeholder]="'form.message_ph' | translate"
                ></textarea>
              </div>

              <!-- Form Action Buttons -->
              <div class="form-actions">
                <button type="submit" class="btn-submit" [disabled]="contactForm.invalid || isSubmitting">
                  {{ isSubmitting ? ('form.submitting' | translate) : ('form.submit' | translate) }}
                </button>

                <button type="button" (click)="sendDirectViaWhatsApp()" class="btn-whatsapp-action">
                  <span>💬 {{ 'cta.btn_whatsapp' | translate }}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Full-Width Interactive Architectural Studio Map Frame -->
        <div class="map-wrapper full-width-map">
          <div class="map-terminal-top">
            <div class="terminal-dots">
              <span class="t-dot red"></span>
              <span class="t-dot yellow"></span>
              <span class="t-dot green"></span>
            </div>
            <div class="terminal-title">
              <span class="pin-symbol">📍</span>
              <span>MADHURA ARCHITECTURAL STUDIO — SANKARANKOVIL</span>
            </div>
            <span class="terminal-coord">9.1798° N, 77.5386° E</span>
          </div>

          <div class="map-embed-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1257931.732255919!2d76.60246659095613!3d9.33039418795587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMTAnNDcuNCJOIDc3wrAzMicxOS4xIkU!5e1!3m2!1sen!2sin!4v1794818490884!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              title="Madhura Builders Office Map">
            </iframe>
          </div>

          <div class="map-terminal-bottom">
            <div class="mt-info">
              <strong>Opposite Hatsun Dairy</strong>
              <span>#9, Muppidathi Amman Complex, Upstairs, Near Geethalaya Theatre, Sankarankovil - 627756</span>
            </div>
            <div class="mt-buttons">
              <a [href]="settings.google_maps_url" target="_blank" rel="noopener noreferrer" class="mt-btn">
                Open in Google Maps &rarr;
              </a>
              <a [href]="settings.directions_url || settings.google_maps_url" target="_blank" rel="noopener noreferrer" class="mt-btn highlight">
                📍 {{ 'contact.get_directions' | translate }} &rarr;
              </a>
            </div>
          </div>
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
      font-size: clamp(2.2rem, 4.5vw, 3.5rem);
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 14px;
    }

    .page-subtitle {
      font-size: 16px;
      color: #CBD5E1;
      max-width: 720px;
      line-height: 1.6;
    }

    .contact-section {
      padding: 70px 0 90px;
      background: linear-gradient(180deg, #081325 0%, #040D1A 100%);
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.15fr;
      gap: 36px;
      margin-bottom: 36px;
      align-items: stretch;
    }

    @media (max-width: 980px) {
      .contact-grid {
        grid-template-columns: 1fr;
        gap: 24px;
        margin-bottom: 24px;
      }
    }

    .contact-info-card {
      background: #081325;
      border: 1.5px solid rgba(235, 90, 30, 0.35);
      border-radius: 20px;
      padding: 32px 28px;
      box-shadow: 0 20px 50px -18px rgba(8, 19, 37, 0.6);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .contact-info-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 24px 50px -15px rgba(235, 90, 30, 0.25);
      border-color: #EB5A1E;
    }

    .card-title {
      font-size: 22px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 24px;
    }

    .detail-block {
      margin-bottom: 20px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .detail-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      color: #EB5A1E;
      display: block;
      margin-bottom: 8px;
    }

    .office-address {
      font-style: normal;
      font-size: 14.5px;
      line-height: 1.7;
      color: #E2E8F0;
      margin-bottom: 14px;
    }

    .office-address strong {
      color: #FFFFFF;
    }

    .map-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .link-btn {
      font-size: 12px;
      font-weight: 700;
      color: #FFFFFF;
      background-color: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      padding: 8px 16px;
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.25s ease;
    }

    .link-btn:hover {
      background-color: #0B2B63;
      border-color: #0B2B63;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(11, 43, 99, 0.3);
    }

    .link-btn.secondary {
      background-color: #EB5A1E;
      border-color: #EB5A1E;
    }

    .link-btn.secondary:hover {
      background-color: #D9480C;
      box-shadow: 0 6px 16px rgba(235, 90, 30, 0.4);
    }

    .phones-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .phone-link {
      font-size: 14.5px;
      color: #93C5FD;
      font-weight: 600;
      transition: color 0.2s;
    }

    .phone-link:hover {
      color: #EB5A1E;
    }

    .hours-text {
      font-size: 14px;
      color: #CBD5E1;
      line-height: 1.6;
    }

    .whatsapp-direct-box {
      background: rgba(37, 211, 102, 0.1);
      border: 1.5px solid rgba(37, 211, 102, 0.35);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
    }

    .wa-left strong {
      display: block;
      font-size: 14px;
      color: #25D366;
    }

    .wa-left span {
      font-size: 11.5px;
      color: #86EFAC;
    }

    .wa-btn {
      padding: 8px 16px;
      background-color: #25D366;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 12.5px;
      border-radius: 6px;
      text-decoration: none;
      white-space: nowrap;
      transition: transform 0.2s;
    }

    .wa-btn:hover {
      transform: scale(1.05);
    }

    /* Contact Social Channels */
    .contact-social-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 6px;
    }

    .contact-social-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      text-decoration: none;
      transition: all 0.25s ease;
    }

    .contact-social-badge:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .contact-social-badge.ig:hover {
      background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
      color: #FFFFFF;
      border-color: transparent;
    }

    .contact-social-badge.fb:hover {
      background: #1877F2;
      color: #FFFFFF;
      border-color: #1877F2;
    }

    .contact-social-badge.yt:hover {
      background: #FF0000;
      color: #FFFFFF;
      border-color: #FF0000;
    }

    /* Full-width Map Wrapper */
    .map-wrapper.full-width-map {
      background: #081325;
      border: 2px solid rgba(235, 90, 30, 0.35);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 50px -18px rgba(8, 19, 37, 0.6);
      width: 100%;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
    }

    .map-wrapper.full-width-map:hover {
      transform: translateY(-4px);
      box-shadow: 0 28px 55px -15px rgba(235, 90, 30, 0.25);
      border-color: #EB5A1E;
    }

    .map-terminal-top {
      background: #0B2B63;
      padding: 0.8rem 1.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      border-bottom: 1.5px solid rgba(235, 90, 30, 0.3);
      flex-wrap: wrap;
    }

    .terminal-dots {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .t-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .t-dot.red { background: #EF4444; }
    .t-dot.yellow { background: #F59E0B; }
    .t-dot.green { background: #10B981; }

    .terminal-title {
      font-size: 0.85rem;
      font-weight: 800;
      letter-spacing: 0.8px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .terminal-coord {
      font-family: monospace;
      font-size: 0.78rem;
      color: #EB5A1E;
      background: rgba(235, 90, 30, 0.15);
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid rgba(235, 90, 30, 0.3);
    }

    .map-embed-container {
      width: 100%;
      height: 420px;
      position: relative;
    }

    .map-embed-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    .map-terminal-bottom {
      background: #081325;
      padding: 1.1rem 1.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      flex-wrap: wrap;
    }

    .mt-info strong {
      display: block;
      color: #FFFFFF;
      font-size: 0.95rem;
    }

    .mt-info span {
      font-size: 0.82rem;
      color: #94A3B8;
    }

    .mt-buttons {
      display: flex;
      gap: 0.8rem;
      flex-wrap: wrap;
    }

    .mt-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0.65rem 1.1rem;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      text-decoration: none;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #FFFFFF;
      transition: all 0.25s ease;
    }

    .mt-btn:hover {
      background: rgba(255, 255, 255, 0.18);
      transform: translateY(-2px);
    }

    .mt-btn.highlight {
      background: #EB5A1E;
      border-color: #EB5A1E;
    }

    .mt-btn.highlight:hover {
      background: #FF6A28;
      box-shadow: 0 6px 18px rgba(235, 90, 30, 0.45);
    }

    /* Form column */
    .form-card {
      background: #081325;
      border: 1.5px solid rgba(235, 90, 30, 0.35);
      border-radius: 20px;
      padding: 32px 28px;
      box-shadow: 0 20px 50px -18px rgba(8, 19, 37, 0.6);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      color: #FFFFFF;
    }

    .form-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 24px 50px -15px rgba(235, 90, 30, 0.25);
      border-color: #EB5A1E;
    }

    .form-intro {
      font-size: 14px;
      color: #94A3B8;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .enquiry-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-group label {
      font-size: 12.5px;
      font-weight: 700;
      color: #CBD5E1;
    }

    .required {
      color: #EB5A1E;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 11px 14px;
      border: 1.5px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      font-size: 14px;
      color: #FFFFFF;
      background: rgba(4, 13, 26, 0.85);
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      border-color: #EB5A1E;
      box-shadow: 0 0 0 3px rgba(235, 90, 30, 0.25);
      background: rgba(4, 13, 26, 1);
    }

    .form-group input.invalid,
    .form-group select.invalid {
      border-color: #EF4444;
      background-color: rgba(239, 68, 68, 0.15);
    }

    .error-msg {
      font-size: 11px;
      color: #EF4444;
      font-weight: 600;
    }

    .form-actions {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    .btn-submit {
      flex: 1;
      min-width: 200px;
      padding: 13px 24px;
      background: linear-gradient(135deg, #EB5A1E 0%, #D9480C 100%);
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.5px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-submit:hover:not(:disabled) {
      background: #FF6A28;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(235, 90, 30, 0.4);
    }

    .btn-submit:disabled {
      background: rgba(255, 255, 255, 0.12);
      color: #64748B;
      cursor: not-allowed;
    }

    .btn-whatsapp-action {
      padding: 12px 20px;
      background-color: #25D366;
      color: #FFFFFF;
      font-size: 13.5px;
      font-weight: 700;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-whatsapp-action:hover {
      background-color: #128C7E;
      transform: translateY(-1px);
    }

    .success-alert {
      background: #ECFDF5;
      border: 1.5px solid #10B981;
      border-radius: 8px;
      padding: 24px;
      display: flex;
      gap: 16px;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    .success-icon {
      width: 32px;
      height: 32px;
      background-color: #10B981;
      color: #FFFFFF;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 900;
      flex-shrink: 0;
    }

    .btn-whatsapp-send {
      display: inline-block;
      margin-top: 12px;
      padding: 9px 18px;
      background-color: #25D366;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 13px;
      border-radius: 6px;
      text-decoration: none;
    }

    @media (max-width: 960px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      .form-card,
      .contact-info-card {
        padding: 24px 18px;
      }
      .form-actions {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `]
})
export class ContactComponent implements OnInit {
  translationService = inject(TranslationService);
  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);

  contactForm!: FormGroup;
  isSubmitting = false;
  submittedSuccess = false;
  lastGeneratedWhatsappUrl = '';

  settings: Settings = {
    company_name: 'Madhura Builders & Architects',
    tagline: 'Building Dreams Into Reality',
    address: '#9, Muppidathi Amman Complex, Upstairs, Near Geethalaya Theatre, Sankarankovil, Tenkasi District, Tamil Nadu - 627756, India',
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

  get quickWhatsappUrl(): string {
    const isTa = this.translationService.currentLang() === 'ta';
    const clean = this.settings.whatsapp_number.replace(/[^0-9]/g, '');
    const msg = isTa
      ? 'வணக்கம் Madhura Builders & Architects,\n\nநான் உங்கள் கட்டிடக்கலை மற்றும் கட்டுமான சேவைகளில் ஆர்வமாக உள்ளேன்.\n\nகூடுதல் விவரங்களுடன் என்னை தொடர்பு கொள்ளவும்.'
      : 'Hello Madhura Builders & Architects,\n\nI am interested in your construction and architectural services.\n\nPlease contact me with more details.';
    return `https://wa.me/${clean}?text=${encodeURIComponent(msg)}`;
  }

  ngOnInit(): void {
    this.api.getSettings().subscribe(s => {
      if (s) this.settings = s;
    });

    const initialService = this.route.snapshot.queryParams['service'] || 'Residential Building Construction';

    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+ -]{10,14}$/)]],
      email: [''],
      location: [''],
      service_required: [initialService, Validators.required],
      property_type: ['Individual Residential Villa'],
      budget_range: ['₹40 Lakhs - ₹60 Lakhs'],
      message: ['']
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  generateWhatsappText(): string {
    const v = this.contactForm.value;
    const isTa = this.translationService.currentLang() === 'ta';
    if (isTa) {
      return `வணக்கம் Madhura Builders & Architects,\n\nஎனது கட்டுமான திட்ட விவரங்கள்:\n- பெயர்: ${v.name || 'குறிப்பிடப்படவில்லை'}\n- தொலைபேசி: ${v.phone || 'குறிப்பிடப்படவில்லை'}\n- நிலம் உள்ள இடம்: ${v.location || 'சங்கரன்கோவில்'}\n- தேவைப்படும் சேவை: ${v.service_required}\n- கட்டிட வகை: ${v.property_type}\n- உத்தேச பட்ஜெட்: ${v.budget_range}\n- கூடுதல் விவரம்: ${v.message || 'தயவுசெய்து என்னை தொடர்பு கொள்ளவும்'}`;
    }
    return `Hello Madhura Builders & Architects,\n\nI am sharing my project requirements for consultation:\n- Name: ${v.name || 'Not specified'}\n- Phone: ${v.phone || 'Not specified'}\n- Location: ${v.location || 'Sankarankovil'}\n- Service: ${v.service_required}\n- Property Type: ${v.property_type}\n- Budget Range: ${v.budget_range}\n- Details: ${v.message || 'Please contact me to discuss my project'}`;
  }

  sendDirectViaWhatsApp(): void {
    const clean = this.settings.whatsapp_number.replace(/[^0-9]/g, '');
    const text = this.generateWhatsappText();
    const url = `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const clean = this.settings.whatsapp_number.replace(/[^0-9]/g, '');
    this.lastGeneratedWhatsappUrl = `https://wa.me/${clean}?text=${encodeURIComponent(this.generateWhatsappText())}`;

    this.api.submitEnquiry(this.contactForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submittedSuccess = true;
      },
      error: () => {
        this.isSubmitting = false;
        this.submittedSuccess = true;
      }
    });
  }
}
