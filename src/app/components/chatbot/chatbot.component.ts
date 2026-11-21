import { Component, OnInit, ElementRef, ViewChild, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  actions?: { label: string; action: 'whatsapp' | 'call' | 'maps' | 'quote' | 'projects' | 'gallery'; url?: string }[];
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TranslatePipe],
  template: `
    <!-- Floating Chatbot Toggle Button -->
    <div class="chatbot-floating-wrapper" [class.panel-open]="isOpen">
      <!-- Pop Greeting Callout Pill -->
      <div class="chatbot-pop-pill" (click)="toggleChat()" *ngIf="!isOpen" title="Click to chat with AI">
        <span class="pill-sparkle">✨</span>
        <span class="pill-text">{{ translationService.isTamil() ? 'AI அரட்டை' : 'Chat with AI' }}</span>
      </div>

      <button 
        class="chatbot-toggle-btn" 
        (click)="toggleChat()" 
        [attr.aria-label]="isOpen ? 'Close Madhura Assistant' : 'Open Madhura Assistant'"
        [class.active]="isOpen"
        [class.dancing]="!isOpen"
        title="Madhura AI Assistant"
      >
        <span class="btn-glow" *ngIf="!isOpen"></span>
        <div class="btn-icon-wrapper">
          <!-- Modern 3D AI Assistant Avatar Image -->
          <img 
            *ngIf="!isOpen" 
            src="/assets/images/chatbot/ai-assistant-avatar.png" 
            alt="Madhura AI Assistant" 
            class="chatbot-avatar-img" 
          />
          <!-- Close Cross Icon -->
          <svg *ngIf="isOpen" class="close-icon" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <span class="online-indicator" *ngIf="!isOpen"></span>
      </button>

      <!-- Chat Window Panel -->
      <div class="chat-panel" *ngIf="isOpen" [class.anim-slide-up]="isOpen">
        <!-- Panel Header -->
        <div class="chat-header">
          <div class="header-brand">
            <div class="avatar-ring">
              <img src="/assets/images/chatbot/ai-assistant-avatar.png" alt="Madhura AI Assistant" class="bot-header-avatar" />
            </div>
            <div>
              <div class="bot-title-row">
                <h4 class="bot-name">{{ 'bot.name' | translate }}</h4>
                <span class="active-badge">Online</span>
              </div>
              <p class="bot-status">{{ 'bot.tagline' | translate }} • Sankarankovil</p>
            </div>
          </div>

          <div class="header-controls">
            <!-- Clear History -->
            <button class="icon-btn" (click)="clearHistory()" [title]="'bot.clear' | translate">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
            <!-- Close Button -->
            <button class="icon-btn" (click)="toggleChat()">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Chat Messages Container -->
        <div class="chat-messages" #scrollContainer>
          <!-- Welcome Bubble -->
          <div class="msg-group bot">
            <div class="msg-bubble bot">
              <p>{{ 'bot.welcome' | translate }}</p>
              <span class="msg-time">Just now</span>
            </div>
          </div>

          <!-- Suggested Quick Question Pills -->
          <div class="suggested-pills" *ngIf="messages.length <= 1">
            <span class="suggested-heading">{{ 'bot.suggested' | translate }}:</span>
            <div class="pills-container">
              <button 
                *ngFor="let q of suggestedQuestions" 
                class="quick-pill" 
                (click)="askQuestion(q)">
                {{ q | translate }}
              </button>
            </div>
          </div>

          <!-- Message History -->
          <div *ngFor="let msg of messages" class="msg-group" [class.user]="msg.sender === 'user'" [class.bot]="msg.sender === 'bot'">
            <div class="msg-bubble" [class.user]="msg.sender === 'user'" [class.bot]="msg.sender === 'bot'">
              <p [innerHTML]="formatMessage(msg.text)"></p>
              
              <!-- Action Buttons (WhatsApp / Maps / Call / Quote / Gallery / Projects) -->
              <div class="bubble-actions" *ngIf="msg.actions && msg.actions.length > 0">
                <ng-container *ngFor="let action of msg.actions">
                  <a *ngIf="action.action === 'whatsapp'" [href]="action.url" target="_blank" rel="noopener noreferrer" class="action-btn wa-btn">
                    <span>💬</span> {{ action.label }}
                  </a>
                  <a *ngIf="action.action === 'maps'" [href]="action.url" target="_blank" rel="noopener noreferrer" class="action-btn map-btn">
                    <span>📍</span> {{ action.label }}
                  </a>
                  <a *ngIf="action.action === 'call'" [href]="action.url" class="action-btn call-btn">
                    <span>📞</span> {{ action.label }}
                  </a>
                  <a *ngIf="action.action === 'quote'" routerLink="/contact" (click)="isOpen = false" class="action-btn quote-btn">
                    <span>📋</span> {{ action.label }}
                  </a>
                  <a *ngIf="action.action === 'projects'" routerLink="/projects" (click)="isOpen = false" class="action-btn proj-btn">
                    <span>🏛️</span> {{ action.label }}
                  </a>
                  <a *ngIf="action.action === 'gallery'" routerLink="/gallery" (click)="isOpen = false" class="action-btn gallery-btn">
                    <span>🖼️</span> {{ action.label }}
                  </a>
                </ng-container>
              </div>

              <span class="msg-time">{{ msg.timestamp | date:'shortTime' }}</span>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div class="msg-group bot" *ngIf="isTyping">
            <div class="typing-bubble">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>

        <!-- Panel Footer / Input Area -->
        <form class="chat-input-form" (ngSubmit)="sendMessage()">
          <input 
            type="text" 
            [(ngModel)]="userInput" 
            name="chatInput" 
            [placeholder]="'bot.input_ph' | translate" 
            class="chat-input"
            autocomplete="off"
            [disabled]="isTyping"
          />
          <button type="submit" class="send-btn" [disabled]="!userInput.trim() || isTyping" aria-label="Send Message">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-floating-wrapper {
      position: fixed;
      bottom: 96px;
      right: 21px;
      z-index: 1000;
      font-family: inherit;
    }

    /* Pop Greeting Callout Pill with Playful Dancing Bob */
    .chatbot-pop-pill {
      position: absolute;
      right: 74px;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(8, 19, 37, 0.94);
      border: 1.5px solid rgba(235, 90, 30, 0.7);
      color: #FFFFFF;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.5px;
      white-space: nowrap;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(8px);
      animation: pillDancingBob 2.8s ease-in-out infinite;
      transition: all 0.25s ease;
      z-index: 1;
    }

    .chatbot-pop-pill:hover {
      transform: translateY(-50%) scale(1.06);
      background: #0B2B63;
      border-color: #EB5A1E;
      box-shadow: 0 6px 20px rgba(235, 90, 30, 0.5);
    }

    @keyframes pillDancingBob {
      0%, 100% {
        transform: translateY(-50%) translateX(0);
      }
      36% {
        transform: translateY(calc(-50% - 6px)) translateX(-2px);
      }
      72% {
        transform: translateY(calc(-50% + 2px)) translateX(1px);
      }
    }

    /* Floating Round Trigger Button with Continuous Dancing Animation until Clicked */
    .chatbot-toggle-btn {
      position: relative;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0B2B63 0%, #153E85 100%);
      color: #FFFFFF;
      border: 2.5px solid #EB5A1E;
      cursor: pointer;
      box-shadow: 0 10px 28px rgba(11, 43, 99, 0.45), 0 0 20px rgba(235, 90, 30, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      overflow: visible;
      transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    /* Continuous Dancing / Floating Motion Until User Clicks */
    .chatbot-toggle-btn.dancing {
      animation: botDancing 2.8s ease-in-out infinite;
    }

    @keyframes botDancing {
      0%, 100% {
        transform: translateY(0) rotate(0deg) scale(1);
      }
      12% {
        transform: translateY(-8px) rotate(-6deg) scale(1.04, 0.96);
      }
      24% {
        transform: translateY(0px) rotate(4deg) scale(0.97, 1.03);
      }
      36% {
        transform: translateY(-11px) rotate(-6deg) scale(1.05, 0.95);
      }
      48% {
        transform: translateY(1px) rotate(3deg) scale(0.96, 1.04);
      }
      60% {
        transform: translateY(-6px) rotate(-4deg) scale(1.02, 0.98);
      }
      72% {
        transform: translateY(0px) rotate(2deg) scale(1);
      }
      84% {
        transform: translateY(-3px) rotate(-1deg) scale(1.01);
      }
      92% {
        transform: translateY(0px) rotate(0deg) scale(1);
      }
    }

    .chatbot-toggle-btn.dancing:hover {
      animation-play-state: paused;
      transform: scale(1.12) translateY(-4px);
    }

    .chatbot-toggle-btn:active {
      transform: scale(0.92);
    }

    /* When Chat Panel is Open: Dancing Motion Stops Completely */
    .chatbot-toggle-btn.active {
      animation: none !important;
      transform: none !important;
      background: #0B2B63;
      border-color: #EB5A1E;
      box-shadow: 0 8px 25px rgba(11, 43, 99, 0.5);
    }

    .btn-glow {
      position: absolute;
      inset: -5px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(235, 90, 30, 0.45) 0%, transparent 70%);
      animation: pulseGlow 2.5s infinite ease-in-out;
      pointer-events: none;
      z-index: 0;
    }

    @keyframes pulseGlow {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.15); opacity: 0.85; }
    }

    .btn-icon-wrapper {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chatbot-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      display: block;
      transition: transform 0.3s ease;
      filter: contrast(1.05) brightness(1.02);
    }

    .chatbot-toggle-btn.dancing .chatbot-avatar-img {
      animation: avatarMicroDance 2.8s ease-in-out infinite;
    }

    @keyframes avatarMicroDance {
      0%, 100% { transform: scale(1) rotate(0deg); }
      24% { transform: scale(1.04) rotate(3deg); }
      48% { transform: scale(0.97) rotate(-3deg); }
      72% { transform: scale(1.03) rotate(2deg); }
    }

    .chatbot-toggle-btn:hover .chatbot-avatar-img {
      transform: scale(1.08);
    }

    .close-icon {
      color: #FFFFFF;
      transition: transform 0.25s ease;
    }

    .chatbot-toggle-btn:hover .close-icon {
      transform: rotate(90deg);
    }

    .online-indicator {
      position: absolute;
      top: 1px;
      right: 1px;
      width: 14px;
      height: 14px;
      background-color: #10B981;
      border: 2.5px solid #FFFFFF;
      border-radius: 50%;
      z-index: 2;
      box-shadow: 0 2px 6px rgba(16, 185, 129, 0.6);
      animation: indicatorPulse 2s infinite;
    }

    @keyframes indicatorPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
    }

    /* Chat Panel Window with Spring Pop Animation */
    .chat-panel {
      position: absolute;
      bottom: 76px;
      right: 0;
      width: 380px;
      height: 520px;
      max-height: calc(100vh - 185px);
      background-color: #FFFFFF;
      border-radius: 18px;
      box-shadow: 0 20px 48px rgba(11, 43, 99, 0.28), 0 0 0 1px rgba(11, 43, 99, 0.08);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform-origin: bottom right;
      animation: botPopSpring 0.42s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    @keyframes botPopSpring {
      0% {
        opacity: 0;
        transform: scale(0.6) translateY(24px);
      }
      65% {
        opacity: 1;
        transform: scale(1.035) translateY(-4px);
      }
      85% {
        transform: scale(0.99) translateY(1px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    /* Header */
    .chat-header {
      background: linear-gradient(135deg, #0B2B63 0%, #0F3882 100%);
      color: #FFFFFF;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #EB5A1E;
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .avatar-ring {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #EB5A1E;
      background: #0B2B63;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      flex-shrink: 0;
    }

    .bot-header-avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .bot-title-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .bot-name {
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin: 0;
      color: #FFFFFF;
    }

    .active-badge {
      font-size: 9px;
      font-weight: 600;
      background: rgba(16, 185, 129, 0.25);
      color: #6EE7B7;
      padding: 1px 6px;
      border-radius: 10px;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .bot-status {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.85);
      margin: 0;
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .icon-btn {
      background: rgba(255, 255, 255, 0.12);
      border: none;
      color: #FFFFFF;
      width: 28px;
      height: 28px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
    }

    .icon-btn:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    /* Messages Container */
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      overscroll-behavior: contain;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      padding: 16px;
      background-color: #F8FAFC;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .msg-group {
      display: flex;
      flex-direction: column;
    }

    .msg-group.user {
      align-items: flex-end;
    }

    .msg-group.bot {
      align-items: flex-start;
    }

    .msg-bubble {
      max-width: 86%;
      padding: 11px 15px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.55;
      position: relative;
    }

    .msg-bubble.bot {
      background-color: #FFFFFF;
      color: #0F172A;
      border-bottom-left-radius: 4px;
      border: 1px solid rgba(11, 43, 99, 0.1);
      box-shadow: 0 2px 8px rgba(11, 43, 99, 0.05);

      p {
        color: #0F172A !important;
        font-size: 13.5px;
        line-height: 1.55;
        margin: 0;
      }

      strong {
        color: #0B2B63;
        font-weight: 700;
      }
    }

    .msg-bubble.user {
      background: linear-gradient(135deg, #0B2B63 0%, #153E8A 100%);
      color: #FFFFFF;
      border-bottom-right-radius: 4px;
      box-shadow: 0 2px 8px rgba(11, 43, 99, 0.18);

      p {
        color: #FFFFFF !important;
        font-size: 13.5px;
        line-height: 1.5;
        margin: 0;
      }
    }

    .msg-time {
      display: block;
      font-size: 10px;
      margin-top: 5px;
      opacity: 0.7;
      text-align: right;
    }

    /* Action Buttons Inside Bubbles */
    .bubble-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px dashed rgba(11, 43, 99, 0.12);
    }

    .action-btn {
      font-size: 11.5px;
      font-weight: 600;
      padding: 6px 11px;
      border-radius: 7px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .action-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
    }

    .action-btn.wa-btn {
      background-color: #25D366;
      color: #FFFFFF;
    }

    .action-btn.map-btn {
      background-color: #0B2B63;
      color: #FFFFFF;
    }

    .action-btn.call-btn {
      background-color: #F8FAFC;
      color: #0B2B63;
      border: 1px solid rgba(11, 43, 99, 0.25);
    }

    .action-btn.quote-btn {
      background-color: #EB5A1E;
      color: #FFFFFF;
    }

    .action-btn.proj-btn {
      background-color: #0F3882;
      color: #FFFFFF;
    }

    .action-btn.gallery-btn {
      background-color: #475569;
      color: #FFFFFF;
    }

    /* Suggested Quick Pills */
    .suggested-pills {
      background: #FFFFFF;
      border: 1px solid rgba(235, 90, 30, 0.25);
      border-radius: 12px;
      padding: 10px 12px;
      margin-top: 4px;
      box-shadow: 0 2px 6px rgba(235, 90, 30, 0.06);
    }

    .suggested-heading {
      font-size: 11px;
      font-weight: 700;
      color: #EB5A1E;
      display: block;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .pills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .quick-pill {
      background: #F1F5F9;
      border: 1px solid rgba(11, 43, 99, 0.12);
      border-radius: 14px;
      padding: 5px 10px;
      font-size: 11.5px;
      color: #0B2B63;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
    }

    .quick-pill:hover {
      background: #0B2B63;
      color: #FFFFFF;
      border-color: #0B2B63;
      transform: translateY(-1px);
    }

    /* Typing Indicator */
    .typing-bubble {
      background: #FFFFFF;
      padding: 10px 16px;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      display: inline-flex;
      gap: 5px;
      align-items: center;
      border: 1px solid rgba(11, 43, 99, 0.1);
      box-shadow: 0 2px 8px rgba(11, 43, 99, 0.05);
      width: fit-content;
    }

    .dot {
      width: 7px;
      height: 7px;
      background-color: #EB5A1E;
      border-radius: 50%;
      animation: bounce 1.2s infinite ease-in-out both;
    }

    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }

    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.45; }
      40% { transform: scale(1.15); opacity: 1; }
    }

    /* Form Input */
    .chat-input-form {
      padding: 10px 14px;
      background: #FFFFFF;
      border-top: 1px solid rgba(11, 43, 99, 0.08);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .chat-input {
      flex: 1;
      border: 1px solid #CBD5E1;
      border-radius: 20px;
      padding: 8px 14px;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s;
    }

    .chat-input:focus {
      border-color: #EB5A1E;
    }

    .send-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #EB5A1E;
      color: #FFFFFF;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
    }

    .send-btn:hover:not(:disabled) {
      background: #D9480C;
      transform: scale(1.06);
    }

    .send-btn:disabled {
      background: #CBD5E1;
      cursor: not-allowed;
    }

    /* Mobile Responsive Panel */
    @media (max-width: 480px) {
      .chatbot-floating-wrapper {
        bottom: 80px;
        right: 14px;
      }
      .chatbot-pop-pill {
        display: none;
      }
      .chat-panel {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
        z-index: 2000;
      }
    }
  `]
})
export class ChatbotComponent implements OnInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  translationService = inject(TranslationService);
  private cdr = inject(ChangeDetectorRef);

  isOpen = false;
  userInput = '';
  isTyping = false;

  messages: ChatMessage[] = [];

  suggestedQuestions: string[] = [
    'bot.q1', 'bot.q2', 'bot.q3', 'bot.q4', 'bot.q5', 'bot.q6',
    'bot.q7', 'bot.q8', 'bot.q9', 'bot.q10', 'bot.q11', 'bot.q12',
    'bot.q13', 'bot.q14'
  ];

  ngOnInit(): void {
    this.isTyping = false;
    // Initialize session chat
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const saved = sessionStorage.getItem('madhura_chat_session');
      if (saved) {
        try {
          this.messages = JSON.parse(saved);
          // If the last message was from the user and left unanswered, answer it immediately!
          if (this.messages.length > 0 && this.messages[this.messages.length - 1].sender === 'user') {
            const lastUserMsg = this.messages[this.messages.length - 1].text;
            const reply = this.generateResponse(lastUserMsg);
            this.messages.push({
              id: (Date.now() + 1).toString(),
              sender: 'bot',
              text: reply.text,
              timestamp: new Date(),
              actions: reply.actions
            });
            this.saveSession();
          }
        } catch (e) {
          this.messages = [];
        }
      }
    }
    this.cdr.detectChanges();
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.isTyping = false;
      // Auto-recover any unanswered question upon opening
      if (this.messages.length > 0 && this.messages[this.messages.length - 1].sender === 'user') {
        const lastUserMsg = this.messages[this.messages.length - 1].text;
        const reply = this.generateResponse(lastUserMsg);
        this.messages.push({
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply.text,
          timestamp: new Date(),
          actions: reply.actions
        });
        this.saveSession();
      }
      this.cdr.detectChanges();
      setTimeout(() => {
        this.scrollToBottom();
      }, 50);
    }
  }

  clearHistory(): void {
    this.messages = [];
    this.isTyping = false;
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('madhura_chat_session');
    }
    this.cdr.detectChanges();
  }

  askQuestion(key: string): void {
    const qText = this.translationService.t(key);
    this.userInput = qText;
    this.sendMessage();
  }

  sendMessage(): void {
    const text = this.userInput.trim();
    if (!text || this.isTyping) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date()
    };
    this.messages.push(userMsg);
    this.userInput = '';
    this.isTyping = true;
    this.saveSession();
    this.cdr.detectChanges();
    setTimeout(() => this.scrollToBottom(), 50);

    // Natural assistant typing animation (fast & responsive 180ms delay)
    setTimeout(() => {
      try {
        const reply = this.generateResponse(text);
        this.messages.push({
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply.text,
          timestamp: new Date(),
          actions: reply.actions
        });
      } catch (err) {
        console.error('Chatbot error:', err);
      } finally {
        this.isTyping = false;
        this.saveSession();
        this.cdr.detectChanges();
        setTimeout(() => this.scrollToBottom(), 50);
      }
    }, 180);
  }

  private generateResponse(query: string): { text: string; actions?: any[] } {
    const isTa = this.translationService.currentLang() === 'ta';
    const q = (query || '').toLowerCase();

    // 1. Services
    if (q.includes('service') || q.includes('சேவை') || q.includes('என்ன') || q.includes('provide') || q.includes('வழங்கு')) {
      if (isTa) {
        return {
          text: `மதுரா பில்டர்ஸ் & ஆர்கிடெக்ட்ஸ் வழங்கும் முக்கிய சேவைகள்:<br>
          • <strong>கட்டிடக்கலை வரைபடம் (Architectural Planning)</strong> & அனுமதி வரைபடங்கள்<br>
          • <strong>குடியிருப்பு கட்டிட கட்டுமானம் (Residential Construction)</strong> - அஸ்திவாரம் முதல் சாவி ஒப்படைப்பு வரை<br>
          • <strong>3D எலிவேஷன் டிசைன் (3D Elevation Design)</strong><br>
          • <strong>ஹவுஸ் பிளான் & வாஸ்து வடிவமைப்பு (House Plan Design)</strong><br>
          • <strong>உள்துறை வடிவமைப்பு (Interior Design)</strong><br>
          • <strong>கட்டுமான பொறியியல் ஆலோசனை (Consultation)</strong>`,
          actions: [
            { label: 'மதிப்பீடு கோர', action: 'quote' },
            { label: 'வாட்ஸ்அப்', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம், எனக்கு கட்டுமான சேவைகள் பற்றிய விவரங்கள் தேவை.') }
          ]
        };
      }
      return {
        text: `<strong>Madhura Builders & Architects provides:</strong><br>
        1. <strong>Architectural Planning & Vastu Floor Plans</strong><br>
        2. <strong>Turnkey Residential Building Construction</strong><br>
        3. <strong>Photorealistic 3D Exterior Elevation Design</strong><br>
        4. <strong>Custom House Plan Blueprints</strong><br>
        5. <strong>Interior Design & Modular Solutions</strong><br>
        6. <strong>Civil Engineering Consultation & Structural BOQ</strong>`,
        actions: [
          { label: 'Request Quotation', action: 'quote' },
          { label: 'WhatsApp Us', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, I am interested in your architectural and construction services.') }
        ]
      };
    }

    // 2. House plan
    if (q.includes('plan') || q.includes('பிளான்') || q.includes('வரைபடம்') || q.includes('blueprint') || q.includes('floor')) {
      if (isTa) {
        return {
          text: `உங்கள் நிலத்தின் அளவுகள் மற்றும் குடும்பத்தின் தேவைகளுக்கேற்ப 100% வாஸ்து முறைப்படி ஹவுஸ் பிளான் வரைந்து தருகிறோம். அரசு அனுமதிக்கு தேவையான வரைபடங்களையும் தயார் செய்து தருகிறோம்.`,
          actions: [
            { label: 'விசாரணை படிவம்', action: 'quote' },
            { label: 'வாட்ஸ்அப்பில் நில அளவு அனுப்ப', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம், எனக்கு புதிய வீட்டு வரைபடம் (House Plan) தேவை.') }
          ]
        };
      }
      return {
        text: `We design 100% Vastu-compliant custom architectural house plans tailored to your plot dimensions, natural ventilation, and family requirements. We also provide municipal sanction blueprints.`,
        actions: [
          { label: 'Send Plot Size', action: 'quote' },
          { label: 'WhatsApp Architect', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, I need a house plan design.') }
        ]
      };
    }

    // 3. 3D elevation
    if (q.includes('elevation') || q.includes('3d') || q.includes('எலிவேஷன்') || q.includes('தோற்றம்') || q.includes('3டி') || q.includes('render')) {
      if (isTa) {
        return {
          text: `கட்டுமானம் தொடங்குவதற்கு முன்பே உங்கள் வீடு நேரில் எப்படி இருக்கும் என்பதை அல்ட்ரா-ஹெச்டி (Ultra-HD) 3D எலிவேஷனாக வடிவமைத்து தருகிறோம். எங்கள் சமீபத்திய திட்டங்களின் புகைப்படங்களை இணையதளத்தில் பார்க்கலாம்!`,
          actions: [
            { label: '3D புகைப்படங்கள் பார்க்க', action: 'gallery' },
            { label: '3D எலிவேஷன் ஆலோசனை', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம், எனக்கு 3D எலிவேஷன் டிசைன் தேவை.') }
          ]
        };
      }
      return {
        text: `We create ultra-realistic 3D exterior elevations so you can visualize stone cladding, colors, balconies, and lighting before construction starts. Check out our 'Visualized in 3D vs Built in Reality' gallery!`,
        actions: [
          { label: 'View 3D Works', action: 'gallery' },
          { label: 'Request 3D Design', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, I need a 3D elevation design.') }
        ]
      };
    }

    // 4. Construct house / Construction
    if (q.includes('construct') || q.includes('build') || q.includes('கட்ட') || q.includes('வீடு கட்ட') || q.includes('கட்டுமானம்') || q.includes('கட்டடம்')) {
      if (isTa) {
        return {
          text: `சங்கரன்கோவில் மற்றும் தென்காசி சுற்றுவட்டாரப் பகுதிகளில் அஸ்திவாரம் முதல் வர்ணம் பூசுதல் வரை முழுப் பொறுப்பேற்று தரமான கட்டுமானப் பொருட்களைப் பயன்படுத்தி வீடுகளை கட்டித் தருகிறோம்.`,
          actions: [
            { label: 'அலுவலகம் அழைக்க', action: 'call', url: 'tel:+919003443196' },
            { label: 'வாட்ஸ்அப் தொடர்பு', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம், நான் சங்கரன்கோவிலில் புதிய வீடு கட்ட விரும்புகிறேன்.') }
          ]
        };
      }
      return {
        text: `From site soil assessment and deep raft foundation to structural framework and turnkey handover, we execute residential construction across Sankarankovil and Tenkasi with dedicated engineers on site.`,
        actions: [
          { label: 'Call Engineer', action: 'call', url: 'tel:+919003443196' },
          { label: 'WhatsApp Enquiry', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, I want to construct a new house in Tenkasi district.') }
        ]
      };
    }

    // 5. Cost per sq.ft / Square Feet Rate
    if (q.includes('sq.ft') || q.includes('sqft') || q.includes('per sq') || q.includes('square feet') || q.includes('சதுர அடி') || q.includes('கட்டணம்')) {
      if (isTa) {
        return {
          text: `<strong>கட்டுமான சதுர அடி செலவு விவரம்:</strong><br>
          • <strong>Standard Package:</strong> ₹1,850 - ₹2,100 / sq.ft<br>
          • <strong>Premium Package:</strong> ₹2,200 - ₹2,500 / sq.ft<br>
          • <strong>Luxury Architectural Villa:</strong> ₹2,600+ / sq.ft<br>
          <em>*நிலத்தின் மண் தன்மை, அஸ்திவார ஆழம் மற்றும் உட்புற அலங்காரப் பொருட்களைப் பொறுத்து இறுதி மதிப்பீடு மாறுபடும். இலவச BOQ மதிப்பீடு பெற எங்களை அணுகவும்.</em>`,
          actions: [
            { label: 'மதிப்பீடு கோர', action: 'quote' },
            { label: 'வாட்ஸ்அப்பில் விலை விவரம் கேட்க', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம், சதுர அடி கட்டுமான விலை விவரங்கள் (Sq.ft cost) அறிய விரும்புகிறேன்.') }
          ]
        };
      }
      return {
        text: `<strong>Construction Cost Per Sq.Ft (Approximate):</strong><br>
        • <strong>Standard Residential:</strong> ₹1,850 - ₹2,100 / sq.ft<br>
        • <strong>Premium Quality Villa:</strong> ₹2,200 - ₹2,500 / sq.ft<br>
        • <strong>Luxury Architectural Build:</strong> ₹2,600+ / sq.ft<br>
        <em>*Final cost depends on foundation depth (soil test), floor count, and custom finishings (teak wood, granite, tiles, sanitaryware).</em>`,
        actions: [
          { label: 'Get Itemized Estimate', action: 'quote' },
          { label: 'WhatsApp Pricing Query', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, please share construction cost per sq.ft details.') }
        ]
      };
    }

    // 6. Vastu Shastra
    if (q.includes('vastu') || q.includes('வாஸ்து') || q.includes('திசை') || q.includes('shastra')) {
      if (isTa) {
        return {
          text: `<strong>100% வாஸ்து முறைப்படி வடிவமைப்பு:</strong><br>
          ஆம்! நாங்கள் வரையும் அனைத்து வரைபடங்களும் பாரம்பரிய <strong>வாஸ்து சாஸ்திரத்தின்படி</strong> துல்லியமாக திட்டமிடப்படுகின்றன:<br>
          • <strong>தலைவாசல்:</strong> வடகிழக்கு / கிழக்கு (குபேரன் & இந்திரன் மூலை)<br>
          • <strong>மாஸ்டர் பெட்ரூம்:</strong> தென்மேற்கு (நைருதி மூலை)<br>
          • <strong>சமையலறை:</strong> தென்கிழக்கு (ஆக்னேயம்)<br>
          • <strong>பூஜை அறை:</strong> வடகிழக்கு (ஈசானியம்)<br>
          இயற்கையான காற்று மற்றும் வெளிச்சம் சமச்சீராக இருக்கும்படி வடிவமைக்கிறோம்.`,
          actions: [
            { label: 'வாஸ்து வரைபடம் கோர', action: 'quote' },
            { label: 'வாட்ஸ்அப் ஆலோசனை', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம், எனக்கு வாஸ்து முறைப்படியான வீட்டு வரைபடம் (Vastu House Plan) தேவை.') }
          ]
        };
      }
      return {
        text: `<strong>100% Vastu-Compliant Architectural Planning:</strong><br>
        Yes! Every house plan and 3D layout we design strictly follows traditional <strong>Vastu Shastra</strong> principles:<br>
        • <strong>Main Entrance:</strong> North-East / East (Kubera & Indra zones)<br>
        • <strong>Master Bedroom:</strong> South-West (Nainruthi zone)<br>
        • <strong>Kitchen:</strong> South-East (Agni zone)<br>
        • <strong>Pooja Room:</strong> North-East (Eshanya zone)<br>
        Balanced with modern space engineering, cross-ventilation, and natural daylight.`,
        actions: [
          { label: 'Request Vastu Plan', action: 'quote' },
          { label: 'WhatsApp Vastu Query', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, I need a 100% Vastu compliant house plan.') }
        ]
      };
    }

    // 7. Timeline / Duration
    if (q.includes('how long') || q.includes('duration') || q.includes('time') || q.includes('months') || q.includes('காலம்') || q.includes('எவ்வளவு காலம்') || q.includes('மாதம்') || q.includes('எவ்வளவு நாள்')) {
      if (isTa) {
        return {
          text: `<strong>கட்டுமான பணிக்கான கால அளவு:</strong><br>
          • <strong>தனி வீடு (Ground Floor):</strong> 5 முதல் 7 மாதங்கள்<br>
          • <strong>அடுக்குமாடி வீடு (G+1 Villa):</strong> 7 முதல் 9 மாதங்கள்<br>
          • <strong>ஹவுஸ் பிளான் & 3D எலிவேஷன்:</strong> 3 முதல் 5 வேலை நாட்கள்<br>
          ஒவ்வொரு கட்டப் பணிகளுக்கும் திட்டமிடப்பட்ட அட்டவணையுடன் வாடிக்கையாளருக்கு வீடியோ அப்டேட்கள் வழங்கப்படுகின்றன.`,
          actions: [
            { label: 'கட்டுமான திட்டமிடல்', action: 'quote' },
            { label: 'வாட்ஸ்அப் தொடர்பு', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம், வீடு கட்டி முடிக்க ஆகும் கால அவகாசம் பற்றி அறிய விரும்புகிறேன்.') }
          ]
        };
      }
      return {
        text: `<strong>Project Construction Timeline:</strong><br>
        • <strong>Single Storey (Ground Floor):</strong> 5 - 7 Months<br>
        • <strong>G+1 Duplex / Villa:</strong> 7 - 9 Months<br>
        • <strong>House Plan & 3D Elevation Blueprint:</strong> 3 - 5 Working Days<br>
        We work with milestone-based timelines and provide weekly site video progress updates so you can track progress seamlessly.`,
        actions: [
          { label: 'Plan My Construction', action: 'quote' },
          { label: 'WhatsApp Timeline', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, what is the construction timeline for a house?') }
        ]
      };
    }

    // 8. Bank Loan & Municipal Approval
    if (q.includes('loan') || q.includes('bank') || q.includes('approval') || q.includes('sanction') || q.includes('கடன்') || q.includes('அனுமதி') || q.includes('வங்கி') || q.includes('அப்ரூவல்')) {
      if (isTa) {
        return {
          text: `<strong>வங்கி கடன் & அரசு கட்டிட அனுமதி:</strong><br>
          ஆம்! வீடு கட்டுவதற்கான <strong>வங்கி கடன் (Home Loan)</strong> பெற தேவையான:<br>
          • பொறியாளர் மதிப்பீடு (Chartered Engineer Detailed Estimate / BOQ)<br>
          • நகராட்சி / ஊராட்சி கட்டிட அனுமதி வரைபடம் (Municipal Sanction Plan)<br>
          • அஸ்திவார கட்டமைப்பு வரைபடம் (Structural Stability Blueprints)<br>
          அனைத்து முன்னணி வங்கிகளுக்கும் (SBI, Canara, Indian Bank, HDFC, ICICI) ஏற்ற முறையில் தயார் செய்து தருகிறோம்.`,
          actions: [
            { label: 'வங்கி மதிப்பீடு பெற', action: 'quote' },
            { label: 'வாட்ஸ்அப் ஆலோசனை', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம், எனக்கு வங்கி கடனுக்கான கட்டிட மதிப்பீடு (Bank Loan Estimate) தேவை.') }
          ]
        };
      }
      return {
        text: `<strong>Bank Home Loan & Municipal Sanctions:</strong><br>
        Yes! We provide complete documentation required for Home Construction Loans across all major banks (SBI, HDFC, Canara, Indian Bank, etc.):<br>
        • Detailed Itemized Structural Estimation & BOQ<br>
        • Municipal / Panchayat Approved Sanction Drawings<br>
        • Structural Stability Certificate & Blueprints`,
        actions: [
          { label: 'Request Bank Estimate', action: 'quote' },
          { label: 'WhatsApp Guidance', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, I need bank loan architectural estimate documents.') }
        ]
      };
    }

    // 9. Renovation & Remodeling
    if (q.includes('renovat') || q.includes('remodel') || q.includes('alter') || q.includes('புதுப்பிக்க') || q.includes('பழைய வீடு') || q.includes('மறுவடிவமைப்பு')) {
      if (isTa) {
        return {
          text: `<strong>வீடு புதுப்பித்தல் & கூடுதல் தளம் அமைத்தல்:</strong><br>
          ஆம்! பழைய வீடுகளை நவீன தரத்திற்கு மாற்றுதல்:<br>
          • முதல் தளம் கூடுதல் கட்டுமானம் (Floor Extension)<br>
          • நவீன முகப்பு தோற்றம் (Modern 3D Elevation Facade Update)<br>
          • கூரை சீரமைப்பு & நீர்க்கசிவு தடுப்பு (Waterproofing)<br>
          • டைல்ஸ், சமையலறை மற்றும் கழிவறை நவீனமயமாக்கல்<br>
          அனைத்து பணிகளையும் பொறியியல் மேற்பார்வையில் செய்கிறோம்.`,
          actions: [
            { label: 'புதுப்பித்தல் ஆலோசனை', action: 'quote' },
            { label: 'வாட்ஸ்அப்பில் போட்டோ அனுப்ப', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம், எனது பழைய வீட்டை புதுப்பிக்க (Renovation) ஆலோசனை தேவை.') }
          ]
        };
      }
      return {
        text: `<strong>House Renovation, Extension & Remodeling:</strong><br>
        Yes! We specialize in transforming existing residences into modern masterpieces:<br>
        • Floor additions & terrace extensions<br>
        • Modern exterior facade remodeling with 3D elevations<br>
        • Structural crack repair & chemical waterproofing<br>
        • Kitchen modernization, premium vitrified tiling & sanitary upgrades`,
        actions: [
          { label: 'Enquire for Renovation', action: 'quote' },
          { label: 'WhatsApp Photos', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, I need house renovation and remodeling consultation.') }
        ]
      };
    }

    // 10. Interior Design & Modular Kitchen
    if (q.includes('interior') || q.includes('kitchen') || q.includes('modular') || q.includes('wardrobe') || q.includes('உள்துறை') || q.includes('கிச்சன்') || q.includes('அலமாரி')) {
      if (isTa) {
        return {
          text: `<strong>நவீன உள்துறை வடிவமைப்பு (Interior Design):</strong><br>
          • <strong>Modular Kitchen:</strong> அக்ரிலிக் / மெரைன் பிளைவுட் மாடுலர் சமையலறை<br>
          • <strong>Living Room TV Units:</strong> பிரீமியம் லூவர்ஸ் மற்றும் எல்இடி டிசைன்<br>
          • <strong>False Ceiling:</strong> ஜிப்சம் ஃபால்ஸ் சீலிங் & ஆம்பியண்ட் லைட்டிங்<br>
          • <strong>Wardrobes:</strong> படுக்கையறை அலமாரிகள் மற்றும் டிரஸ்ஸிங் டேபிள்<br>
          உங்கள் ரசனைக்கேற்ப 3D மாதிரியுடன் தயார் செய்து தருகிறோம்.`,
          actions: [
            { label: 'உள்துறை படங்கள் பார்க்க', action: 'gallery' },
            { label: 'வாட்ஸ்அப் இன்டீரியர் ஆலோசனை', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம், எனக்கு மாடுலர் கிச்சன் மற்றும் இன்டீரியர் டிசைன் விவரங்கள் தேவை.') }
          ]
        };
      }
      return {
        text: `<strong>Bespoke Interior Design & Modular Living:</strong><br>
        • <strong>Custom Modular Kitchens:</strong> Marine-ply/acrylic soft-close cabinets<br>
        • <strong>Living Room Media Walls:</strong> Fluted panels, marble-finish backdrops & LED profiling<br>
        • <strong>Architectural False Ceilings:</strong> Gypsum ceilings with recessed warm lighting<br>
        • <strong>Custom Bedroom Wardrobes:</strong> Sliding & hinge storage with dresser units`,
        actions: [
          { label: 'View Interior Gallery', action: 'gallery' },
          { label: 'WhatsApp Interior Team', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, I need modular kitchen and interior design service.') }
        ]
      };
    }

    // 11. Office location / address
    if (q.includes('location') || q.includes('where') || q.includes('office') || q.includes('address') || q.includes('எங்கு') || q.includes('முகவரி') || q.includes('இடம்') || q.includes('எங்கே')) {
      if (isTa) {
        return {
          text: `<strong>மதுரா பில்டர்ஸ் & ஆர்கிடெக்ட்ஸ் அலுவலக முகவரி:</strong><br>
          #9, முப்பிடாதி அம்மன் காம்ப்ளக்ஸ், முதல் தளம்,<br>
          கீதாலயா தியேட்டர் ரோடு (ஹட்சன் டெய்ரி எதிர்புறம்),<br>
          சங்கரன்கோவில், தென்காசி மாவட்டம் - 627756, தமிழ்நாடு.`,
          actions: [
            { label: 'Google Maps வழிகாட்டி', action: 'maps', url: 'https://www.google.com/maps/dir/?api=1&destination=9.1798265%2C77.5386246' },
            { label: 'அழைக்க (+91 90034 43196)', action: 'call', url: 'tel:+919003443196' }
          ]
        };
      }
      return {
        text: `<strong>Our Office Address:</strong><br>
        #9, Muppidathi Amman Complex, Upstairs,<br>
        Opposite Hatsun Dairy, Near Geethalaya Theatre,<br>
        Sankarankovil, Tenkasi District, Tamil Nadu - 627756, India.`,
        actions: [
          { label: 'Directions on Google Maps', action: 'maps', url: 'https://www.google.com/maps/dir/?api=1&destination=9.1798265%2C77.5386246' },
          { label: 'Call Office', action: 'call', url: 'tel:+919003443196' }
        ]
      };
    }

    // 6. Contact / Phone
    if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('call') || q.includes('தொடர்பு') || q.includes('எண்') || q.includes('போன்') || q.includes('அழைக்க')) {
      if (isTa) {
        return {
          text: `எங்களை தொடர்பு கொள்ள நேரடி எண்கள்:<br>
          📞 <strong>+91 90034 43196</strong><br>
          📞 <strong>+91 99626 26231</strong><br>
          💬 வாட்ஸ்அப்: <strong>+91 90034 43196</strong>`,
          actions: [
            { label: 'முதன்மை எண் அழைக்க', action: 'call', url: 'tel:+919003443196' },
            { label: 'வாட்ஸ்அப் அரட்டை', action: 'whatsapp', url: 'https://wa.me/919003443196' }
          ]
        };
      }
      return {
        text: `You can reach our team directly at:<br>
        📞 Primary: <strong>+91 90034 43196</strong><br>
        📞 Secondary: <strong>+91 99626 26231</strong><br>
        💬 WhatsApp: <strong>+91 90034 43196</strong>`,
        actions: [
          { label: 'Call +91 90034 43196', action: 'call', url: 'tel:+919003443196' },
          { label: 'Chat on WhatsApp', action: 'whatsapp', url: 'https://wa.me/919003443196' }
        ]
      };
    }

    // 7. Quotation / Pricing / Cost
    if (q.includes('quote') || q.includes('quotation') || q.includes('cost') || q.includes('price') || q.includes('rate') || q.includes('budget') || q.includes('மதிப்பீடு') || q.includes('செலவு') || q.includes('விலை') || q.includes('பட்ஜெட்')) {
      if (isTa) {
        return {
          text: `கட்டுமான மற்றும் வரைபடங்களுக்கான உத்தேச செலவு நிலத்தின் அளவு, மண் தன்மை, தளங்களின் எண்ணிக்கை மற்றும் தேர்ந்தெடுக்கப்படும் பொருட்களைப் பொறுத்து மாறுபடும். துல்லியமான இலவச மதிப்பீடு பெற உங்கள் நில அளவுகளுடன் தொடர்பு கொள்ளவும்.`,
          actions: [
            { label: 'மதிப்பீடு படிவம் நிரப்ப', action: 'quote' },
            { label: 'வாட்ஸ்அப்பில் விலை விவரம் கேட்க', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம், எனது புதிய வீட்டிற்கான கட்டுமான செலவு மதிப்பீடு (Quotation) பெற விரும்புகிறேன்.') }
          ]
        };
      }
      return {
        text: `Construction and design costs vary depending on plot dimensions, soil foundation requirements, number of floors, and material specifications. Submit your details for a transparent itemized quotation.`,
        actions: [
          { label: 'Submit Plot Enquiry', action: 'quote' },
          { label: 'WhatsApp Quotation', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, I would like to request an architectural & construction quotation.') }
        ]
      };
    }

    // 8. Projects / Work
    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('திட்டம்') || q.includes('வேலை')) {
      if (isTa) {
        return {
          text: `சங்கரன்கோவில் மற்றும் தென்காசி மாவட்டத்தில் நாங்கள் நிறைவேற்றிய மற்றும் நடைபெற்று வரும் பல அடுக்குமாடி மற்றும் தனி வீடுகளின் புகைப்படங்களை இணையதளத்தில் காணலாம்.`,
          actions: [
            { label: 'திட்டங்களை காண்க', action: 'projects' },
            { label: 'வாட்ஸ்அப் ஆலோசனை', action: 'whatsapp', url: 'https://wa.me/919003443196' }
          ]
        };
      }
      return {
        text: `Explore our portfolio of completed and ongoing residential projects, contemporary villas, and 3D elevations across Sankarankovil and Tenkasi District.`,
        actions: [
          { label: 'View Projects', action: 'projects' },
          { label: 'WhatsApp Consultation', action: 'whatsapp', url: 'https://wa.me/919003443196' }
        ]
      };
    }

    // Default polite response
    if (isTa) {
      return {
        text: `உங்கள் கேள்விக்கு நன்றி. நீங்கள் வீட்டின் வரைபடம், 3D எலிவேஷன் அல்லது புதிய கட்டிட கட்டுமானம் தொடர்பாக சங்கரன்கோவிலில் உள்ள எங்கள் அலுவலகத்தை நேரடியாகவோ அல்லது வாட்ஸ்அப் மூலமாகவோ தொடர்பு கொள்ளலாம்.`,
        actions: [
          { label: 'விசாரணை படிவம்', action: 'quote' },
          { label: 'வாட்ஸ்அப் அனுப்ப', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('வணக்கம் Madhura Builders, எனது கேள்விக்கு வழிகாட்டவும்: ' + query) }
        ]
      };
    }

    return {
      text: `Thank you for your message. For personalized architectural planning, 3D elevations, or building construction in Sankarankovil and Tenkasi, please contact our team directly or send your requirements on WhatsApp.`,
      actions: [
        { label: 'Submit Enquiry', action: 'quote' },
        { label: 'WhatsApp Us', action: 'whatsapp', url: 'https://wa.me/919003443196?text=' + encodeURIComponent('Hello Madhura Builders, I have an enquiry: ' + query) }
      ]
    };
  }

  formatMessage(text?: string): string {
    if (!text) return '';
    return text.replace(/\n/g, '<br>');
  }

  private saveSession(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      try {
        sessionStorage.setItem('madhura_chat_session', JSON.stringify(this.messages));
      } catch (err) {}
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }
}
