import type { SVGProps } from "react";
import { icons, type IconName } from "./icons";
import "./icon.css";

type IconSize = "xs" | "sm" | "md" | "lg";
type IconColor = "default" | "muted" | "primary" | "danger";

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
  color = "default",
  ...rest
}: Props) {
  const px = SIZE_MAP[size];

  return (
    <svg
      width={px}
      height={px}
      className={`icon icon--${size} icon--${color}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {icons[name]}
    </svg>
  );
}
