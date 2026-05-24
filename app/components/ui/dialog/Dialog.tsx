import type { ReactNode } from "react";
import { Card } from "../card/Card";
import { Icon } from "../icon/Icon";
import type { IconName } from "../icon/icons";
import "./dialog.css";

type DialogIntent = "default" | "success" | "warning" | "error" | "inspection" | "schedule";

type Props = {
  isOpen: boolean;
  intent?: DialogIntent;
  title?: string;
  icon?: IconName;
  children: ReactNode;
  footerLeft?: ReactNode;
  footerRight?: ReactNode;
};

function getIntentIcon(intent: DialogIntent): IconName {
  switch (intent) {
    case "success":
      return "checkCircle";
    case "warning":
      return "warning";
    case "error":
      return "error";
    case "inspection":
      return "search";
    case "schedule":
      return "clock";
    default:
      return "history";
  }
}

export function Dialog({
  isOpen,
  intent = "default",
  title,
  icon,
  children,
  footerLeft,
  footerRight,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="ui-dialog">
      <div className="ui-dialog__scrim" />

      <div className="ui-dialog__container">
        <Card className={`ui-dialog__card ui-dialog__card--${intent}`}>

          <div className="ui-dialog__header">
            <div className="ui-dialog__header-icon">
              <Icon name={icon ?? getIntentIcon(intent)} size="md" />
            </div>
            {title && (
              <div className="ui-dialog__header-title">
                {title}
              </div>
            )}
          </div>

          <div className="ui-dialog__body">
            <div className="ui-dialog__content">
              {children}
            </div>

            {(footerLeft || footerRight) && (
              <div className="ui-dialog__footer">
                <div className="ui-dialog__footer-left">
                  {footerLeft}
                </div>
                <div className="ui-dialog__footer-right">
                  {footerRight}
                </div>
              </div>
            )}
          </div>

        </Card>
      </div>
    </div>
  );
}
