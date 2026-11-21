import { Component, HostListener, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Settings } from '../../models/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <header class="site-header" [class.scrolled]="isScrolled" [class.lang-ta]="translationService.currentLang() === 'ta'">
      <div class="header-inner">
        <!-- Logo with Large, Bold Brand Typography -->
        <a routerLink="/" class="brand-link" title="Madhura Builders & Architects" aria-label="Madhura Builders & Architects Homepage">
          <div class="brand-identity">
            <img src="/assets/images/logo/madhura-emblem.png" alt="Madhura Builders & Architects Emblem" class="brand-emblem-img" />
            <div class="brand-typography">
              <span class="brand-main">MADHURA</span>
              <span class="brand-sub">BUILDERS &amp; ARCHITECTS</span>
            </div>
          </div>
        </a>

        <!-- Desktop Navigation with Synchronized Section & Route Navigation -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          <a routerLink="/" 
             (click)="onNavClick('home', $event)" 
             [class.active]="isSectionActive('home')" 
             class="nav-item">
            {{ 'nav.home' | translate }}
          </a>
          <a routerLink="/about" 
             (click)="onNavClick('about', $event)" 
             [class.active]="isSectionActive('about')" 
             class="nav-item">
            {{ 'nav.about' | translate }}
          </a>
          <a routerLink="/services" 
             (click)="onNavClick('services', $event)" 
             [class.active]="isSectionActive('services')" 
             class="nav-item">
            {{ 'nav.services' | translate }}
          </a>
          <a routerLink="/projects" 
             (click)="onNavClick('projects', $event)" 
             [class.active]="isSectionActive('projects')" 
             class="nav-item">
            {{ 'nav.projects' | translate }}
          </a>
          <a routerLink="/gallery" 
             (click)="onNavClick('gallery', $event)" 
             [class.active]="isSectionActive('gallery')" 
             class="nav-item">
            {{ 'nav.gallery' | translate }}
          </a>
          <a routerLink="/" 
             [fragment]="'reels'"
             (click)="onNavClick('reels', $event)" 
             [class.active]="isSectionActive('reels')" 
             class="nav-item">
            {{ 'nav.reels' | translate }}
          </a>
          <a routerLink="/contact" 
             (click)="onNavClick('contact', $event)" 
             [class.active]="isSectionActive('contact')" 
             class="nav-item">
            {{ 'nav.contact' | translate }}
          </a>
        </nav>

        <!-- Header Actions: Clean Bilingual Switcher (EN | TA) + Primary 'Get a Quote' CTA -->
        <div class="header-actions">
          <!-- Bilingual Language Switcher (EN | TA) -->
          <div class="lang-switcher-pill" role="group" aria-label="Language selection">
            <button 
              type="button" 
              class="lang-pill-btn" 
              [class.active]="translationService.currentLang() === 'en'"
              (click)="translationService.setLanguage('en')"
              title="Switch to English (EN)"
            >
              EN
            </button>
            <span class="lang-divider">|</span>
            <button 
              type="button" 
              class="lang-pill-btn" 
              [class.active]="translationService.currentLang() === 'ta'"
              (click)="translationService.setLanguage('ta')"
              title="Switch to Tamil (TA)"
            >
              TA
            </button>
          </div>

          <a (click)="onNavClick('contact', $event)" class="btn-quote" style="cursor: pointer;" title="Get a Quote">
            {{ 'nav.get_quote' | translate }}
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button class="mobile-toggle" (click)="toggleMobileMenu()" aria-label="Toggle mobile menu" [attr.aria-expanded]="mobileMenuOpen">
            <span class="bar" [class.open]="mobileMenuOpen"></span>
            <span class="bar" [class.open]="mobileMenuOpen"></span>
            <span class="bar" [class.open]="mobileMenuOpen"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" [class.open]="mobileMenuOpen">
        <div class="mobile-drawer-brand">
          <div class="brand-identity">
            <img src="/assets/images/logo/madhura-emblem.png" alt="Madhura Builders & Architects" class="brand-emblem-img" />
            <div class="brand-typography">
              <span class="brand-main">MADHURA</span>
              <span class="brand-sub">BUILDERS &amp; ARCHITECTS</span>
            </div>
          </div>
        </div>

        <!-- Language Switcher in Mobile Drawer -->
        <div class="mobile-lang-row">
          <span class="mobile-lang-label">Language / மொழி:</span>
          <div class="lang-switcher-pill">
            <button 
              type="button" 
              class="lang-pill-btn" 
              [class.active]="translationService.currentLang() === 'en'"
              (click)="translationService.setLanguage('en')"
            >
              EN
            </button>
            <span class="lang-divider">|</span>
            <button 
              type="button" 
              class="lang-pill-btn" 
              [class.active]="translationService.currentLang() === 'ta'"
              (click)="translationService.setLanguage('ta')"
              title="Switch to Tamil (TA)"
            >
              TA
            </button>
          </div>
        </div>

        <nav class="mobile-nav">
          <a routerLink="/" (click)="onNavClick('home', $event)" [class.active]="isSectionActive('home')" class="mobile-item">{{ 'nav.home' | translate }}</a>
          <a routerLink="/about" (click)="onNavClick('about', $event)" [class.active]="isSectionActive('about')" class="mobile-item">{{ 'nav.about' | translate }}</a>
          <a routerLink="/services" (click)="onNavClick('services', $event)" [class.active]="isSectionActive('services')" class="mobile-item">{{ 'nav.services' | translate }}</a>
          <a routerLink="/projects" (click)="onNavClick('projects', $event)" [class.active]="isSectionActive('projects')" class="mobile-item">{{ 'nav.projects' | translate }}</a>
          <a routerLink="/gallery" (click)="onNavClick('gallery', $event)" [class.active]="isSectionActive('gallery')" class="mobile-item">{{ 'nav.gallery' | translate }}</a>
          <a routerLink="/" [fragment]="'reels'" (click)="onNavClick('reels', $event)" [class.active]="isSectionActive('reels')" class="mobile-item">{{ 'nav.reels' | translate }}</a>
          <a routerLink="/contact" (click)="onNavClick('contact', $event)" [class.active]="isSectionActive('contact')" class="mobile-item">{{ 'nav.contact' | translate }}</a>
        </nav>

        <div class="mobile-footer">
          <div class="mobile-social-bar">
            <span class="mobile-social-label">Follow Us:</span>
            <div class="drawer-social-links">
              <a [href]="settings.instagram_url || 'https://www.instagram.com/madhura.builders'"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="drawer-social-icon ig"
                 title="Instagram"
                 aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a [href]="settings.facebook_url || 'https://www.facebook.com/madhurabuilders'"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="drawer-social-icon fb"
                 title="Facebook"
                 aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a [href]="settings.youtube_url || 'https://www.youtube.com/@madhurabuilders'"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="drawer-social-icon yt"
                 title="YouTube"
                 aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
          <a [href]="'tel:' + settings.phone_primary" class="mobile-phone-btn">
            📞 {{ settings.phone_primary }}
          </a>
          <p class="mobile-address">{{ settings.address }}</p>
        </div>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      z-index: 999999 !important;
    }

    .site-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999999 !important;
      pointer-events: auto !important;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1.5px solid rgba(11, 43, 99, 0.08);
      transition: all 0.25s ease;
      padding: 8px 0;
    }

    .site-header.scrolled {
      padding: 6px 0;
      background: rgba(255, 255, 255, 0.98) !important;
      box-shadow: 0 4px 22px rgba(11, 43, 99, 0.12);
      border-bottom-color: #EB5A1E;
    }

    .header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1680px;
      margin: 0 auto;
      padding: 0 clamp(16px, 2.5vw, 36px);
      gap: clamp(8px, 1.2vw, 20px);
      box-sizing: border-box;
    }

    /* Brand Logo & Typography */
    .brand-link {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      flex-shrink: 0;
      transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
      cursor: pointer;
    }

    .brand-link:hover {
      transform: scale(1.03) translateY(-1px);
    }

    .brand-identity {
      display: flex;
      align-items: center;
      gap: 12px;
      user-select: none;
    }

    .brand-emblem-img {
      width: 42px;
      height: 42px;
      object-fit: contain;
      flex-shrink: 0;
      filter: drop-shadow(0 2px 6px rgba(11, 43, 99, 0.15));
      transition: transform 0.3s ease;
    }

    .brand-link:hover .brand-emblem-img {
      transform: rotate(5deg) scale(1.06);
    }

    .brand-typography {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1;
    }

    .brand-main {
      font-family: 'Montserrat', var(--font-heading), system-ui, sans-serif;
      font-size: 24px;
      font-weight: 900;
      background: linear-gradient(135deg, #EB5A1E 0%, #FF7A3D 50%, #EB5A1E 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: kineticShimmerFlow 5s linear infinite;
      letter-spacing: 0.8px;
      line-height: 1.05;
      margin: 0;
      padding: 0;
      text-transform: uppercase;
      transition: letter-spacing 0.3s ease;
    }

    .brand-link:hover .brand-main {
      letter-spacing: 1.4px;
    }

    .brand-sub {
      font-family: 'Montserrat', var(--font-heading), system-ui, sans-serif;
      font-size: 13.5px;
      font-weight: 800;
      color: #0B2B63;
      letter-spacing: 2.2px;
      line-height: 1;
      margin-top: 4px;
      padding: 0;
      text-transform: uppercase;
      display: block;
    }

    .mobile-drawer-brand {
      padding: 6px 0 16px;
      border-bottom: 1px solid #E2E8F0;
      margin-bottom: 14px;
      display: flex;
      justify-content: center;
    }

    /* Desktop Nav with Refined Architectural Interactive Hover */
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: clamp(4px, 0.75vw, 14px);
      flex-shrink: 1;
      white-space: nowrap;
      pointer-events: auto !important;
    }

    .nav-item {
      font-size: clamp(12px, 0.88vw, 14.5px);
      font-weight: 600;
      color: #0B2B63;
      letter-spacing: 0.2px;
      position: relative;
      padding: 6px clamp(6px, 0.75vw, 12px);
      border-radius: 8px;
      transition: color 0.2s ease, background-color 0.2s ease;
      white-space: nowrap;
      cursor: pointer !important;
      pointer-events: auto !important;
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      user-select: none;
    }

    .nav-item::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 12px;
      right: 12px;
      height: 2.5px;
      background-color: #EB5A1E;
      border-radius: 3px 3px 0 0;
      opacity: 0;
      transform: scaleX(0);
      transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
      transform-origin: center;
    }

    /* Subtle, elegant hover state for inactive nav items - NO jarring jumping, NO heavy orange pill */
    .nav-item:hover:not(.active) {
      color: #EB5A1E;
      background-color: rgba(235, 90, 30, 0.06);
    }

    .nav-item:hover:not(.active)::after {
      opacity: 0.45;
      transform: scaleX(0.6);
    }

    /* Distinct, authoritative Active State for the current page */
    .nav-item.active {
      color: #EB5A1E !important;
      font-weight: 700;
      background-color: rgba(235, 90, 30, 0.1) !important;
    }

    .nav-item.active::after {
      opacity: 1 !important;
      transform: scaleX(1) !important;
      box-shadow: 0 1px 4px rgba(235, 90, 30, 0.4);
    }

    .nav-item.active:hover {
      background-color: rgba(235, 90, 30, 0.15) !important;
    }

    /* Actions Area (Language + Quote) - CRITICAL: flex-shrink 0 prevents cutting off right-side elements */
    .header-actions {
      display: flex;
      align-items: center;
      gap: clamp(8px, 1vw, 16px);
      flex-shrink: 0;
    }

    /* Bilingual Language Switcher Pill (EN | TA) */
    .lang-switcher-pill {
      display: inline-flex;
      align-items: center;
      background-color: #F1F5F9;
      border: 1.5px solid rgba(11, 43, 99, 0.15);
      border-radius: 20px;
      padding: 3px 6px;
      gap: 3px;
      flex-shrink: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .lang-switcher-pill:hover {
      border-color: #EB5A1E;
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(11, 43, 99, 0.08);
    }

    .lang-pill-btn {
      background: none;
      border: none;
      padding: 4px 8px;
      font-size: 11.5px;
      font-weight: 700;
      color: #64748B;
      cursor: pointer;
      border-radius: 12px;
      transition: all 0.2s ease;
      line-height: 1;
    }

    .lang-pill-btn.active {
      background-color: #0B2B63;
      color: #FFFFFF;
      box-shadow: 0 2px 6px rgba(11, 43, 99, 0.25);
    }

    .lang-divider {
      font-size: 11px;
      color: #CBD5E1;
      font-weight: 300;
    }

    /* Primary Quote CTA Button */
    .btn-quote {
      position: relative;
      overflow: hidden;
      padding: 8px clamp(12px, 1.2vw, 20px);
      background: linear-gradient(135deg, #EB5A1E 0%, #D9480C 100%);
      color: #FFFFFF;
      font-size: clamp(12px, 0.85vw, 13.5px);
      font-weight: 700;
      letter-spacing: 0.3px;
      border-radius: 6px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 14px rgba(235, 90, 30, 0.28);
      white-space: nowrap;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }

    .btn-quote::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -60%;
      width: 40%;
      height: 200%;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%);
      transform: rotate(25deg);
      transition: none;
    }

    .btn-quote:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(235, 90, 30, 0.45);
    }

    .btn-quote:hover::after {
      left: 130%;
      transition: left 0.7s ease-in-out;
    }

    /* Mobile Drawer & Toggle */
    .mobile-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
    }

    .bar {
      width: 24px;
      height: 2.5px;
      background-color: #0B2B63;
      border-radius: 2px;
      transition: all 0.3s;
    }

    .bar.open:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
      background-color: #EB5A1E;
    }
    .bar.open:nth-child(2) {
      opacity: 0;
    }
    .bar.open:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
      background-color: #EB5A1E;
    }

    .mobile-drawer {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: #FFFFFF;
      border-bottom: 3px solid #EB5A1E;
      padding: 20px 24px;
      box-shadow: 0 20px 40px rgba(11, 43, 99, 0.15);
      transform: translateY(-10px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
    }

    .mobile-drawer.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    .mobile-lang-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 14px;
      margin-bottom: 14px;
      border-bottom: 1px solid #F1F5F9;
    }

    .mobile-lang-label {
      font-size: 13px;
      font-weight: 600;
      color: #64748B;
    }

    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
    }

    .mobile-item {
      font-size: 15.5px;
      font-weight: 600;
      color: #0B2B63;
      padding: 11px 14px;
      border-radius: 8px;
      text-decoration: none;
      transition: all 0.2s ease;
      display: block;
      border-bottom: 1px solid #F8FAFC;
    }

    .mobile-item:hover:not(.active) {
      color: #EB5A1E;
      background: rgba(235, 90, 30, 0.05);
      padding-left: 18px;
    }

    .mobile-item.active {
      color: #EB5A1E;
      font-weight: 700;
      background: rgba(235, 90, 30, 0.09);
      border-left: 4px solid #EB5A1E;
      padding-left: 16px;
    }

    .mobile-footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 16px;
    }

    .mobile-social-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      padding: 0 4px;
    }

    .mobile-social-label {
      font-size: 13px;
      font-weight: 700;
      color: #0B2B63;
    }

    .drawer-social-links {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .drawer-social-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F1F5F9;
      color: #0B2B63;
      border: 1px solid rgba(11, 43, 99, 0.1);
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .drawer-social-icon.ig:hover { background: #E1306C; color: #FFFFFF; }
    .drawer-social-icon.fb:hover { background: #1877F2; color: #FFFFFF; }
    .drawer-social-icon.yt:hover { background: #FF0000; color: #FFFFFF; }

    .mobile-phone-btn {
      display: block;
      text-align: center;
      padding: 12px;
      background: #0B2B63;
      color: #FFFFFF;
      font-weight: 700;
      border-radius: 6px;
      margin-bottom: 12px;
      text-decoration: none;
    }

    .mobile-address {
      font-size: 12px;
      color: #64748B;
      text-align: center;
      line-height: 1.5;
    }

    /* Dedicated Tamil Mode Header Fine-Tuning */
    .site-header.lang-ta {
      .desktop-nav {
        gap: clamp(2px, 0.5vw, 8px);
      }
      .nav-item {
        font-size: clamp(11.5px, 0.8vw, 13px);
        padding: 5px clamp(4px, 0.55vw, 8px);
        letter-spacing: 0;
      }
      .brand-sub {
        letter-spacing: 1.2px;
        font-size: clamp(10px, 0.75vw, 12px);
      }
      .btn-quote {
        letter-spacing: 0;
        font-size: clamp(11.5px, 0.8vw, 13px);
        padding: 7px clamp(10px, 1vw, 15px);
      }
    }

    /* Responsive Breakpoints */
    @media (max-width: 1300px) {
      .brand-main {
        font-size: 21px;
      }
      .brand-sub {
        font-size: 11.5px;
        letter-spacing: 1.5px;
      }
      .brand-emblem-img {
        width: 38px;
        height: 38px;
      }
      .site-header.lang-ta .desktop-nav {
        gap: 3px;
      }
      .site-header.lang-ta .nav-item {
        font-size: 12px;
        padding: 5px 6px;
      }
    }

    /* Tamil mode transition on mid-size screens */
    .site-header.lang-ta {
      @media (max-width: 1180px) {
        .desktop-nav {
          display: none !important;
        }
        .mobile-toggle {
          display: flex !important;
        }
        .mobile-drawer {
          display: block;
        }
      }
    }

    /* English mode transition on tablet screens */
    @media (max-width: 1040px) {
      .desktop-nav {
        display: none !important;
      }
      .mobile-toggle {
        display: flex !important;
      }
      .mobile-drawer {
        display: block;
      }
    }

    @media (max-width: 580px) {
      .btn-quote {
        display: none;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  translationService = inject(TranslationService);
  private api = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  isScrolled = false;
  mobileMenuOpen = false;
  activeSection = 'home';

  private isNavScrolling = false;
  private navScrollTimer: any = null;

  settings: Settings = {
    company_name: 'Madhura Builders & Architects',
    tagline: 'Building Dreams Into Reality',
    address: '#9, Muppidathi Amman Complex, Upstairs, Near Geethalaya Theatre, Sankarankovil',
    phone_primary: '+91 90034 43196',
    phone_secondary: '+91 99626 26231',
    whatsapp_number: '919003443196',
    email: 'info@madhurabuilders.com',
    google_maps_url: 'https://www.google.com/maps?q=9.1798265,77.5386246',
    youtube_url: 'https://www.youtube.com/@madhurabuilders',
    instagram_url: 'https://www.instagram.com/madhura.builders',
    facebook_url: 'https://www.facebook.com/madhurabuilders'
  };

  ngOnInit(): void {
    this.api.getSettings().subscribe(s => {
      if (s) this.settings = s;
    });

    this.updateActiveSection();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveSection();
        this.cdr.markForCheck();
      });

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.scrollToSection(fragment);
        }, 120);
      }
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 25;
    this.updateActiveSection();
  }

  updateActiveSection(): void {
    if (this.isNavScrolling) return;

    const url = this.router.url;

    // Dedicated routes (when on standalone subpages without section navigation)
    if (url !== '/' && !url.startsWith('/#') && !url.startsWith('/?')) {
      if (url.startsWith('/about')) this.activeSection = 'about';
      else if (url.startsWith('/services')) this.activeSection = 'services';
      else if (url.startsWith('/projects')) this.activeSection = 'projects';
      else if (url.startsWith('/gallery')) {
        this.activeSection = url.includes('tab=reels') ? 'reels' : 'gallery';
      }
      else if (url.startsWith('/contact')) this.activeSection = 'contact';
      else this.activeSection = '';
      return;
    }

    if (typeof window === 'undefined') return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Contact is at the bottom of the home page:
    // When scrolled near page bottom (within 140px), contact is definitively active
    if (scrollY + windowHeight >= documentHeight - 140) {
      this.activeSection = 'contact';
      return;
    }

    // At top of home page
    if (scrollY < 200) {
      this.activeSection = 'home';
      return;
    }

    // Seamless monotonic scroll tracking in both Forward (top->bottom) and Reverse (bottom->top)
    // Canonical section order: home -> about -> services -> projects -> gallery -> reels -> contact
    const sectionIds = ['about', 'services', 'projects', 'gallery', 'reels', 'contact'];
    const threshold = 160; // Focal reading line below sticky header
    let current = 'home';

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = id;
        }
      }
    }

    this.activeSection = current;
  }

  isSectionActive(section: string): boolean {
    return this.activeSection === section;
  }

  scrollToSection(section: string): void {
    this.activeSection = section;
    this.isNavScrolling = true;
    if (this.navScrollTimer) clearTimeout(this.navScrollTimer);
    this.navScrollTimer = setTimeout(() => {
      this.isNavScrolling = false;
    }, 900);

    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(section);
    if (el) {
      const headerOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  onNavClick(section: string, event: MouseEvent): void {
    event.preventDefault();
    this.closeMobileMenu();
    const currentUrl = this.router.url;
    const isHome = currentUrl === '/' || currentUrl.startsWith('/#') || currentUrl.startsWith('/?');

    if (isHome) {
      this.scrollToSection(section);
    } else {
      // Seamless reverse or forward navigation from any subpage back to Home section
      this.router.navigate(['/'], { fragment: section }).then(() => {
        setTimeout(() => {
          this.scrollToSection(section);
        }, 120);
      });
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
