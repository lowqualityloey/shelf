import type { ReadingStatus } from '../../types/book';

export type ShelfFilter = 'all' | ReadingStatus;

export interface ShelfSelectorProps {
  selectedShelf: ShelfFilter;
  onSelectShelf: (shelf: ShelfFilter) => void;
  counts?: Partial<Record<ShelfFilter, number>>;
}

export function ShelfSelector({ selectedShelf, onSelectShelf, counts }: ShelfSelectorProps) {
  const tabs: { key: ShelfFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'want-to-read', label: 'Want to Read' },
    { key: 'currently-reading', label: 'Currently Reading' },
    { key: 'read', label: 'Read' },
  ];

  return (
    <div role="tablist" className="flex gap-2">
      {tabs.map((tab) => {
        const isActive = tab.key === selectedShelf;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectShelf(tab.key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-text-heading text-surface'
                : 'text-text-main hover:bg-surface-border/20'
            }`}
          >
            {tab.label}
            {counts?.[tab.key] !== undefined && (
              <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-surface-border px-2 py-0.5 text-xs font-semibold text-text-main">
                {counts[tab.key]}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
