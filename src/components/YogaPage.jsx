import React, { useState } from 'react';
import { Activity, Play, Clock, Star, Users, Calendar, MapPin, Filter, Search, Heart, Zap, Smile, X } from 'lucide-react';

const YogaPage = ({ user }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeContent, setActiveContent] = useState(null);

  const stressReliefPractices = [
    {
      id: 'breathing',
      title: '5-Minute Breathing',
      description: 'Quick breathing exercise for instant calm',
      icon: Heart,
      color: 'purple',
      content: {
        title: '5-Minute Breathing Exercise',
        steps: [
          'Find a comfortable seated position and close your eyes',
          'Inhale slowly through your nose for 4 counts',
          'Hold your breath for 4 counts',
          'Exhale slowly through your mouth for 6 counts',
          'Repeat this cycle for 5 minutes',
          'Focus on the sensation of breathing and let thoughts pass by'
        ]
      }
    },
    {
      id: 'stretches',
      title: 'Desk Stretches',
      description: 'Simple stretches for study breaks',
      icon: Activity,
      color: 'pink',
      content: {
        title: 'Desk Stretches Routine',
        steps: [
          'Neck rolls: Gently roll your head in circles (5 each direction)',
          'Shoulder shrugs: Lift shoulders to ears, hold 5 seconds, release',
          'Wrist circles: Rotate wrists clockwise and counterclockwise',
          'Seated spinal twist: Twist your torso left and right',
          'Ankle pumps: Flex and point your feet while seated',
          'Deep breathing: Take 3 deep breaths between each stretch'
        ]
      }
    },
    {
      id: 'sleep',
      title: 'Sleep Preparation',
      description: 'Gentle poses for better sleep',
      icon: Smile,
      color: 'indigo',
      content: {
        title: 'Sleep Preparation Routine',
        steps: [
          'Child\'s pose: Kneel and fold forward, arms extended (2 minutes)',
          'Legs up the wall: Lie on back with legs elevated (5 minutes)',
          'Gentle neck stretches: Slowly tilt head side to side',
          'Progressive muscle relaxation: Tense and release each muscle group',
          'Deep belly breathing: Focus on expanding your abdomen',
          'Visualization: Picture a peaceful, calming scene'
        ]
      }
    },
    {
      id: 'mindfulness',
      title: 'Mindful Moment',
      description: 'Quick mindfulness practice',
      icon: Zap,
      color: 'green',
      content: {
        title: 'Mindful Moment Practice',
        steps: [
          'Sit comfortably and notice your surroundings',
          'Take three deep breaths and center yourself',
          'Focus on five things you can see around you',
          'Notice four things you can hear',
          'Identify three things you can touch or feel',
          'Acknowledge two things you can smell',
          'Notice one thing you can taste'
        ]
      }
    }
  ];

  const yogaClasses = [
    {
      id: '1',
      title: 'Morning Hatha Yoga',
      instructor: 'Deepak Dogla ',
      duration: '45 min',
      level: 'beginner',
      category: 'hatha',
      rating: 4.9,
      participants: 24,
      description: 'Gentle morning practice focusing on basic postures and breathing techniques.',
      benefits: ['Stress Relief', 'Flexibility', 'Better Sleep'],
      videoUrl: 'https://www.youtube.com/watch?v=v7AYKMP6rOE',
      thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      schedule: 'Daily 7:00 AM'
    },
    {
      id: '2',
      title: 'Vinyasa Flow for Stress',
      instructor: 'Michael Parida',
      duration: '30 min',
      level: 'intermediate',
      category: 'vinyasa',
      rating: 4.8,
      participants: 18,
      description: 'Dynamic flow sequence designed to release tension and calm the mind.',
      benefits: ['Anxiety Relief', 'Strength', 'Mental Clarity'],
      videoUrl: 'https://www.youtube.com/watch?v=oBu-pQG6sTY',
      thumbnail: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      schedule: 'Mon, Wed, Fri 6:00 PM'
    },
    {
      id: '3',
      title: 'Restorative Yoga for Sleep',
      instructor: 'Ben stokes ',
      duration: '60 min',
      level: 'beginner',
      category: 'restorative',
      rating: 4.9,
      participants: 32,
      description: 'Deeply relaxing practice with props to prepare your body and mind for rest.',
      benefits: ['Better Sleep', 'Deep Relaxation', 'Stress Relief'],
      videoUrl: 'https://www.youtube.com/watch?v=BiWnaZ2nAD4',
      thumbnail: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      schedule: 'Daily 9:00 PM'
    },
    {
      id: '4',
      title: 'Power Yoga Workout',
      instructor: 'Kim mallick',
      duration: '50 min',
      level: 'advanced',
      category: 'power',
      rating: 4.7,
      participants: 15,
      description: 'High-intensity yoga practice combining strength, flexibility, and cardio.',
      benefits: ['Strength Building', 'Cardio', 'Confidence'],
      videoUrl: 'https://www.youtube.com/watch?v=4pKly2JojMw',
      thumbnail: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      schedule: 'Tue, Thu, Sat 5:30 PM'
    },
    {
      id: '5',
      title: 'Yin Yoga for Anxiety',
      instructor: 'Lisa Padhi',
      duration: '75 min',
      level: 'beginner',
      category: 'yin',
      rating: 4.8,
      participants: 28,
      description: 'Slow, meditative practice with long-held poses to calm the nervous system.',
      benefits: ['Anxiety Relief', 'Flexibility', 'Mindfulness'],
      videoUrl: 'https://www.youtube.com/watch?v=CLsaGiK_1sk',
      thumbnail: 'https://images.pexels.com/photos/3822865/pexels-photo-3822865.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      schedule: 'Sun, Wed 4:00 PM'
    },
    {
      id: '6',
      title: 'Desk Yoga for Students',
      instructor: 'Anna Shrinivasa',
      duration: '15 min',
      level: 'beginner',
      category: 'chair',
      rating: 4.6,
      participants: 45,
      description: 'Quick yoga stretches you can do at your desk to relieve study stress.',
      benefits: ['Posture Improvement', 'Quick Relief', 'Focus'],
      videoUrl: 'https://www.youtube.com/watch?v=M-8FvC3GD8c',
      thumbnail: 'https://images.pexels.com/photos/3822623/pexels-photo-3822623.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      schedule: 'Available Anytime'
    },
    {
      id: '7',
      title: ' Daily Morning exercise',
      instructor: 'Ramdev Baba ',
      duration: '20 min',
      level: 'beginner',
      category: 'hatha',
      rating: 4.9,
      participants: 240,
      description: 'Gentle morning exercise to boost you morning',
      benefits: ['Stress Relief', 'Flexibility', 'Better Sleep'],
      videoUrl: 'https://www.youtube.com/watch?v=ZNQoQXU_CN4',
      thumbnail: 'https://greatpeoples.in/assets/peoples/e6aff03713d0515bead33059fc32664a.jpg',
      schedule: 'Daily 7:00 AM'
    },
    {
      id: '8',
      title: 'Yogas to reduce aches and pain ',
      instructor: 'Monty ',
      duration: '17 min',
      level: 'intermediate',
      category: 'vinyasa',
      rating: 4.8,
      participants: 18,
      description: 'Dynamic flow sequence designed to calm the mind.',
      benefits: ['Anxiety Relief', 'Strength', 'Mental Clarity'],
      videoUrl: 'https://www.youtube.com/watch?v=oDP-89wRXUk',
      thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8eW9nYXxlbnwwfHwwfHx8MA%3D%3D',
      schedule: 'Daily 6:00 PM'
    },
    {
      id: '9',
      title: 'Yoga to reduce weight',
      instructor: 'Kane Jena',
      duration: ' 21 min',
      level: 'beginner',
      category: 'restorative',
      rating: 4.9,
      participants: 32,
      description: 'Helps to reduce weight,and uplift your mood',
      benefits: ['Better Sleep', 'Deep Relaxation', 'Stress Relief'],
      videoUrl: 'https://www.youtube.com/watch?v=7QQH5pvvB-o',
      thumbnail: 'https://images.news18.com/ibnlive/uploads/2022/04/yoga-164923092416x9.png',
      schedule: 'Daily 9:00 PM'
    },
    {
      id: '10',
      title: 'Do this to reduce overthinking',
      instructor: 'Pratyush rana',
      duration: '6 min',
      level: 'intermediate',
      category: 'power',
      rating: 4.7,
      participants: 15,
      description: '',
      benefits: ['Strength Building', 'Cardio', 'Confidence'],
      videoUrl: 'https://www.youtube.com/watch?v=JYH0aPSOlJ0',
      thumbnail: 'https://img.freepik.com/free-photo/woman-digital-disconnecting-home-by-doing-yoga_23-2150037474.jpg',
      schedule: 'Tue, Thu, Sat 5:30 PM'
    },
    {
      id: '11',
      title: 'Surya Namaskar',
      instructor: 'Riya Shekar Das',
      duration: ' 3 min',
      level: 'beginner',
      category: 'chair',
      rating: 4.8,
      participants: 28,
      description: 'Slow, meditative practice with long-held poses to calm the nervous system.',
      benefits: ['Anxiety Relief', 'Flexibility', 'Mindfulness'],
      videoUrl: 'https://www.youtube.com/watch?v=1xRX1MuoImw',
      thumbnail: 'https://media.istockphoto.com/id/168626034/photo/sun-salutation-exercise.jpg?s=612x612&w=0&k=20&c=37WVvofPbezZ-ZpD4vEg5BXgbFJAVIid5iOqx4V4lOo=',
      schedule: 'Sun, Wed 4:00 PM'
    }
    
  ];

  const categories = [
    { id: 'all', label: 'All Styles' },
    { id: 'hatha', label: 'Hatha Yoga' },
    { id: 'vinyasa', label: 'Vinyasa Flow' },
    { id: 'restorative', label: 'Restorative' },
    { id: 'power', label: 'Power Yoga' },
    { id: 'yin', label: 'Yin Yoga' },
    { id: 'chair', label: 'Chair/Desk Yoga' }
  ];

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        hover: 'hover:text-purple-800',
        button: 'bg-purple-600 hover:bg-purple-700'
      },
      pink: {
        bg: 'bg-pink-100',
        text: 'text-pink-600',
        hover: 'hover:text-pink-800',
        button: 'bg-pink-600 hover:bg-pink-700'
      },
      indigo: {
        bg: 'bg-indigo-100',
        text: 'text-indigo-600',
        hover: 'hover:text-indigo-800',
        button: 'bg-indigo-600 hover:bg-indigo-700'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        hover: 'hover:text-green-800',
        button: 'bg-green-600 hover:bg-green-700'
      }
    };
    return colors[color];
  };

  const getBenefitIcon = (benefit) => {
    switch (benefit.toLowerCase()) {
      case 'stress relief':
      case 'anxiety relief':
        return <Heart className="w-4 h-4 text-pink-500" />;
      case 'strength':
      case 'strength building':
        return <Zap className="w-4 h-4 text-orange-500" />;
      case 'better sleep':
      case 'deep relaxation':
        return <Smile className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-green-500" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredClasses = yogaClasses.filter(yogaClass => {
    const matchesSearch = yogaClass.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         yogaClass.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         yogaClass.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || yogaClass.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || yogaClass.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
          <Activity className="w-8 h-8 text-purple-600" />
          <span>Yoga: A Journey to Mind, Body & Soul</span>
        </h1>
        <p className="text-gray-600  text-lg">Find inner peace and physical wellness through guided yoga practice</p>
      </div>

      {/* Benefits Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">Why Yoga for Mental Health?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-pink-200" />
            <div>
              <h3 className="font-semibold">Reduces Stress & Anxiety</h3>
              <p className="text-purple-100 text-sm">Calms the nervous system and reduces cortisol levels</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Smile className="w-8 h-8 text-pink-200" />
            <div>
              <h3 className="font-semibold">Improves Sleep Quality</h3>
              <p className="text-purple-100 text-sm">Relaxation techniques promote better rest</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-pink-200" />
            <div>
              <h3 className="font-semibold">Boosts Mood & Focus</h3>
              <p className="text-purple-100 text-sm">Increases endorphins and mental clarity</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search yoga classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex-col sm:flex-row gap-4 hidden sm:flex">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </div>
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {levels.map(level => (
                <option key={level.id} value={level.id}>{level.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stress Relief Practices */}
      <div className="mt-10 mb-7 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Stress Relief Practices</h2>
        <div className="grid md:grid-cols-4 grid-rows-1 gap-6">
          {stressReliefPractices.map((practice) => {
            const Icon = practice.icon;
            const colorClasses = getColorClasses(practice.color);
            
            return (
              <div key={practice.id} className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${colorClasses.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 ">{practice.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{practice.description}</p>
                <button 
                  onClick={() => setActiveContent(practice)}
                  className={`${colorClasses.text} ${colorClasses.hover} bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200  items-center space-x-2 text-sm font-medium hover:text-[#D3D3D3]`}
                >
                  Try Now
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Yoga Classes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((yogaClass) => (
          <div key={yogaClass.id} className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={yogaClass.thumbnail}
                alt={yogaClass.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(yogaClass.level)}`}>
                  {yogaClass.level}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{yogaClass.duration}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{yogaClass.title}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{yogaClass.rating}</span>
                </div>
              </div>
              
              <p className="text-purple-600 font-medium mb-2">with {yogaClass.instructor}</p>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{yogaClass.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{yogaClass.participants} joined</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{yogaClass.schedule}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
                <div className="flex flex-wrap gap-2">
                  {yogaClass.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-1 bg-purple-50 px-2 py-1 rounded-full">
                      {getBenefitIcon(benefit)}
                      <span className="text-xs text-purple-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <a
                href={yogaClass.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Practice</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Stress Relief Content */}
      {activeContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-96 overflow-y-auto ">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">{activeContent.content.title}</h3>
                <button
                  onClick={() => setActiveContent(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-3">
                {activeContent.content.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-6 h-6 ${getColorClasses(activeContent.color).button} text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5`}>
                      {index + 1}
                    </div>
                    <p className="text-gray-700 text-[16px] leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setActiveContent(null)}
                  className={`px-4 py-2 ${getColorClasses(activeContent.color).button} text-white rounded-lg transition-colors`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YogaPage;