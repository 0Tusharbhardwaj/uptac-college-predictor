import React from 'react';
import { TrendingUp, Users, Building, Award, Target, BarChart3 } from 'lucide-react';

interface StatisticsProps {
  totalColleges: number;
  eligibleColleges: number;
  userRank: number;
  category: string;
}

const Statistics: React.FC<StatisticsProps> = ({ 
  totalColleges, 
  eligibleColleges, 
  userRank, 
  category 
}) => {
  const successRate = totalColleges > 0 ? Math.round((eligibleColleges / totalColleges) * 100) : 0;

  const stats = [
    {
      label: 'Your Rank',
      value: userRank.toLocaleString(),
      icon: Award,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      label: 'Eligible Colleges',
      value: eligibleColleges.toString(),
      icon: Building,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      label: 'Success Rate',
      value: `${successRate}%`,
      icon: TrendingUp,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    },
    {
      label: 'Category',
      value: category || 'N/A',
      icon: Users,
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-200'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Statistics</h2>
          <p className="text-gray-600">Overview of your college prediction results</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`${stat.bgColor} rounded-xl p-6 border ${stat.borderColor} transition-all duration-300 hover:shadow-md hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-white rounded-lg shadow-sm`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              {stat.label === 'Success Rate' && (
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {successRate > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2 text-green-800">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">
              Great news! You have {eligibleColleges} college options with a {successRate}% success rate.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;