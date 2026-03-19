'use client';

import { useRef } from 'react';
import { Bold, Italic, Heading2, Heading3, List, Link2, ImageIcon } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (val: string) => void;
}

function insertMarkdown(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string,
  onChange: (val: string) => void
) {
  const { selectionStart, selectionEnd, value } = textarea;
  const selected = value.substring(selectionStart, selectionEnd);
  const replacement = `${before}${selected || 'text'}${after}`;
  const next = value.substring(0, selectionStart) + replacement + value.substring(selectionEnd);
  onChange(next);
  requestAnimationFrame(() => {
    textarea.focus();
    const cursor = selectionStart + before.length;
    textarea.setSelectionRange(cursor, cursor + (selected.length || 4));
  });
}

const buttons = [
  { icon: Bold, before: '**', after: '**', title: 'Bold' },
  { icon: Italic, before: '_', after: '_', title: 'Italic' },
  { icon: Heading2, before: '## ', after: '', title: 'Heading 2' },
  { icon: Heading3, before: '### ', after: '', title: 'Heading 3' },
  { icon: List, before: '- ', after: '', title: 'List' },
  { icon: Link2, before: '[', after: '](url)', title: 'Link' },
  { icon: ImageIcon, before: '![alt](', after: ')', title: 'Image' },
];

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-300">
        {buttons.map((btn) => (
          <button
            key={btn.title}
            type="button"
            title={btn.title}
            onClick={() => {
              if (ref.current) insertMarkdown(ref.current, btn.before, btn.after, onChange);
            }}
            className="p-1.5 rounded hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <btn.icon className="w-4 h-4" />
          </button>
        ))}
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={14}
        className="w-full px-3 py-2 text-sm font-mono resize-y focus:outline-none"
        placeholder="Write your content in Markdown..."
      />
    </div>
  );
}
