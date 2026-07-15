import { Network } from 'lucide-react';
import { SuggestionCards } from './SuggestionCards';

type WelcomeScreenProps = {
  onPick: (question: string) => void;
};

export function WelcomeScreen({ onPick }: WelcomeScreenProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-10 text-center sm:py-16">
      <div className="mb-6 flex h-16 w-16 animate-float items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-float">
        <Network className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
        Medical GraphRAG Assistant
      </h2>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
        Ask questions about diseases, symptoms, treatments, medicines, doctors and
        medical concepts.
      </p>
      <div className="mt-8 w-full">
        <SuggestionCards onPick={onPick} />
      </div>
    </div>
  );
}
