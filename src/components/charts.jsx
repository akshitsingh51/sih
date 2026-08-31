import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * DistressTrendChart - Shows distress score over time
 */
export function DistressTrendChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="chart-placeholder">No trend data available yet</div>;
  }

  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Distress Score',
        data: data.map(d => d.distressScore || 50),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Distress Score: ${context.parsed.y}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Distress Score' }
      }
    }
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
}

/**
 * WellbeingRadarChart - Shows multiple wellbeing dimensions
 */
export function WellbeingRadarChart({ data }) {
  if (!data) return null;

  const chartData = {
    labels: ['Mood', 'Sleep', 'Safety', 'Support', 'Calm'],
    datasets: [
      {
        label: 'Current',
        data: [
          data.mood || 3,
          data.sleep || 3,
          data.safety || 3,
          data.support || 3,
          data.calm || 3
        ],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: '#6366f1',
        pointBackgroundColor: '#6366f1'
      },
      {
        label: 'Baseline',
        data: [
          data.baselineMood || 3,
          data.baselineSleep || 3,
          data.baselineSafety || 3,
          data.baselineSupport || 3,
          data.baselineCalm || 3
        ],
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderColor: '#22c55e',
        pointBackgroundColor: '#22c55e'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        ticks: { stepSize: 1 }
      }
    }
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
}

/**
 * RiskDistributionBar - Shows risk level distribution
 */
export function RiskDistributionBar({ data }) {
  if (!data) return null;

  const total = Object.values(data).reduce((a, b) => a + b, 0);

  const chartData = {
    labels: ['Low', 'Moderate', 'High', 'Urgent'],
    datasets: [{
      label: 'Cases',
      data: [data.LOW || 0, data.MODERATE || 0, data.HIGH || 0, data.URGENT || 0],
      backgroundColor: ['#22c55e', '#f59e0b', '#f97316', '#ef4444'],
      borderRadius: 4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { beginAtZero: true }
    }
  };

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}