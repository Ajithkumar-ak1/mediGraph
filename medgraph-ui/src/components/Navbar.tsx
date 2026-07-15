import { Github, Moon, Sun, BrainCircuit } from 'lucide-react';

type NavbarProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

function GithubIcon({ className }: { className?: string }) {
  return <Github className={className} aria-hidden="true" />;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/70 bg-white/80 backdrop-blur-lg dark:border-white/10 dark:bg-[#0b0f1a]/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-float">
            <BrainCircuit className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <h1 className="text-[15px] font-semibold tracking-tight text-gray-900 dark:text-white">
                MedGraph
              </h1>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Explainable Medical Knowledge Graph
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="GitHub repository"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-[18px] w-[18px]" />
            ) : (
              <Sun className="h-[18px] w-[18px]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
