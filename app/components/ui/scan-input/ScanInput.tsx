import type { ChangeEvent, KeyboardEvent } from "react";
import { TextField } from "../input/TextField";
import { Button } from "../button/Button";
import "./scan-input.css";

type Props = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  buttonLabel?: string;
  buttonLeadingIcon?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
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
            onKeyDown={handleKeyDown}
          />
        </div>

        <Button
          onClick={onSubmit}
          leadingIcon={buttonLeadingIcon}
          isLoading={isLoading}
          disabled={isDisabled}
        >
          {buttonLabel}
        </Button>
      </div>
  );
}
