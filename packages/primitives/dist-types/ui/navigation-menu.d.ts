interface NavigationMenuProps {
    items: {
        label: string;
        onPress: () => void;
        badge?: number;
    }[];
    horizontal?: boolean;
}
export declare function NavigationMenu({ items, horizontal }: NavigationMenuProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=navigation-menu.d.ts.map