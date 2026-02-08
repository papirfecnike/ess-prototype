import "./tag.css";

type TagVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "inbound"
  | "outbound"
  | "inventory"
  | "research";

type Props = {
  label: string;
  variant?: TagVariant;
  color?: string;
  textColor?: string;
};

export function Tag({
  label,
  variant = "default",
  color,
  textColor,
}: Props) {
  return (
    <span
      className={[
        "tag",
        `tag--${variant}`,
      ].join(" ")}
      style={
        color
          ? {
              backgroundColor: color,
              color: textColor ?? "#ffffff",
            }
          : undefined
      }
    >
      {label}
    </span>
  );
}
