import { Bot, User, AlertTriangle, RotateCw } from 'lucide-react';
import type { ChatMessageData } from '../lib/types';
import { AnswerCard } from './AnswerCard';
import { ReasoningCard } from './ReasoningCard';
import { EvidenceCard } from './EvidenceCard';
import { PathCard } from './PathCard';

type ChatMessageProps = {
  message: ChatMessageData;
  onRetry?: () => void;
};

export function ChatMessage({ message, onRetry }: ChatMessageProps) {
  if (message.role === 'user') {
    return (
      <div className="flex animate-fade-up justify-end gap-3">
        <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-brand-600 px-4 py-3 text-[15px] leading-relaxed text-white shadow-soft">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600 dark:bg-white/10 dark:text-gray-300">
          <User className="h-4 w-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex animate-fade-up justify-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-sm">
        <Bot className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1 max-w-[calc(100%-44px)]">
        {message.error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50/70 p-4 dark:border-red-500/20 dark:bg-red-500/10">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800 dark:text-red-300">
                  {message.content}
                </p>
                {onRetry && (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-700"
                  >
                    <RotateCw className="h-3.5 w-3.5" />
                    Retry
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : message.response ? (
          <div className="flex flex-col gap-3">
            {message.response.answer && (
              <AnswerCard answer={message.response.answer} />
            )}
            <ReasoningCard steps={message.response.reasoning} />
            <EvidenceCard evidence={message.response.evidence} />
            <PathCard paths={message.response.paths} />
          </div>
        ) : (
          <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
            {message.content}
          </p>
        )}
      </div>
    </div>
  );
}
