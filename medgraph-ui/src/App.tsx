import { useCallback, useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingAnimation } from './components/LoadingAnimation';
import { useTheme } from './hooks/useTheme';
import { askBackend } from './lib/api';
import type { AskResponse, ChatMessageData } from './lib/types';

let idCounter = 0;
const nextId = () => `m-${Date.now()}-${idCounter++}`;

function App() {
  const { theme, toggleTheme } = useTheme();
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastQuestionRef = useRef<string>('');

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    });
  }, []);

  const sendQuestion = useCallback(
    async (question: string) => {
      if (loading) return;
      lastQuestionRef.current = question;

      const userMsg: ChatMessageData = { id: nextId(), role: 'user', content: question };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      scrollToBottom();

      try {
        const response: AskResponse = await askBackend(question);
        const assistantMsg: ChatMessageData = {
          id: nextId(),
          role: 'assistant',
          content: '',
          response,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        const msg =
          err instanceof Error && err.message
            ? err.message
            : 'Unable to connect to MedGraph backend.';
        const errorMsg: ChatMessageData = {
          id: nextId(),
          role: 'assistant',
          content: msg,
          error: true,
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setLoading(false);
        scrollToBottom();
      }
    },
    [loading, scrollToBottom],
  );

  const handleRetry = useCallback(() => {
    if (lastQuestionRef.current) sendQuestion(lastQuestionRef.current);
  }, [sendQuestion]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-[#0b0f1a]">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin">
        {hasMessages ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6 sm:px-6">
            {messages.map((m) => (
              <ChatMessage
                key={m.id}
                message={m}
                onRetry={m.error ? handleRetry : undefined}
              />
            ))}
            {loading && <LoadingAnimation />}
          </div>
        ) : (
          <WelcomeScreen onPick={sendQuestion} />
        )}
      </div>

      <ChatInput onSend={sendQuestion} disabled={loading} />
    </div>
  );
}

export default App;
