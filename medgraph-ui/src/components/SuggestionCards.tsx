import {
  Activity,
  Stethoscope,
  Pill,
  HeartPulse,
  ArrowDown,
} from 'lucide-react';

const SUGGESTIONS = [
  {
    icon: Activity,
    text: 'What are the symptoms of diabetes?',
    hint: 'Symptoms',
  },
  {
    icon: Pill,
    text: 'Does insulin treat diabetes?',
    hint: 'Treatment',
  },
  {
    icon: Stethoscope,
    text: 'Which doctor treats asthma?',
    hint: 'Specialist',
  },
  {
    icon: HeartPulse,
    text: 'What does hypertension affect?',
    hint: 'Effects',
  },
];

type SuggestionCardsProps = {
  onPick: (question: string) => void;
};

export function SuggestionCards({ onPick }: SuggestionCardsProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      {SUGGESTIONS.map((s) => {
        const Icon = s.icon;
        return (
          <button
            key={s.text}
            type="button"
            onClick={() => onPick(s.text)}
            className="group relative flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-left shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:border-white/10 dark:bg-white/5 dark:hover:border-brand-500/60"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400">
              <Icon className="h-[18px] w-[18px]" />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[11px] font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
                {s.hint}
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {s.text}
              </span>
            </span>
            <ArrowDown className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-600" />
          </button>
        );
      })}
    </div>
  );
}
