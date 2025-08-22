import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Bot, Send, User, Heart, Brain, Lightbulb, MessageCircle, Smile, AlertCircle, Phone, Sparkles, Shield, Clock } from 'lucide-react';
import ConsultationPage from './ConsultationPage';

const ChatbotPage = ({ user }) => { 
//  const [currentPage, setCurrentPage] = useState(); 
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'bot',
      content: `Hello ${user?.name || 'there'}! 👋 I'm MindBot, your AI mental health companion. I'm here to provide support, resources, and a listening ear whenever you need it. How are you feeling today?`,
      timestamp: new Date(),
      suggestions: ['I\'m feeling anxious', 'I\'m stressed about exams', 'I\'m feeling lonely', 'I need motivation']
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

/* const botResponses = {
    anxiety: {
      responses: [
        "I understand that anxiety can feel overwhelming. Let's try a quick breathing exercise: Breathe in for 4 counts, hold for 4, then breathe out for 6. This activates your parasympathetic nervous system and can help calm your mind. 🌸",
        "Anxiety is your body's natural response to stress, and it's completely normal to feel this way. One technique that many find helpful is the 5-4-3-2-1 grounding method: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. 🌿",
        "When anxiety strikes, remember that feelings are temporary. Try to focus on what you can control right now. Would you like me to guide you through a short mindfulness exercise? 🧘‍♀️"
      ],
      suggestions: ['Breathing exercises', 'Grounding techniques', 'Talk to a counselor', 'Anxiety resources']
    },
    stress: {
      responses: [
        "Exam stress is incredibly common among students. Remember, your worth isn't determined by your grades. Let's break this down: What specific aspect of your exams is causing the most stress? 📚",
        "Stress can actually be helpful in small doses, but chronic stress isn't good for your mental health. Have you tried the Pomodoro Technique? Study for 25 minutes, then take a 5-minute break. This can make studying feel more manageable. ⏰",
        "It sounds like you're carrying a heavy load. Remember to be kind to yourself. What's one small thing you could do today to take care of yourself? 💜"
      ],
      suggestions: ['Study techniques', 'Time management', 'Stress relief activities', 'Academic support']
    },
    lonely: {
      responses: [
        "Feeling lonely is one of the most human experiences, and I want you to know that you're not alone in feeling this way. Loneliness doesn't mean there's something wrong with you - it's often a sign that you're craving meaningful connection. 🤗",
        "Loneliness can be really painful, but it's also temporary. Sometimes reaching out to just one person - even sending a simple text - can help. Is there someone in your life you could connect with today? 💙",
        "I hear you, and your feelings are completely valid. Sometimes loneliness hits hardest when we're surrounded by people but don't feel truly seen. Would you like to talk about what connection means to you? 🌟"
      ],
      suggestions: ['Join community groups', 'Connect with friends', 'Campus activities', 'Support groups']
    },
    motivation: {
      responses: [
        "Everyone goes through periods where motivation feels low - it's part of being human. Sometimes the key isn't finding motivation, but taking small actions even without it. What's one tiny step you could take today? 🚀",
        "Motivation often comes after action, not before. Try the 'two-minute rule': commit to doing something for just two minutes. Often, starting is the hardest part, and you might find yourself continuing. ⚡",
        "Remember why you started your journey. What are your deeper values and goals? Sometimes reconnecting with our 'why' can reignite that spark. What matters most to you? 🎯"
      ],
      suggestions: ['Goal setting', 'Daily routines', 'Inspirational content', 'Achievement tracking']
    },
    depression: {
      responses: [
        "I hear you, and I want you to know that what you're experiencing is valid. Depression can make everything feel heavy and overwhelming, but you're not alone in this struggle. Small steps count - even getting out of bed is an achievement. 🌻",
        "Depression affects millions of people, and it's a real medical condition that deserves proper care. While I can offer support, please consider reaching out to a mental health professional. In the meantime, what's one small thing that used to bring you joy? 💙",
        "When you're in a dark place, it's hard to see the light, but it's there. Your feelings are temporary, even though they feel permanent right now. Have you been able to talk to anyone about how you're feeling? 🌈"
      ],
      suggestions: ['Professional help', 'Support groups', 'Crisis resources', 'Self-care activities']
    },
    relationships: {
      responses: [
        "Relationships can be both wonderful and challenging. It's normal to have ups and downs with people we care about. Communication is often key - have you been able to express your feelings openly with the person involved? 💕",
        "Healthy relationships require mutual respect, trust, and understanding. Remember that you deserve to be treated with kindness and respect. What specific aspect of your relationship is concerning you? 🤝",
        "Whether it's family, friends, or romantic relationships, they all require work and understanding. Sometimes we need to set boundaries to protect our mental health. What would healthy boundaries look like for you? 🌟"
      ],
      suggestions: ['Communication tips', 'Boundary setting', 'Relationship resources', 'Conflict resolution']
    },
    academic: {
      responses: [
        "Academic pressure can feel overwhelming, but remember that your worth isn't defined by your grades. Let's break down what you're struggling with - is it time management, understanding the material, or test anxiety? 📚",
        "School can be challenging, and it's okay to ask for help. Many successful people struggled academically at some point. What subject or aspect of your studies is giving you the most trouble? 🎓",
        "Remember that learning is a process, not a destination. Everyone learns differently and at their own pace. Have you tried different study methods to see what works best for you? ✏️"
      ],
      suggestions: ['Study strategies', 'Time management', 'Academic support', 'Test anxiety help']
    },
    career: {
      responses: [
        "Career uncertainty is completely normal, especially in today's rapidly changing world. Many people change careers multiple times throughout their lives. What aspects of your career or future job are concerning you most? 💼",
        "It's natural to feel anxious about your professional future. Remember that careers are journeys, not destinations. What are your interests and values? Let's start there. 🎯",
        "The job market can feel overwhelming, but there are always opportunities for those who keep looking. Have you considered talking to people in fields that interest you? Networking can open unexpected doors. 🌟"
      ],
      suggestions: ['Career exploration', 'Resume help', 'Interview tips', 'Networking advice']
    },
    health: {
      responses: [
        "Your physical and mental health are interconnected. While I can't provide medical advice, I can remind you that taking care of your body helps your mind too. Are you concerned about a specific health issue? 🏥",
        "Health anxiety is common, especially with so much information available online. If you have health concerns, it's always best to consult with a healthcare professional. How can I support you emotionally while you address this? 💚",
        "Remember that stress and anxiety can manifest physically. Regular exercise, good sleep, and proper nutrition all contribute to better mental health. What aspect of your health are you most concerned about? 🌿"
      ],
      suggestions: ['Healthy habits', 'Stress management', 'Professional medical help', 'Wellness resources']
    },
    family: {
      responses: [
        "Family relationships can be complex and emotionally charged. It's okay to have complicated feelings about family members. What specific family situation is affecting your mental health? 👨‍👩‍👧‍👦",
        "Family dynamics can significantly impact our well-being. Remember that you can love someone while also setting boundaries to protect your mental health. What's been weighing on your mind about your family? 💙",
        "Every family has its challenges, and it's normal to feel frustrated or hurt sometimes. You can't control others' actions, but you can control how you respond. What would be most helpful for you right now? 🏠"
      ],
      suggestions: ['Family communication', 'Setting boundaries', 'Family therapy', 'Support groups']
    },
    sleep: {
      responses: [
        "Sleep problems can significantly impact your mental health and daily functioning. Good sleep hygiene is crucial - try to keep a consistent sleep schedule and create a relaxing bedtime routine. What's been affecting your sleep? 😴",
        "Insomnia and sleep issues often go hand-in-hand with anxiety and stress. Have you tried limiting screen time before bed, keeping your room cool and dark, or practicing relaxation techniques? 🌙",
        "Quality sleep is essential for emotional regulation and mental clarity. If sleep problems persist, consider talking to a healthcare provider. What time do you usually try to go to bed? 💤"
      ],
      suggestions: ['Sleep hygiene', 'Relaxation techniques', 'Sleep schedule', 'Professional help']
    },
    selfesteem: {
      responses: [
        "Self-esteem issues are incredibly common, and you're not alone in struggling with this. Remember that your worth isn't determined by your achievements or what others think of you. What thoughts about yourself have been bothering you? 🌟",
        "Building self-esteem takes time and practice. Try to notice when you're being overly critical of yourself. What would you say to a friend who was going through the same thing? 💪",
        "You are worthy of love and respect exactly as you are. Self-compassion is just as important as compassion for others. What's one thing you appreciate about yourself? 🌈"
      ],
      suggestions: ['Self-compassion exercises', 'Positive affirmations', 'Therapy resources', 'Self-care activities']
    },
    eating: {
      responses: [
        "Eating and body image concerns can be really distressing. Your relationship with food and your body is important for your overall well-being. If you're struggling with eating patterns, please consider reaching out to a healthcare professional. 🍎",
        "Many people struggle with their relationship with food and their body. Remember that all bodies are different, and health comes in many sizes. What's been concerning you about eating or your body? 💚",
        "If you're having thoughts about restricting food, binge eating, or other concerning eating behaviors, please reach out for professional help. You deserve support and care. How can I help you today? 🌻"
      ],
      suggestions: ['Professional help', 'Body positivity', 'Eating disorder resources', 'Healthy relationship with food']
    },
    addiction: {
      responses: [
        "Addiction is a serious medical condition, and seeking help is a sign of strength, not weakness. If you're struggling with substance use or behavioral addictions, please know that recovery is possible with proper support. 🌟",
        "Addiction affects not just the person struggling, but their loved ones too. There are resources available for both individuals and families. What kind of support are you looking for? 💙",
        "Recovery is a journey, and it's okay to take it one day at a time. Professional treatment, support groups, and a strong support network can make a huge difference. Have you considered reaching out for professional help? 🌈"
      ],
      suggestions: ['Addiction resources', 'Support groups', 'Professional treatment', 'Recovery programs']
    },
    trauma: {
      responses: [
        "Trauma can have lasting effects on mental health, and it's important to process these experiences with proper support. If you've experienced trauma, please consider working with a trauma-informed therapist. 🌸",
        "Healing from trauma takes time, and everyone's journey is different. You're incredibly brave for seeking support. What feels most important for you to address right now? 💜",
        "Trauma can affect how we see ourselves and the world around us. Remember that what happened to you wasn't your fault, and healing is possible. Have you been able to talk to anyone about your experiences? 🌿"
      ],
      suggestions: ['Trauma therapy', 'Support groups', 'Coping strategies', 'Professional resources']
    },
    general: {
      responses: [
        "Thank you for sharing that with me. It takes courage to open up about how you're feeling. I'm here to listen and support you through this. 💚",
        "I appreciate you trusting me with your thoughts. Remember, seeking help and talking about your feelings is a sign of strength, not weakness. 🌈",
        "Your feelings are valid, and it's okay to not be okay sometimes. What would be most helpful for you right now? ✨",
        "I'm here to support you with whatever you're going through. Whether it's mental health, relationships, school, or just life in general, I'm listening. What's on your mind? 🤗",
        "Life can throw us curveballs, and it's normal to feel overwhelmed sometimes. Remember that you don't have to face everything alone. How can I best support you today? 🌟"
      ],
      suggestions: ['Mental health resources', 'Coping strategies', 'Professional help', 'Self-care tips']
    },
    casual: {
      responses: [
        "I'm doing well, thank you for asking! I'm here and ready to help with whatever you need. How are you doing today? 😊",
        "Thanks for the friendly greeting! I'm always happy to chat. What's been going on with you lately? 🌟",
        "Hello! It's great to connect with you. I'm here to support you with anything you'd like to talk about. What's on your mind? 💙"
      ],
      suggestions: ['How are you feeling?', 'Tell me about your day', 'What\'s on your mind?', 'Need someone to talk to?']
    },
    philosophical: {
      responses: [
        "That's a fascinating question that philosophers have pondered for centuries. While I can't provide definitive answers to life's big questions, I can help you explore your thoughts and feelings about them. What's your perspective? 🤔",
        "Deep questions about existence, meaning, and purpose are natural parts of the human experience. Sometimes contemplating these topics can bring both wonder and anxiety. How are these thoughts affecting you? 💭",
        "Philosophy and mental health often intersect. Exploring life's big questions can be both enlightening and overwhelming. What aspects of this topic resonate most with you? 🌟"
      ],
      suggestions: ['Life\'s purpose', 'Finding meaning', 'Existential thoughts', 'Philosophy resources']
    },
    compliment: {
      responses: [
        "Thank you so much for the kind words! It really means a lot to hear that I'm being helpful. Your willingness to reach out and work on your well-being is truly admirable. 💚",
        "I appreciate your kindness! Remember that you're doing the important work by being open to support and growth. That takes real courage. 🌟",
        "Thank you for saying that! It's an honor to be part of your journey toward better mental health. You deserve all the support and care you're seeking. ✨"
      ],
      suggestions: ['Tell me more about yourself', 'What\'s going well?', 'How can I help today?', 'Share something positive']
    }
  };*/

  const quickResponses = [
    "I'm feeling anxious about my future",
    "I'm having trouble sleeping",
    "I feel overwhelmed with schoolwork",
    "I'm struggling with self-confidence",
    "I need help managing my emotions",
    "I want to improve my mental health",
   
  ];

  /*const getResponseCategory = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Greeting patterns
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening|how are you|what's up|sup)/)) {
      return 'casual';
    }
    
    // Compliments and gratitude
    if (lowerMessage.includes('thank you') || lowerMessage.includes('thanks') || lowerMessage.includes('helpful') || 
        lowerMessage.includes('great') || lowerMessage.includes('amazing') || lowerMessage.includes('awesome')) {
      return 'compliment';
    }
    
    // Mental health conditions
    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety') || lowerMessage.includes('worried') || 
        lowerMessage.includes('nervous') || lowerMessage.includes('panic')) {
      return 'anxiety';
    }
    
    if (lowerMessage.includes('depressed') || lowerMessage.includes('depression') || lowerMessage.includes('sad') || 
        lowerMessage.includes('hopeless') || lowerMessage.includes('empty') || lowerMessage.includes('worthless')) {
      return 'depression';
    }
    
    if (lowerMessage.includes('stress') || lowerMessage.includes('exam') || lowerMessage.includes('overwhelmed') || 
        lowerMessage.includes('pressure') || lowerMessage.includes('deadline')) {
      return 'stress';
    }
    
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone') || lowerMessage.includes('isolated') || 
        lowerMessage.includes('friends') || lowerMessage.includes('social')) {
      return 'lonely';
    }
    
    if (lowerMessage.includes('motivation') || lowerMessage.includes('motivated') || lowerMessage.includes('lazy') || 
        lowerMessage.includes('procrastination') || lowerMessage.includes('procrastinate')) {
      return 'motivation';
    }
    
    // Life areas
    if (lowerMessage.includes('relationship') || lowerMessage.includes('boyfriend') || lowerMessage.includes('girlfriend') || 
        lowerMessage.includes('partner') || lowerMessage.includes('dating') || lowerMessage.includes('marriage') || 
        lowerMessage.includes('breakup') || lowerMessage.includes('divorce')) {
      return 'relationships';
    }
    
    if (lowerMessage.includes('family') || lowerMessage.includes('parents') || lowerMessage.includes('mom') || 
        lowerMessage.includes('dad') || lowerMessage.includes('siblings') || lowerMessage.includes('brother') || 
        lowerMessage.includes('sister') || lowerMessage.includes('home')) {
      return 'family';
    }
    
    if (lowerMessage.includes('school') || lowerMessage.includes('study') || lowerMessage.includes('college') || 
        lowerMessage.includes('university') || lowerMessage.includes('grade') || lowerMessage.includes('test') || 
        lowerMessage.includes('homework') || lowerMessage.includes('assignment')) {
      return 'academic';
    }
    
    if (lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('work') || 
        lowerMessage.includes('employment') || lowerMessage.includes('interview') || lowerMessage.includes('resume')) {
      return 'career';
    }
    
    if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia') || lowerMessage.includes('tired') || 
        lowerMessage.includes('exhausted') || lowerMessage.includes('can\'t sleep') || lowerMessage.includes('nightmares')) {
      return 'sleep';
    }
    
    if (lowerMessage.includes('self-esteem') || lowerMessage.includes('confidence') || lowerMessage.includes('self-worth') || 
        lowerMessage.includes('ugly') || lowerMessage.includes('stupid') || lowerMessage.includes('failure') || 
        lowerMessage.includes('not good enough')) {
      return 'selfesteem';
    }
    
    if (lowerMessage.includes('eating') || lowerMessage.includes('food') || lowerMessage.includes('weight') || 
        lowerMessage.includes('body') || lowerMessage.includes('fat') || lowerMessage.includes('diet') || 
        lowerMessage.includes('anorexia') || lowerMessage.includes('bulimia')) {
      return 'eating';
    }
    
    if (lowerMessage.includes('health') || lowerMessage.includes('sick') || lowerMessage.includes('pain') || 
        lowerMessage.includes('doctor') || lowerMessage.includes('medical') || lowerMessage.includes('symptoms')) {
      return 'health';
    }
    
    if (lowerMessage.includes('addiction') || lowerMessage.includes('drugs') || lowerMessage.includes('alcohol') || 
        lowerMessage.includes('gambling') || lowerMessage.includes('substance') || lowerMessage.includes('recovery')) {
      return 'addiction';
    }
    
    if (lowerMessage.includes('trauma') || lowerMessage.includes('abuse') || lowerMessage.includes('ptsd') || 
        lowerMessage.includes('flashbacks') || lowerMessage.includes('assault') || lowerMessage.includes('violence')) {
      return 'trauma';
    }
    
    // Philosophical questions
    if (lowerMessage.includes('meaning') || lowerMessage.includes('purpose') || lowerMessage.includes('why') || 
        lowerMessage.includes('existence') || lowerMessage.includes('life') || lowerMessage.includes('death') || 
        lowerMessage.includes('philosophy')) {
      return 'philosophical';
    }
    
    return 'general';
  };
*/

/*  const generateBotResponse = (userMessage) => {
    const category = getResponseCategory(userMessage);
    const categoryData = botResponses[category];
    const randomResponse = categoryData.responses[Math.floor(Math.random() * categoryData.responses.length)];
    
    return {
      content: randomResponse,
      suggestions: categoryData.suggestions
    };
  };*/


// BRICK 2, CHANGE 2: Replace your old handleSendMessage function with this
// Find your entire handleSendMessage function and REPLACE it with this block

const handleSendMessage = async (messageText) => {
  // Brick 1: Determine the correct text to send.
  // If messageText was provided (from a suggestion button), use it.
  // Otherwise, use the text from the input box state (inputMessage).
  const textToSend = messageText || inputMessage;

  // Now, we can safely check the text. This fixes your error.
  if (!textToSend.trim()) return;

  const userMessage = {
    id: Date.now().toString(),
    type: 'user',
    content: textToSend, // Use the safe textToSend variable
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputMessage('');
  setIsTyping(true);

  try {
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };
    // Also use the safe textToSend variable here for the backend
    const body = { message: textToSend };

    const res = await axios.post('http://localhost:5000/api/ai/chat', body, config);

    const botMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: res.data.response,
      timestamp: new Date(),
      suggestions: [] 
    };

    setMessages(prev => [...prev, botMessage]);

  } catch (err) {
    console.error('Error communicating with AI:', err);
    const errorMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment.",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};

// --- BRICK 1: ADD THIS NEW FUNCTION HERE ---
const handleSuggestionClick = (suggestion) => {
  handleSendMessage(suggestion);
};

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Removing this if else block
  
/*  if (currentPage === 'consultation') {
    return <ConsultationPage />; 
  }else if(currentPage === 'chatbot')
    {
    return <AiAssistant/>;
  }*/

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              MindBot
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your compassionate AI companion for mental health support, guidance, and well-being
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 flex flex-col h-[700px] overflow-hidden">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200/50 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">MindBot</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">Always here to help</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Shield className="w-4 h-4" />
                      <span>Secure</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="animate-fade-in">
                    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-2xl px-5 py-4 shadow-lg ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                            : 'bg-white text-gray-900 border border-gray-100'
                        }`}>
                          <div className="flex items-center space-x-2 mb-2">
                            {message.type === 'user' ? (
                              <User className="w-4 h-4 opacity-70" />
                            ) : (
                              <Bot className="w-4 h-4 opacity-70" />
                            )}
                            <span className={`text-sm font-medium ${
                              message.type === 'user' ? 'text-indigo-100' : 'text-gray-600'
                            }`}>
                              {message.type === 'user' ? 'You' : 'MindBot'}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        <div className={`flex items-center space-x-2 mt-2 text-xs text-gray-500 ${
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}>
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(message.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Suggestions */}
                    {message.type === 'bot' && message.suggestions && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-4 py-2 rounded-full text-sm hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 border border-indigo-200 hover:border-indigo-300 shadow-sm hover:shadow-md"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-white rounded-2xl px-5 py-4 max-w-xs shadow-lg border border-gray-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-600">MindBot is typing...</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200/50 bg-gray-50/50">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Share what's on your mind..."
                      className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm text-gray-900 placeholder-gray-500"
                      disabled={isTyping}
                     onKeyDown={(e) => { 
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleSendMessage()} 
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-medium"
                  >
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Responses */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span>Quick Start</span>
              </h3>
              <div className="space-y-3">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(response)}
                    className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-700 rounded-xl transition-all duration-200 border border-transparent hover:border-indigo-200"
                  >
                    <span className="font-medium">"{response}"</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mental Health Tips
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-xl border border-emerald-200">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-emerald-600" />
                <span>Daily Wellness</span>
              </h3>
              <div className="space-y-3 text-sm text-emerald-700">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Take 5 deep breaths when feeling overwhelmed</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Practice gratitude by noting 3 positive things daily</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Stay hydrated and get adequate sleep</p>
                </div>
              </div>
            </div> */}
            
            {/* Important Notice */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 shadow-xl">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 mb-2">Important Notice</h3>
                  <p className="text-amber-700 text-sm mb-3">
                    I'm an AI assistant designed to provide support and resources. I'm not a replacement for professional mental health care.
                  </p>
                  <p className="text-amber-700 text-sm font-medium">
                    If you're experiencing a mental health crisis, please contact a professional immediately.
                  </p>
                  <button 
      onClick={() => setCurrentPage('consultation')}
      onDoubleClick={()=>setCurrentPage('chatbot')}
      className="mt-3 bg-gradient-to-r from-indigo-600 to-purple-600 w-full flex items-center justify-center p-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors text-white"
    >
      <Brain className="w-5 h-5 mr-2" />
      Doctor Consultation
    </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatbotPage;