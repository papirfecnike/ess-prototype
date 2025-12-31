type Props = {
  title: string;
  children?: React.ReactNode;
};

export function Widget({ title, children }: Props) {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3>{title}</h3>
      </div>
      <div className="widget-body">
        {children ?? <div className="widget-placeholder" />}
      </div>
    </div>
  );
}
