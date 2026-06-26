interface CarouselProps<T> {
    data: T[];
    renderItem: (item: T) => React.ReactNode;
    className?: string;
    onIndexChange?: (index: number) => void;
}
export declare function Carousel<T>({ data, renderItem, className, onIndexChange, }: CarouselProps<T>): import("react").JSX.Element;
export {};
//# sourceMappingURL=carousel.d.ts.map