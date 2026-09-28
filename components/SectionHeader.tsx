// Standard section heading block: H2 with the stitch underline, an optional intro line
// and an optional action on the right.
export function SectionHeader({
  id,
  title,
  intro,
  action,
  className = "",
}: {
  id: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`section-head flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div>
        <h2 id={id} className="t-section stitch-h">
          {title}
        </h2>
        {intro && <p className="measure mt-5 text-muted">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
