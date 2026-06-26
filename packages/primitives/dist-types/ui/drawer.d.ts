interface DrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    children: React.ReactNode;
}
export declare function Drawer({ open, onOpenChange, title, children }: DrawerProps): import("react").JSX.Element;
export declare function DrawerFooter({ className, children }: {
    className?: string;
    children: React.ReactNode;
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=drawer.d.ts.map