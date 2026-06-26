interface ToastState {
    message: string;
    variant?: "default" | "success" | "error" | "info";
    visible: boolean;
}
interface UseToastReturn {
    toast: (message: string, variant?: ToastState["variant"]) => void;
    dismiss: () => void;
    state: ToastState;
}
export declare function useToast(): UseToastReturn;
export {};
//# sourceMappingURL=use-toast.d.ts.map