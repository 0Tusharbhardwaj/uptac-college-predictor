import React from 'react';
import { MessageCircle, Users, Sparkles } from 'lucide-react';

const WhatsAppBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 text-center lg:text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <span className="text-3xl">🎉</span>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Join our WhatsApp Community!</h3>
              <p className="text-green-100 text-sm">Get personalized counseling help and connect with fellow students</p>
            </div>
          </div>
          
          <a
            href="https://chat.whatsapp.com/I5B4dCtJem8A3JEgSiKtgM?mode=r_c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-6 h-6" />
            Join WhatsApp Group
            <div className="flex items-center gap-1">
              <Users className="w-5 h-5" />
              <Sparkles className="w-4 h-4" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppBanner;