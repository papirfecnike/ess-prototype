import type { ChangeEvent } from "react";
import { TextField } from "../input/TextField";
import { Button } from "../button/Button";
import { Card } from "../card/Card";
import { Icon } from "../icon/Icon";
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
  return (
    <Card className="scan-input-card">
      <div className="scan-input">
        <TextField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          icon={<Icon name="qrScanner" />}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isDisabled) {
              onSubmit();
            }
          }}
        />

        <Button
          onClick={onSubmit}
          leadingIcon={buttonLeadingIcon}
          isLoading={isLoading}
          disabled={isDisabled}
        >
          {buttonLabel}
        </Button>
      </div>
    </Card>
  );
}
