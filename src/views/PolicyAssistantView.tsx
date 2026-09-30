import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { askPolicyAssistant } from '../services/aiService';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Loader2,
  HelpCircle,
  AlertTriangle,
  Database,
  ShieldAlert,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
  aiPowered?: boolean;
}

export const PolicyAssistantView: React.FC = () => {
  const { setActiveTab } = useApp();

  const suggestedQuestions = [
    "Which districts have the highest unmet healthcare demand?",
    "Where are road complaints concentrated?",
    "What are the top infrastructure gaps across aspirational districts?",
    "Which regions have high citizen demand but low existing investment?",
    "What could happen if ₹500 Cr is allocated to infrastructure?",
    "Show areas where potable water demand is increasing.",
    "Explain why Dhar District has a high priority score of 91/100."
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-0",
      role: "assistant",
      content: `### Welcome to the CivicPulse Policy Assistant

I am an evidence-backed decision-support system analyzing **2.4M citizen submissions**, GIS infrastructure coverage layers (PMGSY, JJM, HMIS), and Census demographic vulnerabilities.

How can I assist your policy planning today? You can select a sample inquiry below or ask custom questions on budget allocations, district priorities, and sector deficits.`,
      timestamp: "Just now",
      aiPowered: true
    }
  ]);

  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const query = queryText || inputValue;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const historyPayload = messages.slice(-4).map(m => ({ role: m.role, content: m.content }));
      const response = await askPolicyAssistant(query, historyPayload);

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        aiPowered: response.aiPowered
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Policy assistant error', err);
      const errorMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: `I encountered an unexpected issue processing this query. Please retry or choose one of the suggested policy queries.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span>Conversational Governance</span>
            <span aria-hidden="true">·</span>
            <span>Grounded In Decision Telemetry</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-0.5">
            CivicPulse Policy Assistant
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Ask questions about citizen demand, infrastructure gaps, and development priorities.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Conversation</span>
        </button>
      </div>

      {/* Suggested Questions Carousel */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          <span>Suggested Policy Queries:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-xs px-3 py-1.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded-lg border border-slate-200 text-left transition-colors shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col h-[560px] overflow-hidden">
        
        {/* Messages Scroll Area */}
        <div className="p-6 overflow-y-auto grow space-y-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 text-xs sm:text-sm ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-xl p-4 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white shadow-xs font-medium'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/90 shadow-2xs'
                }`}
              >
                {/* Assistant formatted text */}
                {m.role === 'assistant' ? (
                  <div className="space-y-3">
                    {m.content.split('\n\n').map((block, bIdx) => {
                      if (block.startsWith('### ')) {
                        return (
                          <h3 key={bIdx} className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-1">
                            {block.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (block.startsWith('1. ') || block.startsWith('2. ') || block.startsWith('3. ')) {
                        const items = block.split('\n').filter(Boolean);
                        return (
                          <div key={bIdx} className="space-y-1 pl-2">
                            {items.map((it, iIdx) => (
                              <div key={iIdx} className="leading-snug">{it}</div>
                            ))}
                          </div>
                        );
                      }
                      return (
                        <p key={bIdx} className="leading-relaxed">
                          {block}
                        </p>
                      );
                    })}

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{m.timestamp}</span>
                      <span>CivicPulse Grounded Decision Engine</span>
                    </div>
                  </div>
                ) : (
                  <div>{m.content}</div>
                )}
              </div>

              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center text-xs text-slate-500">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span>Consulting citizen demand clusters and GIS deficit layers...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a policy question (e.g., Which districts need urgent road interventions?)..."
              disabled={loading}
              className="grow p-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 rounded-lg text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-2 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            <span>AI policy responses are synthetic decision-support models for deliberation; administrative sanction required.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
