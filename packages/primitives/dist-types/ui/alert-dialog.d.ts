interface AlertDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    cancelLabel?: string;
    actionLabel?: string;
    onCancel?: () => void;
    onAction?: () => void;
    variant?: "default" | "destructive";
}
export declare function AlertDialog({ open, onOpenChange, title, description, cancelLabel, actionLabel, onCancel, onAction, variant, }: AlertDialogProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=alert-dialog.d.ts.map