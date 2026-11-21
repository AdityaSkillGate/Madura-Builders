import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  HostListener,
  ChangeDetectorRef,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

gsap.registerPlugin(ScrollTrigger);

interface StageItem {
  codeKey: string;
  nameKey: string;
  range: [number, number];
}

@Component({
  selector: 'app-construction-hero',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div #heroWrapper class="construction-hero-container">
      <!-- Pinned Viewport Section -->
      <div #pinnedViewport class="pinned-viewport">
        <!-- Canvas Rendering Layer (100% Full Image View: Clouds, Top, Building & Ground) -->
        <canvas #canvasElement class="animation-canvas"></canvas>

        <!-- Floating Architectural Branding Overlay (Visible at start, hidden mid-construction, proudly restored on completion) -->
        <div class="hero-brand-overlay" [class.fade-out]="progress > 0.15 && progress < 0.88" [class.completed]="progress >= 0.88">
          <div class="brand-tag anim-stagger-1">
            <span class="pulse-dot"></span>
            <span>{{ progress >= 0.88 ? (translationService.isTamil() ? 'கட்டிடக்கலையின் உச்சம் • நிஜமான கனவு இல்லம்' : 'ARCHITECTURAL MASTERPIECE • BUILT INTO REALITY') : ('hero.badge' | translate) }}</span>
          </div>

          <h1 class="hero-title">
            <span class="title-line anim-stagger-2">{{ 'hero.title_line1' | translate }}</span>
            <span class="title-line anim-stagger-3">{{ 'hero.title_line2' | translate }}</span>
            <span class="title-line orange-text anim-stagger-4">{{ 'hero.title_line3' | translate }}</span>
            <span class="title-accent-bar anim-stagger-5"></span>
          </h1>

          <p class="hero-subtitle anim-stagger-6">
            {{ progress >= 0.88 ? (translationService.isTamil() ? 'அடித்தளம் முதல் அழகிய மேற்கட்டுமானம் வரை — நேர்த்தியுடன் உருவாக்கப்பட்ட கட்டடக் கலை.' : 'Thoughtful Designs. Quality Construction. Beautiful Homes. Operating in Sankarankovil & Tenkasi District.') : ('hero.subtitle' | translate) }}
          </p>

          <!-- Interactive Action Controls (Auto Play / Replay + Explore / Scroll Prompt) -->
          <div class="hero-cta-group anim-stagger-7">
            <!-- Play / Pause / Replay Button -->
            <button 
              class="hero-play-btn" 
              (click)="toggleAutoPlay($event)" 
              [class.active]="isAutoPlaying"
              type="button"
              [attr.aria-label]="getPlayButtonTitle()">
              <span class="btn-play-icon">
                <svg *ngIf="!isAutoPlaying && progress < 0.88" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <svg *ngIf="isAutoPlaying" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
                <svg *ngIf="!isAutoPlaying && progress >= 0.88" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
                </svg>
              </span>
              <span class="btn-text">
                {{ isAutoPlaying ? ('hero.pause' | translate) : (progress >= 0.88 ? ('hero.replay' | translate) : ('hero.autoplay' | translate)) }}
              </span>
            </button>

            <!-- Scroll to Construct (during construction) OR Explore Masterpiece (upon completion) -->
            <div 
              *ngIf="progress < 0.88"
              class="scroll-indicator" 
              (click)="toggleAutoPlay($event)" 
              role="button" 
              tabindex="0" 
              title="Scroll mouse wheel to construct or inspect">
              <div class="mouse-icon">
                <div class="mouse-wheel"></div>
              </div>
              <span class="scroll-label">
                {{ isAutoPlaying ? 'Constructing...' : ('hero.scroll_prompt' | translate) }}
              </span>
            </div>

            <button 
              *ngIf="progress >= 0.88"
              class="hero-explore-btn" 
              (click)="scrollToNext()" 
              type="button" 
              title="Explore Architecture & Services">
              <span>{{ translationService.isTamil() ? 'சேவைகளை காண்க' : 'Explore Masterpiece' }}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Live Step-by-Step Construction Phase HUD -->
        <div class="construction-hud visible">
          <div class="hud-phase-info">
            <span class="hud-phase-badge">{{ getStageCode(currentStage) }}</span>
            <span class="hud-phase-name">{{ getStageName(currentStage) }}</span>
          </div>

          <div class="hud-progress-track" (click)="seekProgress($event)" title="Click anywhere to jump to that construction phase">
            <div class="hud-progress-fill" [style.width.%]="progressPercentage"></div>
          </div>

          <div class="hud-actions">
            <span class="hud-percent">{{ progressPercentage }}%</span>

            <!-- Speed Toggle Button -->
            <button 
              class="hud-speed-btn" 
              (click)="cycleSpeed($event)" 
              [title]="'Playback Speed: ' + currentSpeed + 'x (Click to cycle)'"
              type="button">
              {{ currentSpeed }}x
            </button>

            <!-- HUD Play/Pause Button -->
            <button 
              class="hud-play-btn" 
              (click)="toggleAutoPlay($event)" 
              [class.playing]="isAutoPlaying" 
              [attr.aria-label]="getPlayButtonTitle()" 
              [title]="getPlayButtonTitle()"
              type="button">
              <svg *ngIf="!isAutoPlaying && progress < 0.88" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <svg *ngIf="isAutoPlaying" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
              <svg *ngIf="!isAutoPlaying && progress >= 0.88" width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
              </svg>
              <span>{{ isAutoPlaying ? 'PAUSE' : (progress >= 0.88 ? 'REPLAY' : 'AUTO PLAY') }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .construction-hero-container {
      position: relative;
      width: 100%;
      background-color: #081325;
      overflow: hidden;
    }

    .pinned-viewport {
      position: relative;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #081325;
    }

    .animation-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      z-index: 1;
    }

    /* Floating Architectural Branding Overlay */
    .hero-brand-overlay {
      position: absolute;
      top: clamp(80px, 11vh, 110px);
      left: clamp(20px, 4vw, 60px);
      text-align: left;
      z-index: 10;
      max-width: clamp(340px, 35vw, 500px);
      padding: clamp(18px, 2.2vw, 26px) clamp(20px, 2.8vw, 30px);
      background: linear-gradient(145deg, rgba(8, 19, 37, 0.88) 0%, rgba(8, 19, 37, 0.70) 55%, rgba(8, 19, 37, 0.45) 100%);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: 0 16px 45px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(235, 90, 30, 0.18);
      pointer-events: none;
      transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-brand-overlay.fade-out {
      opacity: 0;
      transform: translateY(-16px);
      pointer-events: none;
    }

    /* Cinematic Line-by-Line Slide from Left to Right */
    @keyframes lineSlideLeftToRight {
      0% {
        opacity: 0;
        transform: translateX(-85px);
      }
      65% {
        opacity: 1;
        transform: translateX(4px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes expandBarLeftToRight {
      0% {
        opacity: 0;
        transform: scaleX(0);
      }
      100% {
        opacity: 1;
        transform: scaleX(1);
      }
    }

    /* Staggered Line-by-Line Entrance (Left to Right) */
    .anim-stagger-1 {
      animation: lineSlideLeftToRight 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.10s both;
      will-change: transform, opacity;
    }

    .anim-stagger-2 {
      animation: lineSlideLeftToRight 0.80s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
      will-change: transform, opacity;
    }

    .anim-stagger-3 {
      animation: lineSlideLeftToRight 0.80s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both;
      will-change: transform, opacity;
    }

    .anim-stagger-4 {
      animation: lineSlideLeftToRight 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.60s both;
      will-change: transform, opacity;
    }

    .anim-stagger-5 {
      animation: expandBarLeftToRight 0.70s cubic-bezier(0.16, 1, 0.3, 1) 0.76s both;
      transform-origin: left center;
      will-change: transform, opacity;
    }

    .anim-stagger-6 {
      animation: lineSlideLeftToRight 0.80s cubic-bezier(0.16, 1, 0.3, 1) 0.90s both;
      will-change: transform, opacity;
    }

    .anim-stagger-7 {
      animation: lineSlideLeftToRight 0.80s cubic-bezier(0.16, 1, 0.3, 1) 1.08s both;
      will-change: transform, opacity;
    }

    /* Re-trigger line-by-line slide animation on completion */
    .hero-brand-overlay.completed .anim-stagger-1 {
      animation: lineSlideLeftToRight 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both;
    }

    .hero-brand-overlay.completed .anim-stagger-2 {
      animation: lineSlideLeftToRight 0.80s cubic-bezier(0.16, 1, 0.3, 1) 0.20s both;
    }

    .hero-brand-overlay.completed .anim-stagger-3 {
      animation: lineSlideLeftToRight 0.80s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
    }

    .hero-brand-overlay.completed .anim-stagger-4 {
      animation: lineSlideLeftToRight 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.50s both;
    }

    .hero-brand-overlay.completed .anim-stagger-5 {
      animation: expandBarLeftToRight 0.70s cubic-bezier(0.16, 1, 0.3, 1) 0.65s both;
    }

    .hero-brand-overlay.completed .anim-stagger-6 {
      animation: lineSlideLeftToRight 0.80s cubic-bezier(0.16, 1, 0.3, 1) 0.78s both;
    }

    .hero-brand-overlay.completed .anim-stagger-7 {
      animation: lineSlideLeftToRight 0.80s cubic-bezier(0.16, 1, 0.3, 1) 0.92s both;
    }

    .brand-tag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 30px;
      background: rgba(8, 19, 37, 0.85);
      border: 1px solid rgba(235, 90, 30, 0.55);
      color: #FFFFFF;
      font-size: 11px;
      letter-spacing: 1.5px;
      font-weight: 700;
      margin-bottom: 12px;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background-color: #EB5A1E;
      box-shadow: 0 0 8px #EB5A1E;
      animation: pulseDotAnim 2s infinite ease-in-out;
    }

    @keyframes pulseDotAnim {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(0.8); opacity: 0.5; }
    }

    /* Clean, Modern, Razor-Sharp Architectural Typography */
    .hero-title {
      font-family: 'Outfit', 'Montserrat', var(--font-heading), system-ui, sans-serif;
      font-size: clamp(2.3rem, 4.2vw, 3.8rem);
      font-weight: 800;
      line-height: 1.08;
      letter-spacing: 0.5px;
      margin-bottom: 14px;
      text-transform: uppercase;
    }

    .title-line {
      display: block;
      color: #FFFFFF;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
      will-change: transform, opacity;
      transform-origin: left center;
    }

    /* Radiant, Crystal-Clear Construction Orange Accent (No dark/muddy blur!) */
    .orange-text {
      color: #FF5A1E;
      display: inline-block;
      text-shadow: 0 2px 14px rgba(255, 90, 30, 0.45), 0 2px 6px rgba(0, 0, 0, 0.8);
      will-change: transform, opacity;
      transform-origin: left center;
    }

    .title-accent-bar {
      display: block;
      width: 75px;
      height: 4px;
      background: linear-gradient(90deg, #FF5A1E 0%, #FF8A50 70%, transparent 100%);
      border-radius: 4px;
      margin-top: 10px;
      box-shadow: 0 0 12px rgba(255, 90, 30, 0.65);
      transform-origin: left center;
    }

    .hero-subtitle {
      font-family: 'Inter', var(--font-body), sans-serif;
      font-size: clamp(13px, 1.15vw, 15px);
      color: #E2E8F0;
      line-height: 1.6;
      margin: 0 0 20px 0;
      font-weight: 450;
      text-shadow: 0 1px 6px rgba(0, 0, 0, 0.85);
      max-width: 440px;
      will-change: transform, opacity;
      transform-origin: left center;
    }

    /* Hero CTA Group */
    .hero-cta-group {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      pointer-events: auto;
    }

    .hero-play-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 30px;
      background: #EB5A1E;
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.8px;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(235, 90, 30, 0.45);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-play-btn:hover {
      transform: translateY(-2px);
      background: #FF6A28;
      box-shadow: 0 8px 25px rgba(235, 90, 30, 0.65);
    }

    .hero-play-btn.active {
      background: rgba(11, 43, 99, 0.92);
      border-color: #EB5A1E;
      box-shadow: 0 0 16px rgba(235, 90, 30, 0.55);
    }

    .btn-play-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .scroll-indicator {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 8px 16px;
      border-radius: 20px;
      background: rgba(8, 19, 37, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(8px);
      transition: all 0.25s ease;
      width: fit-content;
    }

    .scroll-indicator:hover {
      background: rgba(235, 90, 30, 0.35);
      border-color: rgba(235, 90, 30, 0.7);
      transform: translateY(-2px);
    }

    .hero-explore-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 30px;
      background: rgba(8, 19, 37, 0.88);
      border: 1px solid rgba(235, 90, 30, 0.75);
      color: #FFFFFF;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.6px;
      cursor: pointer;
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .hero-explore-btn:hover {
      background: #EB5A1E;
      border-color: #FF8A50;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(235, 90, 30, 0.55);
    }

    .mouse-icon {
      width: 18px;
      height: 26px;
      border-radius: 10px;
      border: 1.5px solid rgba(255, 255, 255, 0.85);
      display: flex;
      justify-content: center;
      padding-top: 4px;
      transition: border-color 0.2s;
    }

    .scroll-indicator:hover .mouse-icon {
      border-color: #EB5A1E;
    }

    .mouse-wheel {
      width: 3px;
      height: 6px;
      background-color: #EB5A1E;
      border-radius: 2px;
      animation: wheelRoll 1.6s ease-in-out infinite;
    }

    @keyframes wheelRoll {
      0% { transform: translateY(0); opacity: 1; }
      60% { transform: translateY(6px); opacity: 0.2; }
      100% { transform: translateY(0); opacity: 1; }
    }

    .scroll-label {
      font-size: 11px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.95);
      font-weight: 600;
    }

    /* Live Construction Phase HUD */
    .construction-hud {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 8px 18px;
      border-radius: 40px;
      background: rgba(8, 19, 37, 0.94);
      border: 1px solid rgba(235, 90, 30, 0.45);
      backdrop-filter: blur(14px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.65);
      pointer-events: auto;
      transition: opacity 0.4s ease;
    }

    .hud-phase-info {
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
    }

    .hud-phase-badge {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 1.2px;
      color: #EB5A1E;
      background: rgba(235, 90, 30, 0.15);
      padding: 3px 8px;
      border-radius: 12px;
      border: 1px solid rgba(235, 90, 30, 0.35);
    }

    .hud-phase-name {
      font-size: 12px;
      font-weight: 600;
      color: #FFFFFF;
      max-width: 260px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hud-progress-track {
      width: 120px;
      height: 6px;
      background: rgba(255, 255, 255, 0.18);
      border-radius: 3px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
    }

    .hud-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #EB5A1E, #FF8A50);
      border-radius: 3px;
      transition: width 0.08s linear;
      box-shadow: 0 0 8px rgba(235, 90, 30, 0.6);
    }

    .hud-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .hud-percent {
      font-size: 11px;
      font-weight: 700;
      color: #E2E8F0;
      min-width: 32px;
      font-variant-numeric: tabular-nums;
    }

    .hud-speed-btn {
      padding: 3px 8px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.12);
      border: 1px solid rgba(255, 255, 255, 0.25);
      color: #FFB088;
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .hud-speed-btn:hover {
      background: rgba(235, 90, 30, 0.4);
      color: #FFFFFF;
      border-color: #EB5A1E;
    }

    .hud-play-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 12px;
      border-radius: 16px;
      background: rgba(235, 90, 30, 0.25);
      border: 1px solid rgba(235, 90, 30, 0.6);
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .hud-play-btn:hover {
      background: rgba(235, 90, 30, 0.9);
      color: #FFFFFF;
      transform: scale(1.04);
    }

    .hud-play-btn.playing {
      background: rgba(235, 90, 30, 0.85);
      border-color: #FF8A50;
      box-shadow: 0 0 12px rgba(235, 90, 30, 0.5);
    }

    @media (max-width: 768px) {
      .hero-brand-overlay {
        top: 75px;
        left: 16px;
        right: 16px;
        max-width: calc(100vw - 32px);
      }
      .hero-title {
        font-size: 1.65rem;
      }
      .hero-subtitle {
        font-size: 12.5px;
      }
      .construction-hud {
        bottom: 16px;
        padding: 6px 12px;
        gap: 8px;
        max-width: calc(100vw - 32px);
      }
      .hud-phase-name {
        max-width: 110px;
      }
      .hud-progress-track {
        width: 55px;
      }
    }
  `]
})
export class ConstructionHeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroWrapper') heroWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('pinnedViewport') pinnedViewport!: ElementRef<HTMLDivElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  translationService = inject(TranslationService);

  readonly totalFrames = 240;
  currentFrame = 1;
  progress = 0;
  progressPercentage = 0;

  // AUTO PLAY: Automatically active on visit
  isAutoPlaying = true;
  userExplicitlyPaused = false;
  currentSpeed = 1.0; // 1.0x, 1.5x, 2.0x

  private animationFrameId: number | null = null;
  private lastFrameTimestamp = 0;
  private readonly frameDurationMs = 1000 / 24; // 24fps smooth timelapse

  private resumeAutoPlayTimer: any = null;
  private isUserScrolling = false;
  private userScrollIdleTimer: any = null;

  readonly stages: StageItem[] = [
    { codeKey: 'stage.01.code', nameKey: 'stage.01.name', range: [0, 0.16] },
    { codeKey: 'stage.02.code', nameKey: 'stage.02.name', range: [0.16, 0.35] },
    { codeKey: 'stage.03.code', nameKey: 'stage.03.name', range: [0.35, 0.56] },
    { codeKey: 'stage.04.code', nameKey: 'stage.04.name', range: [0.56, 0.76] },
    { codeKey: 'stage.05.code', nameKey: 'stage.05.name', range: [0.76, 0.91] },
    { codeKey: 'stage.06.code', nameKey: 'stage.06.name', range: [0.91, 1.0] }
  ];

  currentStage: StageItem = this.stages[0];

  private images: HTMLImageElement[] = [];
  private scrollTriggerInstance: ScrollTrigger | null = null;
  private isBrowser: boolean;
  private cdr = inject(ChangeDetectorRef);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getStageCode(stage: StageItem): string {
    return this.translationService.t(stage.codeKey);
  }

  getStageName(stage: StageItem): string {
    return this.translationService.t(stage.nameKey);
  }

  getPlayButtonTitle(): string {
    if (this.isAutoPlaying) {
      return 'Pause construction animation';
    }
    if (this.progress >= 0.88 || this.currentFrame >= this.totalFrames) {
      return 'Replay construction from foundation';
    }
    return 'Start auto-play construction animation';
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    this.preloadFrames();
    this.setupCanvas();
    this.initScrollAnimation();

    // AUTO-CONSTRUCT ON VISIT: Starts constructing automatically right away!
    setTimeout(() => {
      if (!this.userExplicitlyPaused) {
        this.startAutoPlayLoop();
      }
    }, 250);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.resizeCanvas();
    }
  }

  // SCROLL TO CONSTRUCT: Manual wheel, touch, or key interactions scrub the construction
  @HostListener('window:wheel')
  onUserWheel(): void {
    this.handleUserManualScroll();
  }

  @HostListener('window:touchstart')
  onUserTouch(): void {
    this.handleUserManualScroll();
  }

  @HostListener('window:keydown', ['$event'])
  onUserKey(e: KeyboardEvent): void {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', 'Home', 'End'].includes(e.code)) {
      this.handleUserManualScroll();
    }
  }

  private handleUserManualScroll(): void {
    this.isUserScrolling = true;

    // Pause auto-play loop while actively scrolling
    this.stopAutoPlayLoop();

    if (this.userScrollIdleTimer) {
      clearTimeout(this.userScrollIdleTimer);
    }

    // When user stops scrolling for 1.4s, resume auto-play if not explicitly paused and not finished
    this.userScrollIdleTimer = setTimeout(() => {
      this.isUserScrolling = false;
      if (!this.userExplicitlyPaused && this.currentFrame < this.totalFrames && this.isWithinHeroSection()) {
        this.startAutoPlayLoop();
      }
    }, 1400);
  }

  private isWithinHeroSection(): boolean {
    if (!this.scrollTriggerInstance) return true;
    const y = window.scrollY;
    return y >= this.scrollTriggerInstance.start - 80 && y <= this.scrollTriggerInstance.end + 80;
  }

  /* ==========================================================================
     DIRECT CANVAS AUTO PLAY ENGINE (60fps requestAnimationFrame)
     ========================================================================== */

  startAutoPlayLoop(): void {
    this.stopAutoPlayLoop();
    this.isAutoPlaying = true;
    this.userExplicitlyPaused = false;
    this.lastFrameTimestamp = 0;

    // If already at or near the end, restart from frame 1
    if (this.currentFrame >= this.totalFrames || this.progress >= 0.98) {
      this.updateFrameState(1, 0);
    }

    const step = (timestamp: number) => {
      if (!this.isAutoPlaying) return;

      if (!this.lastFrameTimestamp) {
        this.lastFrameTimestamp = timestamp;
      }

      const elapsed = timestamp - this.lastFrameTimestamp;
      const targetInterval = this.frameDurationMs / this.currentSpeed;

      if (elapsed >= targetInterval) {
        this.lastFrameTimestamp = timestamp;

        if (this.currentFrame < this.totalFrames) {
          const nextFrame = this.currentFrame + 1;
          const nextProgress = (nextFrame - 1) / (this.totalFrames - 1);
          this.updateFrameState(nextFrame, nextProgress);
        } else {
          // Finished constructing! Hold on final completed building for 2.5s, then loop
          this.isAutoPlaying = false;
          this.animationFrameId = null;
          this.cdr.markForCheck();

          if (!this.userExplicitlyPaused) {
            setTimeout(() => {
              if (!this.userExplicitlyPaused && this.isWithinHeroSection()) {
                this.updateFrameState(1, 0);
                this.startAutoPlayLoop();
              }
            }, 2500);
          }
          return;
        }
      }

      this.animationFrameId = requestAnimationFrame(step);
    };

    this.animationFrameId = requestAnimationFrame(step);
    this.cdr.markForCheck();
  }

  stopAutoPlayLoop(): void {
    this.isAutoPlaying = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.cdr.markForCheck();
  }

  toggleAutoPlay(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    if (this.progress >= 0.88 && !this.isAutoPlaying) {
      // Replay from beginning
      this.userExplicitlyPaused = false;
      this.updateFrameState(1, 0);
      this.startAutoPlayLoop();
      this.cdr.markForCheck();
      return;
    }

    if (this.isAutoPlaying) {
      this.userExplicitlyPaused = true;
      this.stopAutoPlayLoop();
    } else {
      this.userExplicitlyPaused = false;
      this.startAutoPlayLoop();
    }
    this.cdr.markForCheck();
  }

  cycleSpeed(event: MouseEvent): void {
    event.stopPropagation();
    if (this.currentSpeed === 1.0) {
      this.currentSpeed = 1.5;
    } else if (this.currentSpeed === 1.5) {
      this.currentSpeed = 2.0;
    } else {
      this.currentSpeed = 1.0;
    }
    this.cdr.markForCheck();
  }

  seekProgress(event: MouseEvent): void {
    event.stopPropagation();
    const track = event.currentTarget as HTMLElement;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetFrame = Math.max(1, Math.min(this.totalFrames, Math.round(ratio * (this.totalFrames - 1)) + 1));

    this.updateFrameState(targetFrame, ratio);

    if (this.scrollTriggerInstance) {
      const scrollTarget = this.scrollTriggerInstance.start + ratio * (this.scrollTriggerInstance.end - this.scrollTriggerInstance.start);
      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }
    this.cdr.markForCheck();
  }

  private updateFrameState(frame: number, explicitProgress?: number): void {
    const clampedFrame = Math.max(1, Math.min(this.totalFrames, frame));
    this.currentFrame = clampedFrame;
    const p = explicitProgress !== undefined ? explicitProgress : (clampedFrame - 1) / (this.totalFrames - 1);
    this.progress = Math.max(0, Math.min(1, p));
    this.progressPercentage = Math.round(this.progress * 100);

    const stage = this.stages.find(s => this.progress >= s.range[0] && this.progress <= s.range[1]);
    if (stage) {
      this.currentStage = stage;
    }
    this.renderFrame(clampedFrame);
    this.cdr.markForCheck();
  }

  private preloadFrames(): void {
    this.images = new Array(this.totalFrames);

    // Load initial frame for instant display
    const firstImg = new Image();
    firstImg.src = this.getFramePath(1);
    firstImg.onload = () => {
      this.images[0] = firstImg;
      this.renderFrame(1);
    };

    // Load remaining frames asynchronously
    for (let i = 2; i <= this.totalFrames; i++) {
      const img = new Image();
      img.src = this.getFramePath(i);
      img.onload = () => {};
      this.images[i - 1] = img;
    }
  }

  private getFramePath(index: number): string {
    const padded = String(index).padStart(4, '0');
    return `/assets/frames/frame_${padded}.jpg`;
  }

  private setupCanvas(): void {
    const canvas = this.canvasElement?.nativeElement;
    if (!canvas) return;
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round((rect.width || window.innerWidth) * dpr);
    canvas.height = Math.round((rect.height || window.innerHeight) * dpr);
  }

  private resizeCanvas(): void {
    const canvas = this.canvasElement?.nativeElement;
    if (!canvas) return;
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round((rect.width || window.innerWidth) * dpr);
    canvas.height = Math.round((rect.height || window.innerHeight) * dpr);
    this.renderFrame(this.currentFrame);
  }

  private renderFrame(frameIndex: number): void {
    const canvas = this.canvasElement?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const clampedIndex = Math.max(1, Math.min(this.totalFrames, frameIndex));
    this.currentFrame = clampedIndex;

    const img = this.images[clampedIndex - 1];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      let nearest: HTMLImageElement | null = null;
      for (let offset = 1; offset < this.totalFrames; offset++) {
        const left = this.images[clampedIndex - 1 - offset];
        if (left && left.complete && left.naturalWidth !== 0) {
          nearest = left;
          break;
        }
        const right = this.images[clampedIndex - 1 + offset];
        if (right && right.complete && right.naturalWidth !== 0) {
          nearest = right;
          break;
        }
      }
      if (nearest) {
        this.paintCover(ctx, canvas, nearest);
      }
      return;
    }

    this.paintCover(ctx, canvas, img);
  }

  /* ==========================================================================
     FULL VIEW OF BUILDING (100% UNHIDDEN ROOF & STREET) + ZERO GAPS ON SIDES
     ========================================================================== */
  private paintCover(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, img: HTMLImageElement): void {
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0 || !img.naturalWidth || !img.naturalHeight) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Clearance for fixed header at top and floating HUD at bottom (scaled by DPR)
    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const topClearance = Math.round(72 * dpr); // Header clearance: roof is 100% UNHIDDEN below header!
    const bottomClearance = Math.round(56 * dpr); // HUD clearance: street is 100% visible above HUD!
    const usableH = Math.max(h - topClearance - bottomClearance, 100);

    // 1. Maintain exact vertical framing confirmed by user ("top and bottom is ok"):
    const renderY = topClearance;
    const renderH = usableH;

    // 2. Extend edge-to-edge across the entire screen width ("left and right ..extend it..without changing topn and bottom"):
    // Render directly from x = 0 to x = w with zero side margins, gaps, or dark wings
    const renderX = 0;
    const renderW = w;

    // 3. Natural ambient continuation for areas directly under fixed header & floating HUD:
    // Top sky slice behind fixed header
    ctx.drawImage(img, 0, 0, img.naturalWidth, 12, 0, 0, w, topClearance);
    // Bottom road/asphalt slice behind floating HUD
    ctx.drawImage(img, 0, img.naturalHeight - 12, img.naturalWidth, 12, 0, topClearance + usableH, w, bottomClearance);

    // 4. Draw the sharp, 100% full construction frame spanning the complete viewport width:
    // Rooftop, trees, entrance, street, cars, and building corners are ALL fully visible from edge to edge!
    ctx.drawImage(img, renderX, renderY, renderW, renderH);
  }

  private initScrollAnimation(): void {
    const wrapper = this.heroWrapper.nativeElement;

    // Pinning distance calibrated for swift, effortless step-by-step scrolling (less scroll for better UX)
    this.scrollTriggerInstance = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: '+=1000',
      pin: true,
      scrub: 0.15,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Scrub frames smoothly whenever user scrolls through the hero section!
        const p = Math.max(0, Math.min(1, self.progress));
        const targetFrame = Math.max(1, Math.min(this.totalFrames, Math.round(p * (this.totalFrames - 1)) + 1));
        this.updateFrameState(targetFrame, p);
      }
    });
  }

  scrollToNext(): void {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      const headerOffset = 76;
      const elementPosition = aboutEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      return;
    }
    if (this.scrollTriggerInstance) {
      const targetScroll = this.scrollTriggerInstance.end + 20;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlayLoop();
    if (this.userScrollIdleTimer) {
      clearTimeout(this.userScrollIdleTimer);
      this.userScrollIdleTimer = null;
    }
    if (this.scrollTriggerInstance) {
      this.scrollTriggerInstance.kill();
    }
  }
}
