interface DropdownMenuItem {
    label: string;
    value: string;
    destructive?: boolean;
}
interface DropdownMenuProps {
    trigger: React.ReactNode;
    items: DropdownMenuItem[];
    onSelect: (value: string) => void;
    title?: string;
}
export declare function DropdownMenu({ trigger, items, onSelect, title }: DropdownMenuProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=dropdown-menu.d.ts.map