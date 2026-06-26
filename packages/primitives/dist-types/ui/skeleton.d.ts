import { type ViewStyle, type ViewProps, type DimensionValue } from "react-native";
interface SkeletonProps {
    width?: DimensionValue;
    height?: DimensionValue;
    rounded?: "sm" | "md" | "lg" | "full";
    className?: string;
    style?: ViewStyle;
}
declare function Skeleton({ width, height, rounded, className, style, ...props }: SkeletonProps): import("react").JSX.Element;
declare function SkeletonCard({ className, ...props }: ViewProps): import("react").JSX.Element;
declare function SkeletonList({ count, className }: {
    count?: number;
    className?: string;
}): import("react").JSX.Element;
export { Skeleton, SkeletonCard, SkeletonList };
//# sourceMappingURL=skeleton.d.ts.map