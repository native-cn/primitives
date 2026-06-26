import * as React from "react";
import { TextInput, type TextInputProps } from "react-native";
interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<TextInput>>;
export { Input };
//# sourceMappingURL=input.d.ts.map