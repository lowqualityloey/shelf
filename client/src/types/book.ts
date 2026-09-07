export interface BookSearchResult {
  key: string; // Open Library work ID, e.g. "/works/OL45804W"
  title: string;
  author: string;
  isbn?: string;
  publishYear?: number;
  coverUrl?: string;
}

export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  isbn?: string[];
  first_publish_year?: number;
  cover_i?: number;
}

export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  docs: OpenLibraryDoc[];
}

export type ReadingStatus = 'want-to-read' | 'currently-reading' | 'read';

export interface BookCardProps {
  id?: number | string;
  title: string;
  author?: string;
  coverUrl?: string;
  status?: ReadingStatus;
  onStatusChange?: (status: ReadingStatus) => void;
  onClick?: () => void;
}
