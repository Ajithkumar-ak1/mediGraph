type AnswerCardProps = {
  answer: string;
};

export function AnswerCard({ answer }: AnswerCardProps) {
  return (
    <div className="rounded-2xl border border-brand-200/70 bg-gradient-to-br from-brand-50 to-white p-5 dark:border-brand-500/20 dark:from-brand-500/10 dark:to-transparent">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-brand-500" />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-300">
          Answer
        </h4>
      </div>
      <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-gray-800 dark:text-gray-100">
        {answer}
      </p>
    </div>
  );
}
