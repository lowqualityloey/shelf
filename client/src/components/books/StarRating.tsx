import { useState } from 'react';

export interface StarRatingProps {
  rating: number;
  onRatingChange?: (newRating: number) => void;
  maxStars?: number;
  readOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function StarRating({
  rating,
  onRatingChange,
  maxStars = 5,
  readOnly = false,
  size = 'medium',
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const displayedRating = hoverRating !== null ? hoverRating : rating;

  const starSizeClass = {
    small: 'text-sm',
    medium: 'text-lg',
    large: 'text-2xl',
  }[size];

  return (
    <div role="radiogroup" className={`flex gap-1 ${starSizeClass}`}>
      {Array.from({ length: maxStars }, (_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= displayedRating;

        return (
          <button
            key={starNumber}
            type="button"
            disabled={readOnly}
            aria-label={`${starNumber} star${starNumber > 1 ? 's' : ''}`}
            onMouseEnter={() => !readOnly && setHoverRating(starNumber)}
            onMouseLeave={() => !readOnly && setHoverRating(null)}
            onClick={() => !readOnly && onRatingChange?.(starNumber)}
            onKeyDown={(event) => {
              if (!readOnly && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                onRatingChange?.(starNumber);
              }
            }}
            className={`focus:outline-none ${isFilled ? 'text-amber-400' : 'text-surface-border'}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
