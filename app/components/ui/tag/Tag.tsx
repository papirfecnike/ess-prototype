import "./tag.css";

type TagVariant = "default" | "success" | "warning" | "danger";

type Props = {
  label: string;
  variant?: TagVariant;
};

export function Tag({
  label,
  variant = "default",
}: Props) {
  return (
    <span
      className={[
        "tag",
        `tag--${variant}`,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
