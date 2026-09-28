// Hatched box standing in for a real photo until the factory shoot is done.
export function PhotoPlaceholder({
  caption,
  ratio = "4/3",
  className = "",
}: {
  caption: string;
  ratio?: "4/3" | "1/1" | "16/9";
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={caption}
      className={`tile-hatch flex items-end rounded-base border border-line p-4 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="text-[13px] text-muted">{caption}</span>
    </div>
  );
}
