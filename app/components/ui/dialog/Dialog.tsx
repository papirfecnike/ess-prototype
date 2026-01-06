import type { ReactNode } from "react";
import { Card } from "../card/Card";
import { icons } from "../icon/icons";
import "./dialog.css";

type DialogIntent = "default" | "success" | "warning";

type Props = {
  isOpen: boolean;
  intent?: DialogIntent;
  title?: string;
  children: ReactNode;
  footerLeft?: ReactNode;
  footerRight?: ReactNode;
};

function getIntentIcon(intent: DialogIntent) {
  switch (intent) {
    case "success":
      return icons.checkCircle;
    case "warning":
      return icons.refresh;
    default:
      return icons.history;
  }
}

export function Dialog({
  isOpen,
  intent = "default",
  title,
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
              <svg viewBox="0 0 24 24" width="20" height="20">
                {getIntentIcon(intent)}
              </svg>
            </div>

            {title && (
              <div className="ui-dialog__header-title">
                {title}
              </div>
            )}
          </div>

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
        </Card>
      </div>
    </div>
  );
}
