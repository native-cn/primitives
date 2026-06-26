interface SheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    side?: "bottom" | "top" | "left" | "right";
    children: React.ReactNode;
}
export declare function Sheet({ open, onOpenChange, title, side, children, }: SheetProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=sheet.d.ts.map