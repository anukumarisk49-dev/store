'use client';

import { FormEvent, useMemo, useState } from 'react';
import catalog from '../../../public/data/products.json';

type Message = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
};

const allProducts = Object.values(catalog.categories).flatMap((category) => category.products);

const quickQuestions = [
  'Show me the best electronics deal',
  'Find fashion under ₹1,000',
  'How do I compare prices?',
];

function getReply(question: string) {
  const normalizedQuestion = question.toLowerCase();
  const matches = allProducts.filter((product) =>
    `${product.name} ${product.merchant}`.toLowerCase().includes(normalizedQuestion)
  );

  if (matches.length) {
    const product = matches[0];
    return `${product.name} is ₹${product.price.toLocaleString('en-IN')} at ${product.merchant}, with ${product.discount}% off. Open the product category to view the deal.`;
  }

  if (normalizedQuestion.includes('fashion')) {
    const fashionProducts = catalog.categories.fashion.products.filter((product) => product.price <= 1000);
    return fashionProducts.length
      ? `I found ${fashionProducts.length} fashion deal${fashionProducts.length > 1 ? 's' : ''} under ₹1,000. Try the Fashion category to browse them.`
      : 'Try the Fashion category and use the price filter to find your budget.';
  }

  if (normalizedQuestion.includes('electronics') || normalizedQuestion.includes('best')) {
    const bestDeal = catalog.categories.electronics.products.reduce((best, product) =>
      product.discount > best.discount ? product : best
    );
    return `The best electronics discount right now is ${bestDeal.discount}% off on ${bestDeal.name}. It is listed at ₹${bestDeal.price.toLocaleString('en-IN')}.`;
  }

  if (normalizedQuestion.includes('compare')) {
    return 'Use Compare in the top navigation to compare demo prices across Amazon, Flipkart, Meesho, and Sony.';
  }

  return 'I can help you find deals, compare prices, or browse categories. Try one of the quick questions below.';
}

export default function StoreAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', text: 'Hi, I am the 99StorePE assistant. What deal are you looking for?' },
  ]);

  const latestQuestions = useMemo(() => quickQuestions.filter((question) => !messages.some((message) => message.text === question)), [messages]);

  const askQuestion = (question: string) => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), role: 'user', text: trimmedQuestion },
      { id: Date.now() + 1, role: 'assistant', text: getReply(trimmedQuestion) },
    ]);
    setInput('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askQuestion(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {isOpen && (
        <section className="w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
          <div className="flex items-center justify-between bg-primary px-5 py-4 text-white">
            <div>
              <p className="font-bold">99StorePE Assistant</p>
              <p className="text-xs text-white/80">Local deal helper</p>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close assistant" className="text-xl leading-none hover:text-white/70">×</button>
          </div>

          <div className="max-h-80 space-y-3 overflow-y-auto bg-gray-50 p-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm ${message.role === 'user' ? 'rounded-br-sm bg-primary text-white' : 'rounded-bl-sm bg-white text-gray-700 shadow-sm'}`}>
                  {message.text}
                </p>
              </div>
            ))}
            {latestQuestions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {latestQuestions.map((question) => (
                  <button key={question} type="button" onClick={() => askQuestion(question)} className="rounded-full border border-primary/40 bg-white px-3 py-1.5 text-left text-xs text-primary hover:bg-secondary">
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t bg-white p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about a deal..."
              aria-label="Ask 99StorePE assistant"
              className="min-w-0 flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button type="submit" aria-label="Send message" className="rounded-lg bg-primary px-3 py-2 text-white hover:bg-opacity-90">↗</button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close 99StorePE assistant' : 'Open 99StorePE assistant'}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-lg ring-4 ring-white transition hover:scale-105 hover:bg-opacity-90"
      >
        {isOpen ? '×' : '✦'}
      </button>
    </div>
  );
}
