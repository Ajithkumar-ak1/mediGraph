import { CheckCircle2 } from 'lucide-react';
import type { EvidenceItem } from '../lib/types';

type EvidenceCardProps = {
  evidence: EvidenceItem[];
};

export function EvidenceCard({ evidence }: EvidenceCardProps) {
  if (evidence.length === 0) return null;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-accent-500" />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
          Evidence
        </h4>
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        {evidence.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 rounded-xl border border-accent-200/60 bg-accent-50/60 px-3 py-2.5 dark:border-accent-500/20 dark:bg-accent-500/10"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-600 dark:text-accent-400" />
            <span className="text-sm text-gray-700 dark:text-gray-200">
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
