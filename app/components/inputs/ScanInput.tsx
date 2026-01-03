import { useState } from "react";
import { ScanInput as UIScanInput } from "../ui/scan-input/ScanInput";

export function ScanInput() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isConfirmDisabled = value.trim().length === 0 || isLoading;

  const handleSubmit = async () => {
    if (isConfirmDisabled) return;

    setIsLoading(true);
    console.log("Scanned:", value);

    await new Promise((r) => setTimeout(r, 500));

    setValue("");
    setIsLoading(false);
  };

  return (
    <UIScanInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonLabel="Confirm"
      isDisabled={isConfirmDisabled}
      buttonLeadingIcon="checkStroke"
    />
  );
}
