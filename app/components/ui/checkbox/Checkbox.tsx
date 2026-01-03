import type { HTMLAttributes } from "react";
import { Icon } from "../icon/Icon";

type CheckboxState = "checked" | "unchecked" | "indeterminate";

type Props = {
  state: CheckboxState;
  disabled?: boolean;
} & HTMLAttributes<HTMLSpanElement>;

export function Checkbox({ state, disabled = false, ...rest }: Props) {
  return (
    <span
      {...rest}
      className={[
        "checkbox",
        `checkbox--${state}`,
        disabled ? "is-disabled" : "",
      ].join(" ")}
      role="checkbox"
      aria-checked={
        state === "indeterminate"
          ? "mixed"
          : state === "checked"
      }
    >
      <span className="checkbox__icon">
        {state === "checked" && (
          <Icon name="checkStroke" size="xs" />
        )}

        {state === "unchecked" && (
          <Icon name=" " size="xs" />
        )}

        {state === "indeterminate" && (
          <Icon name="minusStroke" size="xs" />
        )}
      </span>
    </span>
  );
}
