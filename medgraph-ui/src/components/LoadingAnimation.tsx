import { Bot } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="flex animate-fade-up justify-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-sm">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span
              className="h-2 w-2 rounded-full bg-brand-500"
              style={{ animation: 'dot-bounce 1.4s infinite ease-in-out both' }}
            />
            <span
              className="h-2 w-2 rounded-full bg-brand-500"
              style={{
                animation: 'dot-bounce 1.4s infinite ease-in-out both',
                animationDelay: '0.16s',
              }}
            />
            <span
              className="h-2 w-2 rounded-full bg-brand-500"
              style={{
                animation: 'dot-bounce 1.4s infinite ease-in-out both',
                animationDelay: '0.32s',
              }}
            />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Retrieving from the knowledge graph…
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="shimmer-bg h-3 w-64 rounded-full" />
          <div className="shimmer-bg h-3 w-48 rounded-full" />
        </div>
      </div>
    </div>
  );
}
