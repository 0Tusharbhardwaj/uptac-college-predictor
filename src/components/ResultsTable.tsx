import React from 'react';
import {
  Download, GraduationCap, MapPin, Users, Trophy, Building2, BookOpen
} from 'lucide-react';

interface CollegeData {
  institute: string;
  program: string;
  quota: string;
  category: string;
  round: string;
  opening_rank: number;
  closing_rank: number;
}

interface ResultsTableProps {
  results: CollegeData[];
  onExportCSV: () => void;
  onPrint: () => void;
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results, onExportCSV, onPrint }) => {
  if (results.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
        <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-600 mb-4">No Results Found</h3>
        <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
          Try adjusting your filters or rank to discover more options.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* ✅ Watermark Overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10 rotate-[315deg] z-0 print:opacity-10">
        <h1 className="text-6xl font-extrabold text-gray-400 select-none whitespace-nowrap">
          Made by Tushar Bhardwaj
        </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4 lg:mb-0">
            <div className="p-3 bg-indigo-100 rounded-xl">
              <Trophy className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Eligible Colleges</h2>
              <p className="text-gray-600 font-medium">{results.length} colleges match your criteria</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onExportCSV}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full relative z-10">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                  <div className="flex items-center gap-2"><Building2 className="w-4 h-4" />Institute</div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                  <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" />Program</div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />Quota</div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                  <div className="flex items-center gap-2"><Users className="w-4 h-4" />Category</div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Round</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Opening Rank</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Closing Rank</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((college, index) => (
                <tr key={index} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-5 font-bold text-indigo-600">{index + 1}</td>
                  <td className="px-6 py-5 text-sm text-gray-900">{college.institute}</td>
                  <td className="px-6 py-5 text-sm text-gray-900">{college.program}</td>
                  <td className="px-6 py-5 text-sm">{college.quota}</td>
                  <td className="px-6 py-5 text-sm">{college.category}</td>
                  <td className="px-6 py-5 text-sm">{college.round}</td>
                  <td className="px-6 py-5 text-sm font-bold text-gray-800">{college.opening_rank.toLocaleString()}</td>
                  <td className="px-6 py-5 text-sm font-bold text-indigo-600">{college.closing_rank.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center text-sm text-gray-600">
          Showing {results.length} colleges sorted by closing rank (ascending)
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
