import type { AskResponse } from './types';
import { normalizeResponse } from './normalize';

const BACKEND_URL = 'http://127.0.0.1:8000/ask';

export class BackendError extends Error {
  readonly retryable: boolean;
  constructor(message: string, retryable = true) {
    super(message);
    this.name = 'BackendError';
    this.retryable = retryable;
  }
}

export async function askBackend(question: string, signal?: AbortSignal): Promise<AskResponse> {
  let res: Response;
  try {
    res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
      signal,
    });
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err;
    throw new BackendError('Unable to connect to MedGraph backend.', true);
  }

  if (!res.ok) {
    const retryable = res.status >= 500 || res.status === 0;
    throw new BackendError(
      `Backend returned an error (HTTP ${res.status}).`,
      retryable,
    );
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new BackendError('Received an invalid response from the backend.', false);
  }

  return normalizeResponse(data);
}
