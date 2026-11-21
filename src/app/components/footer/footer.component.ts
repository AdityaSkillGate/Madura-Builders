import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Settings } from '../../models/models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <footer class="site-footer">
      <div class="footer-top container">
        <!-- Col 1: Brand & Bio with Prominent, Large Typography -->
        <div class="footer-col brand-col">
          <a routerLink="/" class="footer-brand-link" aria-label="Madhura Builders & Architects Homepage">
            <div class="brand-identity footer-brand-identity">
              <img src="/assets/images/logo/madhura-emblem.png" alt="Madhura Builders Emblem" class="brand-emblem-img footer-emblem" />
              <div class="brand-typography">
                <span class="brand-main footer-brand-main">MADHURA</span>
                <span class="brand-sub footer-brand-sub">BUILDERS &amp; ARCHITECTS</span>
              </div>
            </div>
          </a>

          <p class="brand-desc">
            {{ 'footer.desc' | translate }}
          </p>

          <div class="business-badge">
            <span class="badge-dot"></span>
            <span>Sankarankovil • Tenkasi District • Tamil Nadu</span>
          </div>

          <!-- Official Social Links Bar (Icons Only) -->
          <div class="footer-social-row">
            <!-- Instagram -->
            <a [href]="settings.instagram_url || 'https://www.instagram.com/madhura.builders'"
               target="_blank"
               rel="noopener noreferrer"
               class="social-btn instagram-btn"
               title="Follow us on Instagram"
               aria-label="Instagram">
              <svg viewBox="0 0 24 24" class="social-svg" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <!-- Facebook -->
            <a [href]="settings.facebook_url || 'https://www.facebook.com/madhurabuilders'"
               target="_blank"
               rel="noopener noreferrer"
               class="social-btn facebook-btn"
               title="Follow us on Facebook"
               aria-label="Facebook">
              <svg viewBox="0 0 24 24" class="social-svg" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <!-- Official YouTube Channel -->
            <a [href]="settings.youtube_url || 'https://www.youtube.com/@madhurabuilders'"
               target="_blank"
               rel="noopener noreferrer"
               class="social-btn youtube-btn"
               title="Subscribe on YouTube"
               aria-label="YouTube">
              <svg viewBox="0 0 24 24" class="social-svg" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            <!-- WhatsApp Direct Contact -->
            <a [href]="'https://wa.me/' + (settings.whatsapp_number || '919003443196')"
               target="_blank"
               rel="noopener noreferrer"
               class="social-btn whatsapp-btn"
               title="Chat on WhatsApp"
               aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" class="social-svg" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Col 2: Services Quick Links -->
        <div class="footer-col">
          <h4 class="col-title">{{ 'footer.services' | translate }}</h4>
          <ul class="col-links">
            <li><a routerLink="/services">{{ 'services.s1.title' | translate }}</a></li>
            <li><a routerLink="/services">{{ 'services.s2.title' | translate }}</a></li>
            <li><a routerLink="/services">{{ 'services.s3.title' | translate }}</a></li>
            <li><a routerLink="/services">{{ 'services.s4.title' | translate }}</a></li>
            <li><a routerLink="/services">{{ 'services.s5.title' | translate }}</a></li>
            <li><a routerLink="/services">{{ 'services.s6.title' | translate }}</a></li>
          </ul>
        </div>

        <!-- Col 3: Quick Navigation -->
        <div class="footer-col">
          <h4 class="col-title">{{ 'footer.quick_links' | translate }}</h4>
          <ul class="col-links">
            <li><a routerLink="/">{{ 'nav.home' | translate }}</a></li>
            <li><a routerLink="/about">{{ 'nav.about' | translate }}</a></li>
            <li><a routerLink="/projects">{{ 'nav.projects' | translate }}</a></li>
            <li><a routerLink="/gallery">{{ 'nav.gallery' | translate }}</a></li>
            <li><a routerLink="/gallery" [queryParams]="{ tab: 'reels' }">Instagram Reels</a></li>
            <li><a routerLink="/gallery" [queryParams]="{ tab: 'videos' }">Video Gallery</a></li>
            <li><a routerLink="/contact">{{ 'nav.contact' | translate }}</a></li>
          </ul>
        </div>

        <!-- Col 4: Verified Contact & Office Information -->
        <div class="footer-col contact-col">
          <h4 class="col-title">{{ 'footer.contact_info' | translate }}</h4>
          <address class="footer-address">
            <strong>Madhura Builders &amp; Architects</strong><br />
            #9, Muppidathi Amman Complex, Upstairs,<br />
            Opposite Hatsun Dairy, Near Geethalaya Theatre,<br />
            Sankarankovil, Tenkasi District,<br />
            Tamil Nadu - 627756, India.
          </address>

          <!-- Direct Phone & WhatsApp calling chips -->
          <div class="footer-contact-item">
            <span class="label">Contact:</span>
            <div class="phone-numbers">
              <a [href]="'tel:' + settings.phone_primary" class="footer-phone-chip primary-chip" [title]="'Call Primary: ' + settings.phone_primary">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.06-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.06l-2.21 2.16z"/>
                </svg>
                <span>{{ settings.phone_primary }}</span>
              </a>
              <a [href]="'tel:' + settings.phone_secondary" class="footer-phone-chip" [title]="'Call Secondary: ' + settings.phone_secondary">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.06-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.06l-2.21 2.16z"/>
                </svg>
                <span>{{ settings.phone_secondary }}</span>
              </a>
            </div>
          </div>

          <div class="footer-contact-item">
            <span class="label">Map:</span>
            <a [href]="settings.google_maps_url" target="_blank" rel="noopener noreferrer" class="map-link">
              {{ 'contact.get_directions' | translate }} &rarr;
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom with Center Developer Attribution -->
      <div class="footer-bottom container">
        <p class="copyright">
          &copy; {{ currentYear }} {{ 'footer.rights' | translate }}
        </p>

        <!-- Center Developer Credit for Aditya Skill Gate IT Solution -->
        <div class="developer-credit">
          <span class="dev-label">{{ 'footer.developed_by' | translate }}</span>
          <a href="https://adityaskillgate.com/" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="dev-link" 
             title="Aditya Skill Gate IT Solution | IT Training &amp; Software Services">
            <span class="dev-name">Aditya Skill Gate IT Solution</span>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="dev-external-icon">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>

        <div class="bottom-links">
          <span>{{ 'footer.engineered' | translate }}</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background-color: #081325;
      color: #E2E8F0;
      border-top: 3.5px solid #EB5A1E;
      padding-top: 70px;
      padding-bottom: 30px;
      font-family: inherit;
    }

    .footer-top {
      display: grid;
      grid-template-columns: 2fr 1.3fr 1.1fr 1.8fr;
      gap: 40px;
      margin-bottom: 50px;
    }

    /* Brand Identity with Prominent, Large Font */
    .footer-brand-link {
      display: inline-block;
      text-decoration: none;
      margin-bottom: 20px;
      transition: transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
      cursor: pointer;
    }

    .footer-brand-link:hover {
      transform: scale(1.03) translateY(-1px);
    }

    .brand-identity.footer-brand-identity {
      display: flex;
      align-items: center;
      gap: 14px;
      user-select: none;
    }

    .footer-emblem {
      width: 52px;
      height: 52px;
      object-fit: contain;
      flex-shrink: 0;
      filter: drop-shadow(0 2px 10px rgba(235, 90, 30, 0.35));
      transition: transform 0.3s ease;
    }

    .footer-brand-link:hover .footer-emblem {
      transform: rotate(5deg) scale(1.06);
    }

    .brand-typography {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1;
    }

    .brand-main.footer-brand-main {
      font-family: 'Montserrat', var(--font-heading), system-ui, sans-serif;
      font-size: 28px;
      font-weight: 900;
      color: #EB5A1E;
      letter-spacing: 0.8px;
      line-height: 1.05;
      margin: 0;
      padding: 0;
      text-transform: uppercase;
      text-shadow: 0 2px 10px rgba(235, 90, 30, 0.35);
    }

    .brand-sub.footer-brand-sub {
      font-family: 'Montserrat', var(--font-heading), system-ui, sans-serif;
      font-size: 14.5px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: 2.2px;
      line-height: 1;
      margin-top: 5px;
      padding: 0;
      text-transform: uppercase;
      display: block;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
    }

    .brand-desc {
      font-size: 13.5px;
      line-height: 1.7;
      color: #94A3B8;
      margin-bottom: 20px;
    }

    .business-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 12px;
      background: rgba(235, 90, 30, 0.15);
      border: 1px solid rgba(235, 90, 30, 0.35);
      border-radius: 4px;
      font-size: 11px;
      color: #EB5A1E;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #EB5A1E;
    }

    /* Social Buttons Row */
    .footer-social-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 22px;
      flex-wrap: wrap;
    }

    .social-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.16);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      text-decoration: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    }

    .social-svg {
      width: 19px;
      height: 19px;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }

    .social-btn:hover {
      transform: translateY(-4px) scale(1.12);
    }

    .social-btn:hover .social-svg {
      transform: scale(1.15);
    }

    .youtube-btn:hover {
      background: #FF0000;
      border-color: #FF0000;
      box-shadow: 0 4px 14px rgba(255, 0, 0, 0.4);
    }

    .whatsapp-btn {
      background: rgba(37, 211, 102, 0.2);
      border-color: rgba(37, 211, 102, 0.4);
      color: #25D366;
    }

    .whatsapp-btn:hover {
      background: #25D366;
      border-color: #25D366;
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.4);
    }

    .instagram-btn:hover {
      background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
      border-color: transparent;
      box-shadow: 0 4px 14px rgba(220, 39, 67, 0.4);
    }

    .facebook-btn:hover {
      background: #1877F2;
      border-color: #1877F2;
      box-shadow: 0 4px 14px rgba(24, 119, 242, 0.4);
    }

    /* Links columns */
    .col-title {
      font-size: 15px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 0.5px;
      margin-bottom: 20px;
      position: relative;
      padding-bottom: 8px;
    }

    .col-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 28px;
      height: 2px;
      background-color: #EB5A1E;
    }

    .col-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .col-links a {
      font-size: 13.5px;
      color: #94A3B8;
      transition: color 0.2s, transform 0.2s;
      display: inline-block;
    }

    .col-links a:hover {
      color: #EB5A1E;
      transform: translateX(4px);
    }

    .footer-address {
      font-style: normal;
      font-size: 13px;
      line-height: 1.7;
      color: #94A3B8;
      margin-bottom: 18px;
    }

    .footer-address strong {
      color: #FFFFFF;
    }

    .footer-contact-item {
      display: flex;
      align-items: baseline;
      gap: 10px;
      margin-bottom: 14px;
      font-size: 13px;
    }

    .footer-contact-item .label {
      color: #64748B;
      font-weight: 600;
      font-size: 12px;
      min-width: 60px;
    }

    .phone-numbers {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .footer-phone-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.16);
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 13px;
      text-decoration: none;
      transition: all 0.25s ease;
      width: fit-content;
    }

    .footer-phone-chip.primary-chip {
      background: rgba(235, 90, 30, 0.16);
      border-color: rgba(235, 90, 30, 0.45);
      color: #FF7A3D;
    }

    .footer-phone-chip:hover {
      background: #EB5A1E;
      border-color: #EB5A1E;
      color: #FFFFFF;
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(235, 90, 30, 0.35);
    }

    .map-link {
      color: #EB5A1E;
      font-weight: 600;
      transition: transform 0.2s;
      display: inline-block;
    }

    .map-link:hover {
      transform: translateX(3px);
    }

    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      color: #94A3B8;
      flex-wrap: wrap;
      gap: 16px;
    }

    .developer-credit {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: #94A3B8;
      font-size: 13px;
    }

    .dev-label {
      color: #94A3B8;
      font-weight: 500;
    }

    .developer-credit .dev-link {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: #EB5A1E;
      font-weight: 700;
      text-decoration: none;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(235, 90, 30, 0.08);
      border: 1px solid rgba(235, 90, 30, 0.22);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .developer-credit .dev-link:hover {
      color: #FFFFFF;
      background: #EB5A1E;
      border-color: #EB5A1E;
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(235, 90, 30, 0.4);
    }

    .dev-external-icon {
      transition: transform 0.2s ease;
      flex-shrink: 0;
    }

    .developer-credit .dev-link:hover .dev-external-icon {
      transform: translate(2px, -2px);
    }

    @media (max-width: 1024px) {
      .footer-top {
        grid-template-columns: 1fr 1fr;
        gap: 36px;
      }
    }

    @media (max-width: 820px) {
      .footer-top {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .footer-bottom {
        flex-direction: column;
        text-align: center;
        gap: 14px;
      }
      .developer-credit {
        justify-content: center;
      }
    }
  `]
})
export class FooterComponent implements OnInit {
  translationService = inject(TranslationService);
  private api = inject(ApiService);

  currentYear = new Date().getFullYear();
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
  }
}
