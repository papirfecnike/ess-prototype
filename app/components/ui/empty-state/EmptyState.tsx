import { Button } from "../button/Button";
import { Icon } from "../icon/Icon";
import "./empty-state.css";

type Props = {
  title?: string;
  description?: string;
  iconName?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title = "Empty",
  description = "This page is still under construction.",
  iconName = "forklift",
  actionLabel = "Back to home",
  onAction,
}: Props) {
  return (
    <div className="empty-state-wrapper">
      <div className="empty-state">
        <div className="empty-state__icon">
          <Icon name={iconName} />
        </div>

        <div className="empty-state__title">
          {title}
        </div>

        <div className="empty-state__description">
          {description}
        </div>

        {onAction && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
