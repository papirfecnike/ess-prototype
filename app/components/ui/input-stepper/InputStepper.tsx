import { Button } from "../button/Button";
import "./input-stepper.css";

type InputStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export function InputStepper({
  value,
  onChange,
  min = 0,
  max,
}: InputStepperProps) {
  const decrement = () => {
    const next = value - 1;
    if (next < min) return;
    onChange(next);
  };

  const increment = () => {
    const next = value + 1;
    if (max !== undefined && next > max) return;
    onChange(next);
  };

  return (
    <div className="input-stepper">
      <div className="input-stepper__button-wrapper">
        <Button
          variant="secondary"
          aria-label="Decrease quantity"
          onClick={decrement}
        >
          −
        </Button>
      </div>

      <input
        className="input-stepper__input"
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || min)}
      />

      <div className="input-stepper__button-wrapper">
        <Button
          variant="secondary"
          aria-label="Increase quantity"
          onClick={increment}
        >
          +
        </Button>
      </div>
    </div>
  );
}
