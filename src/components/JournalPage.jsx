import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { BookOpen, Plus, Calendar, Smile, Meh, Frown, Search, Filter, Edit3, Trash2, Save, X } from 'lucide-react';

// Message Box Component (replaces alert/confirm)
const MessageBox = ({ message, type, onClose, onConfirm }) => {
  if (!message) return null;

  const borderColor = type === 'error' ? 'border-red-500' :
                      type === 'success' ? 'border-green-500' :
                      'border-blue-500';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
      <div className={`bg-white rounded-lg shadow-xl p-6 max-w-sm w-full border-t-4 ${borderColor}`}>
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-lg">{type === 'error' ? 'Error' : type === 'success' ? 'Success' : 'Information'}</h4>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Confirm
            </button>
          )}
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md ${type === 'error' ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'} hover:opacity-90 transition-opacity`}
          >
            {onConfirm ? 'Cancel' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};


/*const JournalPage = () => {
  const [entries, setEntries] = useState([
    {
      id: '1',
      title: 'Exam Stress',
      content: 'Feeling overwhelmed with upcoming exams. Need to find better study strategies and manage my anxiety.',
      mood: 'sad',
      date: '2024-01-15',
      tags: ['stress', 'exams', 'anxiety']
    },
    {
      id: '2',
      title: 'Good Day with Friends',
      content: 'Had a great time with friends today. We went to the park and just talked for hours. Feeling grateful for good friendships.',
      mood: 'happy',
      date: '2024-01-14',
      tags: ['friends', 'gratitude', 'social']
    },
    {
      id: '3',
      title: 'Regular Day',
      content: 'Nothing special happened today. Attended classes, did some homework. Feeling neutral about everything.',
      mood: 'neutral',
      date: '2024-01-13',
      tags: ['routine', 'classes']
    }
  ]);*/ 
  const JournalPage = () => {
  // We start with an empty array, ready for real data.
  const [entries, setEntries] = useState([]); 
  
  // The rest of your useState hooks are perfect.
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null); // Stores the entry object being edited
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('all');
  const [messageBox, setMessageBox] = useState({ message: '', type: '', onConfirm: null });

  const [formEntry, setFormEntry] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    tags: '' // Stored as a comma-separated string for input
  });

   // CHANGE 3: Add this entire block to fetch real entries
  const fetchEntries = async () => {
    const token = localStorage.getItem('token');
    if (!token) return; // Stop if no token is found
    
    try {
      const config = { headers: { 'x-auth-token': token } };
      const res = await axios.get('http://localhost:5000/api/journal', config);
      setEntries(res.data); // Put real entries from the database into state
    } catch (err) {
      console.error('Failed to fetch journal entries:', err);
      setMessageBox({ message: 'Could not load your entries.', type: 'error', onClose: () => setMessageBox({ message: '' }) });
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []); // The empty [] makes this run once when the component loads

  const handleOpenNewEntry = () => {
    setEditingEntry(null); // Clear any editing state
    setFormEntry({ title: '', content: '', mood: 'neutral', tags: '' });
    setShowNewEntryModal(true);
  };

  const handleOpenEditEntry = (entry) => {
    setEditingEntry(entry);
    setFormEntry({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      tags: entry.tags ? entry.tags.join(', ') : '' // Convert array to comma-separated string
    });
    setShowNewEntryModal(true);
  };

  const handleCloseModal = () => {
    setShowNewEntryModal(false);
    setEditingEntry(null);
    setFormEntry({ title: '', content: '', mood: 'neutral', tags: '' });
  };

 // Find and replace this entire function
const handleSaveOrUpdateEntry = async () => {
  if (!formEntry.title.trim() || !formEntry.content.trim()) {
    setMessageBox({ message: 'Title and content cannot be empty.', type: 'error', onClose: () => setMessageBox({ message: '' }) });
    return;
  }
  
  const token = localStorage.getItem('token');
  const config = { headers: { 'x-auth-token': token } };
  
  const tagsArray = formEntry.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
  const entryData = {
    title: formEntry.title,
    content: formEntry.content,
    mood: formEntry.mood,
    tags: tagsArray
  };
  
  try {
    if (editingEntry) {
      // If we are editing, send a PUT request to update
      await axios.put(`http://localhost:5000/api/journal/${editingEntry._id}`, entryData, config);
      setMessageBox({ message: 'Entry updated successfully!', type: 'success', onClose: () => setMessageBox({ message: '' }) });
    } else {
      // If creating a new entry, send a POST request
      await axios.post('http://localhost:5000/api/journal', entryData, config);
      setMessageBox({ message: 'Entry saved successfully!', type: 'success', onClose: () => setMessageBox({ message: '' }) });
    }
    
    handleCloseModal();
    fetchEntries(); // Refresh the list with the latest data from the database
  } catch (err) {
    console.error('Failed to save or update entry:', err);
    setMessageBox({ message: 'An error occurred. Please try again.', type: 'error', onClose: () => setMessageBox({ message: '' }) });
  }
};


  // Find and replace this entire function
const handleDeleteEntry = (id) => {
  setMessageBox({
    message: 'Are you sure you want to delete this entry? This action cannot be undone.',
    type: 'warning',
    onConfirm: async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };
        await axios.delete(`http://localhost:5000/api/journal/${id}`, config);

        setMessageBox({ message: 'Entry deleted successfully!', type: 'success', onClose: () => setMessageBox({ message: '' }) });
        fetchEntries(); // Refresh the list from the database
      } catch (err) {
        console.error('Failed to delete entry:', err);
        setMessageBox({ message: 'Could not delete the entry.', type: 'error', onClose: () => setMessageBox({ message: '' }) });
      }
    },
    onClose: () => setMessageBox({ message: '' })
  });
};

  const getMoodIcon = (mood) => {
    switch (mood) {
      case 'happy':
        return <Smile className="w-4 h-4 text-green-500" />;
      case 'neutral':
        return <Meh className="w-4 h-4 text-yellow-500" />;
      case 'sad':
        return <Frown className="w-4 h-4 text-red-500" />;
      default:
        return <Meh className="w-4 h-4 text-gray-400" />;
    }
  };

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'happy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'neutral':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'sad':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesMood = filterMood === 'all' || entry.mood === filterMood;
    return matchesSearch && matchesMood;

  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-indigo-600" />
              <span>My Journal</span>
            </h1>
            <p className="text-gray-600  text-lg">Your private space for thoughts and reflections</p>
          </div>
          
          <button
            onClick={handleOpenNewEntry}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Entry</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search your entries by title, content, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterMood}
                onChange={(e) => setFilterMood(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Moods</option>
                <option value="happy">Happy</option>
                <option value="neutral">Neutral</option>
                <option value="sad">Sad</option>
              </select>
            </div>
          </div>
        </div>

        {/* New/Edit Entry Modal */}
        {showNewEntryModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{editingEntry ? 'Edit Journal Entry' : 'New Journal Entry'}</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Entry title..."
                  value={formEntry.title}
                  onChange={(e) => setFormEntry({ ...formEntry, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg font-medium"
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling?</label>
                  <div className="flex space-x-4">
                    {[
                      { mood: 'sad', icon: Frown, label: 'Sad', color: 'text-red-500' },
                      { mood: 'neutral', icon: Meh, label: 'Neutral', color: 'text-yellow-500' },
                      { mood: 'happy', icon: Smile, label: 'Happy', color: 'text-green-500' }
                    ].map(({ mood, icon: Icon, label, color }) => (
                      <button
                        key={mood}
                        onClick={() => setFormEntry({ ...formEntry, mood: mood })}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                          formEntry.mood === mood
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${color}`} />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <textarea
                  placeholder="Write your thoughts here..."
                  value={formEntry.content}
                  onChange={(e) => setFormEntry({ ...formEntry, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g., stress, exams, gratitude"
                    value={formEntry.tags}
                    onChange={(e) => setFormEntry({ ...formEntry, tags: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveOrUpdateEntry}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingEntry ? 'Update Entry' : 'Save Entry'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Journal Entries */}
        <div className="space-y-6">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No entries found</h3>
              <p className="text-gray-400">
                {searchTerm || filterMood !== 'all' 
                  ? 'Try adjusting your search or filter'
                  : 'Start writing your first journal entry!'
                }
              </p>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div key={entry._id} className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{entry.title}</h3>
                      {getMoodIcon(entry.mood)}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(entry.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getMoodColor(entry.mood)}`}>
                        {entry.mood}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenEditEntry(entry)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(entry._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">{entry.content}</p>
                
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <MessageBox
        message={messageBox.message}
        type={messageBox.type}
        onClose={() => setMessageBox({ message: '' })}
        onConfirm={messageBox.onConfirm}
      />
    </div>
  );
  };

export default JournalPage;