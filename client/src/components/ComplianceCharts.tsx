import { useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import type { Employee } from '@/lib/types';
import { getStatistics } from '@/lib/training-utils';

interface ComplianceChartsProps {
  employees: Employee[];
}

export default function ComplianceCharts({ employees }: ComplianceChartsProps) {
  const [showChart, setShowChart] = useState(false);
  const stats = getStatistics(employees);

  // Data for training status distribution
  const trainingStatusData = [
    {
      name: 'Válidos',
      value: stats.valid,
      percentage: stats.total > 0 ? Math.round((stats.valid / stats.total) * 100) : 0,
    },
    {
      name: 'Próximos a Vencer',
      value: stats.expiring,
      percentage: stats.total > 0 ? Math.round((stats.expiring / stats.total) * 100) : 0,
    },
    {
      name: 'Vencidos',
      value: stats.expired,
      percentage: stats.total > 0 ? Math.round((stats.expired / stats.total) * 100) : 0,
    },
  ];

  const TRAINING_COLORS = ['#2d9f7f', '#fbbf24', '#ef4444'];

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  return (
    <div className="mb-8">
      {/* Training Status Distribution with Toggle */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Header with Toggle Button */}
        <div className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setShowChart(!showChart)}>
          <h3 className="text-lg font-bold text-navy">Distribuição de Treinamentos</h3>
          <ChevronDown
            size={24}
            className={`text-orange-600 transition-transform duration-300 ${showChart ? 'rotate-180' : ''}`}
          />
        </div>

        {/* Chart Content - Hidden by Default */}
        {showChart && (
          <div className="px-6 pb-6 border-t border-gray-100">
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trainingStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trainingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TRAINING_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string, props: any) => [
                      `${value} treinamento${value !== 1 ? 's' : ''} (${props.payload.percentage}%)`,
                      props.payload.name,
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 w-full space-y-2">
                {trainingStatusData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: TRAINING_COLORS[index] }}
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {item.value} ({item.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
