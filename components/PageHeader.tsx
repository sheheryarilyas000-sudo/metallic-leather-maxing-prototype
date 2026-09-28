import Link from "next/link";

export type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  title: string;
  intro?: string;
  /** Trail after Home. The last item is the current page and renders as plain text. */
  breadcrumbs: Crumb[];
  /** Optional action on the right, e.g. "Download catalogue (PDF)". */
  action?: React.ReactNode;
};

// Light header used on every inner page. Inner pages never get a dark banner.
export function PageHeader({ title, intro, breadcrumbs, action }: PageHeaderProps) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...breadcrumbs];

  return (
    <div className="border-b border-line bg-card pb-11 pt-10">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="mb-6 text-[14px] text-muted">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {trail.map((crumb, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                  {last || !crumb.href ? (
                    <span aria-current={last ? "page" : undefined} className={last ? "text-ink" : undefined}>
                      {crumb.label}
                    </span>
                  ) : (
                    <Link href={crumb.href} className="underline-offset-4 hover:text-ink hover:underline">
                      {crumb.label}
                    </Link>
                  )}
                  {!last && <span aria-hidden="true">/</span>}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="t-page stitch-h">{title}</h1>
            {intro && <p className="measure mt-5 text-muted">{intro}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      </div>
    </div>
  );
}
