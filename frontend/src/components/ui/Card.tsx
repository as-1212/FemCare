import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

export function Card({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("glass rounded-3xl", className)} {...props} />;
}

export function CardHeader({
  title,
  subtitle,
  right,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-6 pb-0">
      <div className="min-w-0">
        <div className="text-lg font-semibold tracking-[-0.01em] text-slate-900">
          {title}
        </div>
        {subtitle ? (
          <div className="mt-1 text-sm leading-relaxed text-slate-600">
            {subtitle}
          </div>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("p-6", className)} {...props} />;
}

