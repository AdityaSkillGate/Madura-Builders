import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { GalleryItem, YouTubeVideo, InstagramReel } from '../../models/models';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <!-- Header Banner -->
    <section class="page-banner">
      <div class="container">
        <span class="section-tag">{{ 'gallery.tag' | translate }}</span>
        <h1 class="page-title">{{ 'gallery.title' | translate }}</h1>
        <p class="page-subtitle">
          {{ 'gallery.subtitle' | translate }}
        </p>
      </div>
    </section>

    <!-- Main Gallery Section -->
    <section class="gallery-section">
      <div class="container">
        <!-- Segmented Tab Switcher (Photos vs Videos vs Reels) -->
        <div class="gallery-mode-switcher">
          <button
            class="mode-btn"
            [class.active]="activeTab === 'photos'"
            (click)="switchTab('photos')"
          >
            <svg class="mode-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <span>{{ 'gallery.photos_tab' | translate }} ({{ galleryItems.length }})</span>
          </button>

          <button
            class="mode-btn"
            [class.active]="activeTab === 'videos'"
            (click)="switchTab('videos')"
          >
            <svg class="mode-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 22c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 2c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
            </svg>
            <span>{{ 'gallery.videos_tab' | translate }} ({{ videos.length }})</span>
          </button>

          <button
            class="mode-btn"
            [class.active]="activeTab === 'reels'"
            (click)="switchTab('reels')"
          >
            <svg class="mode-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>{{ 'gallery.reels_tab' | translate }} ({{ reels.length }})</span>
          </button>
        </div>

        <!-- ============================================ -->
        <!-- VIEW 1: ARCHITECTURAL PHOTO ARCHIVES        -->
        <!-- ============================================ -->
        <div *ngIf="activeTab === 'photos'">
          <!-- Category Filter Tabs -->
          <div class="filter-tabs">
            <button
              *ngFor="let cat of photoCategories"
              (click)="selectPhotoCategory(cat)"
              class="tab-btn"
              [class.active]="activePhotoCategory === cat"
            >
              {{ getCategoryLabel(cat) }}
            </button>
          </div>

          <!-- Masonry Grid for Photos -->
          <div class="masonry-grid" *ngIf="filteredGallery.length > 0">
            <div
              class="masonry-item"
              *ngFor="let item of filteredGallery"
              (click)="openLightbox(item)"
            >
              <div class="item-img-wrap">
                <img [src]="item.image_url" [alt]="item.title" class="gallery-img" loading="lazy" />
                <div class="item-overlay">
                  <span class="overlay-cat">{{ item.category }}</span>
                  <h4 class="overlay-title">{{ item.title }}</h4>
                  <p class="overlay-caption" *ngIf="item.caption">{{ item.caption }}</p>
                  <span class="view-pill">&plus; {{ 'gallery.view_fullscreen' | translate }}</span>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="filteredGallery.length === 0" class="empty-state">
            <p>{{ 'gallery.no_photos' | translate }}</p>
          </div>
        </div>

        <!-- ============================================ -->
        <!-- VIEW 2: YOUTUBE VIDEO WALKTHROUGHS          -->
        <!-- ============================================ -->
        <div *ngIf="activeTab === 'videos'">
          <!-- Video Category Filter Tabs (only when videos exist) -->
          <div class="filter-tabs" *ngIf="videos.length > 0">
            <button
              *ngFor="let cat of videoCategories"
              (click)="selectVideoCategory(cat)"
              class="tab-btn"
              [class.active]="activeVideoCategory === cat"
            >
              {{ getVideoCategoryLabel(cat) }}
            </button>
          </div>

          <!-- Video Grid -->
          <div class="video-grid" *ngIf="filteredVideos.length > 0">
            <div
              class="video-card"
              *ngFor="let v of filteredVideos"
              (click)="openVideo(v)"
            >
              <div class="video-thumb-container">
                <img [src]="getVideoThumb(v)" [alt]="v.title" class="video-thumb" loading="lazy" />
                <div class="video-overlay">
                  <div class="play-btn-circle">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <span class="video-category-tag">{{ v.category }}</span>
                <span class="video-badge-hd">HD 1080p</span>
              </div>

              <div class="video-card-body">
                <h3 class="video-title">{{ v.title }}</h3>
                <p class="video-desc" *ngIf="v.description">{{ v.description }}</p>
                <div class="video-card-footer">
                  <span class="watch-text">&#9658; {{ 'gallery.play_video' | translate }}</span>
                  <a [href]="v.youtube_url" target="_blank" rel="noopener noreferrer" (click)="$event.stopPropagation()" class="yt-link-small">
                    YouTube &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div *ngIf="filteredVideos.length === 0 && videos.length > 0" class="empty-state">
            <p>{{ 'gallery.no_videos' | translate }}</p>
          </div>

          <!-- Authentic Empty State when no videos uploaded yet -->
          <div *ngIf="videos.length === 0" class="videos-empty-card">
            <div class="empty-yt-icon">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h3 class="empty-yt-title">{{ 'gallery.videos_empty_title' | translate }}</h3>
            <p class="empty-yt-desc">{{ 'gallery.videos_empty_desc' | translate }}</p>
            <div class="empty-yt-actions">
              <a [href]="youtubeChannelUrl" target="_blank" rel="noopener noreferrer" class="btn-yt-primary">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>{{ 'gallery.videos_channel_cta' | translate }}</span>
                <span class="arrow">&rarr;</span>
              </a>
              <button type="button" class="btn-switch-photos" (click)="switchTab('photos')">
                {{ 'gallery.videos_back_photos' | translate }}
              </button>
            </div>
          </div>
        </div>

        <!-- ============================================ -->
        <!-- VIEW 3: INSTAGRAM REELS                      -->
        <!-- ============================================ -->
        <div *ngIf="activeTab === 'reels'">
          <div class="reels-header-bar">
            <div>
              <span class="reels-subtag">{{ 'reels.tag' | translate }}</span>
              <h2 class="reels-main-title">{{ 'reels.title' | translate }}</h2>
              <p class="reels-desc">{{ 'reels.subtitle' | translate }}</p>
            </div>
            <a [href]="instagramProfileUrl" target="_blank" rel="noopener noreferrer" class="btn-insta-gradient">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>{{ 'reels.follow_btn' | translate }}</span>
            </a>
          </div>

          <div class="reels-gallery-grid">
            <div class="reel-card" *ngFor="let reel of reels" (click)="openReel(reel)">
              <div class="reel-media">
                <img [src]="reel.thumbnail_url" [alt]="reel.title" class="reel-thumb" loading="lazy" />
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
        </div>
      </div>
    </section>

    <!-- Photo Lightbox Modal -->
    <div class="lightbox-backdrop" *ngIf="activeLightboxItem" (click)="closeLightbox()">
      <div class="lightbox-dialog" (click)="$event.stopPropagation()">
        <button class="lightbox-close" (click)="closeLightbox()">&times;</button>
        <img [src]="activeLightboxItem.image_url" [alt]="activeLightboxItem.title" class="lightbox-img" />
        <div class="lightbox-meta">
          <span class="lightbox-cat">{{ activeLightboxItem.category }}</span>
          <h3>{{ activeLightboxItem.title }}</h3>
          <p *ngIf="activeLightboxItem.caption">{{ activeLightboxItem.caption }}</p>
        </div>
      </div>
    </div>

    <!-- YouTube Video Modal Player -->
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
        <div class="video-modal-details">
          <div class="v-modal-top">
            <span class="v-modal-cat">{{ activeVideo.category }}</span>
            <a [href]="activeVideo.youtube_url" target="_blank" rel="noopener noreferrer" class="v-modal-yt-btn">
              {{ 'gallery.watch_yt' | translate }} &rarr;
            </a>
          </div>
          <h3>{{ activeVideo.title }}</h3>
          <p *ngIf="activeVideo.description">{{ activeVideo.description }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-banner {
      padding: 140px 0 70px;
      background-color: var(--color-primary);
      color: #FFFFFF;
      border-bottom: 3px solid var(--color-secondary);
    }

    .page-title {
      font-size: clamp(2.2rem, 5vw, 3.75rem);
      color: #FFFFFF;
      margin-bottom: 16px;
    }

    .page-subtitle {
      font-size: 16px;
      color: #9aa8ad;
      max-width: 680px;
      line-height: 1.7;
    }

    /* Gallery Section */
    .gallery-section {
      padding: 60px 0 100px;
      background-color: #F5F5F2;
      min-height: 60vh;
    }

    /* Primary Segmented Switcher */
    .gallery-mode-switcher {
      display: inline-flex;
      background: #FFFFFF;
      padding: 6px;
      border-radius: 4px;
      border: 1px solid #E8E8E3;
      box-shadow: 0 4px 12px rgba(23, 45, 53, 0.04);
      margin-bottom: 36px;
      gap: 6px;
    }

    .mode-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      background: transparent;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      color: #64748B;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mode-btn:hover:not(.active) {
      color: #0B2B63;
      background: rgba(11, 43, 99, 0.06);
      transform: translateY(-2px);
    }

    .mode-btn.active {
      background: #0B2B63;
      color: #FFFFFF;
      box-shadow: 0 6px 20px rgba(11, 43, 99, 0.25);
    }

    .mode-btn.active .mode-icon {
      color: #EB5A1E;
    }

    /* Category Filter Tabs */
    .filter-tabs {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }

    .tab-btn {
      padding: 10px 22px;
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      border-radius: 8px;
      font-size: 13.5px;
      font-weight: 700;
      color: #0B2B63;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .tab-btn:hover:not(.active) {
      border-color: #EB5A1E;
      color: #EB5A1E;
      transform: translateY(-3px) scale(1.025);
      box-shadow: 0 8px 18px rgba(235, 90, 30, 0.2);
    }

    .tab-btn.active {
      background: #0B2B63;
      color: #FFFFFF;
      border-color: #0B2B63;
      box-shadow: 0 4px 14px rgba(11, 43, 99, 0.25);
    }

    /* Uniform Aligned Photo Gallery Grid */
    .masonry-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 26px;
    }

    .masonry-item {
      border-radius: 14px;
      overflow: hidden;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 16px rgba(11, 43, 99, 0.05);
      cursor: pointer;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .masonry-item:hover {
      transform: translateY(-8px) scale(1.015);
      box-shadow: 0 20px 42px -10px rgba(11, 43, 99, 0.18), 0 0 0 2px rgba(235, 90, 30, 0.45);
      border-color: rgba(235, 90, 30, 0.45);
    }

    .item-img-wrap {
      position: relative;
      width: 100%;
      height: 270px;
      overflow: hidden;
      background-color: #081325;
    }

    .gallery-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .masonry-item:hover .gallery-img {
      transform: scale(1.08);
    }

    .item-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 35%, rgba(11, 43, 99, 0.95) 100%);
      opacity: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 24px;
      color: #FFFFFF;
      backdrop-filter: blur(2px);
      transition: opacity 0.35s ease;
    }

    .masonry-item:hover .item-overlay {
      opacity: 1;
    }

    .overlay-cat {
      font-size: 10.5px;
      color: #EB5A1E;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 800;
      margin-bottom: 4px;
    }

    .overlay-title {
      font-size: 17px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 4px;
    }

    .overlay-caption {
      font-size: 12px;
      color: #CBD5E1;
      margin-bottom: 12px;
      line-height: 1.4;
    }

    .view-pill {
      align-self: flex-start;
      font-size: 11px;
      font-weight: 700;
      color: #EB5A1E;
      background: rgba(235, 90, 30, 0.15);
      border: 1px solid rgba(235, 90, 30, 0.4);
      padding: 5px 12px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .masonry-item:hover .view-pill {
      background: #EB5A1E;
      color: #FFFFFF;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(235, 90, 30, 0.4);
    }

    /* Video Grid */
    .video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 30px;
    }

    .video-card {
      background: #FFFFFF;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 18px rgba(11, 43, 99, 0.05);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .video-card:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 28px 56px -12px rgba(11, 43, 99, 0.2), 0 0 0 2px rgba(235, 90, 30, 0.4);
      border-color: #EB5A1E;
    }

    .video-thumb-container {
      position: relative;
      width: 100%;
      padding-top: 56.25%; /* 16:9 Aspect Ratio */
      background-color: #081325;
      overflow: hidden;
    }

    .video-thumb {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .video-card:hover .video-thumb {
      transform: scale(1.12);
    }

    .video-overlay {
      position: absolute;
      inset: 0;
      background: rgba(11, 43, 99, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease;
    }

    .video-card:hover .video-overlay {
      background: rgba(235, 90, 30, 0.2);
    }

    .play-btn-circle {
      width: 58px;
      height: 58px;
      background: #EB5A1E;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .video-card:hover .play-btn-circle {
      transform: scale(1.22);
      background: #EB5A1E;
      box-shadow: 0 0 28px rgba(235, 90, 30, 0.85);
    }

    .play-btn-circle svg {
      margin-left: 3px;
    }

    .video-category-tag {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(11, 43, 99, 0.9);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 4px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      backdrop-filter: blur(4px);
    }

    .video-badge-hd {
      position: absolute;
      bottom: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.75);
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 3px;
      letter-spacing: 0.5px;
    }

    .video-card-body {
      padding: 22px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .video-title {
      font-size: 17px;
      font-weight: 800;
      color: #0B2B63;
      line-height: 1.4;
      margin-bottom: 8px;
      transition: color 0.3s ease;
    }

    .video-card:hover .video-title {
      color: #EB5A1E;
    }

    .video-desc {
      font-size: 13px;
      color: #64748B;
      line-height: 1.6;
      margin-bottom: 16px;
      flex: 1;
    }

    .video-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #E2E8F0;
      padding-top: 14px;
    }

    .watch-text {
      font-size: 13px;
      font-weight: 700;
      color: #EB5A1E;
      letter-spacing: 0.5px;
    }

    .yt-link-small {
      font-size: 12.5px;
      font-weight: 700;
      color: #0B2B63;
      text-decoration: none;
      transition: all 0.25s ease;
    }

    .video-card:hover .yt-link-small {
      color: #EB5A1E;
      transform: translateX(4px);
    }

    .yt-link-small:hover {
      text-decoration: underline;
    }

    .empty-state {
      padding: 60px 20px;
      text-align: center;
      color: #718096;
      font-size: 15px;
    }

    /* Authentic Empty Video State (No Dummy Videos) */
    .videos-empty-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 20px;
      padding: 50px 30px;
      max-width: 660px;
      margin: 40px auto;
      text-align: center;
      box-shadow: 0 12px 35px -15px rgba(11, 43, 99, 0.12);
      border-top: 4px solid #EB5A1E;
    }

    .empty-yt-icon {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(255, 0, 0, 0.08);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .empty-yt-title {
      font-size: 22px;
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 12px;
    }

    .empty-yt-desc {
      font-size: 14.5px;
      color: #64748B;
      line-height: 1.7;
      max-width: 520px;
      margin: 0 auto 28px;
    }

    .empty-yt-actions {
      display: flex;
      gap: 14px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 22px;
    }

    .btn-yt-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #FF0000;
      color: #FFFFFF;
      padding: 12px 24px;
      border-radius: 99px;
      font-weight: 700;
      font-size: 14px;
      text-decoration: none;
      transition: all 0.25s ease;
      box-shadow: 0 8px 20px -6px rgba(255, 0, 0, 0.4);
    }

    .btn-yt-primary:hover {
      background: #CC0000;
      transform: translateY(-2px);
      box-shadow: 0 12px 28px -8px rgba(255, 0, 0, 0.55);
    }

    .btn-switch-photos {
      display: inline-flex;
      align-items: center;
      background: transparent;
      color: #0B2B63;
      border: 1.5px solid #0B2B63;
      padding: 12px 22px;
      border-radius: 99px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-switch-photos:hover {
      background: #0B2B63;
      color: #FFFFFF;
      transform: translateY(-2px);
    }

    .empty-yt-note {
      font-size: 12.5px;
      color: #94A3B8;
      margin: 0;
    }

    /* Lightbox Modal */
    .lightbox-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 31, 37, 0.95);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;
      backdrop-filter: blur(8px);
    }

    .lightbox-dialog {
      position: relative;
      max-width: 900px;
      width: 100%;
      text-align: center;
    }

    .lightbox-close {
      position: absolute;
      top: -44px;
      right: 0;
      background: none;
      border: none;
      color: #FFFFFF;
      font-size: 36px;
      line-height: 1;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity 0.2s;
    }

    .lightbox-close:hover {
      opacity: 1;
      color: #C49A58;
    }

    .lightbox-img {
      max-width: 100%;
      max-height: 75vh;
      object-fit: contain;
      border-radius: 2px;
      border: 1px solid rgba(196, 154, 88, 0.3);
    }

    .lightbox-meta {
      margin-top: 16px;
      text-align: center;
      color: #FFFFFF;
    }

    .lightbox-cat {
      font-size: 11px;
      color: #C49A58;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
    }

    .lightbox-meta h3 {
      font-size: 20px;
      color: #FFFFFF;
      margin: 4px 0;
    }

    .lightbox-meta p {
      font-size: 13px;
      color: #9aa8ad;
    }

    /* Video Player Modal */
    .video-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(10, 20, 24, 0.95);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      backdrop-filter: blur(10px);
    }

    .video-modal-dialog {
      position: relative;
      width: 100%;
      max-width: 960px;
      background: #172D35;
      border-radius: 4px;
      border: 1px solid rgba(196, 154, 88, 0.4);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
      overflow: hidden;
    }

    .video-modal-close {
      position: absolute;
      top: 12px;
      right: 14px;
      z-index: 10;
      background: rgba(0, 0, 0, 0.6);
      border: none;
      color: #FFFFFF;
      font-size: 28px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      cursor: pointer;
      transition: all 0.2s;
    }

    .video-modal-close:hover {
      background: #C49A58;
      color: #172D35;
    }

    .video-iframe-wrapper {
      position: relative;
      width: 100%;
      padding-top: 56.25%; /* 16:9 */
      background: #000;
    }

    .video-iframe-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    .video-modal-details {
      padding: 24px 28px;
      color: #FFFFFF;
    }

    .v-modal-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .v-modal-cat {
      font-size: 11px;
      color: #C49A58;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 700;
    }

    .v-modal-yt-btn {
      font-size: 12px;
      font-weight: 600;
      color: #ff5252;
      text-decoration: none;
    }

    .v-modal-yt-btn:hover {
      text-decoration: underline;
    }

    .video-modal-details h3 {
      font-size: 20px;
      color: #FFFFFF;
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .video-modal-details p {
      font-size: 13.5px;
      color: #9aa8ad;
      line-height: 1.6;
      margin: 0;
    }

    /* Instagram Reels Grid in Gallery */
    .reels-header-bar {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 32px;
      gap: 20px;
      flex-wrap: wrap;
    }

    .reels-subtag {
      display: inline-block;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #E1306C;
      background: rgba(225, 48, 108, 0.1);
      padding: 4px 10px;
      border-radius: 4px;
      margin-bottom: 8px;
    }

    .reels-main-title {
      font-size: 26px;
      font-weight: 800;
      color: #0B2B63;
      margin: 0 0 6px;
    }

    .reels-desc {
      font-size: 14px;
      color: #64748B;
      margin: 0;
    }

    .btn-insta-gradient {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 22px;
      background: linear-gradient(135deg, #E1306C 0%, #FD1D1D 50%, #F56040 100%);
      color: #FFFFFF;
      font-size: 13.5px;
      font-weight: 700;
      border-radius: 99px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(225, 48, 108, 0.3);
      transition: all 0.25s ease;
    }

    .btn-insta-gradient:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(225, 48, 108, 0.45);
    }

    .reels-gallery-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    .reel-card {
      width: 100%;
      aspect-ratio: 9 / 16;
      border-radius: 18px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      background: #081325;
      box-shadow: 0 10px 28px rgba(11, 43, 99, 0.1);
      border: 1px solid rgba(11, 43, 99, 0.08);
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .reel-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 24px 48px -10px rgba(11, 43, 99, 0.28), 0 0 0 2px #EB5A1E;
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
      padding: 3px 8px;
      border-radius: 99px;
    }

    .reel-tag-pill {
      font-size: 11px;
      font-weight: 800;
      color: #FFFFFF;
      background: rgba(235, 90, 30, 0.92);
      padding: 3px 10px;
      border-radius: 6px;
    }

    .reel-play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 56px;
      height: 56px;
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
      font-size: 11.5px;
      font-weight: 800;
      color: #E5A83B;
      white-space: nowrap;
      letter-spacing: 0.3px;
    }

    .reel-card:hover .reel-action-link {
      color: #FF7A3D;
      text-decoration: underline;
    }

    @media (max-width: 960px) {
      .reels-gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .masonry-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
      .item-img-wrap {
        height: 240px;
      }
      .video-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .masonry-grid {
        grid-template-columns: 1fr;
        gap: 18px;
      }
      .item-img-wrap {
        height: 220px;
      }
      .reels-gallery-grid {
        grid-template-columns: 1fr;
      }
      .gallery-mode-switcher {
        width: 100%;
        flex-direction: column;
      }
      .mode-btn {
        justify-content: center;
      }
    }
  `]
})
export class GalleryComponent implements OnInit {
  galleryItems: GalleryItem[] = [];
  filteredGallery: GalleryItem[] = [];
  videos: YouTubeVideo[] = [];
  filteredVideos: YouTubeVideo[] = [];
  reels: InstagramReel[] = [];

  activeTab: 'photos' | 'videos' | 'reels' = 'photos';

  photoCategories = [
    'All',
    'Elevation',
    'Architecture',
    'Interior',
    'Construction',
    'Exterior'
  ];
  activePhotoCategory = 'All';

  videoCategories = [
    'All',
    '3D Elevation Designs',
    'Completed Projects',
    'Construction Progress'
  ];
  activeVideoCategory = 'All';

  activeLightboxItem: GalleryItem | null = null;
  activeVideo: YouTubeVideo | null = null;
  safeVideoUrl: SafeResourceUrl | null = null;
  youtubeChannelUrl: string = 'https://www.youtube.com/@madhurabuilders';
  instagramProfileUrl: string = 'https://www.instagram.com/madhura.builders';

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public translation: TranslationService
  ) {}

  getCategoryLabel(cat: string): string {
    const key = 'gallery.cat_' + cat.toLowerCase();
    const t = this.translation.t(key);
    return t !== key ? t : cat;
  }

  getVideoCategoryLabel(cat: string): string {
    if (cat === 'All') return this.translation.t('gallery.cat_all');
    if (cat === '3D Elevation Designs') return this.translation.t('projects.elevations');
    if (cat === 'Completed Projects') return this.translation.t('projects.completed');
    if (cat === 'Construction Progress') return this.translation.isTamil() ? 'கட்டுமான முன்னேற்றம்' : 'Construction Progress';
    return cat;
  }

  ngOnInit(): void {
    // Check route query param ?tab=videos or ?tab=reels
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'videos') {
        this.activeTab = 'videos';
      } else if (params['tab'] === 'reels') {
        this.activeTab = 'reels';
      }
    });

    // Load settings for external links
    this.api.getSettings().subscribe(s => {
      if (s && s.youtube_url) {
        this.youtubeChannelUrl = s.youtube_url;
      }
      if (s && s.instagram_url) {
        this.instagramProfileUrl = s.instagram_url;
      }
    });

    // Load photo items
    this.api.getGallery().subscribe(items => {
      this.galleryItems = items;
      this.applyPhotoFilter();
    });

    // Load videos
    this.api.getVideos().subscribe(videos => {
      this.videos = videos;
      this.applyVideoFilter();
    });

    // Load reels
    this.api.getReels().subscribe(reels => {
      this.reels = reels;
    });
  }

  switchTab(tab: 'photos' | 'videos' | 'reels'): void {
    this.activeTab = tab;
  }

  openReel(reel: InstagramReel): void {
    if (typeof window !== 'undefined') {
      window.open(reel.reel_url, '_blank');
    }
  }

  selectPhotoCategory(cat: string): void {
    this.activePhotoCategory = cat;
    this.applyPhotoFilter();
  }

  applyPhotoFilter(): void {
    if (this.activePhotoCategory === 'All') {
      this.filteredGallery = this.galleryItems;
    } else {
      this.filteredGallery = this.galleryItems.filter(
        item => item.category.toLowerCase() === this.activePhotoCategory.toLowerCase()
      );
    }
  }

  selectVideoCategory(cat: string): void {
    this.activeVideoCategory = cat;
    this.applyVideoFilter();
  }

  applyVideoFilter(): void {
    if (this.activeVideoCategory === 'All') {
      this.filteredVideos = this.videos;
    } else {
      this.filteredVideos = this.videos.filter(
        v => v.category && v.category.toLowerCase() === this.activeVideoCategory.toLowerCase()
      );
    }
  }

  openLightbox(item: GalleryItem): void {
    this.activeLightboxItem = item;
  }

  closeLightbox(): void {
    this.activeLightboxItem = null;
  }

  openVideo(video: YouTubeVideo): void {
    this.activeVideo = video;
    const embedUrl = `https://www.youtube.com/embed/${video.video_id}?autoplay=1&rel=0`;
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
}
