import {
  Component,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  NgZone,
  inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FloatingWhatsappComponent } from './components/floating-whatsapp/floating-whatsapp.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    FloatingWhatsappComponent,
    ChatbotComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  title = 'Madhura Builders & Architects';

  private router = inject(Router);
  private ngZone = inject(NgZone);
  private isBrowser: boolean;
  private routerSub: Subscription | null = null;
  private observer: IntersectionObserver | null = null;
  private mutationObserver: MutationObserver | null = null;
  private observeDebounceTimer: any = null;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Run observer outside Angular zone for optimal 60fps performance
    this.ngZone.runOutsideAngular(() => {
      this.initScrollAnimations();

      // Re-scan when navigating between pages (e.g. Home -> Contact, Services, Projects)
      this.routerSub = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          setTimeout(() => this.scanAndObserveTargets(), 80);
          setTimeout(() => this.scanAndObserveTargets(), 350);
        });

      // Continuous DOM mutation watcher so newly rendered cards & sections animate immediately
      if (typeof MutationObserver !== 'undefined') {
        this.mutationObserver = new MutationObserver(() => {
          if (this.observeDebounceTimer) clearTimeout(this.observeDebounceTimer);
          this.observeDebounceTimer = setTimeout(() => this.scanAndObserveTargets(), 120);
        });
        this.mutationObserver.observe(document.body, { childList: true, subtree: true });
      }
    });
  }

  private initScrollAnimations(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    if (this.observer) {
      this.observer.disconnect();
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.08
    };

    this.observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('font-anim-visible');
          // Once revealed with trending animation, keep it visible
          obs.unobserve(entry.target);
        }
      });
    }, options);

    this.scanAndObserveTargets();
  }

  private scanAndObserveTargets(): void {
    if (!this.observer) return;

    // Comprehensive selector covering all headings, titles, subtitles, tags, cards, and text blocks
    const selector = [
      'section h1', 'section h2', 'section h3', 'section h4',
      '.section-title', '.section-tag', '.section-subtitle',
      '.page-title', '.page-subtitle', '.card-title',
      '.stat-number', '.stat-label', '.stat-desc',
      '.service-card-title', '.service-card-desc', '.service-card',
      '.project-title', '.project-desc', '.project-card',
      '.showcase-title', '.showcase-desc', '.showcase-text',
      '.why-card', '.why-card h3', '.why-card p',
      '.cta-title', '.cta-desc', '.cta-buttons',
      '.feedback-text', '.client-meta', '.testimonial-card',
      '.map-card', '.contact-info-card', '.form-card',
      '.office-address', '.detail-block', '.gallery-card',
      '.intro-header', '.intro-stat-card'
    ].join(', ');

    const targets = document.querySelectorAll(selector);

    targets.forEach((el, index) => {
      if (!el.classList.contains('font-anim-visible')) {
        el.classList.add('font-anim-target');
        // Add subtle staggered delays so elements animate in smoothly in sequence
        const delay = ((index % 6) * 0.09).toFixed(2);
        (el as HTMLElement).style.setProperty('--font-anim-delay', `${delay}s`);
        this.observer?.observe(el);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
    if (this.observeDebounceTimer) {
      clearTimeout(this.observeDebounceTimer);
    }
  }
}
