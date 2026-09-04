import type { OpenLibraryDoc, BookSearchResult } from '../types/book';

export function mapOpenLibraryDocToBook(doc: OpenLibraryDoc): BookSearchResult {
  const coverUrl = doc.cover_i
    ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
    : undefined;

  const primaryAuthor =
    doc.author_name && doc.author_name.length > 0 ? doc.author_name[0] : 'Unknown Author';

  const primaryIsbn = doc.isbn && doc.isbn.length > 0 ? doc.isbn[0] : undefined;

  return {
    key: doc.key,
    title: doc.title,
    author: primaryAuthor,
    isbn: primaryIsbn,
    publishYear: doc.first_publish_year,
    coverUrl: coverUrl,
  };
}
