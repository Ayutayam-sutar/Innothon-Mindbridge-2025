import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Users, Shield, Heart, Clock, User } from 'lucide-react';

const ChatPage = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      user: 'Anonymous Student',
      content: 'Hey everyone, I\'ve been feeling really anxious about my upcoming finals. Anyone else dealing with exam stress?',
      timestamp: new Date(Date.now() - 300000),
      isOwn: false
    },
    {
      id: '2',
      user: 'Supportive Friend',
      content: 'I totally understand! I found that breaking my study schedule into smaller chunks really helped. Also, don\'t forget to take breaks.',
      timestamp: new Date(Date.now() - 240000),
      isOwn: false
    },
    {
      id: '3',
      user: 'Caring Peer',
      content: 'Same here! What helped me was practicing some breathing exercises before studying. There are some great apps for that.',
      timestamp: new Date(Date.now() - 180000),
      isOwn: false
    },
    {
      id: '4',
      user: 'You',
      content: 'Thanks for sharing everyone. It\'s comforting to know I\'m not alone in feeling this way.',
      timestamp: new Date(Date.now() - 120000),
      isOwn: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers] = useState(12);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      user: 'You',
      content: newMessage,
      timestamp: new Date(),
      isOwn: true
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate a response after a delay
    setTimeout(() => {
      const responses = [
        'That\'s a great point! Thanks for sharing.',
        'I really appreciate your perspective on this.',
        'You\'re so brave for opening up about that.',
        'I\'ve been through something similar. You\'re not alone.',
        'That sounds really challenging. How are you coping?'
      ];
      
      const response = {
        id: (Date.now() + 1).toString(),
        user: 'Supportive Friend',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        isOwn: false
      };
      
      setMessages(prev => [...prev, response]);
    }, 2000 + Math.random() * 3000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
          <MessageCircle className="w-8 h-8 text-indigo-600" />
          <span>Anonymous Support Chat</span>
        </h1>
        <p className="text-gray-600">Connect with peers in a safe, anonymous environment</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-gray-900">Support Chat Room</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{onlineUsers} online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.isOwn
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="w-3 h-3 opacity-70" />
                        <span className={`text-xs font-medium ${
                          message.isOwn ? 'text-indigo-100' : 'text-gray-600'
                        }`}>
                          {message.user}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <div className={`flex items-center space-x-1 mt-1 text-xs text-gray-500 ${
                      message.isOwn ? 'justify-end' : 'justify-start'
                    }`}>
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message... (stay kind and supportive)"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Chat Guidelines */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-indigo-600" />
              <span>Chat Guidelines</span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <Heart className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span>Be kind and supportive to everyone</span>
              </li>
              <li className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Respect everyone's anonymity</span>
              </li>
              <li className="flex items-start space-x-2">
                <MessageCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Share experiences, not personal details</span>
              </li>
              <li className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <span>Listen actively and offer encouragement</span>
              </li>
            </ul>
          </div>

          {/* Quick Responses */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Responses</h3>
            <div className="space-y-2">
              {[
                "I understand how you're feeling",
                "You're not alone in this",
                "That sounds really challenging",
                "Thanks for sharing that with us",
                "I'm here if you need to talk"
              ].map((response, index) => (
                <button
                  key={index}
                  onClick={() => setNewMessage(response)}
                  className="w-full text-left p-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors"
                >
                  "{response}"
                </button>
              ))}
            </div>
          </div>

          {/* Crisis Support >Call 9152987821 - Crisis Lifeline
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-3">Crisis Support</h3>
            <p className="text-red-700 text-sm mb-4">
              If you or someone else is in immediate danger, please seek professional help.
            </p>
            <div className="space-y-2">
              <a href='tel:9152987821 '><button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                National Crisis Line
              </button></a>
             <a href='tel:100'> <button className="w-full bg-white text-red-600 border border-red-300 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                Find Local Help
              </button></a>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;