import { type ReactNode } from "react";
type ToastVariant = "default" | "success" | "error" | "warning";
interface ToastContextValue {
    toast: (message: string, variant?: ToastVariant) => void;
    dismiss: (id: string) => void;
}
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useToast(): ToastContextValue;
export {};
//# sourceMappingURL=toast.d.ts.map