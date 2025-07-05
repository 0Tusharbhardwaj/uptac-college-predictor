import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WhatsAppBanner from './components/WhatsAppBanner';
import FilterSection from './components/FilterSection';
import Statistics from './components/Statistics';
import ResultsTable from './components/ResultsTable';
import { exportToCSV, printResults } from './utils/csvExport';
import { AlertCircle, Loader2, Heart, Mail } from 'lucide-react';

interface CollegeData {
  institute: string;
  program: string;
  quota: string;
  category: string;
  round: string;
  opening_rank: number;
  closing_rank: number;
}

function App() {
  const [collegeData, setCollegeData] = useState<CollegeData[]>([]);
  const [filteredResults, setFilteredResults] = useState<CollegeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Filter states
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('');
  const [quota, setQuota] = useState('');
  const [institute, setInstitute] = useState('');
  const [program, setProgram] = useState('');
  const [round, setRound] = useState('');

  // Load data on component mount
  useEffect(() => {
    loadCollegeData();
  }, []);

  const loadCollegeData = async () => {
    try {
      setDataLoading(true);
      setError(null);
      
      const response = await fetch('/uptac_orcr_full.json');
      if (!response.ok) {
        throw new Error('Failed to load college data');
      }
      
      const data = await response.json();
      setCollegeData(data);
    } catch (err) {
      setError('Failed to load college data. Please refresh the page and try again.');
      console.error('Error loading college data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handlePredict = async () => {
    if (!rank || !category || !quota) {
      alert('Please fill in all required fields (Rank, Category, Quota)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userRank = parseInt(rank);
      
      let filtered = collegeData.filter(college => {
        // Primary filter: user rank should be <= closing rank
        const rankEligible = userRank <= college.closing_rank;
        
        // Category and quota must match exactly
        const categoryMatch = college.category === category;
        const quotaMatch = college.quota === quota;
        
        return rankEligible && categoryMatch && quotaMatch;
      });

      // Apply optional filters
      if (institute.trim()) {
        filtered = filtered.filter(college =>
          college.institute.toLowerCase().includes(institute.toLowerCase())
        );
      }

      if (program.trim()) {
        filtered = filtered.filter(college =>
          college.program.toLowerCase().includes(program.toLowerCase())
        );
      }

      if (round) {
        filtered = filtered.filter(college => college.round === round);
      }

      // Sort by closing rank (ascending)
      filtered.sort((a, b) => a.closing_rank - b.closing_rank);

      setFilteredResults(filtered);
      setHasSearched(true);
    } catch (err) {
      setError('An error occurred while filtering colleges. Please try again.');
      console.error('Error filtering colleges:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRank('');
    setCategory('');
    setQuota('');
    setInstitute('');
    setProgram('');
    setRound('');
    setFilteredResults([]);
    setHasSearched(false);
    setError(null);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredResults, `uptac_predictions_rank_${rank}.csv`);
  };

  const handlePrint = () => {
    printResults();
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600 font-medium">Loading college data...</p>
          <p className="text-sm text-gray-400 mt-2">Please wait while we prepare your experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WhatsAppBanner />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        <FilterSection
          rank={rank}
          setRank={setRank}
          category={category}
          setCategory={setCategory}
          quota={quota}
          setQuota={setQuota}
          institute={institute}
          setInstitute={setInstitute}
          program={program}
          setProgram={setProgram}
          round={round}
          setRound={setRound}
          onPredict={handlePredict}
          onReset={handleReset}
          loading={loading}
        />

        {hasSearched && rank && category && (
          <div className="animate-fade-in">
            <Statistics
              totalColleges={collegeData.length}
              eligibleColleges={filteredResults.length}
              userRank={parseInt(rank)}
              category={category}
            />
          </div>
        )}

        {hasSearched && (
          <div className="animate-fade-in">
            <ResultsTable
              results={filteredResults}
              onExportCSV={handleExportCSV}
              onPrint={handlePrint}
            />
          </div>
        )}

        {!hasSearched && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎓</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to UPTAC College Predictor 2024
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Discover your perfect engineering college match with our intelligent prediction system. 
                  Enter your JEE rank and preferences to explore all eligible institutions in Uttar Pradesh.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-100">
                <h3 className="text-xl font-semibold text-indigo-900 mb-6">How it works</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <p className="font-medium text-gray-900">Enter Your Details</p>
                        <p className="text-sm text-gray-600">Input your JEE rank and select your category</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <p className="font-medium text-gray-900">Choose Preferences</p>
                        <p className="text-sm text-gray-600">Select quota and optional filters</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <p className="font-medium text-gray-900">Get Results</p>
                        <p className="text-sm text-gray-600">View eligible colleges sorted by closing rank</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                      <div>
                        <p className="font-medium text-gray-900">Export & Share</p>
                        <p className="text-sm text-gray-600">Download CSV or print for offline reference</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Unified Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-16 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Personal Branding Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-xl mb-4">
              <span>Made with</span>
              <Heart className="w-6 h-6 text-red-500 animate-pulse" />
              <span>by</span>
              <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                TUSHAR BHARDWAJ
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-gray-300 mb-4">
              <Mail className="w-5 h-5" />
              <a 
                href="mailto:redburg035@gmail.com"
                className="hover:text-blue-400 transition-colors duration-300 text-lg"
              >
                redburg035@gmail.com
              </a>
            </div>
            
            <div className="text-gray-400">
              Helping students find their perfect engineering college match
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            {/* Copyright and Disclaimer */}
            <div className="text-center space-y-3">
              <p className="text-gray-300 text-lg">
                © 2024 UPTAC College Predictor. Based on UPTAC B.Tech 2024 admission data.
              </p>
              <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Disclaimer: This is a prediction tool based on historical data. Final admissions depend on various factors including seat availability, counseling rounds, document verification, and official UPTAC policies. Always refer to official UPTAC notifications for the most accurate information.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;