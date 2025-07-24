import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Brain, Heart, MessageCircle, BookOpen, Users, Menu, X, PersonStanding, Dumbbell, BotMessageSquare, ClipboardPlus } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = React.useMemo(() => [
    { id: 'dashboard', label: 'Dashboard', icon: Heart, path: '/app/dashboard' },
    { id: 'consultation', label: 'Book Doctor', icon: ClipboardPlus, path: '/app/consultation' },
    { id: 'resources', label: 'Resources', icon: Brain, path: '/app/resources' },
    { id: 'community', label: 'Community', icon: Users, path: '/app/community' },
    { id: 'yoga', label: 'Yoga', icon: PersonStanding, path: '/app/yoga' },
    { id: 'gym', label: 'GymCenter', icon: Dumbbell, path: '/app/gym' },
    { id: 'ai', label: 'Chatbot', icon: BotMessageSquare, path: '/app/ai' },
    { id: 'journal', label: 'Journal', icon: BookOpen, path: '/app/journal' },
    { id: 'chat', label: 'Anonymous Chat', icon: MessageCircle, path: '/app/chat' },
  ], []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ item, isActive }) => {
    const Icon = item.icon;
    return (
      <Link
        key={item.id}
        to={item.path}
        className={`flex items-center space-x-2 px-2 py-2 rounded-lg transition-all duration-200 ${
          isActive ? 'bg-indigo-100 text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
        }`}
      >
        <Icon className="w-4 h-4" />
        <span className="font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/app/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MindBridge
              </span>
            </Link>

            <nav className="hidden md:flex">
              {navigation.map((item) => (
                <NavItem key={item.id} item={item} isActive={isActive(item.path)} />
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Logout"
              >
                <div className="hidden md:flex items-center space-x-3">
                  <div className="ml-2.5 w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                  </div>
                  <span className="text-gray-700 font-medium">Anonymous</span>
                </div>
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-indigo-100">
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <NavItem 
                  key={item.id} 
                  item={item} 
                  isActive={isActive(item.path)}
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App;