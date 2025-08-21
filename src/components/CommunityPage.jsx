import React, { useState } from 'react';
import { Users, Plus, Heart, MessageCircle, Share2, MoreHorizontal, Flag, ThumbsUp, Clock, User, Trash2 } from 'lucide-react';

const CommunityPage = ({ user }) => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'Anonymous Student',
      content: 'Just wanted to share that I finally reached out to my college counseling center today. It was scary at first, but the counselor was so understanding. If you\'re thinking about it, please take that step. You deserve support. 💙',
      timestamp: new Date(Date.now() - 3600000),
      likes: 24,
      comments: 8,
      isLiked: false,
      category: 'support',
      isAnonymous: true,
      authorId: 'other_user_1' // Different user
    },
    {
      id: '2',
      author: 'Hopeful Senior',
      content: 'To anyone struggling with graduation anxiety: I felt the same way last year. The uncertainty is overwhelming, but remember that it\'s okay not to have everything figured out. Take it one day at a time. You\'ve got this! 🌟',
      timestamp: new Date(Date.now() - 7200000),
      likes: 31,
      comments: 12,
      isLiked: true,
      category: 'encouragement',
      isAnonymous: true,
      authorId: 'other_user_1' 
    },
    {
      id: '3',
      author: 'Mindful Meditator',
      content: 'Started doing 10 minutes of meditation every morning and it\'s been a game changer for my anxiety. There are some great free apps out there. Small steps can make a big difference! 🧘‍♀️',
      timestamp: new Date(Date.now() - 10800000),
      likes: 18,
      comments: 5,
      isLiked: false,
      category: 'tips',
      isAnonymous: true,
      authorId: 'other_user_2' 
    },
    {
      id: '4',
      author: 'Anonymous Friend',
      content: 'Having a really tough week with depression. Some days it feels like I\'m drowning. Just needed to put this somewhere. Thank you to everyone who shares their stories here - it helps me feel less alone.',
      timestamp: new Date(Date.now() - 14400000),
      likes: 42,
      comments: 15,
      isLiked: true,
      category: 'support',
      isAnonymous: true,
      authorId: 'current_user'
    }
  ]);

  const [showNewPost, setShowNewPost] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [newPost, setNewPost] = useState({
    content: '',
    category: 'support',
    isAnonymous: true
  });

  
  const currentUserId = 'current_user';

  const categories = [
    { id: 'support', label: 'Support', color: 'bg-blue-100 text-blue-800' },
    { id: 'encouragement', label: 'Encouragement', color: 'bg-green-100 text-green-800' },
    { id: 'tips', label: 'Tips & Advice', color: 'bg-purple-100 text-purple-800' },
    { id: 'story', label: 'My Story', color: 'bg-orange-100 text-orange-800' },
    { id: 'question', label: 'Question', color: 'bg-yellow-100 text-yellow-800' }
  ];

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleDeletePost = (postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
    setShowDropdown(null);
  };

  const confirmDelete = () => {
    setPosts(posts.filter(post => post.id !== postToDelete));
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const handleSubmitPost = () => {
    if (!newPost.content.trim()) return;

    const post = {
      id: Date.now().toString(),
      author: newPost.isAnonymous ? 'Anonymous User' : (user?.name || 'User'),
      content: newPost.content,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      isLiked: false,
      category: newPost.category,
      isAnonymous: newPost.isAnonymous,
      authorId: currentUserId // Track who created the post
    };

    setPosts([post, ...posts]);
    setNewPost({ content: '', category: 'support', isAnonymous: true });
    setShowNewPost(false);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getCategoryStyle = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  const isMyPost = (post) => {
    return post.authorId === currentUserId;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
            <Users className="w-8 h-8 text-indigo-600" />
            <span>Community Support</span>
          </h1>
          <p className=" text-lg text-gray-600">Share your journey and support others in theirs</p>
        </div>
        
        <button
          onClick={() => setShowNewPost(true)}
          className="mt-4 sm:mt-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Share Your Story</span>
        </button>
      </div>

      {/* Community Guidelines */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-indigo-900 mb-3">Community Guidelines</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-800">
          <div className="flex items-start space-x-2">
            <Heart className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
            <span>Be kind, supportive, and respectful to everyone</span>
          </div>
          <div className="flex items-start space-x-2">
            <Users className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
            <span>Share experiences, not personal identifying information</span>
          </div>
          <div className="flex items-start space-x-2">
            <MessageCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
            <span>Listen actively and offer genuine encouragement</span>
          </div>
          <div className="flex items-start space-x-2">
            <Flag className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
            <span>Report any harmful or inappropriate content</span>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Post</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Share with the Community</h3>
              <button
                onClick={() => setShowNewPost(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MoreHorizontal className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={newPost.isAnonymous}
                    onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-700">
                    Post anonymously (recommended)
                  </label>
                </div>
              </div>
              
              <textarea
                placeholder="Share your thoughts, experiences, or offer support to others..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewPost(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitPost}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Share Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl p-6 shadow-sm border border-indigo-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{post.author}</p>
                    {isMyPost(post) && (
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{formatTimeAgo(post.timestamp)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryStyle(post.category)}`}>
                      {categories.find(c => c.id === post.category)?.label}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(showDropdown === post.id ? null : post.id)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                
                {showDropdown === post.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    {isMyPost(post) && (
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Post</span>
                      </button>
                    )}
                    <button
                      onClick={() => setShowDropdown(null)}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Flag className="w-4 h-4" />
                      <span>Report Post</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 transition-colors ${
                    post.isLiked 
                      ? 'text-red-600 hover:text-red-700' 
                      : 'text-gray-500 hover:text-red-600'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <a href='https://x.com/home' target='main'><Share2 className="w-4 h-4"/></a>
                </button>
              
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-8">
        <button className="bg-white text-indigo-600 border border-indigo-300 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors font-medium">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default CommunityPage;