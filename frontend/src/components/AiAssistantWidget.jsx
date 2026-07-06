import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function AiAssistantWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: t('chat_welcome'), sender: 'bot', time: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      time: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputText.toLowerCase();
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let replyText = "";
      if (query.includes('weather') || query.includes('rain') || query.includes('forecast')) {
        replyText = "The live weather indicates light clouds in Bangalore (25°C) and moderate rain in Mumbai (30°C). Check the Weather tab for active alerts!";
      } else if (query.includes('blight') || query.includes('disease') || query.includes('leaf') || query.includes('cure')) {
        replyText = "For leaf spots or blight, we recommend uploading a photo on our Leaf Scanner page. Typically, removing infected leaves and spraying 1% Neem Oil solution or copper fungicides controls it organic-style.";
      } else if (query.includes('market') || query.includes('price') || query.includes('seed') || query.includes('sell')) {
        replyText = "You can view or list items in the Marketplace. Organic NPK fertilizer starts around ₹800/10kg, and Hybrid Ragi Seeds sell for ₹450/5kg.";
      } else if (query.includes('organic') || query.includes('manure') || query.includes('compost')) {
        replyText = "Organic farming focuses on crop rotation, green manures, and biological pest control. Check out the Learning Center for video guides on vermicomposting!";
      } else if (query.includes('task') || query.includes('todo') || query.includes('chore')) {
        replyText = "You can log and schedule tasks in the Dashboard. Setting reminders helps you fertilize or irrigate on time.";
      } else {
        replyText = `That's a good farming question! I am compiling agricultural guidelines regarding "${query}". I recommend checking our Learning Center page or consulting local agronomy officers for specific details.`;
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: replyText, sender: 'bot', time: new Date() }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="flex flex-col w-[350px] sm:w-[400px] h-[500px] bg-background border border-primary/20 rounded-2xl shadow-2xl overflow-hidden mb-4 transition-theme">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-primary text-white">
            <div className="flex items-center gap-2.5">
              <Bot size={20} className="text-accent" />
              <div>
                <h3 className="font-bold text-sm leading-none">{t('chat_header')}</h3>
                <span className="text-[10px] text-accent/80 font-medium">Online Helpdesk</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-background-soft/30">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-2 max-w-[80%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-white ${
                  msg.sender === 'user' ? 'bg-primary-light' : 'bg-primary'
                }`}>
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-background border border-primary/10 rounded-tl-none text-primary'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                  <span className="text-[9px] block text-right mt-1 opacity-60">
                    {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 max-w-[80%]">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white">
                  <Bot size={14} />
                </div>
                <div className="p-3 bg-background border border-primary/10 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 bg-background border-t border-primary/10 flex gap-2">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('chat_placeholder')}
              className="flex-1 px-4 py-2 text-sm bg-background-soft border border-primary/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary text-primary"
            />
            <button 
              type="submit"
              className="p-2.5 bg-primary hover:bg-primary-light text-white rounded-xl shadow-md transition-theme flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-primary hover:bg-primary-light text-white shadow-xl hover:scale-105 transition-transform"
        aria-label="Ask Farm Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
