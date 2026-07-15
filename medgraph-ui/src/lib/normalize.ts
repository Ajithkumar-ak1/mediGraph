import type {
  AskResponse,
  EvidenceItem,
  GraphPath,
  ReasoningStep,
} from './types';

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => (typeof v === 'string' ? v : String(v))).filter(Boolean);
  }
  if (typeof value === 'string') {
    const lines = value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length > 1) return lines;
    return [value.trim()].filter(Boolean);
  }
  return [];
}

function normalizeReasoning(value: unknown): ReasoningStep[] {
  if (Array.isArray(value)) {
    return value
      .map((item): ReasoningStep | null => {
        if (typeof item === 'string') return { title: item };
        if (item && typeof item === 'object') {
          const obj = item as Record<string, unknown>;
          const title =
            (typeof obj.title === 'string' && obj.title) ||
            (typeof obj.step === 'string' && obj.step) ||
            (typeof obj.description === 'string' && obj.description) ||
            (typeof obj.text === 'string' && obj.text) ||
            null;
          const detail =
            (typeof obj.detail === 'string' && obj.detail) ||
            (typeof obj.description === 'string' && obj.description) ||
            (typeof obj.explanation === 'string' && obj.explanation) ||
            undefined;
          if (title) return { title, detail };
        }
        return null;
      })
      .filter((s): s is ReasoningStep => s !== null);
  }
  if (typeof value === 'string') {
    const lines = value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    return lines.map((line) => {
      const cleaned = line.replace(/^\d+[\.\)]\s*/, '');
      return { title: cleaned };
    });
  }
  return [];
}

function normalizeEvidence(value: unknown): EvidenceItem[] {
  if (Array.isArray(value)) {
    return value
      .map((item): EvidenceItem | null => {
        if (typeof item === 'string') return { text: item };
        if (item && typeof item === 'object') {
          const obj = item as Record<string, unknown>;
          const text =
            (typeof obj.text === 'string' && obj.text) ||
            (typeof obj.fact === 'string' && obj.fact) ||
            (typeof obj.statement === 'string' && obj.statement) ||
            (typeof obj.evidence === 'string' && obj.evidence) ||
            null;
          if (text) return { text };
        }
        return null;
      })
      .filter((e): e is EvidenceItem => e !== null);
  }
  if (typeof value === 'string') {
    const lines = value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length > 1) return lines.map((text) => ({ text }));
    return [{ text: value }];
  }
  return [];
}

function normalizePath(item: unknown): GraphPath | null {
  if (!item || typeof item !== 'object') {
    if (typeof item === 'string') {
      const tokens = item
        .split(/->|→|↓|\|/g)
        .map((t) => t.trim())
        .filter(Boolean);
      if (tokens.length) {
        const nodes: string[] = [];
        const edges: string[] = [];
        tokens.forEach((tok, i) => {
          if (i % 2 === 0) nodes.push(tok);
          else edges.push(tok);
        });
        return { nodes, edges };
      }
    }
    return null;
  }
  const obj = item as Record<string, unknown>;

  const pathStr =
    (typeof obj.path === 'string' && obj.path) ||
    (typeof obj.string === 'string' && obj.string) ||
    (typeof obj.text === 'string' && obj.text) ||
    null;
  if (pathStr) {
    const tokens = pathStr
      .split(/->|→|↓|\|/g)
      .map((t) => t.trim())
      .filter(Boolean);
    const nodes: string[] = [];
    const edges: string[] = [];
    tokens.forEach((tok, i) => {
      if (i % 2 === 0) nodes.push(tok);
      else edges.push(tok);
    });
    if (nodes.length) return { nodes, edges };
  }

  if (Array.isArray(obj.nodes) && Array.isArray(obj.edges)) {
    return {
      nodes: asStringArray(obj.nodes),
      edges: asStringArray(obj.edges),
    };
  }
  if (Array.isArray(obj.path_nodes) && Array.isArray(obj.path_edges)) {
    return {
      nodes: asStringArray(obj.path_nodes),
      edges: asStringArray(obj.path_edges),
    };
  }
  if (Array.isArray(obj.entities) && Array.isArray(obj.relations)) {
    return {
      nodes: asStringArray(obj.entities),
      edges: asStringArray(obj.relations),
    };
  }
  const nodes = asStringArray(obj.nodes ?? obj.entities);
  if (nodes.length) {
    return { nodes, edges: asStringArray(obj.edges ?? obj.relations) };
  }
  return null;
}

function normalizePaths(value: unknown): GraphPath[] {
  if (Array.isArray(value)) {
    return value
      .map(normalizePath)
      .filter((p): p is GraphPath => p !== null && p.nodes.length > 0);
  }
  if (typeof value === 'string') {
    const p = normalizePath(value);
    return p ? [p] : [];
  }
  return [];
}

export function normalizeResponse(raw: unknown): AskResponse {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const answer =
    (typeof obj.answer === 'string' && obj.answer) ||
    (typeof obj.response === 'string' && obj.response) ||
    (typeof obj.result === 'string' && obj.result) ||
    '';
  return {
    answer,
    reasoning: normalizeReasoning(obj.reasoning ?? obj.reasoning_chain ?? obj.steps),
    evidence: normalizeEvidence(obj.evidence ?? obj.facts ?? obj.supporting_evidence),
    paths: normalizePaths(obj.paths ?? obj.graph_paths ?? obj.retrieved_paths),
  };
}
