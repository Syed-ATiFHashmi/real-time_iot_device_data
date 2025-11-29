import React from 'react'
import { SensorReading } from '../types/Device'

interface DetailChartProps {
  data: SensorReading[]
  unit: string
  timeRange: string
}

const DetailChart: React.FC<DetailChartProps> = ({ data, unit, timeRange }) => {
  if (data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center text-slate-500">
        <p>No data available for the selected time range</p>
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue || 1
  const avgValue = data.reduce((sum, d) => sum + d.value, 0) / data.length

  // Create SVG path
  const pathData = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((point.value - minValue) / range) * 100
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  // Create area path
  const areaData = `${pathData} L 100 100 L 0 100 Z`

  const formatTimeLabel = (timestamp: Date, range: string) => {
    switch (range) {
      case '1h':
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      case '24h':
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      case '7d':
        return timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' })
      case '30d':
        return timestamp.toLocaleDateString([], { month: 'short', day: 'numeric' })
      default:
        return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  return (
    <div className="h-96">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-slate-600">Current</p>
          <p className="text-lg font-bold text-blue-600">
            {data[data.length - 1]?.value.toFixed(1)} {unit}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600">Average</p>
          <p className="text-lg font-bold text-slate-800">
            {avgValue.toFixed(1)} {unit}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600">Range</p>
          <p className="text-lg font-bold text-slate-800">
            {minValue.toFixed(1)} - {maxValue.toFixed(1)} {unit}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 bg-gradient-to-b from-slate-50 to-white rounded-lg border border-slate-200 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
            </linearGradient>
            <pattern id="detailGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
            </pattern>
          </defs>
          
          <rect width="100" height="100" fill="url(#detailGrid)" />
          
          {/* Area fill */}
          <path
            d={areaData}
            fill="url(#areaGradient)"
          />
          
          {/* Average line */}
          <line
            x1="0"
            y1={100 - ((avgValue - minValue) / range) * 100}
            x2="100"
            y2={100 - ((avgValue - minValue) / range) * 100}
            stroke="#f59e0b"
            strokeWidth="1"
            strokeDasharray="5,5"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Data line */}
          <path
            d={pathData}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-2 top-2 text-xs text-slate-600 bg-white px-1 rounded">
          {maxValue.toFixed(1)}
        </div>
        <div className="absolute left-2 bottom-2 text-xs text-slate-600 bg-white px-1 rounded">
          {minValue.toFixed(1)}
        </div>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-yellow-600 bg-white px-1 rounded">
          Avg: {avgValue.toFixed(1)}
        </div>
      </div>
      
      {/* Time labels */}
      <div className="flex justify-between text-xs text-slate-500 mt-2">
        <span>{formatTimeLabel(data[0]?.timestamp, timeRange)}</span>
        <span>{formatTimeLabel(data[Math.floor(data.length / 2)]?.timestamp, timeRange)}</span>
        <span>{formatTimeLabel(data[data.length - 1]?.timestamp, timeRange)}</span>
      </div>
    </div>
  )
}

export default DetailChart
