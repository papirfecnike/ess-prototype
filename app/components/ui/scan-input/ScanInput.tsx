import type { ChangeEvent, KeyboardEvent } from "react";
import { TextField } from "../input/TextField";
import { Button } from "../button/Button";
import type { IconName } from "../icon/icons";
import "./scan-input.css";

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  buttonLabel?: string;
  buttonLeadingIcon?: IconName;
  isLoading?: boolean;
  isDisabled?: boolean;
  error?: string;
  showButton?: boolean;
};

export function ScanInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Scan code",
  buttonLabel = "Confirm",
  buttonLeadingIcon = "checkStroke",
  isLoading = false,
  isDisabled = false,
  error,
  showButton = true,
}: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isDisabled) {
      onSubmit();
    }
  };

  return (
      <div className="scan-input">
        {/* 🔴 FLEX FILL WRAPPER */}
        <div className="scan-input__field">
          <TextField
            value={value}
            onChange={onChange}
            label={placeholder}
            autoFocus
            error={error}
            onKeyDown={handleKeyDown}
          />
        </div>

        {showButton && (
          <Button
            onClick={onSubmit}
            leadingIcon={buttonLeadingIcon}
            isLoading={isLoading}
            disabled={isDisabled}
          >
            {buttonLabel}
          </Button>
        )}
      </div>
  );
}
