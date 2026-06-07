import toast from "react-hot-toast";

export const showToast = {
  success: (message: string) =>
    toast.success(message, {
      position: "bottom-right",
    }),

  error: (message: string) =>
    toast.error(message, {
      position: "bottom-right",
    }),

  loading: (message: string) =>
    toast.loading(message, {
      position: "bottom-right",
    }),

  custom: (message: string) =>
    toast(message, {
      position: "bottom-right",
    }),
};