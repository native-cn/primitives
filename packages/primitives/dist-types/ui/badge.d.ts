import type { ViewProps } from "react-native";
type BadgeVariant = "default" | "secondary" | "destructive" | "outline";
interface BadgeProps extends ViewProps {
    variant?: BadgeVariant;
    children: React.ReactNode;
}
export declare function Badge({ variant, className, children, ...props }: BadgeProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=badge.d.ts.map