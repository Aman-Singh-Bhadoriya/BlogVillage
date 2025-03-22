"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Line, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', subject: 'Physics', maxMarks: 100, obtainedMarks: 40 },
  { name: 'Feb', subject: 'Maths', maxMarks: 100, obtainedMarks: 70 },
  { name: 'Mar', subject: 'Chemistry', maxMarks: 100, obtainedMarks: 50 },
  { name: 'Apr', subject: 'Physics', maxMarks: 100, obtainedMarks: 30 },
  { name: 'May', subject: 'Maths', maxMarks: 100, obtainedMarks: 60 },
  { name: 'Jun', subject: 'Chemistry', maxMarks: 100, obtainedMarks: 80 },
  { name: 'Jul', subject: 'Physics', maxMarks: 100, obtainedMarks: 50 },
  { name: 'Aug', subject: 'Physics', maxMarks: 100, obtainedMarks: 30 },
  { name: 'Sep', subject: 'Physics', maxMarks: 100, obtainedMarks: 60 },
  { name: 'Oct', subject: 'Physics', maxMarks: 100, obtainedMarks: 50 },
  { name: 'Nov', subject: 'Physics', maxMarks: 100, obtainedMarks: 70 },
  { name: 'Dec', subject: 'Physics', maxMarks: 100, obtainedMarks: 90 }
];

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { obtainedMarks, maxMarks } = payload[0].payload;
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-md text-sm">
        <p className="text-gray-500">{`Obtained Marks`}</p>
        <p className="text-red-500 font-semibold">{`${obtainedMarks}/${maxMarks}`}</p>
      </div>
    );
  }
  return null;
};

const PerformanceChart = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Assignments Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barGap={5} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {/* Display obtained marks */}
          <Bar
            dataKey="obtainedMarks"
            stackId="a"
            fill="#FF5733"
            name="Obtained Marks"
            barSize={20}
            radius={[10, 10, 0, 0]}
            type="monotone"
          />
          
          {/* Display remaining marks */}
          <Bar
            dataKey={(entry) => entry.maxMarks - entry.obtainedMarks}
            stackId="a"
            fill="#FFD1C1"
            name="Remaining Marks"
            type="monotone"
            barSize={20}
            radius={[10, 10, 0, 0]}
          />

          {/* ✅ Connect the line to the top of the bars */}
          <Line
            type="monotone" // Smooth curve
            dataKey="obtainedMarks"
            stroke="#FF5733"
            strokeWidth={2}
            dot={{ r: 4, stroke: '#FF5733', strokeWidth: 2, fill: '#FFFFFF' }}
            activeDot={{ r: 6 }}
            connectNulls // Keep the line connected even if data is missing
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
