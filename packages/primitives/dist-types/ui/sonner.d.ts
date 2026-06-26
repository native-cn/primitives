type SonnerVariant = "default" | "success" | "error" | "info";
interface SonnerProps {
    message: string;
    variant?: SonnerVariant;
    duration?: number;
    onDismiss: () => void;
}
export declare function Sonner({ message, variant, duration, onDismiss }: SonnerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=sonner.d.ts.map