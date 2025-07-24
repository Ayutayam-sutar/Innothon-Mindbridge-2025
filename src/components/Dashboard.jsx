import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, TrendingUp, MessageCircle, BookOpen, Calendar, Smile, Meh, Frown, AlertCircle, Users, Brain, Activity, Bot, Phone } from 'lucide-react';

const storage = {
  data: {
    moodHistory: [
      { date: '2024-01-15', mood: 'happy', score: 8 },
      { date: '2024-01-14', mood: 'neutral', score: 6 },
      { date: '2024-01-13', mood: 'sad', score: 4 },
      { date: '2024-01-12', mood: 'happy', score: 9 },
      { date: '2024-01-11', mood: 'neutral', score: 7 },
      { date: '2024-01-10', mood: 'happy', score: 8 },
      { date: '2024-01-09', mood: 'sad', score: 3 },
    ],
    streakCount: 7,
    journalEntries: 12,
    communityPosts: 5,
    currentMood: '',
    dailyTip: '',
    lastTipDate: null
  },
  
  get: function(key) {
    return this.data[key];
  },
  
  set: function(key, value) {
    this.data[key] = value;
  },
  
  update: function(key, updateFn) {
    this.data[key] = updateFn(this.data[key]);
  }
};

const Dashboard = ({ user }) => {
  const [moodHistory, setMoodHistory] = useState(() => storage.get('moodHistory'));
  const [currentMood, setCurrentMood] = useState(() => storage.get('currentMood'));
  const [dailyTip, setDailyTip] = useState(() => storage.get('dailyTip'));
  const [streakCount, setStreakCount] = useState(() => storage.get('streakCount'));
  const [journalEntries, setJournalEntries] = useState(() => storage.get('journalEntries'));
  const [communityPosts, setCommunityPosts] = useState(() => storage.get('communityPosts'));

  const tips = [
    "Take 5 deep breaths when feeling overwhelmed. It activates your parasympathetic nervous system.",
    "Try the 5-4-3-2-1 grounding technique: 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.",
    "A 10-minute walk can boost your mood for up to 2 hours. Step outside if possible!",
    "Practice gratitude by writing down 3 things you're thankful for today.",
    "Remember: It's okay to not be okay. Seeking help is a sign of strength, not weakness.",
    "Stay hydrated! Dehydration can affect your mood and cognitive function.",
    "Connect with a friend today. Social support is crucial for mental wellbeing."
  ];

  useEffect(() => {
    const today = new Date().toDateString();
    const lastTipDate = storage.get('lastTipDate');
    
    if (lastTipDate !== today || !dailyTip) {
      const newTip = tips[Math.floor(Math.random() * tips.length)];
      setDailyTip(newTip);
      storage.set('dailyTip', newTip);
      storage.set('lastTipDate', today);
    }
  }, []);

  useEffect(() => {
    storage.set('moodHistory', moodHistory);
  }, [moodHistory]);

  useEffect(() => {
    storage.set('currentMood', currentMood);
  }, [currentMood]);

  useEffect(() => {
    storage.set('streakCount', streakCount);
  }, [streakCount]);

  useEffect(() => {
    storage.set('journalEntries', journalEntries);
  }, [journalEntries]);

  useEffect(() => {
    storage.set('communityPosts', communityPosts);
  }, [communityPosts]);

  const handleMoodSubmit = (mood, score) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = { date: today, mood, score };
    
    // Check if there's already an entry for today
    const existingEntryIndex = moodHistory.findIndex(entry => entry.date === today);
    
    let updatedHistory;
    if (existingEntryIndex !== -1) {
      updatedHistory = [...moodHistory];
      updatedHistory[existingEntryIndex] = newEntry;
    } else {
      updatedHistory = [newEntry, ...moodHistory.slice(0, 6)];
      setStreakCount(prev => prev + 1);
    }
    
    setMoodHistory(updatedHistory);
    setCurrentMood(mood);
  };

  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'happy':
        return <Smile className="w-5 h-5 text-green-500" />;
      case 'neutral':
        return <Meh className="w-5 h-5 text-yellow-500" />;
      case 'sad':
        return <Frown className="w-5 h-5 text-red-500" />;
      default:
        return <Meh className="w-5 h-5 text-gray-400" />;
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'happy':
        return 'bg-green-100 text-green-800';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800';
      case 'sad':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const averageMood = moodHistory.length > 0 
    ? moodHistory.reduce((sum, entry) => sum + entry.score, 0) / moodHistory.length 
    : 0;

  // Check if user has already checked in today
  const today = new Date().toISOString().split('T')[0];
  const hasCheckedInToday = moodHistory.some(entry => entry.date === today);

  const handleJournalClick = () => {
    setJournalEntries(prev => prev + 1);
  };

  const handleCommunityClick = () => {
    setCommunityPosts(prev => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.anonymous ? 'friend' : user?.name || 'there'}! 👋
        </h1>
        <p className="text-gray-600">How are you feeling today? Let's check in with yourself.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Check-in Streak</p>
              <p className="text-2xl font-bold text-indigo-600">{streakCount} days</p>
            </div>
            <Calendar className="w-8 h-8 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Mood</p>
              <p className="text-2xl font-bold text-green-600">{averageMood.toFixed(1)}/10</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Journal Entries</p>
              <p className="text-2xl font-bold text-purple-600">{journalEntries}</p>
            </div>
            <BookOpen className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Community Posts</p>
              <p className="text-2xl font-bold text-blue-600">{communityPosts}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Daily Check-in */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span>Daily Mood Check-in</span>
            </h2>
            
            {hasCheckedInToday ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-medium">✅ You've checked in today!</p>
                <p className="text-green-600 text-sm mt-1">
                  You can still update your mood if it has changed.
                </p>
              </div>
            ) : (
              <p className="text-gray-600 mb-6">How are you feeling right now? Rate your mood from 1-10.</p>
            )}
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <button
                onClick={() => handleMoodSubmit('sad', 3)}
                className="flex flex-col items-center p-4 rounded-lg border-2 border-red-200 hover:border-red-400 hover:bg-red-50 transition-all duration-200"
              >
                <Frown className="w-8 h-8 text-red-500 mb-2" />
                <span className="text-sm font-medium text-red-700">Not Great</span>
                <span className="text-xs text-red-600">1-4</span>
              </button>
              
              <button
                onClick={() => handleMoodSubmit('neutral', 6)}
                className="flex flex-col items-center p-4 rounded-lg border-2 border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200"
              >
                <Meh className="w-8 h-8 text-yellow-500 mb-2" />
                <span className="text-sm font-medium text-yellow-700">Okay</span>
                <span className="text-xs text-yellow-600">5-7</span>
              </button>
              
              <button
                onClick={() => handleMoodSubmit('happy', 8)}
                className="flex flex-col items-center p-4 rounded-lg border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200"
              >
                <Smile className="w-8 h-8 text-green-500 mb-2" />
                <span className="text-sm font-medium text-green-700">Great</span>
                <span className="text-xs text-green-600">8-10</span>
              </button>
            </div>

            {currentMood && (
              <div className="bg-indigo-50 rounded-lg p-4">
                <p className="text-indigo-800 font-medium">Thanks for checking in! 💙</p>
                <p className="text-indigo-600 text-sm mt-1">
                  Remember, every feeling is valid. You're doing great by staying aware of your mental health.
                </p>
              </div>
            )}
          </div>

          {/* Mood History */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Mood Journey</h3>
            <div className="space-y-3">
              {moodHistory.slice(0, 7).map((entry, index) => (
                <div key={`${entry.date}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getMoodIcon(entry.mood)}
                    <span className="text-sm text-gray-600">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </span>
                    <span className="text-sm font-medium text-gray-700">{entry.score}/10</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Daily Tip */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>Daily Wellness Tip</span>
            </h3>
            <p className="text-indigo-100 leading-relaxed">{dailyTip}</p>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                to="/app/journal"
                onClick={handleJournalClick}
                className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">Write in Journal</span>
              </Link>
              
              <Link 
                to="/app/chat"
                className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">Join Anonymous Chat</span>
              </Link>
              
              <Link 
                to="/app/community"
                onClick={handleCommunityClick}
                className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Users className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">Browse Community</span>
              </Link>
              
              <Link 
                to="/app/consultation"
                className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Brain className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">Book Doctor Consultation</span>
              </Link>
              
              <Link 
                to="/app/yoga"
                className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Activity className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">Start Yoga Session</span>
              </Link>
              
              <Link 
                to="/app/gym"
                className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Activity className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">Find Fitness Centers</span>
              </Link>
              
              <Link 
                to="/app/ai"
                className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Bot className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">Chat with AI Assistant</span>
              </Link>
              
              <Link 
                to="/app/resources"
                className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Brain className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-700">Explore Resources</span>
              </Link>
            </div>
          </div>

          {/* Emergency Support */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-3">Need Immediate Help?</h3>
            <p className="text-red-700 text-sm mb-4">
              If you're having thoughts of self-harm or suicide, please reach out immediately.
            </p>
            <div className="space-y-2">
              <a
                href="tel:9152987821"
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call 9152987821 - Crisis Lifeline</span>
              </a>
              <a
                href="sms:741741"
                className="w-full bg-white text-red-600 border border-red-300 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Text HOME to 9152987821</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;