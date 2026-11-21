import { Component, OnInit, AfterViewInit, OnDestroy, inject, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConstructionHeroComponent } from '../../components/construction-hero/construction-hero.component';
import { ApiService } from '../../services/api.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Project, Testimonial, Settings, YouTubeVideo, InstagramReel } from '../../models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ConstructionHeroComponent, TranslatePipe],
  template: `
    <!-- Construction Hero Section (Scroll Controlled) -->
    <app-construction-hero></app-construction-hero>

    <!-- SECTION C: INTRODUCTION -->
    <section class="intro-section" id="about">
      <div class="container intro-container">
        <div class="intro-header">
          <span class="section-tag">{{ 'intro.tag' | translate }}</span>
          <h2 class="section-title">{{ 'intro.title' | translate }}</h2>
          <p class="section-subtitle">
            {{ 'intro.desc' | translate }}
          </p>
        </div>

        <div class="intro-stats-grid">
          <div class="intro-stat-card">
            <span class="stat-number">{{ 'intro.stat1.num' | translate }}</span>
            <span class="stat-label">{{ 'intro.stat1.label' | translate }}</span>
            <p class="stat-desc">{{ 'intro.stat1.desc' | translate }}</p>
          </div>

          <div class="intro-stat-card">
            <span class="stat-number">{{ 'intro.stat2.num' | translate }}</span>
            <span class="stat-label">{{ 'intro.stat2.label' | translate }}</span>
            <p class="stat-desc">{{ 'intro.stat2.desc' | translate }}</p>
          </div>

          <div class="intro-stat-card">
            <span class="stat-number">{{ 'intro.stat3.num' | translate }}</span>
            <span class="stat-label">{{ 'intro.stat3.label' | translate }}</span>
            <p class="stat-desc">{{ 'intro.stat3.desc' | translate }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION D: SERVICES PREVIEW -->
    <section class="services-preview-section" id="services">
      <div class="container">
        <div class="section-top-row">
          <div>
            <span class="section-tag">{{ 'services.preview_tag' | translate }}</span>
            <h2 class="section-title">{{ 'services.preview_title' | translate }}</h2>
          </div>
          <a routerLink="/services" class="btn-outline-gold">{{ 'services.view_all' | translate }} &rarr;</a>
        </div>

        <div class="services-grid">
          <div class="service-card" *ngFor="let s of previewServices">
            <div class="service-img-wrapper">
              <img [src]="s.image" [alt]="s.titleKey | translate" class="service-img" />
              <span class="service-num">{{ s.num }}</span>
            </div>
            <div class="service-body">
              <h3 class="service-card-title">{{ s.titleKey | translate }}</h3>
              <p class="service-card-desc">{{ s.descKey | translate }}</p>
              <ul class="service-features">
                <li *ngFor="let featKey of s.featureKeys">&check; {{ featKey | translate }}</li>
              </ul>
              <a [routerLink]="['/services']" [fragment]="s.id" class="service-link">
                {{ 'services.learn_more' | translate }} &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION E: FEATURED PROJECTS -->
    <section class="featured-projects-section" id="projects">
      <div class="container">
        <div class="section-top-row">
          <div>
            <span class="section-tag">{{ 'projects.tag' | translate }}</span>
            <h2 class="section-title">{{ 'projects.title' | translate }}</h2>
          </div>
          <a routerLink="/projects" class="btn-outline-gold">{{ 'projects.view_full' | translate }} &rarr;</a>
        </div>

        <div class="projects-grid">
          <div class="project-card" *ngFor="let p of featuredProjects">
            <div class="project-img-wrapper">
              <img [src]="p.image_url" [alt]="p.title" class="project-img" />
              <span class="project-badge">{{ p.category }}</span>
              <span class="status-badge" [class.ongoing]="p.status === 'Ongoing'">{{ p.status }}</span>
            </div>
            <div class="project-body">
              <div class="project-loc">{{ p.location }}</div>
              <h3 class="project-title">{{ p.title }}</h3>
              <p class="project-desc">{{ p.description }}</p>
              <div class="project-meta">
                <span><strong>{{ 'projects.area' | translate }}:</strong> {{ p.area }}</span>
                <span><strong>{{ 'projects.year' | translate }}:</strong> {{ p.completion_year }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION G: AUTHENTIC DESIGN SHOWCASE (3D ELEVATION TO BUILT REALITY) -->
    <section class="showcase-section" id="gallery">
      <div class="container">
        <div class="showcase-inner">
          <div class="showcase-text">
            <span class="section-tag">{{ 'projects.before_after' | translate }}</span>
            <h2 class="section-title">{{ 'projects.built_reality' | translate }}</h2>
            <p class="section-desc">
              {{ 'intro.desc' | translate }}
            </p>
            <div class="showcase-points">
              <div class="point-item">
                <span class="point-icon">&check;</span>
                <div>
                  <strong>{{ 'services.s3.title' | translate }}</strong>
                  <p>{{ 'services.s3.desc' | translate }}</p>
                </div>
              </div>
              <div class="point-item">
                <span class="point-icon">&check;</span>
                <div>
                  <strong>{{ 'services.s2.title' | translate }}</strong>
                  <p>{{ 'services.s2.desc' | translate }}</p>
                </div>
              </div>
            </div>
            <a routerLink="/contact" class="btn-primary">{{ 'cta.btn_contact' | translate }}</a>
          </div>

          <div class="showcase-visuals">
            <div class="visual-card">
              <span class="visual-label">{{ 'projects.visualized_3d' | translate }}</span>
              <img src="/assets/images/projects/madhura-3d-elevation-matched.jpg" alt="Visualized in 3D - Sankarankovil Villa" />
            </div>
            <div class="visual-card">
              <span class="visual-label">{{ 'projects.built_reality' | translate }}</span>
              <img src="/assets/images/projects/madhura-real-villa-completed.jpg" alt="Perfected in Reality - Sankarankovil Villa" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION F: WHY CHOOSE US -->
    <section class="why-us-section">
      <div class="container">
        <div class="why-header text-center">
          <span class="section-tag">{{ 'why.tag' | translate }}</span>
          <h2 class="section-title">{{ 'why.title' | translate }}</h2>
        </div>

        <div class="why-grid">
          <div class="why-card">
            <div class="why-icon">01</div>
            <h3>{{ 'why.reason1.title' | translate }}</h3>
            <p>{{ 'why.reason1.desc' | translate }}</p>
          </div>

          <div class="why-card">
            <div class="why-icon">02</div>
            <h3>{{ 'why.reason2.title' | translate }}</h3>
            <p>{{ 'why.reason2.desc' | translate }}</p>
          </div>

          <div class="why-card">
            <div class="why-icon">03</div>
            <h3>{{ 'why.reason3.title' | translate }}</h3>
            <p>{{ 'why.reason3.desc' | translate }}</p>
          </div>

          <div class="why-card">
            <div class="why-icon">04</div>
            <h3>{{ 'why.reason4.title' | translate }}</h3>
            <p>{{ 'why.reason4.desc' | translate }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION: CINEMATIC VIDEO SHOWCASE -->
    <section class="video-showcase-section" *ngIf="featuredVideos.length > 0">
      <div class="container">
        <div class="section-top-row">
          <div>
            <span class="section-tag">{{ 'video.tag' | translate }}</span>
            <h2 class="section-title">{{ 'video.title' | translate }}</h2>
            <p class="section-subtitle">{{ 'video.subtitle' | translate }}</p>
          </div>
          <a routerLink="/gallery" [queryParams]="{ tab: 'videos' }" class="btn-outline-gold">
            {{ 'video.view_all' | translate }} &rarr;
          </a>
        </div>

        <div class="video-home-grid">
          <div class="video-home-card" *ngFor="let v of featuredVideos" (click)="openVideo(v)">
            <div class="video-thumb-wrap">
              <img [src]="getVideoThumb(v)" [alt]="v.title" class="v-thumb" />
              <div class="v-overlay">
                <div class="play-circle">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <span class="v-cat-pill">{{ v.category }}</span>
              <span class="v-hd-tag">1080p HD</span>
            </div>
            <div class="video-body">
              <h3 class="v-title">{{ v.title }}</h3>
              <p class="v-desc" *ngIf="v.description">{{ v.description }}</p>
              <div class="v-footer">
                <span class="v-action">&#9658; {{ 'video.play' | translate }}</span>
                <span class="v-source">YouTube</span>
              </div>
            </div>
          </div>
        </div>

        <!-- YouTube Channel Highlight Bar -->
        <div class="channel-banner" *ngIf="settings.youtube_url">
          <div class="channel-brand">
            <div class="yt-badge-icon">
              <svg viewBox="0 0 24 24" width="30" height="30" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div>
              <h4>{{ 'video.channel_title' | translate }}</h4>
              <p>{{ 'video.channel_desc' | translate }}</p>
            </div>
          </div>
          <a [href]="settings.youtube_url" target="_blank" rel="noopener noreferrer" class="btn-channel">
            {{ 'video.channel_btn' | translate }} &rarr;
          </a>
        </div>
      </div>
    </section>

    <!-- Video Lightbox Player Modal -->
    <div class="video-modal-backdrop" *ngIf="activeVideo" (click)="closeVideo()">
      <div class="video-modal-dialog" (click)="$event.stopPropagation()">
        <button class="video-modal-close" (click)="closeVideo()">&times;</button>
        <div class="video-iframe-wrapper">
          <iframe
            *ngIf="safeVideoUrl"
            [src]="safeVideoUrl"
            title="Madhura Builders Architectural Video"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>

    <!-- SECTION: INSTAGRAM REELS SHOWCASE -->
    <section class="reels-section" id="reels">
      <div class="container">
        <div class="reels-header-row">
          <div class="reels-header-text">
            <span class="section-tag">{{ 'reels.tag' | translate }}</span>
            <h2 class="section-title">{{ 'reels.title' | translate }}</h2>
            <p class="section-subtitle">{{ 'reels.subtitle' | translate }}</p>
          </div>
          <a [href]="settings.instagram_url || 'https://www.instagram.com/madhura.builders'" target="_blank" rel="noopener noreferrer" class="btn-insta-follow">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>{{ 'reels.follow_btn' | translate }}</span>
          </a>
        </div>

        <!-- Carousel Track with Arrow Controls -->
        <div class="reels-carousel-container">
          <button type="button" class="reel-nav-btn prev" (click)="scrollReels('left')" aria-label="Previous reels">
            &#10094;
          </button>

          <div class="reels-track" id="reels-track">
            <div class="reel-card" *ngFor="let reel of reels" (click)="openReel(reel)">
              <div class="reel-media">
                <img [src]="reel.thumbnail_url" [alt]="reel.title" class="reel-thumb" />
                <div class="reel-top-badges">
                  <span class="reel-handle">{{ reel.handle }}</span>
                  <span class="reel-tag-pill">{{ reel.tag }}</span>
                </div>
                <div class="reel-play-btn">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <div class="reel-bottom-bar">
                  <span class="reel-brand">{{ reel.brand_label || 'Madhura Builders' }}</span>
                  <span class="reel-action-link">{{ 'reels.watch_btn' | translate }} &nearr;</span>
                </div>
              </div>
            </div>
          </div>

          <button type="button" class="reel-nav-btn next" (click)="scrollReels('right')" aria-label="Next reels">
            &#10095;
          </button>
        </div>
      </div>
    </section>

    <!-- SECTION H: TESTIMONIALS -->
    <section class="testimonials-section">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-tag">{{ 'testimonials.tag' | translate }}</span>
          <h2 class="section-title">{{ 'testimonials.title' | translate }}</h2>
        </div>

        <div class="testimonials-grid">
          <div class="testimonial-card" *ngFor="let t of testimonials">
            <div class="rating-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p class="feedback-text">"{{ t.feedback }}"</p>
            <div class="client-meta">
              <strong>{{ t.client_name }}</strong>
              <span>{{ t.project_type }} • {{ t.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION I: CONTACT CTA -->
    <section class="cta-section">
      <div class="container cta-container">
        <div class="cta-content">
          <span class="cta-tag">{{ 'cta.tag' | translate }}</span>
          <h2 class="cta-title">{{ 'cta.title' | translate }}</h2>
          <p class="cta-desc">
            {{ 'cta.desc' | translate }}
          </p>
        </div>

        <div class="cta-buttons">
          <a [href]="'tel:' + settings.phone_primary" class="btn-primary">
            📞 {{ settings.phone_primary }}
          </a>
          <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
            💬 {{ 'cta.btn_whatsapp' | translate }}
          </a>
          <a routerLink="/contact" class="btn-secondary">
            {{ 'cta.btn_contact' | translate }}
          </a>
        </div>
      </div>
    </section>

    <!-- SECTION J: ARCHITECTURAL CONTACT & CONSULTATION EXPERIENCE -->
    <section class="contact-master-section" id="contact">
      <div class="container">
        <!-- Section Header with Shimmer & Hierarchy -->
        <div class="contact-header text-center">
          <span class="section-tag">{{ 'contact.find_us' | translate }}</span>
          <h2 class="section-title">{{ 'contact.visit_office' | translate }}</h2>
          <p class="section-subtitle mx-auto">
            {{ 'contact.subtitle' | translate }}
          </p>
        </div>

        <!-- 4 Luxury Quick-Contact Action Cards -->
        <div class="contact-cards-grid">
          <!-- Card 1: Direct Phone Call -->
          <div class="quick-contact-card">
            <div class="qc-icon-wrap phone-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z"/>
              </svg>
            </div>
            <div class="qc-body">
              <span class="qc-badge live-pulse">🟢 Active Calling Line</span>
              <h3 class="qc-title">Direct Calling Desk</h3>
              <p class="qc-val"><a [href]="'tel:' + settings.phone_primary">{{ settings.phone_primary }}</a></p>
              <p class="qc-subval"><a [href]="'tel:' + settings.phone_secondary">{{ settings.phone_secondary }}</a></p>
            </div>
            <a [href]="'tel:' + settings.phone_primary" class="qc-btn">
              <span>Call Now</span> &rarr;
            </a>
          </div>

          <!-- Card 2: Instant WhatsApp Chat -->
          <div class="quick-contact-card highlight-card">
            <div class="qc-icon-wrap wa-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
              </svg>
            </div>
            <div class="qc-body">
              <span class="qc-badge wa-pulse">⚡ Fast Architectural Reply</span>
              <h3 class="qc-title">WhatsApp Consultation</h3>
              <p class="qc-val">Instant 3D &amp; Cost Estimates</p>
              <p class="qc-subval">Direct architect chat on mobile</p>
            </div>
            <a [href]="whatsappUrl" target="_blank" rel="noopener noreferrer" class="qc-btn wa-action">
              <span>Chat on WhatsApp</span> &rarr;
            </a>
          </div>

          <!-- Card 3: Sankarankovil Office -->
          <div class="quick-contact-card">
            <div class="qc-icon-wrap loc-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="qc-body">
              <span class="qc-badge">📍 Tenkasi District</span>
              <h3 class="qc-title">Sankarankovil Studio</h3>
              <p class="qc-val">#9, Muppidathi Amman Complex</p>
              <p class="qc-subval">Near Geethalaya Theatre (Upstairs)</p>
            </div>
            <a [href]="settings.directions_url || settings.google_maps_url" target="_blank" rel="noopener noreferrer" class="qc-btn">
              <span>Get Directions</span> &rarr;
            </a>
          </div>

          <!-- Card 4: Working Hours -->
          <div class="quick-contact-card">
            <div class="qc-icon-wrap time-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
            </div>
            <div class="qc-body">
              <span class="qc-badge status-open">🟢 Open Today</span>
              <h3 class="qc-title">{{ 'contact.business_hours' | translate }}</h3>
              <p class="qc-val">{{ 'contact.hours_val' | translate }}</p>
              <p class="qc-subval">Sunday: By Appointment</p>
            </div>
            <button type="button" (click)="copyAddress()" class="qc-btn copy-btn">
              <span>{{ copiedAddress ? '✓ Copied Address' : 'Copy Full Address' }}</span>
            </button>
          </div>
        </div>

        <!-- Master Split Container: Left Compact Live Map Terminal, Right Studio Details & Form -->
        <div class="contact-master-grid">
          <!-- Left: Sleek Interactive Architectural Studio Map Terminal -->
          <div class="map-terminal-frame">
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
                <span>Muppidathi Amman Complex, Upstairs</span>
              </div>
              <div class="mt-buttons">
                <a [href]="settings.google_maps_url" target="_blank" rel="noopener noreferrer" class="mt-btn">
                  Open Google Maps &rarr;
                </a>
                <a [href]="settings.directions_url || settings.google_maps_url" target="_blank" rel="noopener noreferrer" class="mt-btn highlight">
                  Start Navigation &rarr;
                </a>
              </div>
            </div>
          </div>

          <!-- Right: Studio Details & Fast Consultation Form -->
          <div class="studio-card">
            <div class="studio-top">
              <div class="studio-brand">
                <img src="/assets/images/logo/madhura-emblem.png" alt="Madhura Builders" class="studio-emblem" />
                <div>
                  <h3 class="studio-heading">Madhura Builders &amp; Architects</h3>
                  <span class="studio-subheading">Registered Architectural &amp; Engineering Firm</span>
                </div>
              </div>
            </div>

            <!-- Complete Landmark Address Block -->
            <div class="studio-address-block">
              <div class="addr-icon-row">
                <span class="marker-dot"></span>
                <span class="addr-label">Official Registered Studio:</span>
              </div>
              <p class="addr-text">
                <strong>#9, Muppidathi Amman Complex, Upstairs,</strong><br />
                Opposite Hatsun Dairy, Near Geethalaya Theatre,<br />
                Sankarankovil, Tenkasi District, Tamil Nadu - 627756.
              </p>
              <div class="addr-actions">
                <a [href]="settings.directions_url || settings.google_maps_url" target="_blank" rel="noopener noreferrer" class="studio-btn primary">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>{{ 'contact.directions_btn' | translate }}</span>
                </a>
                <button type="button" (click)="copyAddress()" class="studio-btn secondary">
                  {{ copiedAddress ? '✓ Copied!' : 'Copy Address' }}
                </button>
              </div>
            </div>

            <!-- Quick WhatsApp Consultation Widget -->
            <div class="quick-inquiry-box">
              <div class="qib-header">
                <div class="qib-title-wrap">
                  <span class="qib-badge">Fast WhatsApp Consultation</span>
                  <h4 class="qib-title">Request Direct Estimate / 3D Elevation</h4>
                </div>
              </div>
              
              <div class="qib-inputs">
                <div class="qib-field">
                  <label for="qName">Your Name</label>
                  <input id="qName" type="text" [(ngModel)]="quickName" placeholder="Enter your full name" />
                </div>
                <div class="qib-field">
                  <label for="qPhone">Phone Number</label>
                  <input id="qPhone" type="tel" [(ngModel)]="quickPhone" placeholder="Mobile / WhatsApp number" />
                </div>
                <div class="qib-field">
                  <label for="qService">Required Service</label>
                  <select id="qService" [(ngModel)]="quickService">
                    <option value="Residential Construction">Residential Construction</option>
                    <option value="Architectural Planning & Vastu">Architectural Planning &amp; Vastu</option>
                    <option value="3D Elevation Design">3D Elevation Design</option>
                    <option value="Interior Designing">Interior Designing</option>
                    <option value="Structural Engineering">Structural Engineering</option>
                    <option value="Commercial Construction">Commercial Construction</option>
                  </select>
                </div>
              </div>

              <button type="button" (click)="sendQuickInquiry()" class="btn-quick-send">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z"/>
                </svg>
                <span>Send WhatsApp Consultation Request</span> &rarr;
              </button>
            </div>

            <!-- Social Media & Channels Footer -->
            <div class="studio-socials-row">
              <span class="social-tag">Connect With Us:</span>
              <div class="soc-items">
                <a [href]="settings.instagram_url || 'https://www.instagram.com/madhura.builders'" target="_blank" rel="noopener noreferrer" class="soc-btn ig" title="Instagram" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a [href]="settings.facebook_url || 'https://www.facebook.com/madhurabuilders'" target="_blank" rel="noopener noreferrer" class="soc-btn fb" title="Facebook" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a [href]="settings.youtube_url || 'https://www.youtube.com/@madhurabuilders'" target="_blank" rel="noopener noreferrer" class="soc-btn yt" title="YouTube" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .intro-section {
      padding: 90px 0 70px;
      background-color: #FFFFFF;
      border-bottom: 1px solid #E2E8F0;
    }

    .intro-header {
      max-width: 820px;
      margin-bottom: 50px;
    }

    .section-tag {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #EB5A1E;
      background: rgba(235, 90, 30, 0.1);
      padding: 4px 10px;
      border-radius: 4px;
      margin-bottom: 12px;
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 16px;
      line-height: 1.15;
    }

    .section-subtitle {
      font-size: 16px;
      color: #64748B;
      line-height: 1.7;
    }

    .intro-stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .intro-stat-card {
      padding: 32px 26px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-left: 4px solid #EB5A1E;
      border-radius: 12px;
      position: relative;
      overflow: hidden;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
    }

    .intro-stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #EB5A1E, #F59E0B);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .intro-stat-card:hover {
      transform: translateY(-10px) scale(1.025);
      background: #FFFFFF;
      box-shadow: 0 24px 48px -12px rgba(11, 43, 99, 0.16), 0 0 0 1px rgba(235, 90, 30, 0.3);
      border-color: rgba(235, 90, 30, 0.45);
      border-left-width: 6px;
      border-left-color: #EB5A1E;
    }

    .intro-stat-card:hover::before {
      transform: scaleX(1);
    }

    .intro-stat-card:hover .stat-number {
      color: #EB5A1E;
      transform: scale(1.12);
      text-shadow: 0 4px 14px rgba(235, 90, 30, 0.28);
    }

    .stat-number {
      font-size: 38px;
      font-weight: 900;
      background: linear-gradient(135deg, #0B2B63 0%, #EB5A1E 45%, #F59E0B 80%, #EB5A1E 100%);
      background-size: 250% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: kineticShimmerFlow 6s linear infinite, floatNumber 4s ease-in-out infinite;
      filter: drop-shadow(0 4px 12px rgba(235, 90, 30, 0.28));
      display: inline-block;
      margin-bottom: 6px;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .stat-label {
      font-size: 14.5px;
      font-weight: 700;
      color: #EB5A1E;
      display: block;
      margin-bottom: 8px;
    }

    .stat-desc {
      font-size: 13.5px;
      line-height: 1.6;
      color: #64748B;
    }

    /* Services Preview */
    .services-preview-section {
      padding: 90px 0;
      background-color: #F8FAFC;
    }

    .section-top-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 40px;
      flex-wrap: wrap;
      gap: 20px;
    }

    .btn-outline-gold {
      padding: 10px 20px;
      border: 2px solid #EB5A1E;
      color: #EB5A1E;
      font-weight: 700;
      font-size: 13px;
      border-radius: 6px;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .btn-outline-gold:hover {
      background-color: #EB5A1E;
      color: #FFFFFF;
      transform: translateY(-1px);
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }

    .service-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 18px rgba(11, 43, 99, 0.05);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .service-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #0B2B63, #EB5A1E);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .service-card:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 28px 56px -12px rgba(11, 43, 99, 0.2), 0 0 0 2px rgba(235, 90, 30, 0.35);
      border-color: rgba(235, 90, 30, 0.45);
    }

    .service-card:hover::after {
      opacity: 1;
    }

    .service-img-wrapper {
      position: relative;
      height: 220px;
      overflow: hidden;
    }

    .service-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .service-card:hover .service-img {
      transform: scale(1.12);
    }

    .service-num {
      position: absolute;
      top: 14px;
      left: 14px;
      background: #0B2B63;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 6px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .service-card:hover .service-num {
      background: #EB5A1E;
      transform: scale(1.15) rotate(-3deg);
    }

    .service-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .service-card-title {
      font-size: 18px;
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 10px;
      position: relative;
      display: inline-block;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #EB5A1E, #F59E0B);
        transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        border-radius: 2px;
      }
    }

    .service-card:hover .service-card-title {
      color: #EB5A1E;
      transform: translateX(4px);

      &::after {
        width: 100%;
      }
    }

    .service-card-desc {
      font-size: 13.5px;
      color: #64748B;
      line-height: 1.6;
      margin-bottom: 16px;
      flex: 1;
    }

    .service-features {
      list-style: none;
      padding: 0;
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .service-features li {
      font-size: 12.5px;
      color: #334155;
      font-weight: 600;
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .service-card:hover .service-features li {
      color: #0B2B63;
    }

    .service-link {
      font-size: 13.5px;
      font-weight: 700;
      color: #EB5A1E;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: transform 0.25s ease, color 0.25s ease;
    }

    .service-card:hover .service-link {
      transform: translateX(8px);
    }

    /* Projects */
    .featured-projects-section {
      padding: 90px 0;
      background-color: #FFFFFF;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
    }

    .project-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      overflow: hidden;
      box-shadow: 0 4px 18px rgba(11, 43, 99, 0.05);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
    }

    .project-card:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 28px 56px -12px rgba(11, 43, 99, 0.2), 0 0 0 2px rgba(235, 90, 30, 0.35);
      border-color: rgba(235, 90, 30, 0.45);
    }

    .project-img-wrapper {
      position: relative;
      height: 240px;
      overflow: hidden;
    }

    .project-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .project-card:hover .project-img {
      transform: scale(1.12);
    }

    .project-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background: #0B2B63;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
      transition: transform 0.3s ease;
    }

    .project-card:hover .project-badge {
      transform: translateY(-2px) scale(1.05);
    }

    .status-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #10B981;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
      transition: transform 0.3s ease;
    }

    .project-card:hover .status-badge {
      transform: translateY(-2px) scale(1.05);
    }

    .status-badge.ongoing {
      background: #EB5A1E;
    }

    .project-body {
      padding: 22px;
    }

    .project-loc {
      font-size: 11.5px;
      color: #64748B;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .project-title {
      font-size: 17px;
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 8px;
      position: relative;
      display: inline-block;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #EB5A1E, #F59E0B);
        transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        border-radius: 2px;
      }
    }

    .project-card:hover .project-title {
      color: #EB5A1E;
      transform: translateX(4px);

      &::after {
        width: 100%;
      }
    }

    .project-desc {
      font-size: 13px;
      color: #64748B;
      line-height: 1.6;
      margin-bottom: 14px;
    }

    .project-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #475569;
      border-top: 1px solid #F1F5F9;
      padding-top: 12px;
    }

    /* Showcase */
    .showcase-section {
      padding: 90px 0;
      background-color: #F8FAFC;
    }

    .showcase-inner {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 40px;
      align-items: center;
    }

    .showcase-points {
      margin: 24px 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .point-item {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      transition: transform 0.3s ease;
    }

    .point-item:hover {
      transform: translateX(6px);
    }

    .point-icon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #EB5A1E;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      flex-shrink: 0;
      margin-top: 2px;
      transition: transform 0.3s ease;
    }

    .point-item:hover .point-icon {
      transform: scale(1.15) rotate(10deg);
    }

    .showcase-visuals {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .visual-card {
      position: relative;
      border-radius: 14px;
      overflow: hidden;
      border: 1.5px solid #CBD5E1;
      box-shadow: 0 6px 20px rgba(11, 43, 99, 0.08);
      height: 340px;
      background: #FFFFFF;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .visual-card:hover {
      transform: translateY(-10px) scale(1.025);
      box-shadow: 0 24px 48px rgba(11, 43, 99, 0.2), 0 0 0 2px #EB5A1E;
      border-color: #EB5A1E;
    }

    .visual-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .visual-card:hover img {
      transform: scale(1.1);
    }

    .visual-label {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(11, 43, 99, 0.9);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 6px;
      backdrop-filter: blur(6px);
      transition: all 0.3s ease;
    }

    .visual-card:hover .visual-label {
      background: #EB5A1E;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(235, 90, 30, 0.4);
    }

    /* Why us */
    .why-us-section {
      padding: 90px 0;
      background-color: #FFFFFF;
    }

    .why-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-top: 40px;
    }

    .why-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 32px 24px;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .why-card:hover {
      transform: translateY(-10px) scale(1.03);
      background: #FFFFFF;
      border-color: #EB5A1E;
      box-shadow: 0 24px 48px -10px rgba(11, 43, 99, 0.16), 0 0 0 1.5px rgba(235, 90, 30, 0.35);
    }

    .why-icon {
      font-size: 26px;
      font-weight: 900;
      color: #EB5A1E;
      margin-bottom: 14px;
      display: inline-block;
      transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s;
    }

    .why-card:hover .why-icon {
      transform: scale(1.25) rotate(8deg);
      color: #EB5A1E;
      text-shadow: 0 4px 14px rgba(235, 90, 30, 0.35);
    }

    .why-card h3 {
      font-size: 16px;
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 8px;
      transition: color 0.3s ease;
    }

    .why-card:hover h3 {
      color: #EB5A1E;
    }

    .why-card p {
      font-size: 13px;
      color: #64748B;
      line-height: 1.6;
    }

    /* Videos */
    .video-showcase-section {
      padding: 90px 0;
      background-color: #081325;
      color: #FFFFFF;
    }

    .video-showcase-section .section-title {
      color: #FFFFFF;
    }

    .video-showcase-section .section-subtitle {
      color: #94A3B8;
    }

    .video-home-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .video-home-card {
      background: #0F1E36;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.12);
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .video-home-card:hover {
      transform: translateY(-10px) scale(1.025);
      border-color: #EB5A1E;
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5), 0 0 0 2px rgba(235, 90, 30, 0.6);
    }

    .video-thumb-wrap {
      position: relative;
      height: 180px;
      overflow: hidden;
    }

    .v-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .video-home-card:hover .v-thumb {
      transform: scale(1.12);
    }

    .v-overlay {
      position: absolute;
      inset: 0;
      background: rgba(8, 19, 37, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease;
    }

    .video-home-card:hover .v-overlay {
      background: rgba(235, 90, 30, 0.25);
    }

    .play-circle {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #EB5A1E;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    }

    .video-home-card:hover .play-circle {
      transform: scale(1.25);
      box-shadow: 0 0 24px rgba(235, 90, 30, 0.85);
    }

    .v-cat-pill {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #0B2B63;
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
    }

    .v-hd-tag {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 3px;
    }

    .video-body {
      padding: 16px;
    }

    .v-title {
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 6px;
      transition: color 0.3s ease;
    }

    .video-home-card:hover .v-title {
      color: #EB5A1E;
    }

    .v-desc {
      font-size: 12px;
      color: #94A3B8;
      line-height: 1.5;
      margin-bottom: 10px;
    }

    .v-footer {
      display: flex;
      justify-content: space-between;
      font-size: 11.5px;
      color: #EB5A1E;
      font-weight: 700;
    }

    .channel-banner {
      margin-top: 40px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 22px 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .channel-banner:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
      border-color: rgba(255, 0, 0, 0.5);
    }

    .channel-brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .channel-brand .yt-badge-icon {
      transition: transform 0.3s ease;
    }

    .channel-banner:hover .yt-badge-icon {
      transform: scale(1.15);
    }

    .btn-channel {
      padding: 10px 20px;
      background: #FF0000;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 13px;
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-channel:hover {
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 8px 24px rgba(255, 0, 0, 0.5);
    }

    /* Modal */
    .video-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .video-modal-dialog {
      width: 100%;
      max-width: 860px;
      background: #081325;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
    }

    .video-modal-close {
      position: absolute;
      top: 10px;
      right: 12px;
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 28px;
      cursor: pointer;
      z-index: 10;
    }

    .video-iframe-wrapper {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
    }

    .video-iframe-wrapper iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    /* Instagram Reels Showcase Section */
    .reels-section {
      padding: 90px 0 100px;
      background: linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%);
      position: relative;
      border-top: 1px solid #E2E8F0;
      border-bottom: 1px solid #E2E8F0;
    }

    .reels-header-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 36px;
      gap: 20px;
      flex-wrap: wrap;
    }

    .btn-insta-follow {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 11px 24px;
      background: linear-gradient(135deg, #E1306C 0%, #FD1D1D 50%, #F56040 100%);
      color: #FFFFFF;
      font-size: 13.5px;
      font-weight: 700;
      border-radius: 99px;
      text-decoration: none;
      box-shadow: 0 4px 16px rgba(225, 48, 108, 0.3);
      transition: all 0.3s ease;
    }

    .btn-insta-follow:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(225, 48, 108, 0.45);
    }

    .reels-carousel-container {
      position: relative;
      padding: 0 10px;
    }

    .reel-nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 1.5px solid #E2E8F0;
      box-shadow: 0 6px 20px rgba(11, 43, 99, 0.15);
      color: #0B2B63;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: all 0.25s ease;
    }

    .reel-nav-btn:hover {
      background: #EB5A1E;
      color: #FFFFFF;
      border-color: #EB5A1E;
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 8px 24px rgba(235, 90, 30, 0.35);
    }

    .reel-nav-btn.prev {
      left: -14px;
    }

    .reel-nav-btn.next {
      right: -14px;
    }

    .reels-track {
      display: flex;
      gap: 24px;
      overflow-x: auto;
      scroll-behavior: smooth;
      scrollbar-width: none;
      -ms-overflow-style: none;
      padding: 12px 6px 22px;
    }

    .reels-track::-webkit-scrollbar {
      display: none;
    }

    .reel-card {
      flex: 0 0 calc(25% - 18px);
      min-width: 250px;
      max-width: 300px;
      aspect-ratio: 9 / 16;
      border-radius: 20px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      background: #081325;
      box-shadow: 0 10px 30px rgba(11, 43, 99, 0.12);
      border: 1px solid rgba(11, 43, 99, 0.08);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .reel-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 24px 50px -10px rgba(11, 43, 99, 0.3), 0 0 0 2px #EB5A1E;
    }

    .reel-media {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .reel-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .reel-card:hover .reel-thumb {
      transform: scale(1.08);
    }

    /* Gradients over reel */
    .reel-media::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(8, 19, 37, 0.75) 0%, transparent 28%, transparent 60%, rgba(8, 19, 37, 0.92) 100%);
      z-index: 1;
      pointer-events: none;
    }

    .reel-top-badges {
      position: absolute;
      top: 14px;
      left: 14px;
      right: 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      align-items: flex-start;
      z-index: 2;
    }

    .reel-handle {
      font-size: 11px;
      font-weight: 700;
      color: #FFFFFF;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(6px);
      padding: 4px 10px;
      border-radius: 99px;
      letter-spacing: 0.3px;
    }

    .reel-tag-pill {
      font-size: 11px;
      font-weight: 800;
      color: #FFFFFF;
      background: rgba(235, 90, 30, 0.92);
      padding: 4px 10px;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    }

    .reel-play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: #E5A83B;
      color: #081325;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      z-index: 2;
      transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .reel-play-btn svg {
      margin-left: 3px;
    }

    .reel-card:hover .reel-play-btn {
      transform: translate(-50%, -50%) scale(1.18);
      background: #EB5A1E;
      color: #FFFFFF;
      box-shadow: 0 0 28px rgba(235, 90, 30, 0.85);
    }

    .reel-bottom-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      z-index: 2;
    }

    .reel-brand {
      font-size: 11.5px;
      font-weight: 700;
      color: #FFFFFF;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .reel-action-link {
      font-size: 12px;
      font-weight: 800;
      color: #E5A83B;
      white-space: nowrap;
      letter-spacing: 0.3px;
      transition: color 0.2s ease;
    }

    .reel-card:hover .reel-action-link {
      color: #FF7A3D;
      text-decoration: underline;
    }

    @media (max-width: 1100px) {
      .reel-card {
        flex: 0 0 calc(33.333% - 16px);
      }
    }

    @media (max-width: 800px) {
      .reel-card {
        flex: 0 0 calc(50% - 12px);
      }
    }

    @media (max-width: 500px) {
      .reel-card {
        flex: 0 0 82%;
      }
      .reel-nav-btn {
        display: none;
      }
    }

    /* Testimonials */
    .testimonials-section {
      padding: 90px 0;
      background-color: #FFFFFF;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-top: 36px;
    }

    .testimonial-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 14px;
      padding: 28px;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .testimonial-card:hover {
      transform: translateY(-8px) scale(1.02);
      background: #FFFFFF;
      box-shadow: 0 22px 45px rgba(11, 43, 99, 0.12), 0 0 0 1.5px rgba(235, 90, 30, 0.3);
      border-color: rgba(235, 90, 30, 0.45);
    }

    .rating-stars {
      color: #F59E0B;
      font-size: 16px;
      margin-bottom: 12px;
      display: inline-block;
      transition: transform 0.3s ease;
    }

    .testimonial-card:hover .rating-stars {
      transform: scale(1.12);
      text-shadow: 0 0 10px rgba(245, 158, 11, 0.5);
    }

    .feedback-text {
      font-size: 14px;
      color: #334155;
      line-height: 1.6;
      margin-bottom: 16px;
      font-style: italic;
    }

    .client-meta strong {
      display: block;
      color: #0B2B63;
      font-size: 14px;
    }

    .client-meta span {
      font-size: 12px;
      color: #64748B;
    }

    /* CTA */
    .cta-section {
      padding: 70px 0;
      background: linear-gradient(135deg, #0B2B63 0%, #153E8A 100%);
      color: #FFFFFF;
    }

    .cta-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 30px;
      flex-wrap: wrap;
    }

    .cta-content {
      max-width: 600px;
    }

    .cta-tag {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #F59E0B;
      display: block;
      margin-bottom: 8px;
    }

    .cta-title {
      font-size: 28px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 10px;
    }

    .cta-desc {
      font-size: 14.5px;
      color: #CBD5E1;
      line-height: 1.6;
    }

    .cta-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn-primary {
      padding: 12px 22px;
      background: #EB5A1E;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 13.5px;
      border-radius: 6px;
      text-decoration: none;
      transition: background 0.2s, transform 0.15s;
    }

    .btn-primary:hover {
      background: #D9480C;
      transform: translateY(-1px);
    }

    .btn-whatsapp {
      padding: 12px 22px;
      background: #25D366;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 13.5px;
      border-radius: 6px;
      text-decoration: none;
      transition: transform 0.15s;
    }

    .btn-whatsapp:hover {
      transform: translateY(-1px);
    }

    .btn-secondary {
      padding: 12px 22px;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #FFFFFF;
      font-weight: 700;
      font-size: 13.5px;
      border-radius: 6px;
      text-decoration: none;
    }

    /* ==========================================================================
       SECTION J: 2026 LUXURY ARCHITECTURAL CONTACT & CONSULTATION EXPERIENCE
       ========================================================================== */
    .contact-master-section {
      background: linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F1F5F9 100%);
      padding: clamp(3rem, 5vw, 4.5rem) 0;
      position: relative;
      border-top: 1px solid rgba(11, 43, 99, 0.08);
      border-bottom: 1px solid rgba(11, 43, 99, 0.08);
      overflow: hidden;
    }

    .contact-header {
      max-width: 760px;
      margin: 0 auto 2rem;
    }

    /* 4 Quick Contact Cards Grid */
    .contact-cards-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.2rem;
      margin-bottom: 2rem;
    }

    @media (max-width: 1080px) {
      .contact-cards-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .contact-cards-grid {
        grid-template-columns: 1fr;
      }
    }

    .quick-contact-card {
      background: #FFFFFF;
      border-radius: 20px;
      padding: 1.8rem 1.5rem;
      border: 1.5px solid #E2E8F0;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 30px -10px rgba(11, 43, 99, 0.06);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .quick-contact-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 24px 48px -12px rgba(11, 43, 99, 0.16);
      border-color: rgba(235, 90, 30, 0.4);
    }

    .quick-contact-card.highlight-card {
      border-color: rgba(37, 211, 102, 0.4);
      background: linear-gradient(180deg, #FFFFFF 0%, rgba(37, 211, 102, 0.04) 100%);
    }

    .quick-contact-card.highlight-card:hover {
      border-color: #25D366;
      box-shadow: 0 24px 48px -12px rgba(37, 211, 102, 0.22);
    }

    .qc-icon-wrap {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.2rem;
      transition: transform 0.3s ease;
    }

    .quick-contact-card:hover .qc-icon-wrap {
      transform: scale(1.1) rotate(4deg);
    }

    .qc-icon-wrap.phone-icon {
      background: rgba(11, 43, 99, 0.08);
      color: #0B2B63;
    }

    .qc-icon-wrap.wa-icon {
      background: rgba(37, 211, 102, 0.12);
      color: #128C7E;
    }

    .qc-icon-wrap.loc-icon {
      background: rgba(235, 90, 30, 0.1);
      color: #EB5A1E;
    }

    .qc-icon-wrap.time-icon {
      background: rgba(245, 158, 11, 0.12);
      color: #D97706;
    }

    .qc-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      color: #0B2B63;
      background: #F1F5F9;
      padding: 3px 8px;
      border-radius: 20px;
      margin-bottom: 0.6rem;
      width: fit-content;
      letter-spacing: 0.3px;
    }

    .qc-badge.live-pulse {
      color: #065F46;
      background: rgba(16, 185, 129, 0.12);
    }

    .qc-badge.wa-pulse {
      color: #065F46;
      background: rgba(37, 211, 102, 0.15);
    }

    .qc-badge.status-open {
      color: #065F46;
      background: rgba(16, 185, 129, 0.12);
    }

    .qc-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 0.5rem;
    }

    .qc-val {
      font-size: 0.95rem;
      font-weight: 700;
      color: #1E293B;
      margin-bottom: 0.2rem;
    }

    .qc-val a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s;
    }

    .qc-val a:hover {
      color: #EB5A1E;
    }

    .qc-subval {
      font-size: 0.85rem;
      color: #64748B;
      margin-bottom: 1.4rem;
    }

    .qc-subval a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s;
    }

    .qc-subval a:hover {
      color: #EB5A1E;
    }

    .qc-btn {
      margin-top: auto;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      padding: 0.75rem 1.2rem;
      border-radius: 12px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      font-size: 0.88rem;
      font-weight: 700;
      color: #0B2B63;
      text-decoration: none;
      transition: all 0.25s ease;
      cursor: pointer;
    }

    .qc-btn:hover {
      background: #0B2B63;
      color: #FFFFFF;
      border-color: #0B2B63;
      transform: translateY(-2px);
      box-shadow: 0 8px 18px rgba(11, 43, 99, 0.2);
    }

    .qc-btn.wa-action {
      background: #25D366;
      color: #FFFFFF;
      border-color: #25D366;
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
    }

    .qc-btn.wa-action:hover {
      background: #1EBE5D;
      border-color: #1EBE5D;
      box-shadow: 0 8px 22px rgba(37, 211, 102, 0.5);
    }

    .qc-btn.copy-btn {
      width: 100%;
      text-align: center;
      justify-content: center;
    }

    /* Master Split Grid (Map on Left, Studio on Right) */
    .contact-master-grid {
      display: grid;
      grid-template-columns: 1fr 1.08fr;
      gap: 1.5rem;
      align-items: stretch;
    }

    @media (max-width: 980px) {
      .contact-master-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Right: Studio Details & Fast Inquiry Card */
    .studio-card {
      background: #081325;
      border-radius: 20px;
      padding: 1.5rem 1.6rem;
      color: #FFFFFF;
      border: 1px solid rgba(235, 90, 30, 0.35);
      box-shadow: 0 20px 50px -18px rgba(8, 19, 37, 0.6);
      display: flex;
      flex-direction: column;
      position: relative;
      overflow: hidden;
      height: 100%;
    }

    .studio-card::before {
      content: '';
      position: absolute;
      top: -120px;
      right: -120px;
      width: 260px;
      height: 260px;
      background: radial-gradient(circle, rgba(235, 90, 30, 0.18) 0%, rgba(235, 90, 30, 0) 70%);
      pointer-events: none;
    }

    .studio-top {
      margin-bottom: 1.1rem;
    }

    .studio-brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .studio-emblem {
      width: 42px;
      height: 42px;
      object-fit: contain;
      filter: drop-shadow(0 2px 8px rgba(235, 90, 30, 0.35));
    }

    .studio-heading {
      font-size: 1.25rem;
      font-weight: 800;
      color: #FFFFFF;
      margin: 0;
      line-height: 1.2;
    }

    .studio-subheading {
      font-size: 0.8rem;
      color: #EB5A1E;
      font-weight: 600;
      letter-spacing: 0.4px;
    }

    .studio-address-block {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      padding: 1rem 1.1rem;
      margin-bottom: 1.1rem;
    }

    .addr-icon-row {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-bottom: 0.5rem;
    }

    .marker-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #EB5A1E;
      box-shadow: 0 0 8px #EB5A1E;
    }

    .addr-label {
      font-size: 0.78rem;
      font-weight: 700;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .addr-text {
      font-size: 0.88rem;
      line-height: 1.5;
      color: #E2E8F0;
      margin-bottom: 0.8rem;
    }

    .addr-text strong {
      color: #FFFFFF;
    }

    .addr-actions {
      display: flex;
      gap: 0.7rem;
      flex-wrap: wrap;
    }

    .studio-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.55rem 1rem;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .studio-btn.primary {
      background: #EB5A1E;
      color: #FFFFFF;
      border: 1px solid #EB5A1E;
    }

    .studio-btn.primary:hover {
      background: #FF6A28;
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(235, 90, 30, 0.45);
    }

    .studio-btn.secondary {
      background: rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .studio-btn.secondary:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    /* Quick WhatsApp Consultation Widget */
    .quick-inquiry-box {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(235, 90, 30, 0.25);
      border-radius: 14px;
      padding: 1.1rem 1.2rem;
      margin-bottom: 1.1rem;
    }

    .qib-header {
      margin-bottom: 0.75rem;
    }

    .qib-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 800;
      color: #25D366;
      letter-spacing: 0.7px;
      text-transform: uppercase;
      margin-bottom: 3px;
    }

    .qib-title {
      font-size: 1.05rem;
      font-weight: 800;
      color: #FFFFFF;
      margin: 0;
    }

    .qib-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.65rem;
      margin-bottom: 0.75rem;
    }

    @media (max-width: 600px) {
      .qib-inputs {
        grid-template-columns: 1fr;
      }
    }

    .qib-field:nth-child(3) {
      grid-column: 1 / -1;
    }

    .qib-field label {
      display: block;
      font-size: 0.74rem;
      font-weight: 700;
      color: #94A3B8;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .qib-field input, .qib-field select {
      width: 100%;
      padding: 0.55rem 0.75rem;
      background: rgba(8, 19, 37, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      color: #FFFFFF;
      font-size: 0.84rem;
      transition: all 0.25s ease;
      outline: none;
    }

    .qib-field input:focus, .qib-field select:focus {
      border-color: #EB5A1E;
      box-shadow: 0 0 0 3px rgba(235, 90, 30, 0.25);
      background: rgba(8, 19, 37, 1);
    }

    .btn-quick-send {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.1rem;
      background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
      color: #FFFFFF;
      border: none;
      border-radius: 10px;
      font-size: 0.86rem;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 6px 20px -4px rgba(37, 211, 102, 0.45);
      transition: all 0.25s ease;
    }

    .btn-quick-send:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px -3px rgba(37, 211, 102, 0.6);
      filter: brightness(1.06);
    }

    /* Socials row */
    .studio-socials-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
      margin-top: auto;
      padding-top: 0.8rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      flex-wrap: wrap;
    }

    .social-tag {
      font-size: 0.78rem;
      color: #94A3B8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .soc-items {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .soc-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      text-decoration: none;
      transition: all 0.25s ease;
    }

    .soc-btn.ig:hover {
      background: #E1306C;
      border-color: #E1306C;
      transform: translateY(-2px) scale(1.08);
      box-shadow: 0 6px 16px rgba(225, 48, 108, 0.4);
    }

    .soc-btn.fb:hover {
      background: #1877F2;
      border-color: #1877F2;
      transform: translateY(-2px) scale(1.08);
      box-shadow: 0 6px 16px rgba(24, 119, 242, 0.4);
    }

    .soc-btn.yt:hover {
      background: #FF0000;
      border-color: #FF0000;
      transform: translateY(-2px) scale(1.08);
      box-shadow: 0 6px 16px rgba(255, 0, 0, 0.4);
    }

    /* Left: Compact Sleek Architectural Studio Map Terminal */
    .map-terminal-frame {
      background: #081325;
      border-radius: 20px;
      border: 1.5px solid rgba(235, 90, 30, 0.35);
      box-shadow: 0 20px 50px -18px rgba(11, 43, 99, 0.3);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
      min-height: 480px;
    }

    .map-terminal-top {
      background: #0B2B63;
      padding: 0.7rem 1.1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
      border-bottom: 1.5px solid rgba(235, 90, 30, 0.3);
      flex-wrap: wrap;
    }

    .terminal-dots {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .t-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
    }

    .t-dot.red { background: #EF4444; }
    .t-dot.yellow { background: #F59E0B; }
    .t-dot.green { background: #10B981; }

    .terminal-title {
      font-size: 0.78rem;
      font-weight: 800;
      letter-spacing: 0.6px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .terminal-coord {
      font-family: monospace;
      font-size: 0.72rem;
      color: #EB5A1E;
      background: rgba(235, 90, 30, 0.15);
      padding: 2px 7px;
      border-radius: 5px;
      border: 1px solid rgba(235, 90, 30, 0.3);
    }

    .map-embed-container {
      flex: 1;
      min-height: 260px;
      position: relative;
    }

    .map-embed-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .map-terminal-bottom {
      background: #081325;
      padding: 0.8rem 1.1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      flex-wrap: wrap;
    }

    .mt-info strong {
      display: block;
      color: #FFFFFF;
      font-size: 0.85rem;
    }

    .mt-info span {
      font-size: 0.75rem;
      color: #94A3B8;
    }

    .mt-buttons {
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
    }

    .mt-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 0.5rem 0.85rem;
      border-radius: 8px;
      font-size: 0.78rem;
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

    @media (max-width: 1024px) {
      .services-grid,
      .projects-grid,
      .why-grid,
      .video-home-grid,
      .testimonials-grid {
        grid-template-columns: 1fr;
      }
      .showcase-inner {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .intro-stats-grid,
      .services-grid,
      .projects-grid,
      .why-grid,
      .video-home-grid,
      .testimonials-grid,
      .showcase-visuals {
        grid-template-columns: 1fr;
      }
    }

    /* Kinetic Scroll-Reveal Transitions for Smooth Architectural Entrance */
    :host.anim-active .intro-header,
    :host.anim-active .section-top-row,
    :host.anim-active .contact-header,
    :host.anim-active .intro-stat-card,
    :host.anim-active .service-card,
    :host.anim-active .project-card,
    :host.anim-active .quick-contact-card,
    :host.anim-active .studio-card,
    :host.anim-active .live-map-card,
    :host.anim-active .why-card,
    :host.anim-active .testimonial-card {
      opacity: 0;
      transform: translateY(26px);
      transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }

    :host.anim-active .intro-header.is-in-view,
    :host.anim-active .section-top-row.is-in-view,
    :host.anim-active .contact-header.is-in-view,
    :host.anim-active .intro-stat-card.is-in-view,
    :host.anim-active .service-card.is-in-view,
    :host.anim-active .project-card.is-in-view,
    :host.anim-active .quick-contact-card.is-in-view,
    :host.anim-active .studio-card.is-in-view,
    :host.anim-active .live-map-card.is-in-view,
    :host.anim-active .why-card.is-in-view,
    :host.anim-active .testimonial-card.is-in-view {
      opacity: 1;
      transform: translateY(0);
    }

    .intro-stats-grid .intro-stat-card:nth-child(1) { transition-delay: 0.08s; }
    .intro-stats-grid .intro-stat-card:nth-child(2) { transition-delay: 0.18s; }
    .intro-stats-grid .intro-stat-card:nth-child(3) { transition-delay: 0.28s; }

    .services-grid .service-card:nth-child(1) { transition-delay: 0.08s; }
    .services-grid .service-card:nth-child(2) { transition-delay: 0.18s; }
    .services-grid .service-card:nth-child(3) { transition-delay: 0.28s; }

    .contact-cards-grid .quick-contact-card:nth-child(1) { transition-delay: 0.06s; }
    .contact-cards-grid .quick-contact-card:nth-child(2) { transition-delay: 0.14s; }
    .contact-cards-grid .quick-contact-card:nth-child(3) { transition-delay: 0.22s; }
    .contact-cards-grid .quick-contact-card:nth-child(4) { transition-delay: 0.30s; }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  translationService = inject(TranslationService);
  private api = inject(ApiService);
  private sanitizer = inject(DomSanitizer);

  featuredProjects: Project[] = [];
  featuredVideos: YouTubeVideo[] = [];
  reels: InstagramReel[] = [];
  testimonials: Testimonial[] = [];
  activeVideo: YouTubeVideo | null = null;
  safeVideoUrl: SafeResourceUrl | null = null;

  settings: Settings = {
    company_name: 'Madhura Builders & Architects',
    tagline: 'Building Dreams Into Reality',
    address: '#9, Muppidathi Amman Complex, Upstairs, Near Geethalaya Theatre, Sankarankovil',
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

  previewServices = [
    {
      id: 'architectural-planning',
      num: '01',
      titleKey: 'services.s1.title',
      descKey: 'services.s1.desc',
      image: '/assets/images/architecture/architectural-planning-01.jpg',
      featureKeys: ['services.s1.feat1', 'services.s1.feat2', 'services.s1.feat3']
    },
    {
      id: 'residential-construction',
      num: '02',
      titleKey: 'services.s2.title',
      descKey: 'services.s2.desc',
      image: '/assets/images/construction/construction-site-01.jpg',
      featureKeys: ['services.s2.feat1', 'services.s2.feat2', 'services.s2.feat3']
    },
    {
      id: 'elevation-design',
      num: '03',
      titleKey: 'services.s3.title',
      descKey: 'services.s3.desc',
      image: '/assets/images/architecture/3d-elevation-showcase-01.jpg',
      featureKeys: ['services.s3.feat1', 'services.s3.feat2', 'services.s3.feat3']
    }
  ];

  get whatsappUrl(): string {
    const isTa = this.translationService.currentLang() === 'ta';
    const clean = this.settings.whatsapp_number.replace(/[^0-9]/g, '');
    const msg = isTa
      ? 'வணக்கம் Madhura Builders & Architects,\n\nநான் உங்கள் கட்டிடக்கலை மற்றும் கட்டுமான சேவைகளில் ஆர்வமாக உள்ளேன்.\n\nகூடுதல் விவரங்களுடன் என்னை தொடர்பு கொள்ளவும்.'
      : 'Hello Madhura Builders & Architects,\n\nI am interested in your construction and architectural services.\n\nPlease contact me with more details.';
    return `https://wa.me/${clean}?text=${encodeURIComponent(msg)}`;
  }

  quickName = '';
  quickPhone = '';
  quickService = 'Residential Construction';
  copiedAddress = false;

  copyAddress(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.settings.address);
      this.copiedAddress = true;
      setTimeout(() => {
        this.copiedAddress = false;
      }, 2500);
    }
  }

  sendQuickInquiry(): void {
    const clean = this.settings.whatsapp_number.replace(/[^0-9]/g, '');
    const nameStr = this.quickName.trim() || 'Prospective Client';
    const phoneStr = this.quickPhone.trim() ? `\nPhone: ${this.quickPhone.trim()}` : '';
    const msg = `Hello Madhura Builders & Architects,\n\nI would like to request an architectural & construction consultation.\n\nClient Name: ${nameStr}${phoneStr}\nSelected Service: ${this.quickService}\nLocation: Sankarankovil / Tenkasi District\n\nPlease share estimation details and availability for a site meeting.`;
    const url = `https://wa.me/${clean}?text=${encodeURIComponent(msg)}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  }

  scrollReels(direction: 'left' | 'right'): void {
    const el = document.getElementById('reels-track');
    if (el) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  openReel(reel: InstagramReel): void {
    if (typeof window !== 'undefined') {
      window.open(reel.reel_url, '_blank');
    }
  }

  ngOnInit(): void {
    this.api.getProjects().subscribe(p => {
      this.featuredProjects = p.slice(0, 3);
    });
    this.api.getVideos().subscribe(v => {
      this.featuredVideos = v.slice(0, 3);
    });
    this.api.getReels().subscribe(r => {
      this.reels = r;
    });
    this.api.getTestimonials().subscribe(t => {
      this.testimonials = t;
    });
    this.api.getSettings().subscribe(s => {
      if (s) this.settings = s;
    });
  }

  openVideo(v: YouTubeVideo): void {
    this.activeVideo = v;
    const embedUrl = `https://www.youtube.com/embed/${v.video_id}?autoplay=1&rel=0`;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  closeVideo(): void {
    this.activeVideo = null;
    this.safeVideoUrl = null;
  }

  getVideoThumb(v: YouTubeVideo): string {
    if (v.video_id) {
      return `https://img.youtube.com/vi/${v.video_id}/hqdefault.jpg`;
    }
    return '/assets/images/architecture/3d-elevation-showcase-01.jpg';
  }

  private elRef = inject(ElementRef);
  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const host = this.elRef.nativeElement as HTMLElement;
    host.classList.add('anim-active');

    const elements = host.querySelectorAll(
      '.intro-header, .section-top-row, .contact-header, .intro-stat-card, .service-card, .project-card, .quick-contact-card, .studio-card, .live-map-card, .why-card, .testimonial-card'
    );

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in-view');
          this.observer?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
