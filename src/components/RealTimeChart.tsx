import React from 'react'
import { SensorReading } from '../types/Device'

interface RealTimeChartProps {
  data: SensorReading[]
  color: string
  unit: string
}

const RealTimeChart: React.FC<RealTimeChartProps> = ({ data, color, unit }) => {
  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500">
        <p>No data available</p>
      </div>
    )
  }

  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue || 1

  const getStrokeColor = (type: string) => {
    switch (type) {
      case 'temperature':
        return '#ef4444'
      case 'humidity':
        return '#3b82f6'
      case 'power':
        return '#f59e0b'
      default:
        return '#8b5cf6'
    }
  }

  const strokeColor = getStrokeColor(color)

  // Create SVG path
  const pathData = data.map((point, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((point.value - minValue) / range) * 100
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  return (
    <div className="h-64">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-slate-600">
          Last 20 readings
        </div>
        <div className="text-sm text-slate-600">
          Range: {minValue.toFixed(1)} - {maxValue.toFixed(1)} {unit}
        </div>
      </div>
      
      <div className="relative h-48 bg-slate-50 rounded-lg overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          
          {/* Data line */}
          <path
            d={pathData}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          
          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - ((point.value - minValue) / range) * 100
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1.5"
                fill={strokeColor}
                vectorEffect="non-scaling-stroke"
              />
            )
          })}
        </svg>
        
        {/* Current value indicator */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-medium">
          {data[data.length - 1]?.value.toFixed(1)} {unit}
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-slate-500 mt-2">
        <span>{data[0]?.timestamp.toLocaleTimeString()}</span>
        <span>{data[data.length - 1]?.timestamp.toLocaleTimeString()}</span>
      </div>
    </div>
  )
}

export default RealTimeChart
