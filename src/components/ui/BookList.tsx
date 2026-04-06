'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Book } from '@/lib/books-data';

interface BookListProps {
  books: Book[];
}

function BookCard({ book }: { book: Book }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = !!book.extendedText;

  return (
    <article className="flex gap-4 sm:gap-6 py-6 border-b border-black/[0.06] last:border-b-0">
      <div className="shrink-0 w-20 sm:w-24">
        <Image
          src={book.cover}
          alt={book.title}
          width={160}
          height={240}
          className="w-full h-auto rounded shadow-sm"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
        <p className="text-sm text-text-secondary mb-2">{book.author}</p>

        {book.shortText && (
          <p className="text-sm text-text-secondary leading-relaxed">{book.shortText}</p>
        )}

        {hasMore && (
          <>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                expanded ? 'max-h-[2000px] opacity-100 mt-2' : 'max-h-0 opacity-0'
              )}
            >
              {book.extendedText!.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-sm text-text-secondary leading-relaxed mb-2 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-brand-blue hover:text-brand-blue/80 transition-colors"
              aria-expanded={expanded}
            >
              {expanded ? 'Show less' : 'Show more'}
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
              />
            </button>
          </>
        )}
      </div>
    </article>
  );
}

export function BookList({ books }: BookListProps) {
  return (
    <div role="list" aria-label="Bibliography">
      {books.map((book) => (
        <BookCard key={book.cover} book={book} />
      ))}
    </div>
  );
}
