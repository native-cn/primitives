interface ComboboxOption {
    label: string;
    value: string;
}
interface ComboboxProps {
    value: string;
    onValueChange: (value: string) => void;
    options: ComboboxOption[];
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
}
export declare function Combobox({ value, onValueChange, options, placeholder, searchPlaceholder, emptyMessage, }: ComboboxProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=combobox.d.ts.map