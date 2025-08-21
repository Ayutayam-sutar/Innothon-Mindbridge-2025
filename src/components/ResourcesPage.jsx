import React, { useState } from 'react';
import { Brain, BookOpen, Video, Headphones, Phone, ExternalLink, Search, Filter, Star, Clock, Users } from 'lucide-react';

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const resources = [
    {
      id: '1',
      title: 'Understanding Anxiety in College Students',
      description: 'A comprehensive guide to recognizing and managing anxiety during your college years.',
      type: 'article',
      category: 'anxiety',
      rating: 4.8,
      duration: '8 min read',
      url: 'https://www.sciencedirect.com/science/article/pii/S2666915323001968',
      featured: false
    },
    {
      id: '2',
      title: 'Guided Meditation for Stress Relief',
      description: 'A 9-minute guided meditation session specifically designed for stressed students.',
      type: 'video',
      category: 'stress',
      rating: 4.9,
      duration: '9 min',
      url: 'https://www.youtube.com/watch?v=pU80BEm43JM&pp=ygUvZ3VpZGVkIG1lZGl0YXRpb24gZm9yIHN0cmVzcyByZWxpZWYgYW5kIGFueGlldHk%3D',
      featured: false
    },
    {
      id: '3',
      title: 'Building Healthy Study Habits',
      description: 'Learn effective study techniques that reduce stress and improve academic performance.',
      type: 'video',
      category: 'academic',
      rating: 4.7,
      duration: '5 min',
      url: 'https://www.youtube.com/watch?v=S39zoHnV-ok&pp=ygUdYnVpbGRpbmcgaGVhbHRoeSBzdHVkeSBoYWJpdHM%3D',
      featured: false
    },
    {
      id: '4',
      title: 'National Suicide Prevention Lifeline',
      description: '24/7 crisis support for anyone in emotional distress or suicidal crisis.',
      type: 'hotline',
      category: 'crisis',
      rating: 5.0,
      url: 'tel:12345641',
      featured:false
    },
    {
      id: '5',
      title: 'Headspace: Meditation & Sleep',
      description: 'Popular meditation app with specific programs for students and stress management.',
      type: 'app',
      category: 'mindfulness',
      rating: 4.6,
      url: 'https://www.headspace.com/',
      featured: false
    },
    {
      id: '6',
      title: 'Dealing with Depression: A Student\'s Guide',
      description: 'Practical strategies for managing depression while maintaining academic performance.',
      type: 'article',
      category: 'depression',
      rating: 4.5,
      duration: '12 min read',
      url: 'https://www.purdueglobal.edu/blog/student-life/college-students-guide-to-depression/',
      featured: false
    },
    {
      id: '7',
      title: 'Sleep Hygiene for Better Mental Health',
      description: 'How proper sleep habits can significantly improve your mental wellbeing.',
      type: 'video',
      category: 'wellness',
      rating: 4.4,
      duration: '8 min',
      url: 'https://www.youtube.com/watch?v=fk-_SwHhLLc&pp=ygUmU2xlZXAgSHlnaWVuZSBmb3IgQmV0dGVyIE1lbnRhbCBIZWFsdGjSBwkJzQkBhyohjO8%3D',
      featured: false
    },
        {
      id: '8',
      title: 'How to deal with anxiety and depression',
      description: 'A comprehensive guide to recognizing and managing anxiety and overcoming depression.',
      type: 'video',
      category: 'anxiety',
      rating: 4.8,
      duration: '19 min',
      url: 'https://www.youtube.com/watch?v=eAK14VoY7C0',
      featured: true
    },
    {
      id: '9',
      title: 'If u think u have failed then just listen !! ',
      description: 'A 9-minute guided meditation session specifically designed for stressed students.',
      type: 'video',
      category: 'stress',
      rating: 4.9,
      duration: '9 min',
      url: 'https://www.youtube.com/watch?v=ZqQHEKDaFys',
      featured: true
    },
    {
      id: '10',
      title: 'How to stop overthinking',
      description: 'Learn effective ways to stop overthinking',
      type: 'video',
      category: 'wellness',
      rating: 4.7,
      duration: '5 min',
      url: 'https://www.youtube.com/watch?v=gJEp-JoQVIw',
      featured: false
    },
    {
      id: '11',
      title: 'Whatever happens, happens for our good ',
      description: 'Words which will let u see your surrounding in a different perspective',
      type: 'video',
      category: 'wellness',
      rating: 5.0,
      url: 'https://www.youtube.com/watch?v=J5PpMKDk1Tg',
      featured:false
    },
    {
      id: '12',
      title: 'The Mindfulness App',
      description: 'Guide you towards reduced stress, better sleep, and improved health through the power of meditation.',
      type: 'app',
      category: 'mindfulness',
      rating: 4.6,
      url: 'https://www.themindfulnessapp.com/',
      featured: false
    },
    {
      id: '13',
      title: 'Becoming Mentally Stronger',
      description: 'It all begins in your mind, what you give power to has power over you',
      type: 'video',
      category: 'stress',
      rating: 4.5,
      duration: '12 min ',
      url: 'https://www.youtube.com/watch?v=b3ttfXIGg9E',
      featured: true
    },
    {
      id: '14',
      title: 'How to deal anxiety and depression- Bhagavad Gita ',
      description: 'How the creator of world dealt with anxiety and depression',
      type: 'video',
      category: 'wellness',
      rating: 4.4,
      duration: '8 min',
      url: 'https://www.youtube.com/watch?v=fcXfGl32dTM',
      featured: true 
    },
    {
      id: '15',
      title: 'Song',
      description: 'Let your presence be feeled by everyone else',
      type: 'audio',
      category: 'wellness',
      rating: 4.5,
      duration: '2 min ',
      url: 'https://www.youtube.com/watch?v=A2P9GRLyWjg&list=RDGMEM2VCIgaiSqOfVzBAjPJm-ag&index=2',
      featured: false
    },
    {
      id: '16',
      title: 'Song',
      description: 'You are stronger than your excuses, braver than your fears, and more capable than you think.',
      type: 'audio',
      category: 'wellness',
      rating: 4.4,
      duration: '3 min',
      url: 'https://www.youtube.com/watch?v=_P7S2lKif-A&list=RDGMEM2VCIgaiSqOfVzBAjPJm-ag&index=12',
      featured: false
    },
    {
      id: '17',
      title: 'Song',
      description: 'Let your aura be at its top level',
      type: 'audio',
      category: 'wellness',
      rating: 4.5,
      duration: '3 min ',
      url: 'http://youtube.com/watch?v=OGT8hoZjsCY&list=RDGMEM2VCIgaiSqOfVzBAjPJm-ag&index=16',
      featured: true
    },
    {
      id: '18',
      title: 'Song',
      description: 'Let everyone think what you are,but you be at your top level  ',
      type: 'audio',
      category: 'wellness',
      rating: 4.4,
      duration: '3 min',
      url: 'https://www.youtube.com/watch?v=f87C64Yz2GI&list=RDGMEM2VCIgaiSqOfVzBAjPJm-ag&index=27',
      featured: false
    },
   
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'anxiety', label: 'Anxiety' },
    { id: 'depression', label: 'Depression' },
    { id: 'stress', label: 'Stress Management' },
    { id: 'academic', label: 'Academic Support' },
    { id: 'mindfulness', label: 'Mindfulness' },
    { id: 'wellness', label: 'General Wellness' },
    { id: 'crisis', label: 'Crisis Support' }
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'article', label: 'Articles' },
    { id: 'video', label: 'Videos' },
    { id: 'audio', label: 'Audio' },
    { id: 'app', label: 'Apps' },
    { id: 'hotline', label: 'Hotlines' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article':
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'audio':
        return <Headphones className="w-5 h-5 text-green-500" />;
      case 'app':
        return <Brain className="w-5 h-5 text-purple-500" />;
      case 'hotline':
        return <Phone className="w-5 h-5 text-orange-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'video':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'audio':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'app':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'hotline':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredResources = filteredResources.filter(resource => resource.featured);
  const regularResources = filteredResources.filter(resource => !resource.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
          <Brain className="w-8 h-8 text-indigo-600" />
          <span>Mental Health Resources</span>
        </h1>
        <p className=" text-lg text-gray-600">Curated resources to support your mental health journey</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      {featuredResources.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span>Featured Resources</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map(resource => (
              <div key={resource.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(resource.type)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{resource.description}</p>
                
                <div className="flex items-center justify-between">
                  {resource.duration && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{resource.duration}</span>
                    </div>
                  )}
                  <a
                    href={resource.url} target='main'
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
                  >
                    <span>Access</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Resources */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Resources</h2>
        {regularResources.length === 0 ? (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-500 mb-2">No resources found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(resource.type)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(resource.type)}`}>
                      {resource.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{resource.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{resource.description}</p>
                
                <div className="flex items-center justify-between">
                  {resource.duration && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{resource.duration}</span>
                    </div>
                  )}
                 <a
                    href={resource.url} target='main'
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
                   
                  >
                    <span>Access</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Section */}
      <div className="mt-12 bg-red-50 border border-red-200 rounded-xl p-8">
        <div className="text-center">
          <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-red-800 mb-4">Need Immediate Help?</h3>
          <p className="text-red-700 mb-6 max-w-2xl mx-auto">
            If you're having thoughts of self-harm or suicide, or if you're in immediate danger, 
            please reach out for help right away. You're not alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel: 9152987821"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call 9152987821- Suicide & Crisis Lifeline</span>
            </a>
            <a
              href="sms:741741"
              className="bg-white text-red-600 border border-red-300 px-6 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium"
            >
              Text HOME to  9152987821
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;