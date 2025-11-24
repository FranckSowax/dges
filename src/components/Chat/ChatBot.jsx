import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader, Sparkles, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../supabaseClient';
import { useChat } from '../../context/ChatContext';

const ChatBot = () => {
  const { isOpen, toggleChat } = useChat();
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', content: 'Bonjour ! Je suis l\'assistant virtuel de la DGES. Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call Netlify Function 'chat'
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage.content })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur réseau');
      }

      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.answer || "Désolé, je n'ai pas pu obtenir de réponse.",
        sources: data.sources
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'bot',
        content: "Une erreur technique est survenue. Veuillez réessayer plus tard."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-gabon-green hover:bg-gabon-green-dark'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gabon-yellow opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gabon-yellow"></span>
            </span>
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-neutral-gray-light"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gabon-green to-gabon-blue p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Assistant DGES</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  En ligne
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-background">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.type === 'user' ? 'bg-blue-100' : 'bg-gabon-green/10'
                  }`}>
                    {msg.type === 'user' ? <User className="w-5 h-5 text-blue-600" /> : <Bot className="w-5 h-5 text-gabon-green" />}
                  </div>
                  
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${
                    msg.type === 'user' 
                      ? 'bg-gabon-blue text-white rounded-tr-none' 
                      : 'bg-white text-neutral-black border border-neutral-gray-light rounded-tl-none'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    
                    {/* Sources (for bot) */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <p className="text-[10px] font-semibold text-gray-500 mb-1">Sources consultées :</p>
                        <div className="flex flex-wrap gap-1">
                            {msg.sources.map((source, idx) => (
                                <span key={idx} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-600 truncate max-w-[150px]">
                                    {source.content.substring(0, 20)}...
                                </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gabon-green/10 flex-shrink-0 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-gabon-green" />
                    </div>
                    <div className="bg-white border border-neutral-gray-light rounded-2xl rounded-tl-none p-4 shadow-sm">
                        <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gabon-green/50 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gabon-green/50 rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-gabon-green/50 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-neutral-gray-light">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Posez votre question..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl border border-neutral-gray-light focus:border-gabon-green focus:ring-2 focus:ring-gabon-green/20 outline-none transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gabon-green text-white rounded-lg hover:bg-gabon-green-dark disabled:opacity-50 disabled:hover:bg-gabon-green transition-colors"
                >
                  {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-center mt-2">
                <p className="text-[10px] text-neutral-gray-dark">
                  L'IA peut faire des erreurs. Vérifiez les informations importantes.
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
