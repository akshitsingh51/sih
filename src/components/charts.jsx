import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
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
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * DistressTrendChart - Warm Sage + Sand minimalist trend line
 */
export function DistressTrendChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#7A847C', fontSize: '0.88rem' }}>
        No check-in trend data recorded yet
      </div>
    );
  }

  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Distress Score',
        data: data.map(d => d.distressScore ?? 50),
        borderColor: '#4A5D4E',
        backgroundColor: 'rgba(138, 154, 134, 0.20)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#4A5D4E',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
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
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(74, 93, 78, 0.20)',
        borderWidth: 1,
        titleColor: '#2F3B32',
        bodyColor: '#3F4A42',
        titleFont: { family: 'Roboto, Manrope, sans-serif', size: 12, weight: '700' },
        bodyFont: { family: 'Roboto, Manrope, sans-serif', size: 13, weight: '600' },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `Distress: ${context.parsed.y}/100`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: '#5F6B62',
          font: { family: 'Roboto, Manrope, sans-serif', size: 11 }
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'rgba(74, 93, 78, 0.10)' },
        ticks: {
          stepSize: 25,
          color: '#5F6B62',
          font: { family: 'Roboto, Manrope, sans-serif', size: 11 },
          callback: (value) => `${value}`
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

/**
 * WellbeingRadarChart - Deep Sage & Warm Accent multi-dimensional radar
 */
export function WellbeingRadarChart({ data }) {
  if (!data) return null;

  const chartData = {
    labels: ['Mood', 'Sleep', 'Safety', 'Support', 'Calm'],
    datasets: [
      {
        label: 'Current Wellbeing',
        data: [
          data.mood || 3,
          data.sleep || 3,
          data.safety || 3,
          data.support || 3,
          data.calm || 3
        ],
        backgroundColor: 'rgba(74, 93, 78, 0.20)',
        borderColor: '#4A5D4E',
        pointBackgroundColor: '#4A5D4E',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4
      },
      {
        label: 'Baseline Profile',
        data: [
          data.baselineMood || 3,
          data.baselineSleep || 3,
          data.baselineSafety || 3,
          data.baselineSupport || 3,
          data.baselineCalm || 3
        ],
        backgroundColor: 'rgba(200, 125, 101, 0.15)',
        borderColor: '#C87D65',
        borderDash: [4, 4],
        pointBackgroundColor: '#C87D65',
        pointBorderColor: '#FFFFFF',
        pointRadius: 3
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: { family: 'Roboto, Manrope, sans-serif', size: 11, weight: '600' },
          color: '#2F3B32',
          boxWidth: 12
        }
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        borderColor: 'rgba(74, 93, 78, 0.20)',
        borderWidth: 1,
        titleColor: '#2F3B32',
        bodyColor: '#3F4A42',
        titleFont: { family: 'Roboto, Manrope, sans-serif', size: 12 },
        bodyFont: { family: 'Roboto, Manrope, sans-serif', size: 12 },
        padding: 8,
        cornerRadius: 6
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        ticks: { stepSize: 1, display: false },
        grid: { color: 'rgba(74, 93, 78, 0.10)' },
        angleLines: { color: 'rgba(74, 93, 78, 0.10)' },
        pointLabels: {
          font: { family: 'Roboto, Manrope, sans-serif', size: 12, weight: '600' },
          color: '#2F3B32'
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}

/**
 * RiskDistributionBar - Semantic risk distribution with clear safety contrasts
 */
export function RiskDistributionBar({ data }) {
  if (!data) return null;

  const chartData = {
    labels: ['Steady', 'Moderate', 'Elevated', 'Urgent'],
    datasets: [{
      label: 'Cases',
      data: [data.LOW || 0, data.MODERATE || 0, data.HIGH || 0, data.URGENT || 0],
      backgroundColor: ['#2E7D47', '#B45309', '#C87D65', '#C53030'],
      borderRadius: 6
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
      x: {
        beginAtZero: true,
        grid: { color: 'rgba(74, 93, 78, 0.10)' },
        ticks: { color: '#5F6B62', font: { family: 'Roboto, Manrope, sans-serif', size: 11 } }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#2F3B32', font: { family: 'Roboto, Manrope, sans-serif', size: 12, weight: '600' } }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}