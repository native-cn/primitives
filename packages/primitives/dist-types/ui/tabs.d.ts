interface TabsProps {
    value: string;
    onValueChange: (value: string) => void;
    options: {
        label: string;
        value: string;
    }[];
}
export declare function Tabs({ value, onValueChange, options }: TabsProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=tabs.d.ts.map