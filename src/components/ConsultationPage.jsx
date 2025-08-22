import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/react-stripe-js'; // <-- 1. ADD THIS LINE
import axios from 'axios'; // <-- 2. ADD THIS LINE
import { Calendar, Clock, Video, Phone, MessageCircle, Star, Filter, Search, MapPin, Award, Users, Shield, CreditCard, CheckCircle } from 'lucide-react';

const ConsultationPage = ({ user }) => {
   const stripe = useStripe(); // <-- 3. ADD THIS LINE
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showBooking, setShowBooking] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const doctors = [
   
    {
      id: '1',
      name: 'Dr.Ashutosh Nayak',
      specialty: 'Clinical Psychologist',
      education: 'PhD Psychology, KIIT University',
      experience: '10 years',
      rating: 4.9,
      reviews: 1090,
      languages: ['English', 'Hindi','Odia','Marathi'],
      consultationFee: 1200,
      image: 'https://cdn.openart.ai/video_thumbnail/iCU9kmxBWhDjnVYkwhDe/thumbnail_f3f4bed8_1754934919679.webp',
      availability: ['video', 'audio'],
      nextAvailable: '12-10-2024',
      bio: 'Specializes in anxiety, depression, and stress management for college students.'
    },
    {
      id: '2',
      name: 'Dr. Manoj kumar Parida',
      specialty: 'Psychiatrist',
      education: 'MD Psychiatry, Ravenshaw university',
      experience: '12 years',
      rating: 4.8,
      reviews: 1340,
      languages: ['English', 'Odia','Hindi'],
      consultationFee: 800,
      image: 'https://images.deepai.org/machine-learning-models/af4d384431974ab5bfda622a20a27695/anime_fairy.jpg',
      availability: ['video', 'audio'],
      nextAvailable: '12-09-2024',
      bio: 'Expert in medication management and treatment of severe mental health conditions.'
    },
    {
      id: '3',
      name: 'Dr.Ram Chandra Das',
      specialty: 'Licensed Counselor',
      education: 'MS Counseling Psychology,ITER',
      experience: '6 years',
      rating: 4.7,
      reviews: 89,
      languages: ['English', 'Japanese','Bhojpuri'],
      consultationFee: 500,
      image: 'https://cdn.openart.ai/uploads/image_aTWWx410_1752634743909_512.webp',
      availability: ['video', 'audio'],
      nextAvailable: '12-11-2024',
      bio: 'Focuses on relationship counseling and emotional support for young adults.'
    },
    {
      id: '4',
      name: 'Dr.Ayutayam Sutar',
      specialty: 'Therapist',
      education: 'PhD Clinical Psychology, Aiims,Bhubaneswar',
      experience: '3 years',
      rating: 4.9,
      reviews: 400,
      languages: ['English', 'Odia','Hindi'],
      consultationFee: 750,
      image: 'https://cdn.openart.ai/uploads/image_sAHKFzcV_1752634665397_512.webp',
      availability: ['video', 'audio'],
      nextAvailable: '8-08-2025',
      bio: 'Specializes in cognitive behavioral therapy and trauma-informed care.'
    },
    {
      id: '5',
      name: 'Dr.Pratyush Tripathy',
      specialty: 'Therapist',
      education: 'PhD Clinical Psychology, Aiims,Delhi',
      experience: '10 years',
      rating: 4.9,
      reviews: 2000,
      languages: ['English', 'Odia','Hindi'],
      consultationFee: 1000,
      image: 'https://cdn.openart.ai/uploads/image_qGc_whrd_1752634906691_512.webp',
      availability: ['video', 'audio'],
      nextAvailable: '8-10-2025',
      bio: 'Specializes in cognitive behavioral therapy and trauma-informed care.'
    },
    {
    id: '6',
    name: 'Dr. Ridhhiman Nair',
    specialty: 'Anxiety & Mood Disorders Specialist',
    education: 'PhD in Clinical Psychology (Specialization in Anxiety Disorders), NIMHANS Bangalore',
    experience: '10 years',
    rating: 4.9,
    reviews: 1090,
    languages: ['English', 'Hindi', 'Odia', 'Marathi'],
    consultationFee: 1200,
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    availability: ['video', 'audio'],
    nextAvailable: '29-10-2025',
    bio: 'Specializes in Cognitive Behavioral Therapy for anxiety disorders, depression, and stress management. Certified in Exposure Therapy for phobias and OCD.'
    },
    {
    id: '7',
    name: 'Dr.Mutuswamy Iyer',
    specialty: 'Psychopharmacology & Addiction Psychiatry',
    education: 'MD in Psychiatry with Specialization in Psychopharmacology, AIIMS New Delhi',
    experience: '12 years',
    rating: 4.8,
    reviews: 1340,
    languages: ['English', 'Odia', 'Hindi'],
    consultationFee: 1000,
    image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    availability: ['video', 'audio'],
    nextAvailable: '23-09-2025',
    bio: 'Expert in medication management for bipolar disorder, schizophrenia, and substance abuse disorders. Specializes in dual diagnosis treatment.'
    },
    {
    id: '8',
    name: 'Dr.Verrapan Maharana',
    specialty: 'Relationship & Family Therapist',
    education: 'MSc in Counseling Psychology (Specialization in Relationship Therapy), TISS Mumbai',
    experience: '6 years',
    rating: 4.7,
    reviews: 890,
    languages: ['English', 'Japanese', 'Bhojpuri'],
    consultationFee: 500,
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    availability: ['video', 'audio'],
    nextAvailable: '30-11-2025',
    bio: 'Specializes in couples counseling, family therapy, and interpersonal relationship issues. Certified in Gottman Method and Emotionally Focused Therapy.'
    },
    {
    id: '9',
    name: 'Dr.Lewis Sethi',
    specialty: 'Trauma & PTSD Specialist',
    education: 'PhD in Clinical Psychology (Trauma and PTSD Specialization), NIMHANS Bangalore',
    experience: '3 years',
    rating: 4.9,
    reviews: 400,
    languages: ['English', 'Odia', 'Hindi'],
    consultationFee: 750,
    image: 'https://images.deepai.org/machine-learning-models/d4b1dd3ee43648a997650dc7f9e6923f/panda.jpeg',
    availability: ['video', 'audio'],
    nextAvailable: '11-08-2025',
    bio: 'Specializes in trauma-focused therapies for abuse survivors, accident victims, and PTSD patients. Certified in EMDR and Prolonged Exposure Therapy.'
    },
    {
    id: '10',
    name: 'Dr.Max Das',
    specialty: 'Neuropsychology & Geriatric Mental Health',
    education: 'PhD in Neuropsychology with Specialization in Dementia Care, AIIMS Delhi',
    experience: '10 years',
    rating: 4.9,
    reviews: 2000,
    languages: ['English', 'Odia', 'Hindi'],
    consultationFee: 1000,
    image: 'https://cdn.openart.ai/uploads/image_aF3IVgSZ_1752634765366_512.webp',
    availability: ['video', 'audio'],
    nextAvailable: '9-10-2025',
    bio: 'Specializes in cognitive assessment and therapy for age-related mental health conditions including dementia, Alzheimer\'s, and Parkinson\'s related disorders.'
    },
    {
    id: '11',
    name: 'Dr. Priyanka Mohanty',
    specialty: 'Child & Adolescent Psychologist',
    education: 'PhD in Child Psychology (Specialization in Autism Spectrum Disorders), AIIMS Delhi',
    experience: '8 years',
    rating: 4.8,
    reviews: 950,
    languages: ['English', 'Hindi', 'Odia', 'Bengali'],
    consultationFee: 1500,
    image: 'https://cdn.openart.ai/uploads/image_Anbmo0c7_1752634568410_raw.jpg',
    availability: ['video', 'audio'],
    nextAvailable: '15-11-2025',
    bio: 'Specializes in developmental disorders, learning disabilities, and adolescent mental health. Certified in Applied Behavior Analysis (ABA) and Play Therapy. Expert in managing school-related stress and bullying cases.'
    },
    {
    id: '12',
    name: 'Dr. Arjun Reddy',
    specialty: 'Forensic Psychiatrist',
    education: 'MD in Forensic Psychiatry, NIMHANS Bangalore | Diploma in Legal Medicine',
    experience: '7 years',
    rating: 4.7,
    reviews: 620,
    languages: ['English', 'Hindi', 'Telugu', 'Kannada'],
    consultationFee: 2000,
    image: 'https://images.pexels.com/photos/8376181/pexels-photo-8376181.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    availability: ['video'],
    nextAvailable: '20-12-2025',
    bio: 'Specializes in criminal behavior analysis, competency evaluations, and trauma treatment for victims of violence. Court-certified expert witness. Provides therapy for offenders and rehabilitation counseling.'
    }
  ];

/*  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem('appointments');
    return savedAppointments ? JSON.parse(savedAppointments) : [
      {
        id: '1',
        doctorName: 'Dr Ashutosh Nayak',
        date: '2024-01-20',
        time: '2:00 PM',
        type: 'Audio',
        status: 'Confirmed',
        fee: 1500
      },
      {
        id: '5',
        doctorName: 'Dr.Kaloo Parida',
        date: '2024-01-18',
        time: '10:30 AM',
        type: 'audio',
        status: 'Waiting for doctors availability',
        fee: 1200
      }
    ];
  }); */

  const [appointments, setAppointments] = useState([]);
  

/*  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]); */

  
/*  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentResult = urlParams.get('payment');
    const sessionId = urlParams.get('session_id');

    if (paymentResult === 'success' && sessionId) {
      setPaymentStatus('success');

      const pendingBooking = JSON.parse(localStorage.getItem('pendingBooking') || '{}');
      if (pendingBooking.doctorId && pendingBooking.doctorName) {
        completeBooking({ ...pendingBooking, sessionId });
      }

      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (paymentResult === 'cancelled') {
      setPaymentStatus('cancelled');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    if (paymentStatus) {
      const timer = setTimeout(() => {
        setPaymentStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [paymentStatus]);

  const completeBooking = (bookingData) => {
    // Function to generate a simple, random Meet ID
    const generateMeetId = () => {
      const chars = 'abcdefghijklmnopqrstuvwxyz';
      const segment = () => Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      return `${segment()}-${segment()}-${segment()}`;
    };

    const newAppointment = {
      id: Date.now().toString(),
      doctorName: bookingData.doctorName,
      date: bookingData.date,
      time: bookingData.time,
      type: bookingData.type,
      status: 'Confirmed',
      fee: bookingData.fee,
      paymentId: bookingData.sessionId,
      bookedAt: new Date().toISOString(),
      meetUrl: `https://meet.google.com/${generateMeetId()}`
    };

    setAppointments(prev => {
      const updatedAppointments = [newAppointment, ...prev];
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      return updatedAppointments;
    });

    localStorage.removeItem('pendingBooking');
    
    setTimeout(() => {
      const appointmentsSection = document.getElementById('appointments-section');
      if (appointmentsSection) {
        appointmentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }; */

  // ADD THIS NEW FUNCTION AND USEEFFECT

const fetchAppointments = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;
  try {
    const config = { headers: { 'x-auth-token': token } };
    const res = await axios.get('http://localhost:5000/api/consultations', config);
    setAppointments(res.data);
  } catch (err) {
    console.error('Failed to fetch appointments:', err);
  }
};

useEffect(() => {
  fetchAppointments();
}, []);

/*  const handlePayment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    const pendingBooking = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: selectedDate,
      time: selectedTime,
      type: selectedType === 'all' ? 'video' : selectedType,
      fee: selectedDoctor.consultationFee
    };

    localStorage.setItem('pendingBooking', JSON.stringify(pendingBooking));
    
    window.location.href = 'https://book.stripe.com/test_14A7sN705c8Z3xk9S6cjS02';
  }; */

  // ADD THIS NEW, POWERFUL FUNCTION
const handleProceedToPayment = async () => {
  if (!selectedDoctor || !selectedDate || !selectedTime || !stripe) {
    alert('Please select a doctor, date, and time. Stripe is also loading.');
    return;
  }

  const token = localStorage.getItem('token');
  const config = { headers: { 'x-auth-token': token } };
  const requestedDate = new Date(`${selectedDate}T${selectedTime.split(':')[0].padStart(2, '0')}:${selectedTime.split(':')[1].split(' ')[0]}`);

  // This is the data for our own database
  const bookingBody = {
    doctorName: selectedDoctor.name,
    doctorSpecialty: selectedDoctor.specialty,
    requestedDate,
  };

  try {
    // First, save a "Pending" request to our database
    await axios.post('http://localhost:5000/api/consultations', bookingBody, config);
    fetchAppointments(); // Refresh the list to show the new "Pending" status

    // Next, create the Stripe Checkout Session
    const stripeBody = {
      doctorName: selectedDoctor.name,
      consultationFee: selectedDoctor.consultationFee,
    };
    const res = await axios.post('http://localhost:5000/api/stripe/create-checkout-session', stripeBody, config);
    const { id: sessionId } = res.data;

    // Finally, redirect to Stripe's payment page
    await stripe.redirectToCheckout({ sessionId });

  } catch (err) {
    console.error('Failed to initiate payment:', err);
    alert('Could not start the payment process. Please try again.');
  }
};

  const specialties = [
    { id: 'all', label: 'All Specialties' },
    { id: 'psychologist', label: 'Clinical Psychologist' },
    { id: 'psychiatrist', label: 'Psychiatrist' },
    { id: 'counselor', label: 'Licensed Counselor' },
    { id: 'therapist', label: 'Therapist' }
  ];

  const consultationTypes = [
    { id: 'all', label: 'All Types' },
    { id: 'video', label: 'Video Call', icon: Video },
    { id: 'audio', label: 'Audio Call', icon: Phone },
    { id: 'chat', label: 'Chat', icon: MessageCircle }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || 
                             doctor.specialty.toLowerCase().includes(selectedSpecialty);
    const matchesType = selectedType === 'all' || doctor.availability.includes(selectedType);
    return matchesSearch && matchesSpecialty && matchesType;
  });

  const getConsultationIcon = (type) => {
    switch (type) {
      case 'video':
        return <a href="https://us05web.zoom.us/join"><Video className="w-4 h-4" ></Video> </a> ;
      case 'audio':
        return <a href='tel:+1234564594'> <Phone className="w-4 h-4" /></a>;
      default:
        return <a href="https://us05web.zoom.us/join"><Video className="w-4 h-4" ></Video> </a>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Waiting for doctors availability':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Payment Status Messages */}
      {paymentStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span>Payment successful! Your appointment has been confirmed.</span>
          </div>
        </div>
      )}
      
      {paymentStatus === 'cancelled' && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
          <span>Payment was cancelled. You can try booking again.</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
          <Calendar className="w-8 h-8 text-indigo-600" />
          <span>Book Doctor Consultation</span>
        </h1>
        <p className="  text-lg text-gray-600">Connect with qualified mental health professionals</p>
      </div>

      {/* My Appointments Section */}
      <div id="appointments-section" className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Appointments</h2>
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No appointments scheduled yet</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    {getConsultationIcon(appointment.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                    <p className="text-sm text-gray-600">
                     {new Date(appointment.requestedDate).toLocaleString()}
                    </p>
                    {appointment.paymentId && (
                      <p className="text-xs text-green-600">Payment ID: {appointment.paymentId}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
              <button>
                  {appointment.type === 'video' && appointment.status === 'Confirmed' && (
                    <a 
                      href={appointment.meetUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Join Call
                    </a>
                  )}
                   </button>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {specialties.map(specialty => (
                  <option key={specialty.id} value={specialty.id}>{specialty.label}</option>
                ))}
              </select>
            </div>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {consultationTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-indigo-600 font-medium">{doctor.specialty}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                  <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Award className="w-4 h-4" />
                <span>{doctor.education}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{doctor.experience} experience</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{doctor.languages.join(', ')}</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{doctor.bio}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-1">
                {doctor.availability.map((type) => (
                  <div key={type} className="p-2 bg-indigo-50 rounded-lg">
                    {getConsultationIcon(type)}
                  </div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Consultation Fee</p>
                <p className="text-lg font-bold text-indigo-600">₹{doctor.consultationFee}</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                setSelectedDoctor(doctor);
                setShowBooking(true);
              }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Book Appointment
            </button>
            
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBooking && selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Book Appointment</h3>
              <button
                onClick={() => setShowBooking(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            {/* Booking Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  1 >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <div className={`w-16 h-1 ${1 >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  1 >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <div className={`w-16 h-1 ${1 >= 3 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  1 >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                />
                <h4 className="text-xl font-semibold text-gray-900">{selectedDoctor.name}</h4>
                <p className="text-indigo-600">{selectedDoctor.specialty}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        selectedTime === time
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleProceedToPayment}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationPage;