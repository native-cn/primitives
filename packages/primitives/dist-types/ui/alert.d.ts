type AlertVariant = "default" | "destructive";
interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    children: React.ReactNode;
}
export declare function Alert({ variant, title, children }: AlertProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=alert.d.ts.map