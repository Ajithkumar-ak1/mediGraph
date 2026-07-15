import {
  Search,
  Workflow,
  Database,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import type { ReasoningStep } from '../lib/types';

const STEP_ICONS = [Search, Workflow, Database, Sparkles];

type ReasoningCardProps = {
  steps: ReasoningStep[];
};

export function ReasoningCard({ steps }: ReasoningCardProps) {
  if (steps.length === 0) return null;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-accent-500" />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
          Reasoning Chain
        </h4>
      </div>
      <ol className="mt-4 flex flex-col gap-2">
        {steps.map((step, i) => {
          const Icon = STEP_ICONS[i % STEP_ICONS.length];
          return (
            <li key={i} className="flex flex-col">
              <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-100 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                      Step {i + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {step.title}
                    </span>
                  </div>
                  {step.detail && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {step.detail}
                    </p>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-start py-1 pl-[22px]">
                  <ChevronDown className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
