type Direction = "ltr" | "rtl";
interface DirectionContextValue {
    direction: Direction;
    setDirection: (dir: Direction) => void;
    toggleDirection: () => void;
    isRTL: boolean;
}
export declare function useDirection(): DirectionContextValue;
interface DirectionProviderProps {
    children: React.ReactNode;
    initialDirection?: Direction;
}
export declare function DirectionProvider({ children, initialDirection, }: DirectionProviderProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=direction.d.ts.map