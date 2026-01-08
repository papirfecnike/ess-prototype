import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { Icon } from "@/components/ui/icon/Icon";
import "./notification.css";

type Intent = "default" | "success" | "warning" | "danger";

type Props = {
  title: string;
  message: string;
  intent?: Intent;
  onClose: () => void;
};

export function Notification({
  title,
  message,
  intent = "default",
  onClose,
}: Props) {
  const [visible, setVisible] = useState(false);

  // slide-in trigger
    useEffect(() => {
    setTimeout(() => setVisible(true), 0);
    }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 220);
  }

  return (
    <div
      className={[
        "notification",
        `notification--${intent}`,
        visible ? "is-visible" : "",
      ].join(" ")}
    >
      <div className="notification__icon">
        <Icon name="checkCircle" size="sm" />
      </div>

      <div className="notification__content">
        <strong className="notification__title">
          {title}
        </strong>
        <p className="notification__message">
          {message}
        </p>
      </div>

      <div className="notification__actions">
        <Button
            size="sm"
            className={`notification__button notification__button--${intent}`}
            onClick={handleClose}
        >
          OK
        </Button>
      </div>
    </div>
  );
}
