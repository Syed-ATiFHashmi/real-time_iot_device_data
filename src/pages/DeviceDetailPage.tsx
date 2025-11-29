import React, { useState, useEffect } from 'react'
import { ArrowLeft, Battery, Wifi, MapPin, Calendar, Activity, Settings, Download } from 'lucide-react'
import { Device, SensorReading } from '../types/Device'
import DetailChart from '../components/DetailChart'

interface DeviceDetailPageProps {
  deviceId: string | null
  onBack: () => void
}

const DeviceDetailPage: React.FC<DeviceDetailPageProps> = ({ deviceId, onBack }) => {
  const [device, setDevice] = useState<Device | null>(null)
  const [historicalData, setHistoricalData] = useState<SensorReading[]>([])
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h')

  useEffect(() => {
    if (!deviceId) return

    // Mock device data - replace with actual API call
    const mockDevice: Device = {
      id: deviceId,
      name: 'Temperature Sensor A1',
      type: 'temperature',
      status: 'online',
      location: 'Building A - Floor 1 - Room 101',
      lastSeen: new Date(Date.now() - 2 * 60 * 1000),
      batteryLevel: 85,
      currentValue: 23.5,
      unit: '°C'
    }
    setDevice(mockDevice)

    // Generate mock historical data
    generateHistoricalData(timeRange)
  }, [deviceId, timeRange])

  const generateHistoricalData = (range: string) => {
    const data: SensorReading[] = []
    let points: number
    let interval: number

    switch (range) {
      case '1h':
        points = 60
        interval = 60 * 1000 // 1 minute
        break
      case '24h':
        points = 144
        interval = 10 * 60 * 1000 // 10 minutes
        break
      case '7d':
        points = 168
        interval = 60 * 60 * 1000 // 1 hour
        break
      case '30d':
        points = 720
        interval = 60 * 60 * 1000 // 1 hour
        break
      default:
        points = 144
        interval = 10 * 60 * 1000
    }

    const now = new Date()
    for (let i = points - 1; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * interval)
      const baseValue = 23
      const variation = Math.sin(i / 10) * 3 + Math.random() * 2 - 1
      const value = baseValue + variation
      data.push({ timestamp, value })
    }

    setHistoricalData(data)
  }

  if (!device) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-8 h-8 text-slate-400 animate-spin" />
          </div>
          <p className="text-slate-600">Loading device details...</p>
        </div>
      </div>
    )
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

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{device.name}</h1>
          <p className="text-slate-600">Device ID: {device.id}</p>
        </div>
      </div>

      {/* Device Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Status</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(device.status)}`}>
                <Wifi className="w-4 h-4 mr-1" />
                {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Battery Level</p>
              <div className="flex items-center mt-2">
                <Battery className={`w-5 h-5 mr-2 ${getBatteryColor(device.batteryLevel)}`} />
                <span className={`text-lg font-bold ${getBatteryColor(device.batteryLevel)}`}>
                  {device.batteryLevel}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Current Value</p>
              <p className="text-2xl font-bold text-slate-800 mt-2">
                {device.currentValue}{device.unit}
              </p>
            </div>
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Last Seen</p>
              <p className="text-sm text-slate-800 mt-2">
                {device.lastSeen.toLocaleString()}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Location Info */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex items-center space-x-3">
          <MapPin className="w-6 h-6 text-slate-600" />
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Location</h3>
            <p className="text-slate-600">{device.location}</p>
          </div>
        </div>
      </div>

      {/* Historical Data Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Historical Data</h3>
            <div className="flex items-center space-x-2">
              <div className="flex bg-slate-100 rounded-lg p-1">
                {['1h', '24h', '7d', '30d'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range as '1h' | '24h' | '7d' | '30d')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                      timeRange === range
                        ? 'bg-white text-slate-800 shadow-sm'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <DetailChart data={historicalData} unit={device.unit} timeRange={timeRange} />
        </div>
      </div>
    </div>
  )
}

export default DeviceDetailPage
