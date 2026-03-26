import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

export interface ConfirmState {
  visible: boolean;
  title: string;
  text: string;
  resolve: ((v: boolean) => void) | null;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private counter = 0;

  toasts = signal<Toast[]>([]);
  confirmState = signal<ConfirmState>({
    visible: false, title: '', text: '', resolve: null
  });

  private show(type: ToastType, message: string, duration = 3200): void {
    const id = ++this.counter;
    this.toasts.update(list => [...list, { id, type, message }]);
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }

  success(message: string): void { this.show('success', message); }
  error(message: string): void   { this.show('error',   message, 4000); }
  info(message: string): void    { this.show('info',    message); }
  warning(message: string): void { this.show('warning', message); }

  confirm(title: string, text: string): Promise<boolean> {
    return new Promise(resolve => {
      this.confirmState.set({ visible: true, title, text, resolve });
    });
  }

  resolveConfirm(value: boolean): void {
    const state = this.confirmState();
    state.resolve?.(value);
    this.confirmState.set({ visible: false, title: '', text: '', resolve: null });
  }
}
