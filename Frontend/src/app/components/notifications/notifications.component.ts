import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Toast container -->
    <div class="toast-container">
      <div
        *ngFor="let t of alert.toasts()"
        class="toast toast-{{ t.type }}"
        (click)="alert.dismiss(t.id)"
      >
        <span class="toast-icon">{{ icons[t.type] }}</span>
        <span class="toast-msg">{{ t.message }}</span>
        <button class="toast-close" (click)="alert.dismiss(t.id)">✕</button>
      </div>
    </div>

    <!-- Confirm dialog -->
    <div class="confirm-backdrop" *ngIf="alert.confirmState().visible">
      <div class="confirm-box">
        <div class="confirm-icon">⚠️</div>
        <h3 class="confirm-title">{{ alert.confirmState().title }}</h3>
        <p class="confirm-text">{{ alert.confirmState().text }}</p>
        <div class="confirm-actions">
          <button class="confirm-btn cancel" (click)="alert.resolveConfirm(false)">
            Cancelar
          </button>
          <button class="confirm-btn danger" (click)="alert.resolveConfirm(true)">
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* ── Toasts ── */
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 280px;
      max-width: 380px;
      padding: 13px 16px;
      border-radius: 10px;
      border: 1px solid transparent;
      backdrop-filter: blur(12px);
      font-family: 'DM Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      pointer-events: all;
      animation: toastIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 8px 32px rgba(0,0,0,0.35);
    }

    @keyframes toastIn {
      from { opacity: 0; transform: translateX(24px) scale(0.95); }
      to   { opacity: 1; transform: translateX(0)   scale(1); }
    }

    .toast-success {
      background: rgba(20, 40, 30, 0.92);
      border-color: rgba(52, 211, 153, 0.35);
      color: #6ee7b7;
    }
    .toast-error {
      background: rgba(40, 18, 18, 0.92);
      border-color: rgba(248, 113, 113, 0.35);
      color: #fca5a5;
    }
    .toast-info {
      background: rgba(15, 30, 55, 0.92);
      border-color: rgba(79, 142, 247, 0.35);
      color: #93c5fd;
    }
    .toast-warning {
      background: rgba(40, 32, 10, 0.92);
      border-color: rgba(251, 191, 36, 0.35);
      color: #fcd34d;
    }

    .toast-icon { font-size: 1rem; flex-shrink: 0; }
    .toast-msg  { flex: 1; line-height: 1.4; }

    .toast-close {
      background: none;
      border: none;
      color: inherit;
      opacity: 0.5;
      font-size: 0.75rem;
      cursor: pointer;
      padding: 0;
      line-height: 1;
      flex-shrink: 0;
      transition: opacity 0.15s;
    }
    .toast-close:hover { opacity: 1; }

    /* ── Confirm ── */
    .confirm-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9998;
      padding: 20px;
      animation: fadeIn 0.18s ease;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .confirm-box {
      background: #181c27;
      border: 1px solid #2a2f45;
      border-radius: 16px;
      padding: 32px 28px 24px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      box-shadow: 0 24px 60px rgba(0,0,0,0.5);
      animation: popIn 0.22s cubic-bezier(0.34,1.56,0.64,1);
    }

    @keyframes popIn {
      from { opacity: 0; transform: scale(0.92) translateY(10px); }
      to   { opacity: 1; transform: scale(1)    translateY(0); }
    }

    .confirm-icon  { font-size: 2.2rem; margin-bottom: 12px; }

    .confirm-title {
      font-family: 'DM Sans', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #e8ecf4;
      margin-bottom: 8px;
    }

    .confirm-text {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.875rem;
      color: #7a85a3;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    .confirm-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
    }

    .confirm-btn {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      padding: 9px 22px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: opacity 0.15s, transform 0.1s;
    }

    .confirm-btn:active { transform: scale(0.97); }

    .confirm-btn.cancel {
      background: #2a2f45;
      color: #a0aec0;
    }
    .confirm-btn.cancel:hover { opacity: 0.8; }

    .confirm-btn.danger {
      background: #f87171;
      color: #fff;
    }
    .confirm-btn.danger:hover { opacity: 0.85; }
  `]
})
export class NotificationsComponent {
  alert = inject(AlertService);

  icons: Record<string, string> = {
    success: '✓',
    error:   '✕',
    info:    'ℹ',
    warning: '⚠'
  };
}
