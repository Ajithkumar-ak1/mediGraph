import { useRef, useState, type KeyboardEvent } from 'react';
import { Paperclip, ArrowUp } from 'lucide-react';

type ChatInputProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function resize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }

  function send() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    requestAnimationFrame(() => {
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    });
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-4 sm:px-6">
      <div className="relative flex items-end gap-2 rounded-3xl border border-gray-200 bg-white p-2 shadow-card transition-all focus-within:border-brand-400 focus-within:shadow-float dark:border-white/10 dark:bg-white/5 dark:focus-within:border-brand-500/60">
        <button
          type="button"
          disabled
          aria-label="Attach file (disabled)"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-gray-300 dark:text-gray-600"
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            resize();
          }}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask a medical question…"
          className="max-h-[200px] flex-1 resize-none bg-transparent py-2.5 text-[15px] leading-relaxed text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-500"
        />
        <button
          type="button"
          onClick={send}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-white/10 dark:disabled:text-gray-600"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-2 text-center text-[11px] text-gray-400 dark:text-gray-500">
        MedGraph can make mistakes. Verify important medical information.
      </p>
    </div>
  );
}
