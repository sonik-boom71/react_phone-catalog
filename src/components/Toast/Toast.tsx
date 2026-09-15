import styles from './Toast.module.scss';

export interface ToastItem {
  id: number;
  message: string;
}

interface Props {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}

export const ToastViewport = ({ toasts, onDismiss }: Props) => (
  <div className={styles.viewport} aria-live="polite" aria-atomic="true">
    {toasts.map(toast => (
      <div
        key={toast.id}
        className={styles.toast}
        onClick={() => onDismiss(toast.id)}
      >
        {toast.message}
      </div>
    ))}
  </div>
);
