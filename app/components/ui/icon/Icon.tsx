import type { SVGProps } from "react";
import { icons, type IconName } from "./icons";
import "./icon.css";

type IconSize = "xs" | "sm" | "md" | "lg";
type IconColor = "inherit" | "default" | "muted" | "primary" | "danger";

const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
};

type Props = {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
} & SVGProps<SVGSVGElement>;

export function Icon({
  name,
  size = "md",
  color = "inherit",
  ...rest
}: Props) {
  const px = SIZE_MAP[size];

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      className={[
        "icon",
        `icon--${size}`,
        color !== "inherit" ? `icon--${color}` : "",
      ].join(" ")}
      fill="currentColor"
      stroke="none"
      aria-hidden
      {...rest}
    >
      {icons[name]}
    </svg>
  );
}
