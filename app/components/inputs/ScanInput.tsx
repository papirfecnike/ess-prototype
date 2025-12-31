type Props = {
  placeholder?: string;
};

export function ScanInput({
  placeholder = "Scan product or location…",
}: Props) {
  return (
    <input
      type="text"
      className="scan-input"
      placeholder={placeholder}
      autoFocus
    />
  );
}
