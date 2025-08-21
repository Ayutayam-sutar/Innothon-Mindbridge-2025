import { useNavigate } from 'react-router-dom';
import { Brain, Heart, MessageCircle, BookOpen, Users, Shield, Star, ArrowRight, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    anonymous: false
  });

  const handleSubmit = (e) => {
  e.preventDefault();
  
  // In a real app, you would verify credentials here
  localStorage.setItem('isAuthenticated', 'true'); // Set auth flag
  localStorage.setItem('user', JSON.stringify(formData)); // Store user data
  
  navigate('/app/dashboard', { replace: true });
};

  const features = [
    {
      icon: BookOpen,
      title: 'Private Journaling',
      description: 'Express your thoughts in a safe, encrypted space with AI-powered mood insights.'
    },
    {
      icon: MessageCircle,
      title: 'Anonymous Chat',
      description: 'Connect with peers facing similar challenges without revealing your identity.'
    },
    {
      icon: Brain,
      title: 'Mental Health Resources',
      description: 'Access curated articles, exercises, and professional help when you need it.'
    },
    {
      icon: Users,
      title: 'Supportive Community',
      description: 'Join a caring community of students who understand your journey.'
    }
  ];

  const testimonials = [
    {
      name: 'Pandit Kumar Jena',
      college: 'Iter',
      text: 'MindBridge helped me through my anxiety during exam season. The anonymous chat feature was a lifesaver.',
      rating: 5
    },
    {
      name: 'Rahul K.',
      college: 'IIT Mumbai',
      text: 'This app has been a lifeline for me. The guided meditations and mood tracker helped me understand my anxiety better.',
      rating: 5
    },
    {
      name: 'Deepak Mishra',
      college: 'Aiims Delhi',
      text: 'I have tried many similar apps, but this one stands out. The features are well thought out.',
      rating: 5
    },
    {
      name: 'Ayutayam Sutar',
      college: 'Iter',
      text: 'As someone who struggles with stress, the breathing exercises are game-changers.',
      rating: 5
    },
    {
      name: 'Rahul Padhee',
      college: 'IIT Delhi',
      text: 'Finally, a platform where I can be honest about my mental health without judgment.',
      rating: 5
    },
    {
      name: 'Priya Sahoo',
      college: 'Bangalore University',
      text: 'The daily check-ins and resources helped me develop better coping strategies.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className=" animate-roll-in-left  flex justify-center mb-8 ">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className=" animate-tracking-in-expand text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Mental Health
              <span className="  animate-tracking-in-expand block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Matters
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              MindBridge is a safe, anonymous platform designed specifically for college students. 
              Get support, track your mood, and connect with others who understand your journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="font-medium">100% Anonymous & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to support your mental health journey throughout college
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className=" animate-bounce-in-top bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-indigo-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Students Nationwide
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from students who found support through MindBridge
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-indigo-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.college}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of students who are prioritizing their mental health
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to MindBridge</h3>
              <p className="text-gray-600">Your safe space for mental wellness</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                  className="w-4 h-4 text-indigo-600"
                />
                <label htmlFor="anonymous" className="text-sm text-gray-700 flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <span>Join anonymously (recommended)</span>
                </label>
              </div>
              
              {!formData.anonymous && (
                <>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    placeholder="College/University"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </>
              )}
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Enter MindBridge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;