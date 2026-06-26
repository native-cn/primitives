import type { TextInputProps } from "react-native";
interface InputGroupProps extends TextInputProps {
    label?: string;
    error?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
}
export declare function InputGroup({ label, error, startAdornment, endAdornment, className, ...props }: InputGroupProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=input-group.d.ts.map