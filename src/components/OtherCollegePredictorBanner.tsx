import React from 'react';
import { ExternalLink, School, BarChart3 } from 'lucide-react';

const OtherCollegePredictorBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white shadow-lg relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <School className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Explore Other Courses College Predictor</h3>
              <p className="text-green-100 text-sm">
                Get accurate predictions for B.Pharm, BFA, BHMCT, BFAD, B.Voc & Lateral Entry colleges — all in one place.
              </p>
            </div>
          </div>

          {/* Visit Button */}
          <a
            href="https://other-college-predictor.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <BarChart3 className="w-6 h-6" />
            Visit Now
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default OtherCollegePredictorBanner;
