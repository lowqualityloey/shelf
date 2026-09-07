import type { BookCardProps, ReadingStatus } from '../../types/book';

const STATUS_LABELS: Record<ReadingStatus, string> = {
  'want-to-read': 'Want to Read',
  'currently-reading': 'Currently Reading',
  read: 'Finished',
};

const STATUS_OPTIONS: ReadingStatus[] = ['want-to-read', 'currently-reading', 'read'];

export function BookCard({
  title,
  author,
  coverUrl,
  status = 'want-to-read',
  onStatusChange,
  onClick,
}: BookCardProps) {
  return (
    <div className="w-full text-left bg-surface border border-surface-border rounded-xl shadow-card p-4 hover:shadow-lg transition-shadow">
      <div
        onClick={onClick}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick?.();
          }
        }}
      >
        <div className="relative h-40 mb-3 overflow-hidden rounded-lg bg-surface-border/20">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover of ${title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <span className="text-2xl" aria-hidden="true">
                📖
              </span>
              <span className="sr-only">No cover available</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h3 className="text-text-heading text-base font-heading font-semibold line-clamp-2">
            {title}
          </h3>
          <p className="text-text-main text-sm">{author}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-border">
        <span className="text-sm font-medium text-text-main">{STATUS_LABELS[status]}</span>

        <select
          aria-label={`Reading status for ${title}`}
          value={status}
          onChange={(event) => onStatusChange?.(event.target.value as ReadingStatus)}
          className="bg-surface-secondary border border-surface-border rounded-lg px-2 py-1 text-xs"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {STATUS_LABELS[option]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
