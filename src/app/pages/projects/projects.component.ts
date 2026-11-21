import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Project } from '../../models/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  template: `
    <!-- Header Banner -->
    <section class="page-banner">
      <div class="container">
        <span class="section-tag">{{ 'projects.tag' | translate }}</span>
        <h1 class="page-title">{{ 'projects.title' | translate }}</h1>
        <p class="page-subtitle">
          {{ 'hero.subtitle' | translate }}
        </p>
      </div>
    </section>

    <!-- Filters & Gallery -->
    <section class="projects-section">
      <div class="container">
        <!-- Category Filter Tabs -->
        <div class="filter-tabs">
          <button
            *ngFor="let cat of categories"
            (click)="selectCategory(cat.key)"
            class="tab-btn"
            [class.active]="activeCategory === cat.key"
          >
            {{ cat.labelKey | translate }}
          </button>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          <div class="project-card" *ngFor="let p of filteredProjects">
            <div class="project-img-box">
              <img [src]="p.image_url" [alt]="p.title" class="project-img" />
              <div class="project-badges">
                <span class="category-pill">{{ p.category }}</span>
                <span class="status-pill" [class.ongoing]="p.status === 'Ongoing'">{{ p.status }}</span>
              </div>
              <div class="hover-overlay" (click)="openModal(p)">
                <span>{{ 'projects.view_details' | translate }} &rarr;</span>
              </div>
            </div>

            <div class="project-info">
              <div class="loc-text">{{ p.location }}</div>
              <h3 class="title-text">{{ p.title }}</h3>
              <p class="desc-text">{{ p.description }}</p>

              <!-- Before / After Badge if exists -->
              <div *ngIf="p.before_image_url" class="transformation-badge">
                <span>&#128065; {{ 'projects.before_after' | translate }}</span>
              </div>

              <div class="project-footer">
                <span><strong>{{ 'projects.area' | translate }}:</strong> {{ p.area }}</span>
                <span><strong>{{ 'projects.year' | translate }}:</strong> {{ p.completion_year }}</span>
                <button (click)="openModal(p)" class="btn-details">{{ 'projects.view_details' | translate }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredProjects.length === 0" class="empty-state">
          <h3>No projects found in this category</h3>
          <p>Try selecting another category filter above.</p>
        </div>
      </div>
    </section>

    <!-- Project Details Modal -->
    <div class="modal-backdrop" *ngIf="selectedProject" (click)="closeModal()">
      <div class="modal-dialog" (click)="$event.stopPropagation()">
        <button class="modal-close" (click)="closeModal()">&times;</button>

        <div class="modal-content">
          <div class="modal-header">
            <span class="modal-cat">{{ selectedProject.category }} • {{ selectedProject.status }}</span>
            <h2 class="modal-title">{{ selectedProject.title }}</h2>
            <p class="modal-loc">{{ selectedProject.location }}</p>
          </div>

          <!-- Main Project Image or 3D Comparison -->
          <div class="modal-visuals" [class.dual]="selectedProject.before_image_url">
            <div class="visual-col" *ngIf="selectedProject.before_image_url">
              <span class="visual-tag">{{ 'projects.visualized_3d' | translate }}</span>
              <img [src]="selectedProject.before_image_url" alt="3D Elevation Render" />
            </div>
            <div class="visual-col">
              <span class="visual-tag">{{ selectedProject.before_image_url ? ('projects.built_reality' | translate) : 'Project Photography' }}</span>
              <img [src]="selectedProject.image_url" [alt]="selectedProject.title" />
            </div>
          </div>

          <!-- Description & Specs -->
          <div class="modal-body">
            <div class="modal-specs">
              <div class="spec-item">
                <span class="spec-label">{{ 'projects.area' | translate }}</span>
                <span class="spec-val">{{ selectedProject.area }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">{{ 'projects.year' | translate }}</span>
                <span class="spec-val">{{ selectedProject.completion_year }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">{{ 'projects.location' | translate }}</span>
                <span class="spec-val">{{ selectedProject.location }}</span>
              </div>
            </div>

            <p class="modal-desc">{{ selectedProject.description }}</p>

            <div class="modal-features" *ngIf="selectedProject.features && selectedProject.features.length > 0">
              <h4>Key Architectural Highlights:</h4>
              <ul>
                <li *ngFor="let f of selectedProject.features">&check; {{ f }}</li>
              </ul>
            </div>

            <div class="modal-cta-row">
              <a [routerLink]="['/contact']" [queryParams]="{ service: selectedProject.category }" (click)="closeModal()" class="btn-primary">
                {{ 'cta.btn_contact' | translate }} &rarr;
              </a>
              <button (click)="closeModal()" class="btn-cancel">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
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

    .projects-section {
      padding: 70px 0 100px;
      background-color: #F8FAFC;
    }

    .filter-tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .tab-btn {
      padding: 10px 22px;
      background: #FFFFFF;
      border: 1px solid #CBD5E1;
      color: #0B2B63;
      font-size: 13.5px;
      font-weight: 700;
      border-radius: 8px;
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

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
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

    .project-img-box {
      position: relative;
      height: 250px;
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

    .project-badges {
      position: absolute;
      top: 14px;
      left: 14px;
      right: 14px;
      display: flex;
      justify-content: space-between;
      pointer-events: none;
      z-index: 2;
    }

    .category-pill {
      background: #0B2B63;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
      transition: transform 0.3s ease;
    }

    .project-card:hover .category-pill {
      transform: translateY(-2px);
    }

    .status-pill {
      background: #10B981;
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
      transition: transform 0.3s ease;
    }

    .project-card:hover .status-pill {
      transform: translateY(-2px);
    }

    .status-pill.ongoing {
      background: #EB5A1E;
    }

    .hover-overlay {
      position: absolute;
      inset: 0;
      background: rgba(11, 43, 99, 0.85);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      cursor: pointer;
      backdrop-filter: blur(3px);
      transition: opacity 0.3s ease;
      font-size: 13.5px;
      font-weight: 700;
      letter-spacing: 0.5px;
      z-index: 1;
    }

    .hover-overlay span {
      transform: translateY(10px);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .project-card:hover .hover-overlay {
      opacity: 1;
    }

    .project-card:hover .hover-overlay span {
      transform: translateY(0);
    }

    .project-info {
      padding: 24px;
    }

    .loc-text {
      font-size: 11.5px;
      color: #64748B;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .title-text {
      font-size: 18px;
      font-weight: 800;
      color: #0B2B63;
      margin-bottom: 8px;
      transition: color 0.3s ease;
    }

    .project-card:hover .title-text {
      color: #EB5A1E;
    }

    .desc-text {
      font-size: 13px;
      color: #64748B;
      line-height: 1.6;
      margin-bottom: 14px;
    }

    .transformation-badge {
      background: rgba(235, 90, 30, 0.1);
      border: 1px solid rgba(235, 90, 30, 0.3);
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 11.5px;
      color: #EB5A1E;
      font-weight: 700;
      margin-bottom: 14px;
      display: inline-block;
      transition: all 0.3s ease;
    }

    .project-card:hover .transformation-badge {
      background: #EB5A1E;
      color: #FFFFFF;
      transform: scale(1.03);
    }

    .project-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #F1F5F9;
      padding-top: 14px;
      font-size: 12px;
      color: #475569;
    }

    .btn-details {
      background: none;
      border: none;
      color: #EB5A1E;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .btn-details:hover {
      transform: translateX(4px);
      color: #d44a12;
    }

    /* Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(8, 19, 37, 0.85);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      overflow-y: auto;
    }

    .modal-dialog {
      background: #FFFFFF;
      width: 100%;
      max-width: 880px;
      border-radius: 14px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-close {
      position: absolute;
      top: 14px;
      right: 18px;
      background: none;
      border: none;
      font-size: 28px;
      color: #0B2B63;
      cursor: pointer;
      z-index: 10;
    }

    .modal-header {
      padding: 28px 32px 16px;
      border-bottom: 1px solid #F1F5F9;
    }

    .modal-cat {
      font-size: 11px;
      font-weight: 800;
      color: #EB5A1E;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .modal-title {
      font-size: 24px;
      font-weight: 800;
      color: #0B2B63;
      margin: 6px 0;
    }

    .modal-loc {
      font-size: 13px;
      color: #64748B;
    }

    .modal-visuals {
      display: grid;
      grid-template-columns: 1fr;
      background: #081325;
    }

    .modal-visuals.dual {
      grid-template-columns: 1fr 1fr;
      gap: 4px;
    }

    .visual-col {
      position: relative;
      height: 380px;
    }

    .visual-col img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .visual-tag {
      position: absolute;
      top: 12px;
      left: 12px;
      background: rgba(11, 43, 99, 0.9);
      color: #FFFFFF;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
      backdrop-filter: blur(4px);
    }

    .modal-body {
      padding: 28px 32px;
    }

    .modal-specs {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
    }

    .spec-item {
      display: flex;
      flex-direction: column;
    }

    .spec-label {
      font-size: 11px;
      font-weight: 700;
      color: #64748B;
      text-transform: uppercase;
    }

    .spec-val {
      font-size: 14px;
      font-weight: 700;
      color: #0B2B63;
    }

    .modal-desc {
      font-size: 14px;
      color: #334155;
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .modal-features h4 {
      font-size: 13.5px;
      font-weight: 700;
      color: #0B2B63;
      margin-bottom: 10px;
    }

    .modal-features ul {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 24px;
    }

    .modal-features li {
      font-size: 13px;
      color: #475569;
    }

    .modal-cta-row {
      display: flex;
      gap: 14px;
    }

    .btn-primary {
      padding: 12px 24px;
      background: #EB5A1E;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 13.5px;
      border-radius: 6px;
      text-decoration: none;
    }

    .btn-cancel {
      padding: 12px 20px;
      background: #F1F5F9;
      color: #0B2B63;
      font-weight: 700;
      font-size: 13.5px;
      border: 1px solid #CBD5E1;
      border-radius: 6px;
      cursor: pointer;
    }

    .empty-state {
      text-align: center;
      padding: 60px 0;
      color: #64748B;
    }

    @media (max-width: 1024px) {
      .projects-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 640px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
      .modal-visuals.dual {
        grid-template-columns: 1fr;
      }
      .modal-specs {
        grid-template-columns: 1fr;
      }
      .modal-features ul {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  translationService = inject(TranslationService);
  private api = inject(ApiService);

  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedProject: Project | null = null;

  categories = [
    { key: 'all', labelKey: 'projects.all' },
    { key: 'Completed', labelKey: 'projects.completed' },
    { key: 'Ongoing', labelKey: 'projects.ongoing' },
    { key: 'Residential', labelKey: 'projects.residential' },
    { key: 'Villa', labelKey: 'projects.villas' },
    { key: '3D Elevation', labelKey: 'projects.elevations' }
  ];

  activeCategory = 'all';

  ngOnInit(): void {
    this.api.getProjects().subscribe(p => {
      this.projects = p;
      this.applyFilter();
    });
  }

  selectCategory(catKey: string): void {
    this.activeCategory = catKey;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.activeCategory === 'all') {
      this.filteredProjects = this.projects;
    } else if (this.activeCategory === 'Completed' || this.activeCategory === 'Ongoing') {
      this.filteredProjects = this.projects.filter(p => p.status === this.activeCategory);
    } else {
      this.filteredProjects = this.projects.filter(p => p.category.toLowerCase().includes(this.activeCategory.toLowerCase()));
    }
  }

  openModal(p: Project): void {
    this.selectedProject = p;
  }

  closeModal(): void {
    this.selectedProject = null;
  }
}
