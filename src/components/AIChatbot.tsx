import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiUser, FiMinimize2, FiMaximize2 } from 'react-icons/fi';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blog';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'suggestion';
  isTyping?: boolean;
}

interface QuickReply {
  text: string;
  action: string;
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
    interests: ['Deep Learning', 'NLP', 'LLMs', 'Computer Vision'],
    technologies: ['PyTorch', 'TensorFlow', 'Hugging Face', 'Python', 'React', 'TypeScript'],
    currentFocus: 'Prompt engineering, multimodal AI, and LangChain-based applications',
  },
  skills: [
    {
      category: 'AI/ML',
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'LLMs', 'Computer Vision'],
    },
    { category: 'Programming', skills: ['Python', 'TypeScript', 'C++', 'Java'] },
    {
      category: 'Data Science',
      skills: ['Pandas', 'NumPy', 'Data Analysis', 'Data Visualization'],
    },
    { category: 'Tools & Platforms', skills: ['Docker', 'Git', 'AWS', 'Linux', 'MLOps'] },
  ],
  quickReplies: [
    { text: 'Tell me about your projects', action: 'projects' },
    { text: 'What are your skills?', action: 'skills' },
    { text: 'Show me your blog posts', action: 'blog' },
    { text: 'How can I contact you?', action: 'contact' },
    { text: "What's your background?", action: 'about' },
  ],
};

// Simple AI response generator
const generateAIResponse = (userMessage: string): { text: string; quickReplies?: QuickReply[] } => {
  const message = userMessage.toLowerCase();

  // Greeting responses
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return {
      text: `Hello! 👋 I'm Aminul's AI assistant. I can help you learn about his projects, skills, and experience. What would you like to know?`,
      quickReplies: knowledgeBase.quickReplies,
    };
  }

  // Projects
  if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
    const projectList = projects
      .map((p) => `• ${p.title}: ${p.description.substring(0, 100)}...`)
      .join('\n');
    return {
      text: `Here are some of Aminul's key projects:\n\n${projectList}\n\nWould you like to know more about any specific project?`,
      quickReplies: [
        { text: 'View all projects', action: 'view-projects' },
        { text: 'Latest project', action: 'latest-project' },
      ],
    };
  }

  // Skills
  if (
    message.includes('skill') ||
    message.includes('technology') ||
    message.includes('tech stack')
  ) {
    const skillsText = knowledgeBase.skills
      .map((category) => `**${category.category}**: ${category.skills.join(', ')}`)
      .join('\n\n');
    return {
      text: `Aminul's technical skills include:\n\n${skillsText}\n\nHe's particularly passionate about AI/ML and is currently exploring ${knowledgeBase.profile.currentFocus}.`,
      quickReplies: [
        { text: 'AI/ML expertise', action: 'ai-skills' },
        { text: 'Programming languages', action: 'programming' },
      ],
    };
  }

  // Blog
  if (message.includes('blog') || message.includes('article') || message.includes('post')) {
    if (blogPosts.length > 0) {
      const recentPosts = blogPosts
        .slice(0, 3)
        .map((post) => `• ${post.title} (${post.date})`)
        .join('\n');
      return {
        text: `Here are some recent blog posts:\n\n${recentPosts}\n\nAminul shares insights about AI, machine learning, and software development.`,
        quickReplies: [
          { text: 'Read latest post', action: 'latest-blog' },
          { text: 'View all posts', action: 'view-blog' },
        ],
      };
    } else {
      return {
        text: 'Aminul is working on some exciting blog posts about AI and machine learning. Stay tuned for updates!',
        quickReplies: [{ text: 'Get notified', action: 'newsletter' }],
      };
    }
  }

  // About/Background
  if (message.includes('about') || message.includes('background') || message.includes('who')) {
    return {
      text: `${knowledgeBase.profile.name} is an ${knowledgeBase.profile.role} at ${knowledgeBase.profile.university}. He's passionate about building intelligent systems and has hands-on experience with ${knowledgeBase.profile.technologies.slice(0, 3).join(', ')}.\n\nCurrently, he's exploring ${knowledgeBase.profile.currentFocus}.`,
      quickReplies: [
        { text: 'View full resume', action: 'resume' },
        { text: 'Contact information', action: 'contact' },
      ],
    };
  }

  // Contact
  if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
    return {
      text: 'You can reach out to Aminul through:\n\n• Email: Contact form on the website\n• LinkedIn: Professional networking\n• GitHub: Code collaboration\n\nFeel free to connect for opportunities, collaborations, or just to chat about AI and technology!',
      quickReplies: [
        { text: 'Go to contact form', action: 'contact-form' },
        { text: 'View social links', action: 'social' },
      ],
    };
  }

  // AI/ML specific
  if (
    message.includes('ai') ||
    message.includes('machine learning') ||
    message.includes('deep learning')
  ) {
    return {
      text: `Aminul specializes in AI/ML with expertise in:\n\n• Deep Learning frameworks (PyTorch, TensorFlow)\n• Natural Language Processing\n• Large Language Models\n• Computer Vision\n• MLOps and deployment\n\nHe's currently working on prompt engineering and multimodal AI applications.`,
      quickReplies: [
        { text: 'View AI projects', action: 'ai-projects' },
        { text: 'Technical skills', action: 'skills' },
      ],
    };
  }

  // Default response
  return {
    text: "I'd be happy to help you learn more about Aminul! You can ask me about his projects, skills, background, or how to get in touch. What interests you most?",
    quickReplies: knowledgeBase.quickReplies,
  };
};

export const AIChatbot: React.FC<AIChatbotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: "Hi! 👋 I'm Aminul's AI assistant. I can help you explore his projects, learn about his skills, or answer any questions about his work. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

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

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse = generateAIResponse(text);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: aiResponse.text,
          sender: 'bot',
          timestamp: new Date(),
          type: 'text',
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);

        // Add quick replies if available
        if (aiResponse.quickReplies) {
          setTimeout(() => {
            const quickReplyMessage: Message = {
              id: (Date.now() + 2).toString(),
              text: JSON.stringify(aiResponse.quickReplies),
              sender: 'bot',
              timestamp: new Date(),
              type: 'quick-reply',
            };
            setMessages((prev) => [...prev, quickReplyMessage]);
          }, 500);
        }
      },
      1000 + Math.random() * 1000
    );
  };

  const handleQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <FiMessageCircle className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 glass-card rounded-2xl shadow-2xl z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-indigo-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <FiMessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs opacity-90">Ask me about Aminul&apos;s work</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMinimize}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  {isMinimized ? (
                    <FiMaximize2 className="w-4 h-4" />
                  ) : (
                    <FiMinimize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  className="overflow-hidden"
                >
                  {/* Messages */}
                  <div className="h-80 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <div key={message.id}>
                        {message.type === 'quick-reply' ? (
                          <div className="flex flex-wrap gap-2">
                            {JSON.parse(message.text).map((reply: QuickReply, index: number) => (
                              <button
                                key={index}
                                onClick={() => handleQuickReply(reply)}
                                className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary rounded-full text-sm transition-colors"
                              >
                                {reply.text}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div
                            className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            {message.sender === 'bot' && (
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <FiMessageCircle className="w-4 h-4 text-primary" />
                              </div>
                            )}
                            <div
                              className={`max-w-xs px-4 py-2 rounded-2xl ${
                                message.sender === 'user'
                                  ? 'bg-primary text-white'
                                  : 'bg-white/10 text-white'
                              }`}
                            >
                              <p className="text-sm whitespace-pre-line">{message.text}</p>
                              <div className="text-sm text-gray-400">
                                {message.timestamp.toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                                {message.sender === 'bot' && (
                                  <span className="ml-2">
                                    {message.isTyping ? 'typing...' : 'AI Assistant'}
                                  </span>
                                )}
                                {message.sender === 'user' && 'You'}
                              </div>
                            </div>
                            {message.sender === 'user' && (
                              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                                <FiUser className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <FiMessageCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div className="bg-white/10 px-4 py-2 rounded-2xl">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                              style={{ animationDelay: '0.1s' }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                              style={{ animationDelay: '0.2s' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-white/10">
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything..."
                        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                      />
                      <button
                        onClick={() => handleSendMessage(inputValue)}
                        disabled={!inputValue.trim() || isTyping}
                        className="p-2 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                      >
                        <FiSend className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
