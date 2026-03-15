import type { ReactNode } from "react";
import "./card.css";

type CardVariant = "default" | "darkHeader" | "scanInput" | "metric";

type Props = {
  children?: ReactNode;
  className?: string;
  variant?: CardVariant;

  title?: ReactNode;
  icon?: string;

  value?: ReactNode;
  subValue?: ReactNode;

  trend?: ReactNode;
  footer?: ReactNode;
};

export function Card({
  className,
  variant = "default",
  children,
  title,
  icon,
  value,
  subValue,
  trend,
  footer,
}: Props) {
  if (variant === "metric") {
    return (
      <div
        className={[
          "ui-card",
          "ui-card--metric",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {(title || icon) && (
          <div className="ui-card__metric-header">
            {icon && <span className="ui-card__metric-icon">{icon}</span>}
            <span className="ui-card__metric-title">{title}</span>
          </div>
        )}

        {value && (
          <div className="ui-card__metric-value">
            {value}
            {subValue && (
              <span className="ui-card__metric-sub"> / {subValue}</span>
            )}
          </div>
        )}

        {trend && (
          <div className="ui-card__metric-trend">
            {trend}
          </div>
        )}

        {footer && (
          <div className="ui-card__metric-footer">
            {footer}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={[
        "ui-card",
        `ui-card--${variant}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}