import "./progress-bar.css";

type Props = {
  value: number;          // 0–100
  height?: number;        // px, default: 6
  ariaLabel?: string;
};

export function ProgressBar({
  value,
  height = 6,
  ariaLabel = "Progress",
}: Props) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className="ui-progress-bar"
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ height }}
    >
      <div
        className="ui-progress-bar__fill"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
