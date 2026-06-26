interface CommandProps<T> {
    items: T[];
    filterKey: keyof T;
    onSelect: (item: T) => void;
    placeholder?: string;
    renderItem: (item: T) => React.ReactNode;
    emptyMessage?: string;
}
export declare function Command<T>({ items, filterKey, onSelect, placeholder, renderItem, emptyMessage, }: CommandProps<T>): import("react").JSX.Element;
export {};
//# sourceMappingURL=command.d.ts.map