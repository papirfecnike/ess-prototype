import type { ReactNode } from "react";
import { Button } from "@/components/ui/button/Button";
import type { IconName } from "@/components/ui/icon/icons";
import "./callout.css";

type Intent = "default" | "success" | "warning" | "danger";

type Action = {
  label: string;
  trailingIcon?: IconName;
  onClick?: () => void;
};

type Props = {
  title?: string;
  intent?: Intent;
  children: ReactNode;
  action?: Action;
};

export function Callout({
  title,
  intent = "default",
  children,
  action,
}: Props) {
  return (
    <div className={`ui-callout ui-callout--${intent}`}>
      {(title || action) && (
        <div className="ui-callout__header">
          {title && (
            <strong className="ui-callout__title">{title}</strong>
          )}

          {action && (
            <Button
              size="sm"
              variant="ghost"
              intent={intent}
              trailingIcon={action.trailingIcon}
              onClick={action.onClick ?? (() => {})}
            >
              {action.label}
            </Button>
          )}
        </div>
      )}

      <div className="ui-callout__content">{children}</div>
    </div>
  );
}
