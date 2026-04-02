type ToastType = "info" | "success" | "warning";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

const toasts = ref<Toast[]>([]);
let nextId = 0;

export const useToast = () => {
  const show = (message: string, type: ToastType = "info", duration = 3500) => {
    const id = ++nextId;
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, duration);
  };

  return { toasts, show };
};
