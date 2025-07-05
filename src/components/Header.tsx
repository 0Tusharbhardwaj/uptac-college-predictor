import React from 'react';
import { GraduationCap, Target, BookOpen, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                UPTAC College Predictor 2025
              </h1>
              <p className="text-gray-600 font-medium">Find Your Perfect Engineering College Match</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Discover eligible engineering colleges in Uttar Pradesh based on your JEE rank with our intelligent prediction system powered by official UPTAC B.Tech 2024 admission data
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full border border-indigo-200">
              <Target className="w-4 h-4" />
              <span className="font-medium">Accurate Predictions</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full border border-purple-200">
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">2024 Official Data</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
              <GraduationCap className="w-4 h-4" />
              <span className="font-medium">All Categories</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
