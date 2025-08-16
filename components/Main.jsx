'use client'

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  Paperclip,
  Moon,
  Sun,
  MessageCircle,
  User,
  Settings,
  Plus,
  Menu,
  X
} from 'lucide-react';
import Image from 'next/image';

const MohdHassanAIChat = () => {
  const [isDark, setIsDark] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: '👋 Arre doston! Main hoon Mohd Hassan ka AI assistant – jo commit bhi karta hai aur comedy bhi.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const conversations = [
    { id: 1, title: 'React Best Practices', lastMessage: 'Thanks for the tips!', time: '2m ago' },
    { id: 2, title: 'AI Model Training', lastMessage: 'That makes sense now', time: '1h ago' },
    { id: 3, title: 'Next.js Project Setup', lastMessage: 'Perfect, working now', time: '2h ago' },
    { id: 4, title: 'GenAI Applications', lastMessage: 'Interesting approach', time: '1d ago' }
  ];

  const quickSuggestions = [
    "Hassan AI ka intro sunao 👋",
    "Mujhe roast karo 🔥",
    "Code samjhao but filmy style 🎬",
    "Bug ko feature bana do 🐞✨",
    "Life advice do… programmer wali 😅",
    "Meme mode on karo 🤡",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // const handleSendMessage = () => {
  //   if (!inputValue.trim()) return;

  //   const newMessage = {
  //     id: messages.length + 1,
  //     type: 'user',
  //     content: inputValue,
  //     timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //   };

  //   setMessages(prev => [...prev, newMessage]);
  //   setInputValue('');
  //   setIsTyping(true);

  //   // Simulate AI response
  //   setTimeout(() => {
  //     setIsTyping(false);
  //     const aiResponse = {
  //       id: messages.length + 2,
  //       type: 'ai',
  //       content: generateAIResponse(inputValue),
  //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //     };
  //     setMessages(prev => [...prev, aiResponse]);
  //   }, 1500);
  // };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isSending) return; // prevent duplicate
    setIsSending(true);

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const conversationHistory = [...messages, userMessage].map((msg) => ({
        sender: msg.type,
        content: msg.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue,
          conversationHistory,
        }),
      });

      const data = await res.json();

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
      setIsSending(false); // reset lock
    }
  };

  const handleQuickSuggestion = (suggestion) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  const parseMarkdown = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-700 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<pre class="bg-gray-800 p-3 rounded-lg mt-2 mb-2 overflow-x-auto"><code>$2</code></pre>');
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-3">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      <span className="text-sm text-gray-400 ml-2">Mohd Hassan AI is typing...</span>
    </div>
  );

  return (
    <div className={`flex h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gray-800 border-r border-gray-700 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    alt=""
                    src="/myimg.png"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                <div>
                  <h2 className="text-white font-semibold">Mohd Hassan AI</h2>
                  <p className="text-gray-400 text-sm">GenAI FullStack Developer</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <Plus size={16} />
              <span>New Chat</span>
            </button>
          </div>

          {/* Navigation */}
          <div className="px-4 pb-4">
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 text-white bg-gray-700 px-3 py-2 rounded-lg">
                <MessageCircle size={18} />
                <span>Conversations</span>
              </a>
              <a href="https://hassandev-beta.vercel.app/" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
                <User size={18} />
                <span>Profile</span>
              </a>
              <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors">
                <Settings size={18} />
                <span>Settings</span>
              </a>
            </nav>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4">
              <h3 className="text-gray-400 text-sm font-medium mb-3">Recent Chats</h3>
              <div className="space-y-2">
                {/* {conversations.map((conv) => (
                  <div key={conv.id} className="p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors group">
                    <h4 className="text-white text-sm font-medium truncate">{conv.title}</h4>
                    <p className="text-gray-400 text-xs truncate mt-1">{conv.lastMessage}</p>
                    <p className="text-gray-500 text-xs mt-1">{conv.time}</p>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-4 py-3 flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">MH</span>
              </div>
              <div>
                <h1 className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold`}>Mohd Hassan AI</h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Online • GenAI Developer</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-gray-300 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-3 rounded-2xl ${message.type === 'user'
                      ? 'bg-blue-600 text-white ml-4'
                      : isDark
                        ? 'bg-gray-700 text-gray-100 mr-4'
                        : 'bg-white text-gray-900 border mr-4'
                      } shadow-sm`}>
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
                      />
                      <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <div className="flex justify-start">
                <div className={`max-w-[80%] ${isDark ? 'bg-gray-700' : 'bg-white border'} rounded-2xl mr-4 shadow-sm`}>
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${isDark
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t p-4`}>
          <div className="max-w-4xl mx-auto">
            <div className={`flex items-center space-x-2 p-2 rounded-xl border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
              }`}>
              <button className={`p-2 rounded-lg ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                <Paperclip size={18} />
              </button>

              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // prevent default submit
                    handleSendMessage();
                  }
                }}
                placeholder="Ask Mohd Hassan AI assistant anything..."
                className={`flex-1 bg-transparent ${isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} focus:outline-none`}
              />

              <button className={`p-2 rounded-lg ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                <Mic size={18} />
              </button>

              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .prose code {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }
        .prose pre {
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }
      `}</style>
    </div>
  );
};

export default MohdHassanAIChat;