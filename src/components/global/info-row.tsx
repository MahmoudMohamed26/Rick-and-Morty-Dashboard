import Link from "next/link";

export default function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block rounded-lg transition-all hover:border-primary/40 hover:shadow-sm">
      {content}
    </Link>
  ) : (
    content
  );
}