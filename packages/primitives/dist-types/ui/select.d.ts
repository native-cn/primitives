interface SelectOption {
    label: string;
    value: string;
}
interface SelectProps {
    value: string;
    onValueChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
}
export declare function Select({ value, onValueChange, options, placeholder, }: SelectProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=select.d.ts.map