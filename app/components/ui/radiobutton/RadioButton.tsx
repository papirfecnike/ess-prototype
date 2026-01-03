import "./radio-button.css";

type Props = {
  checked: boolean;
  disabled?: boolean;
};

export function RadioButton({ checked, disabled }: Props) {
  return (
    <span
      className={[
        "radio",
        checked ? "is-checked" : "",
        disabled ? "is-disabled" : "",
      ].join(" ")}
      aria-hidden
    />
  );
}
