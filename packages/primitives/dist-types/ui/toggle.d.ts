type ToggleVariant = "default" | "outline";
interface ToggleProps {
    pressed: boolean;
    onPressedChange: (pressed: boolean) => void;
    label: string;
    variant?: ToggleVariant;
    disabled?: boolean;
}
export declare function Toggle({ pressed, onPressedChange, label, variant, disabled, }: ToggleProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=toggle.d.ts.map