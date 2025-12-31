type Props = {
  title: string;
  value: string;
  meta?: string;
};

export function Card({ title, value, meta }: Props) {
  return (
    <div className="card">
      <p className="card-title">{title}</p>
      <strong className="card-value">{value}</strong>
      {meta && <p className="card-meta">{meta}</p>}
    </div>
  );
}
