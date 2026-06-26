interface RadioGroupProps {
    value: string;
    onValueChange: (value: string) => void;
    options: {
        label: string;
        value: string;
    }[];
}
export declare function RadioGroup({ value, onValueChange, options }: RadioGroupProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=radio-group.d.ts.map