
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { projects } from '../data/projects';
import Button from './Button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'suggestion' | 'error';
  isTyping?: boolean;
}

interface AIChatbotProps {
  className?: string;
}

// Knowledge base for the AI assistant
const knowledgeBase = {
  profile: {
    name: 'Aminul Islam Bhuiyan Amin',
    role: 'AI-driven Computer Science Student',
    university: 'BUBT',
    about: "AI-driven Computer Science student at BUBT, deeply passionate about building intelligent systems. Interests lie in Deep Learning, NLP, and LLMs — with hands-on experience using PyTorch, TensorFlow, and Hugging Face. Currently exploring prompt engineering, multimodal AI, and LangChain-based applications.",
  },
  quickReplies: [
    { text: 'Tell me about your projects', action: 'projects' },
    { text: 'What are your skills?', action: 'skills' },
    { text: 'Show me your blog posts', action: 'blog' },
    { text: 'How can I contact you?', action: 'contact' },
    { text: "What's your background?", action: 'about' },
  ],
};

export const AIChatbot: React.FC<AIChatbotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: 'init-1',
            text: "Hi! I'm Aminul's AI Assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date(),
            type: 'text',
          },
          {
            id: 'init-2',
            text: JSON.stringify(knowledgeBase.quickReplies),
            sender: 'bot',
            timestamp: new Date(),
            type: 'quick-reply',
          },
        ]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  const generateResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();

    // Fuzzy matching helper
    const matches = (keywords: string[]) => keywords.some(k => message.includes(k));

    // Project related queries
    if (matches(['project', 'work', 'build', 'made', 'portfolio', 'app'])) {
      return {
        text: `I've built some cool things! Here are a few highlights:\n\n${projects.slice(0, 3).map(p => `• ${p.title}`).join('\n')}`,
        quickReplies: [
          { text: 'View all projects', action: 'projects' },
          { text: 'Tell me about skills', action: 'skills' }
        ]
      };
    }

    // Skills/Stack related queries
    if (matches(['skill', 'tech', 'stack', 'language', 'program', 'code', 'react', 'python', 'learn', 'expert'])) {
      return {
        text: "My technical toolkit includes:\n• Languages: Python, TypeScript, JavaScript\n• Frameworks: React, PyTorch, TensorFlow\n• Focus: Deep Learning, NLP, & Web Development",
        quickReplies: [
          { text: 'See my projects', action: 'projects' },
          { text: 'Contact me', action: 'contact' }
        ]
      };
    }

    // Contact related queries
    if (matches(['contact', 'email', 'hire', 'reach', 'touch', 'message', 'talk'])) {
      return {
        text: "I'd love to connect! You can reach me via email or LinkedIn. Check out the footer for direct links!",
        quickReplies: [{ text: 'Back to start', action: 'about' }]
      };
    }

    // Blog related queries
    if (matches(['blog', 'article', 'read', 'write', 'post', 'news'])) {
      return {
        text: "I write about AI and Tech. You can read my latest deep dives on the Blog page.",
        quickReplies: [{ text: 'Go to Blog', action: 'blog' }]
      };
    }

    // Identity/About queries
    if (matches(['who', 'name', 'about', 'student', 'background', 'intro', 'hi', 'hello', 'hey'])) {
      return {
        text: "Hi! I'm Aminul Islam Bhuiyan Amin, an AI-driven Computer Science student at BUBT. I love building intelligent systems. How can I help?",
        quickReplies: [
          { text: 'What are your skills?', action: 'skills' },
          { text: 'Show me projects', action: 'projects' }
        ]
      };
    }

    return {
      text: "I'm not sure about that, but I can tell you about my projects, skills, or background. What interests you?",
      quickReplies: knowledgeBase.quickReplies
    };
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // User Message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI delay
    setTimeout(() => {
      const response = generateResponse(text);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);

      if (response.quickReplies) {
        setMessages((prev) => [...prev, {
          id: (Date.now() + 2).toString(),
          text: JSON.stringify(response.quickReplies),
          sender: 'bot',
          timestamp: new Date(),
          type: 'quick-reply'
        }]);
      }
    }, 1000);
  };

  const handleQuickReply = (action: string) => {
    // Handle navigation or specific actions here
    if (action === 'projects') handleSendMessage('Tell me about your projects');
    if (action === 'skills') handleSendMessage('What are your skills?');
    if (action === 'blog') handleSendMessage('Show me blog posts');
    if (action === 'contact') handleSendMessage('How can I contact you?');
    if (action === 'about') handleSendMessage("What's your background?");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '500px',
              width: isMinimized ? '300px' : '350px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-200 dark:border-gray-700 flex flex-col ${className}`}
          >
            {/* Header */}
            <div className="p-4 bg-primary text-white flex justify-between items-center bg-gradient-to-r from-primary to-indigo-600">
              <div className="flex items-center gap-2">
                <FiMessageCircle className="w-5 h-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                >
                  {isMinimized ? <FiMaximize2 className="w-4 h-4" /> : <FiMinimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.type === 'quick-reply' ? (
                        <div className="flex flex-wrap gap-2 max-w-[85%]">
                          {JSON.parse(msg.text).map((reply: { text: string; action: string }, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => handleQuickReply(reply.action)}
                              className="text-xs bg-white dark:bg-gray-800 text-primary border border-primary/20 px-3 py-1.5 rounded-full hover:bg-primary/5 transition-colors shadow-sm"
                            >
                              {reply.text}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-700'
                            }`}
                        >
                          <p className="text-sm whitespace-pre-line">{msg.text}</p>
                          <span className="text-[10px] opacity-70 mt-1 block">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-100 dark:bg-gray-900 border-0 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary/50"
                    />
                    <Button
                      onClick={() => handleSendMessage(inputValue)}
                      className="!p-2 !rounded-xl aspect-square flex items-center justify-center"
                      disabled={!inputValue.trim()}
                      aria-label="Send message"
                    >
                      <FiSend className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Bubble */}
      <AnimatePresence>
        {!isOpen && !messages.length && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="fixed bottom-8 right-24 z-50 pointer-events-none"
          >
            <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-2">
              <span className="text-sm font-medium whitespace-nowrap">Need help? 👋</span>
              {/* Arrow */}
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-gray-800 border-t border-r border-gray-100 dark:border-gray-700 transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-colors ${isOpen ? 'bg-gray-800 text-white' : 'btn text-white'
          }`}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMessageCircle className="w-6 h-6" />}
      </motion.button>
    </>
  );
};
