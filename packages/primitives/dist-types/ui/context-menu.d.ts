interface ContextMenuAction {
    label: string;
    onPress: () => void;
    destructive?: boolean;
}
interface ContextMenuProps {
    actions: ContextMenuAction[];
    children: React.ReactNode;
}
export declare function ContextMenu({ actions, children }: ContextMenuProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=context-menu.d.ts.map