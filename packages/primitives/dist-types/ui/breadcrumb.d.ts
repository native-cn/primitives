interface BreadcrumbProps {
    items: {
        label: string;
        onPress?: () => void;
    }[];
    separator?: string;
}
export declare function Breadcrumb({ items, separator }: BreadcrumbProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=breadcrumb.d.ts.map