'use client';

import { useState } from 'react';

export default function WaitlistPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'https://nikka-ai-waitlist-1.onrender.com/api/join';

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    setShowSuccess(false);
    setIsLoading(true);

    try {
      console.log('Sending request to:', API_URL);
      console.log('Data:', formData);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response has content
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('Response data:', data);
      } else {
        const text = await response.text();
        console.log('Response text:', text);
        data = {};
      }

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '' });
      } else if (response.status === 409) {
        setError("✉️ You're already on the waitlist! Check your email.");
      } else if (response.status === 400) {
        setError(data.error || 'Please provide a valid name and email.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Unable to connect. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowSuccess(false);
    setError('');
    setFormData({ name: '', email: '' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0b14] text-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-[#0a0b14]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-xl font-bold tracking-tight">NIKKA AI</div>
          <div className="flex gap-3 items-center">
            <a href="#about" className="px-4 py-2 rounded-lg text-slate-400 text-sm font-medium hover:bg-slate-800 hover:text-slate-100 transition-colors">
              About
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-16 max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
          Join the <span className="text-blue-600">NIKKA AI</span><br />
          Waitlist
        </h1>
        <p className="max-w-2xl text-slate-400 text-xl mb-10 leading-relaxed">
          Be the first to experience our revolutionary AI agents with vision, voice, and personality. The future of AI interaction starts here.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-all"
          >
            Join Waitlist
          </button>
          <button 
            onClick={scrollToAbout}
            className="px-8 py-3 rounded-lg bg-transparent text-slate-100 font-semibold text-lg border-2 border-slate-700 hover:bg-slate-800 transition-all"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 py-16 max-w-7xl mx-auto">
        <div className="bg-gray-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl transition-all">
          <img 
            src="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop" 
            alt="Voice & Vision" 
            className="w-full h-52 object-cover bg-slate-800"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">Voice & Vision</h3>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              AI agents that can see images, understand voice notes, and speak back with natural text-to-speech.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl transition-all">
          <img 
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop" 
            alt="Custom Personalities" 
            className="w-full h-52 object-cover bg-slate-800"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">Custom Personalities</h3>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              Craft unique AI agents with custom prompts and behaviors. Make them truly yours with personalized instructions.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-xl transition-all">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
            alt="Community Driven" 
            className="w-full h-52 object-cover bg-slate-800"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">Community Driven</h3>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              Follow creators, star AI agents, and collaborate in group chats with multiple AI companions.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#0a0b14]/80 backdrop-blur-xl px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <span className="text-slate-500">© 2025 NIKKA AI. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-slate-100 px-3 py-1 rounded-md hover:bg-slate-800 transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-slate-100 px-3 py-1 rounded-md hover:bg-slate-800 transition-colors">Terms</a>
            <a href="#" className="text-slate-400 hover:text-slate-100 px-3 py-1 rounded-md hover:bg-slate-800 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center z-[100] px-4"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-gray-900 p-10 rounded-2xl max-w-md w-full border border-slate-800 shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-2">Join the Waitlist</h2>
            <p className="text-slate-400 mb-8 text-[15px]">Get early access to NIKKA AI</p>
            
            {!showSuccess ? (
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full px-4 py-3.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 text-[15px] focus:outline-none focus:border-blue-600 placeholder:text-slate-600 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full px-4 py-3.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 text-[15px] focus:outline-none focus:border-blue-600 placeholder:text-slate-600 transition-colors"
                />
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="px-6 py-3.5 rounded-lg bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-colors mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Joining...' : 'Join Now'}
                </button>
              </div>
            ) : (
              <div className="bg-green-500/10 border border-green-500 px-5 py-5 rounded-xl text-green-500 font-semibold leading-relaxed text-[15px]">
                <div>🎉 You've successfully joined the waitlist!</div>
                <div className="text-slate-400 font-normal mt-2 text-sm">Check your email for confirmation.</div>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500 px-5 py-5 rounded-xl text-red-500 font-semibold leading-normal text-[15px] mt-4">
                {error}
              </div>
            )}

            <button
              onClick={closeModal}
              className="mt-5 bg-slate-800 text-slate-400 px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-700 hover:text-slate-100 transition-all w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}