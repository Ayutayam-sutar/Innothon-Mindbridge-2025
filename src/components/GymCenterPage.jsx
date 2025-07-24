import React, { useState } from 'react';
import { MapPin, Star, Clock, Phone, Globe, Filter, Search, Dumbbell, Heart, Users, Award, Navigation, Calendar } from 'lucide-react';

const GymCenterPage = ({ user }) => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const gymCenters = [
    {
      id: '1',
      name: 'FitLife Wellness Center',
      type: 'full-service',
      address: 'Plot no 1235,rasulgharh,Bhubaneswar',
      distance: '1 km',
      rating: 4.8,
      reviews: 806,
      phone: '+91 9816556 ',
      website: 'https://fitlifewellness.com',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      amenities: ['Cardio Equipment', 'Weight Training', 'Group Classes', 'Personal Training', 'Sauna', 'Pool'],
      specialPrograms: ['Student Discount ', 'Mental Health Fitness', 'Stress Relief Classes'],
      hours: 'Mon-Sun: 5:00 AM - 11:00 PM',
      membershipPrice: '₹ 1800/month',
      studentPrice: '₹900/month'
    },
    {
      id: '2',
      name: 'Campus Recreation Center',
      type: 'university',
      address: 'IIT Khandagiri, Bhubaneswar',
      distance: '12 km',
      rating: 4.6,
      reviews: 1203,
      phone: '+91 8955625 ',
      website: 'https://www.soa.ac.in/iter',
      image: 'https://content3.jdmagicbox.com/v2/comp/bhubaneshwar/c9/0674px674.x674.220201234323.z5c9/catalogue/all-time-fitness-bhubaneswar-bhubaneshwar-gyms-emzks9praz.jpg',
      amenities: ['Modern Gym', 'Rock Climbing', 'Basketball Courts', 'Yoga Studio', 'Track','Horse Riding'],
      specialPrograms: ['Free for Students', 'Peer Fitness Support', 'Wellness Workshops'],
      hours: 'Mon-Fri: 6:00 AM - 10:00 PM, Weekends: 8:00 AM - 8:00 PM',
      membershipPrice: 'Free',
      studentPrice: 'Free'
    },
    {
      id: '3',
      name: 'Mindful Movement Studio',
      type: 'yoga-pilates',
      address: 'Bhadrak ,salandi colony ',
      distance: '50 km ',
      rating: 4.9,
      reviews: 89,
      phone: '+91 9862966 ',
      website: 'https://mindfulmovement.com',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      amenities: ['Yoga Classes', 'Pilates', 'Meditation Room', 'Massage Therapy'],
      specialPrograms: ['Anxiety Relief Classes', 'Student Mental Health Program', 'Mindfulness Training'],
      hours: 'Mon-Sun: 6:00 AM - 9:00 PM',
      membershipPrice: '₹2000/month',
      studentPrice: '₹1400/month'
    },
    {
      id: '4',
      name: 'PowerHouse Fitness',
      type: 'strength-training',
      address: 'Plot-5890 Marol,Mumbai ',
      distance: '12 km',
      rating: 4.7,
      reviews: 1240,
      phone: '+91 9456-7890',
      website: 'https://powerhousefitness.com',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      amenities: ['Free Weights', 'Powerlifting', 'CrossFit', 'Personal Training', 'Nutrition Counseling'],
      specialPrograms: ['Confidence Building', 'Strength for Mental Health', 'Student Athlete Support'],
      hours: 'Mon-Fri: 5:00 AM - 10:00 PM, Weekends: 7:00 AM - 8:00 PM',
      membershipPrice: '₹650/month',
      studentPrice: '₹450/month'
    },
    {
      id: '5',
      name: 'Aqua Wellness Center',
      type: 'aquatic',
      address: 'Niladri vihar,patia,bhubaneswar',
      distance: '19km',
      rating: 4.5,
      reviews: 6700,
      phone: '+91 8947556',
      website: 'https://aquawellness.com',
      image: 'https://images.pexels.com/photos/1552103/pexels-photo-1552103.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      amenities: ['Olympic Pool', 'Hot Tub', 'Water Aerobics', 'Swimming Lessons', 'Hydrotherapy'],
      specialPrograms: ['Therapeutic Swimming', 'Stress Relief Aqua Classes', 'Student Swim Team'],
      hours: 'Mon-Sun: 6:00 AM - 10:00 PM',
      membershipPrice: '₹2500/month',
      studentPrice: '₹2000/month'
    },
    {
      id: '6',
      name: '24/7 Student Fitness',
      type: '24-hour',
      address: 'Plot -128 Saheed Nagar',
      distance: ' 8km ',
      rating: 4.4,
      reviews: 1780,
      phone: '+91 9569012',
      website: 'https://247studentfitness.com',
      image: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      amenities: ['24/7 Access', 'Cardio Zone', 'Study-Friendly Areas', 'Protein Bar', 'Lockers'],
      specialPrograms: ['Late Night Fitness', 'Study Break Workouts', 'Exam Stress Relief'],
      hours: '24/7',
      membershipPrice: '₹1890/month',
      studentPrice: '₹1500/month'
    },
    {
  id: '7',
  name: 'Bengaluru HydroFit Club',
  type: 'aquatic',
  address: 'Indiranagar, Bengaluru, Karnataka',
  distance: '4.5km',
  rating: 4.6,
  reviews: 5200,
  phone: '+91 9845012345',
  website: 'https://hydrofitblr.in',
  image: 'https://images.pexels.com/photos/261398/pexels-photo-261398.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
  amenities: ['Olympic Size Pool', 'Personal Trainers', 'Water Bikes'],
  specialPrograms: ['Corporate De-stress Programs', 'Weekend Family Sessions', 'Triathlon Prep'],
  hours: 'Mon-Sun: 5:00 AM - 10:00 PM',
  membershipPrice: '₹2700/month',
  studentPrice: '₹2100/month'
},
{
  id: '8',
  name: 'Delhi Aqua Zone',
  type: 'aquatic',
  address: 'Lajpat Nagar, New Delhi',
  distance: '6km',
  rating: 4.1,
  reviews: 3900,
  phone: '+91 9876543210',
  website: 'https://delhiaquazone.com',
  image: 'https://images.pexels.com/photos/261410/pexels-photo-261410.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
  amenities: ['Open Air Pool', 'Steam & Sauna', 'Locker Facility'],
  specialPrograms: ['Youth Swim League', 'Yoga with Aqua', 'Weekend Fun Swim'],
  hours: 'Mon-Fri: 6:00 AM - 8:00 PM, Sat-Sun: 7:00 AM - 6:00 PM',
  membershipPrice: '₹1800/month',
  studentPrice: '₹1500/month'
},
{
  id: '9',
  name: 'Iron Temple Gym',
  type: 'strength-training',
  address: 'Koramangala 4th Block, Bengaluru, Karnataka',
  distance: '4.5km',
  rating: 4.5,
  reviews: 1850,
  phone: '+91 9886543210',
  website: 'https://irontemplegym.in',
  image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
  amenities: ['Squat Racks', 'Dumbbells', 'Strength Circuits', 'Changing Room', 'Lockers'],
  specialPrograms: ['Hypertrophy Coaching', 'Beginner Strength Bootcamp', 'Teen Muscle Building'],
  hours: 'Mon-Sun: 6:00 AM - 10:00 PM',
  membershipPrice: '₹800/month',
  studentPrice: '₹600/month'
},{
  id: '10',
  name: 'Muscle Factory',
  type: 'strength-training',
  address: 'Sector 14, Gurugram, Haryana',
  distance: '2.8km',
  rating: 4.3,
  reviews: 920,
  phone: '+91 9876543211',
  website: 'https://musclefactoryindia.com',
  image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
  amenities: ['Resistance Machines', 'Olympic Barbells', 'HIIT Area', 'Protein Bar'],
  specialPrograms: ['Strength & Shred', 'Transformation Coaching', 'Youth Fitness Drive'],
  hours: 'Mon-Sat: 6:00 AM - 9:00 PM, Sun: 8:00 AM - 6:00 PM',
  membershipPrice: '₹700/month',
  studentPrice: '₹500/month'
},
{
  id: '11',
  name: 'Barbell Nation',
  type: 'strength-training',
  address: 'Salt Lake Sector 5, Kolkata, West Bengal',
  distance: '6km',
  rating: 4.4,
  reviews: 1010,
  phone: '+91 9433111222',
  website: 'https://barbellnation.in',
  image: 'https://images.pexels.com/photos/260447/pexels-photo-260447.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
  amenities: ['Powerlifting Rigs', 'Turf Track', 'Strength Circuits', 'Stretching Area'],
  specialPrograms: ['Strength for Seniors', 'Weight Loss Strength Plan', 'College Bulk Camp'],
  hours: 'Mon-Sat: 6:00 AM - 9:30 PM, Sun Closed',
  membershipPrice: '₹750/month',
  studentPrice: '₹500/month'
}


  ];

  const gymTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'full-service', label: 'Full Service Gym' },
    { id: 'university', label: 'University Recreation' },
    { id: 'yoga-pilates', label: 'Yoga & Pilates' },
    { id: 'strength-training', label: 'Strength Training' },
    { id: 'aquatic', label: 'Aquatic Center' },
    { id: '24-hour', label: '24 Hour Access' }
  ];

  const locations = [
    { id: 'all', label: 'All Locations' },
    { id: 'campus', label: 'On Campus' },
    { id: 'near-campus', label: 'Near Campus (< 1 mile)' },
    { id: 'city', label: 'City Center' }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'yoga-pilates':
        return <Heart className="w-5 h-5 text-purple-500" />;
      case 'strength-training':
        return <Dumbbell className="w-5 h-5 text-red-500" />;
      case 'university':
        return <Award className="w-5 h-5 text-blue-500" />;
      case 'aquatic':
        return <Users className="w-5 h-5 text-cyan-500" />;
      default:
        return <Dumbbell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'yoga-pilates':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'strength-training':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'university':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'aquatic':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case '24-hour':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredGyms = gymCenters.filter(gym => {
    const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gym.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gym.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || gym.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || 
                           (selectedLocation === 'campus' && gym.distance.includes('0.')) ||
                           (selectedLocation === 'near-campus' && parseFloat(gym.distance) < 1) ||
                           (selectedLocation === 'city' && parseFloat(gym.distance) >= 1);
    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
          <Dumbbell className="w-8 h-8 text-orange-600" />
          <span>Fitness & Wellness Centers</span>
        </h1>
        <p className="text-gray-600">Find the perfect fitness center to support your physical and mental wellbeing</p>
      </div>

      {/* Benefits Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-8 text-white mb-8">
        <h2 className="text-2xl font-bold mb-4">Exercise for Mental Health</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Heart className="w-8 h-8 text-orange-200" />
            <div>
              <h3 className="font-semibold">Reduces Depression & Anxiety</h3>
              <p className="text-orange-100 text-sm">Exercise releases endorphins and reduces stress hormones</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Dumbbell className="w-8 h-8 text-orange-200" />
            <div>
              <h3 className="font-semibold">Builds Confidence</h3>
              <p className="text-orange-100 text-sm">Physical achievements boost self-esteem and body image</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-orange-200" />
            <div>
              <h3 className="font-semibold">Social Connection</h3>
              <p className="text-orange-100 text-sm">Group classes and gym communities provide social support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search fitness centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {gymTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>{location.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

{/* Quick Tips Section */}

<div>
      <div className="mt-12 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Getting Started Tips</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center">





            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:shadow-lg transition-shadow">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Start Small</h3>
            <p className="text-gray-600 text-sm">Begin with 2-3 sessions per week and gradually increase</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:shadow-lg transition-shadow">
              <Users className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Find Your Community</h3>
            <p className="text-gray-600 text-sm">Join group classes or find a workout buddy for motivation</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:shadow-lg transition-shadow">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Listen to Your Body</h3>
            <p className="text-gray-600 text-sm">Exercise should energize, not exhaust you</p>
          </div>
        </div>
</div>

      {/* Gym Centers Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredGyms.map((gym) => (
          <div key={gym.id} className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={gym.image}
                alt={gym.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(gym.type)}`}>
                  {gymTypes.find(t => t.id === gym.type)?.label}
                </span>
              </div>
              <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                <Navigation className="w-3 h-3" />
                <span>{gym.distance}</span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{gym.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{gym.rating}</span>
                  <span className="text-sm text-gray-500">({gym.reviews})</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{gym.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{gym.hours}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{gym.phone}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Amenities:</p>
                <div className="flex flex-wrap gap-1">
                  {gym.amenities.slice(0, 4).map((amenity, index) => (
                    <span key={index} className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs">
                      {amenity}
                    </span>
                  ))}
                  {gym.amenities.length > 4 && (
                    <span className="text-orange-600 text-xs">+{gym.amenities.length - 4} more</span>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Mental Health Programs:</p>
                <div className="space-y-1">
                  {gym.specialPrograms.map((program, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Heart className="w-3 h-3 text-pink-500" />
                      <span className="text-sm text-gray-600">{program}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Student Price</p>
                  <p className="text-lg font-bold text-orange-600">{gym.studentPrice}</p>
                  {gym.membershipPrice !== gym.studentPrice && (
                    <p className="text-sm text-gray-500 line-through">{gym.membershipPrice}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <a
                    href={`tel:${gym.phone}`}
                    className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors flex items-center space-x-1"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </a>
                  <a
                    href={gym.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-1"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Visit</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      </div>
    </div>
  );
};

export default GymCenterPage;