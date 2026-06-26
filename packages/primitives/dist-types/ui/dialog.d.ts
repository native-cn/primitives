interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
}
export declare function Dialog({ open, onOpenChange, title, description, children }: DialogProps): import("react").JSX.Element;
interface DialogFooterProps {
    className?: string;
    children: React.ReactNode;
}
export declare function DialogFooter({ className, children }: DialogFooterProps): import("react").JSX.Element;
interface DialogCloseProps {
    onPress: () => void;
    label?: string;
}
export declare function DialogClose({ onPress, label }: DialogCloseProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=dialog.d.ts.map