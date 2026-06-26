import * as React from "react";
import { type PressableProps } from "react-native";
interface ButtonProps extends PressableProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    children: React.ReactNode;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<import("react-native").View>>;
export { Button, type ButtonProps };
//# sourceMappingURL=button.d.ts.map