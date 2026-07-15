import { ArrowDown } from 'lucide-react';
import type { GraphPath } from '../lib/types';

type PathCardProps = {
  paths: GraphPath[];
};

export function PathCard({ paths }: PathCardProps) {
  if (paths.length === 0) return null;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-brand-500" />
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
          Retrieved Graph Paths
        </h4>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {paths.map((path, i) => {
          const total = path.nodes.length + path.edges.length;
          const items: Array<{ type: 'node' | 'edge'; value: string }> = [];
          for (let j = 0; j < total; j++) {
            if (j % 2 === 0) {
              items.push({ type: 'node', value: path.nodes[j / 2] });
            } else {
              items.push({ type: 'edge', value: path.edges[(j - 1) / 2] });
            }
          }
          return (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-gray-50/70 p-4 dark:border-white/10 dark:bg-white/5"
            >
              <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
                Path {i + 1}
              </span>
              <div className="mt-2 flex flex-col items-start gap-1">
                {items.map((item, j) => (
                  <div key={j} className="flex flex-col items-start">
                    {j > 0 && item.type === 'node' && (
                      <ArrowDown className="my-0.5 h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />
                    )}
                    {item.type === 'node' ? (
                      <span className="rounded-lg border border-brand-200 bg-white px-2.5 py-1 text-sm font-medium text-brand-700 shadow-sm dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
                        {item.value}
                      </span>
                    ) : (
                      <span className="ml-1 rounded-md bg-gray-200/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600 dark:bg-white/10 dark:text-gray-400">
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
