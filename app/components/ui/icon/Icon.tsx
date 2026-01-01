import type { SVGProps } from "react";
import { icons, type IconName } from "./icons";
import "./icon.css";

type IconSize = "xs" | "sm" | "md" | "lg";
type IconColor = "default" | "muted" | "primary" | "danger";

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
  return (
    <svg
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
