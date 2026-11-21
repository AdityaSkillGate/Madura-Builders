import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-floating-whatsapp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      [href]="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="floating-whatsapp-btn"
      aria-label="Chat with Madhura Builders on WhatsApp"
      title="WhatsApp Madhura Builders"
    >
      <span class="whatsapp-pulse"></span>
      <svg class="whatsapp-icon" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 2a13.93 13.93 0 00-12 21L2 30l7.24-1.9A13.93 13.93 0 1016 2zm0 25.54a11.58 11.58 0 01-5.9-1.62l-.42-.25-4.38 1.15 1.17-4.27-.27-.44A11.55 11.55 0 1116 27.54zm6.33-8.67c-.35-.17-2.06-1-2.38-1.12s-.55-.17-.79.17-.91 1.12-1.11 1.35-.41.26-.76.09a9.55 9.55 0 01-2.81-1.74 10.53 10.53 0 01-1.95-2.42c-.2-.35 0-.54.15-.71s.35-.41.52-.61a2.35 2.35 0 00.35-.58.64.64 0 000-.61c-.09-.17-.79-1.91-1.08-2.61s-.58-.6-.79-.61h-.68a1.3 1.3 0 00-.95.44 3.94 3.94 0 00-1.23 2.93 6.85 6.85 0 001.44 3.64 15.68 15.68 0 006 5.3 13.88 13.88 0 002 .74 4.8 4.8 0 002.21.14 3.61 3.61 0 002.38-1.67 2.94 2.94 0 00.2-1.67c-.07-.12-.27-.2-.62-.37z"/>
      </svg>
    </a>
  `,
  styles: [`
    .floating-whatsapp-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
      color: #FFFFFF;
      box-shadow: 0 8px 25px rgba(37, 211, 102, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      text-decoration: none;
    }

    .floating-whatsapp-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 30px rgba(37, 211, 102, 0.6);
    }

    .whatsapp-icon {
      width: 32px;
      height: 32px;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
    }

    .whatsapp-pulse {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid #25D366;
      animation: waPulse 2s infinite ease-out;
      opacity: 0;
      pointer-events: none;
    }

    @keyframes waPulse {
      0% { transform: scale(0.95); opacity: 0.8; }
      100% { transform: scale(1.35); opacity: 0; }
    }

    @media (max-width: 480px) {
      .floating-whatsapp-btn {
        bottom: 16px;
        right: 16px;
        width: 52px;
        height: 52px;
      }
      .whatsapp-icon {
        width: 28px;
        height: 28px;
      }
    }
  `]
})
export class FloatingWhatsappComponent implements OnInit {
  translationService = inject(TranslationService);
  private api = inject(ApiService);

  whatsappNumber = '919003443196';

  get whatsappUrl(): string {
    const isTa = this.translationService.currentLang() === 'ta';
    const text = isTa
      ? 'வணக்கம் Madhura Builders & Architects,\n\nநான் உங்கள் கட்டிடக்கலை மற்றும் கட்டுமான சேவைகளில் ஆர்வமாக உள்ளேன்.\n\nகூடுதல் விவரங்களுடன் என்னை தொடர்பு கொள்ளவும்.'
      : 'Hello Madhura Builders & Architects,\n\nI am interested in your construction and architectural services.\n\nPlease contact me with more details.';
    
    const cleanNumber = this.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
  }

  ngOnInit(): void {
    this.api.getSettings().subscribe(s => {
      if (s && s.whatsapp_number) {
        this.whatsappNumber = s.whatsapp_number;
      }
    });
  }
}
