interface FieldProps {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}
export declare function Field({ label, error, required, children }: FieldProps): import("react").JSX.Element;
interface FieldGroupProps {
    children: React.ReactNode;
    className?: string;
}
export declare function FieldGroup({ children, className }: FieldGroupProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=field.d.ts.map