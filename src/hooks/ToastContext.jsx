import { createContext, useContext } from "react";
import { toast as sonnerToast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

// Pages call useToast()(message). The provider keeps that API and renders
// shadcn's Sonner toaster underneath.
const ToastCtx = createContext(null);
const notify = (msg) => sonnerToast.success(msg);

export function ToastProvider({ children }) {
  return (
    <ToastCtx.Provider value={notify}>
      {children}
      <Toaster position="bottom-right" duration={3200} />
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);
