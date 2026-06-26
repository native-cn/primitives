import { type ViewStyle } from "react-native";
export interface ChartConfig {
    [key: string]: {
        label: string;
        color: string;
    };
}
interface DataPoint {
    [key: string]: string | number;
}
interface ChartContainerProps {
    config: ChartConfig;
    className?: string;
    style?: ViewStyle;
    children: React.ReactNode;
}
export declare function ChartContainer({ config, className, style, children }: ChartContainerProps): import("react").JSX.Element;
interface BarChartProps {
    data: DataPoint[];
    config: ChartConfig;
    xKey: string;
    yKey: string;
    height?: number;
    className?: string;
}
export declare function BarChart({ data, config, xKey, yKey, height, className }: BarChartProps): import("react").JSX.Element;
interface LineChartProps {
    data: DataPoint[];
    config: ChartConfig;
    xKey: string;
    yKey: string;
    height?: number;
    showDots?: boolean;
    className?: string;
}
export declare function LineChart({ data, config, xKey, yKey, height, showDots, className, }: LineChartProps): import("react").JSX.Element;
interface PieChartProps {
    data: DataPoint[];
    config: ChartConfig;
    nameKey: string;
    valueKey: string;
    size?: number;
    innerRadius?: number;
    className?: string;
}
export declare function PieChart({ data, config, nameKey, valueKey, size, innerRadius, className, }: PieChartProps): import("react").JSX.Element;
interface ChartLegendProps {
    config: ChartConfig;
    className?: string;
}
export declare function ChartLegend({ config, className }: ChartLegendProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=chart.d.ts.map