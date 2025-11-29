import React from 'react'
import { Wifi, WifiOff, Battery, Thermometer, Droplets, Zap, Activity } from 'lucide-react'
import { Device } from '../types/Device'

interface DeviceCardProps {
  device: Device
  onClick: () => void
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onClick }) => {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return Thermometer
      case 'humidity':
        return Droplets
      case 'power':
        return Zap
      default:
        return Activity
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-100'
      case 'offline':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-slate-600 bg-slate-100'
    }
  }

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600'
    if (level > 20) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getLastSeenText = (lastSeen: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - lastSeen.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  }

  const Icon = getDeviceIcon(device.type)
  const StatusIcon = device.status === 'online' ? Wifi : WifiOff

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
              {device.name}
            </h3>
            <p className="text-sm text-slate-600">{device.type}</p>
          </div>
        </div>
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {device.status}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Location</span>
          <span className="text-sm font-medium text-slate-800">{device.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Current Value</span>
          <span className="text-sm font-bold text-slate-800">
            {device.currentValue}{device.unit}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Battery</span>
          <div className="flex items-center space-x-1">
            <Battery className={`w-4 h-4 ${getBatteryColor(device.batteryLevel)}`} />
            <span className={`text-sm font-medium ${getBatteryColor(device.batteryLevel)}`}>
              {device.batteryLevel}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">Last Seen</span>
          <span className="text-sm font-medium text-slate-800">
            {getLastSeenText(device.lastSeen)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default DeviceCard
