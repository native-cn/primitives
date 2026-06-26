interface SidebarProps {
    items: {
        label: string;
        icon?: string;
        onPress: () => void;
        active?: boolean;
        badge?: string;
    }[];
}
export declare function Sidebar({ items }: SidebarProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=sidebar.d.ts.map