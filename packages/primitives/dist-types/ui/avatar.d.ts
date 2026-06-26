type AvatarSize = "sm" | "default" | "lg" | "xl";
interface AvatarProps {
    src?: string | null;
    alt: string;
    size?: AvatarSize;
    fallback?: string;
}
export declare function Avatar({ src, alt, size, fallback }: AvatarProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=avatar.d.ts.map