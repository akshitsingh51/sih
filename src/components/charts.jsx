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
 * DistressTrendChart - Dark Blue-Teal minimalist trend line
 */
export function DistressTrendChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#C1D1D4', fontSize: '0.88rem' }}>
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
        borderColor: '#267F8C',
        backgroundColor: 'rgba(38, 127, 140, 0.16)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#3195A3',
        pointBorderColor: '#0A2027',
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
        backgroundColor: '#0A2027',
        borderColor: '#1D3C45',
        borderWidth: 1,
        titleColor: '#F2F7F7',
        bodyColor: '#C1D1D4',
        titleFont: { family: 'Manrope', size: 12, weight: '700' },
        bodyFont: { family: 'Manrope', size: 13, weight: '600' },
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
          color: '#C1D1D4',
          font: { family: 'Manrope', size: 11 }
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: '#142F37' },
        ticks: {
          stepSize: 25,
          color: '#C1D1D4',
          font: { family: 'Manrope', size: 11 },
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
 * WellbeingRadarChart - Blue-Teal & Warm Accent multi-dimensional radar
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
        backgroundColor: 'rgba(38, 127, 140, 0.25)',
        borderColor: '#267F8C',
        pointBackgroundColor: '#3195A3',
        pointBorderColor: '#0A2027',
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
        backgroundColor: 'rgba(214, 154, 114, 0.15)',
        borderColor: '#D69A72',
        borderDash: [4, 4],
        pointBackgroundColor: '#D69A72',
        pointBorderColor: '#0A2027',
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
          font: { family: 'Manrope', size: 11, weight: '600' },
          color: '#F2F7F7',
          boxWidth: 12
        }
      },
      tooltip: {
        backgroundColor: '#0A2027',
        borderColor: '#1D3C45',
        borderWidth: 1,
        titleColor: '#F2F7F7',
        bodyColor: '#C1D1D4',
        titleFont: { family: 'Manrope', size: 12 },
        bodyFont: { family: 'Manrope', size: 12 },
        padding: 8,
        cornerRadius: 6
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 5,
        ticks: { stepSize: 1, display: false },
        grid: { color: '#142F37' },
        angleLines: { color: '#142F37' },
        pointLabels: {
          font: { family: 'Manrope', size: 12, weight: '600' },
          color: '#F2F7F7'
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
 * RiskDistributionBar - Blue-Teal semantic distribution
 */
export function RiskDistributionBar({ data }) {
  if (!data) return null;

  const chartData = {
    labels: ['Steady', 'Moderate', 'Elevated', 'Urgent'],
    datasets: [{
      label: 'Cases',
      data: [data.LOW || 0, data.MODERATE || 0, data.HIGH || 0, data.URGENT || 0],
      backgroundColor: ['#72B886', '#E5A84B', '#D69A72', '#E87A70'],
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
        grid: { color: '#142F37' },
        ticks: { color: '#C1D1D4', font: { family: 'Manrope', size: 11 } }
      },
      y: {
        grid: { display: false },
        ticks: { color: '#F2F7F7', font: { family: 'Manrope', size: 12, weight: '600' } }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}