import React from 'react';
import { Search, Filter, RotateCcw, Zap } from 'lucide-react';

interface FilterSectionProps {
  rank: string;
  setRank: (rank: string) => void;
  category: string;
  setCategory: (category: string) => void;
  quota: string;
  setQuota: (quota: string) => void;
  institute: string;
  setInstitute: (institute: string) => void;
  program: string;
  setProgram: (program: string) => void;
  round: string;
  setRound: (round: string) => void;
  onPredict: () => void;
  onReset: () => void;
  loading: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  rank,
  setRank,
  category,
  setCategory,
  quota,
  setQuota,
  institute,
  setInstitute,
  program,
  setProgram,
  round,
  setRound,
  onPredict,
  onReset,
  loading
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Filter className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Filter Your Colleges</h2>
          <p className="text-gray-600">Enter your details to find eligible institutions</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Rank Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Your JEE Rank <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="Enter your rank"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium"
            min="1"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium"
            required
          >
            <option value="">Select Category</option>
            <option value="OPEN">OPEN</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="BC">BC</option>
            <option value="OPEN(TF)">FW</option>
            <option value="EWS(OPEN)">EWS</option>
          </select>
        </div>

        {/* Quota Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Quota <span className="text-red-500">*</span>
          </label>
          <select
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium"
            required
          >
            <option value="">Select Quota</option>
            <option value="Home State">Home State</option>
            <option value="All India">All India</option>
          </select>
        </div>

      {/* Institute Filter (Dropdown) */}
<div className="space-y-2">
  <label className="block text-sm font-semibold text-gray-700">
    Institute (Optional)
  </label>
  <select
    value={institute}
    onChange={(e) => setInstitute(e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-lg font-medium"
  >
    <option value="">All Institutes</option>
    {Array.from(new Set(collegeData.map(c => c.institute)))
      .sort()
      .map((inst, idx) => (
        <option key={idx} value={inst}>
          {inst}
        </option>
      ))}
  </select>
</div>

        {/* Program Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Program (Optional)
          </label>
          <input
            type="text"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            placeholder="Filter by program name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        {/* Round Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Round (Optional)
          </label>
          <select
            value={round}
            onChange={(e) => setRound(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          >
            <option value="">All Rounds</option>
            <option value="Round 1">Round 1</option>
            <option value="Round 2">Round 2</option>
            <option value="Round 3">Round 3</option>
            <option value="Round 4">Round 4</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onPredict}
          disabled={loading || !rank || !category || !quota}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Predicting...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Predict My Colleges
            </>
          )}
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-200"
        >
          <RotateCcw className="w-5 h-5" />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
