import React, { useState, useEffect } from 'react'
import { Activity, Thermometer, Droplets, Zap, Wifi, RefreshCw } from 'lucide-react'
import RealTimeChart from '../components/RealTimeChart'
import { Device, SensorReading } from '../types/Device'

const RealTimeDataPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([])
  const [sensorData, setSensorData] = useState<{ [deviceId: string]: SensorReading[] }>({})
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock real-time data generation
  useEffect(() => {
    const mockDevices: Device[] = [
      {
        id: 'device-001',
        name: 'Temperature Sensor A1',
        type: 'temperature',
        status: 'online',
        location: 'Building A - Floor 1',
        lastSeen: new Date(),
        batteryLevel: 85,
        currentValue: 23.5,
        unit: '°C'
      },
      {
        id: 'device-002',
        name: 'Humidity Monitor B2',
        type: 'humidity',
        status: 'online',
        location: 'Building B - Floor 2',
        lastSeen: new Date(),
        batteryLevel: 92,
        currentValue: 65,
        unit: '%'
      },
      {
        id: 'device-004',
        name: 'Environmental Sensor D3',
        type: 'temperature',
        status: 'online',
        location: 'Building D - Floor 3',
        lastSeen: new Date(),
        batteryLevel: 78,
        currentValue: 21.8,
        unit: '°C'
      }
    ]
    setDevices(mockDevices.filter(d => d.status === 'online'))

    // Generate initial data
    const initialData: { [deviceId: string]: SensorReading[] } = {}
    mockDevices.forEach(device => {
      if (device.status === 'online') {
        initialData[device.id] = generateInitialData(device.type)
      }
    })
    setSensorData(initialData)
  }, [])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prevData => {
        const newData = { ...prevData }
        devices.forEach(device => {
          if (newData[device.id]) {
            const lastReading = newData[device.id][newData[device.id].length - 1]
            const newReading = generateNewReading(device.type, lastReading.value)
            newData[device.id] = [...newData[device.id].slice(-19), newReading]
          }
        })
        return newData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [devices])

  const generateInitialData = (type: string): SensorReading[] => {
    const data: SensorReading[] = []
    const now = new Date()
    
    for (let i = 19; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - i * 2000)
      let value: number
      
      switch (type) {
        case 'temperature':
          value = 20 + Math.random() * 10
          break
        case 'humidity':
          value = 50 + Math.random() * 30
          break
        case 'power':
          value = Math.random() * 100
          break
        default:
          value = Math.random() * 100
      }
      
      data.push({ timestamp, value })
    }
    
    return data
  }

  const generateNewReading = (type: string, lastValue: number): SensorReading => {
    let value: number
    const variation = 0.5 + Math.random() * 1.5
    
    switch (type) {
      case 'temperature':
        value = Math.max(15, Math.min(35, lastValue + (Math.random() - 0.5) * variation))
        break
      case 'humidity':
        value = Math.max(30, Math.min(90, lastValue + (Math.random() - 0.5) * variation * 2))
        break
      case 'power':
        value = Math.max(0, Math.min(150, lastValue + (Math.random() - 0.5) * variation * 5))
        break
      default:
        value = Math.max(0, Math.min(100, lastValue + (Math.random() - 0.5) * variation))
    }
    
    return { timestamp: new Date(), value }
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

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

  const getDeviceColor = (type: string) => {
    switch (type) {
      case 'temperature':
        return 'from-red-500 to-orange-500'
      case 'humidity':
        return 'from-blue-500 to-cyan-500'
      case 'power':
        return 'from-yellow-500 to-amber-500'
      default:
        return 'from-purple-500 to-pink-500'
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Real-time Data</h1>
          <p className="text-slate-600">Live sensor readings from your IoT devices</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Status Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-700">Live Data Stream</span>
            </div>
            <div className="text-sm text-slate-500">
              {devices.length} devices online
            </div>
          </div>
          <div className="text-sm text-slate-500">
            Updated every 2 seconds
          </div>
        </div>
      </div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {devices.map((device) => {
          const Icon = getDeviceIcon(device.type)
          const colorClass = getDeviceColor(device.type)
          const data = sensorData[device.id] || []
          const currentValue = data.length > 0 ? data[data.length - 1].value : 0

          return (
            <div key={device.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className={`bg-gradient-to-r ${colorClass} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{device.name}</h3>
                      <p className="text-sm opacity-90">{device.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {currentValue.toFixed(1)}{device.unit}
                    </div>
                    <div className="text-sm opacity-90 flex items-center">
                      <Wifi className="w-4 h-4 mr-1" />
                      Online
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <RealTimeChart data={data} color={device.type} unit={device.unit} />
              </div>
            </div>
          )
        })}
      </div>

      {devices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">No online devices</h3>
          <p className="text-slate-600">Connect your IoT devices to see real-time data</p>
        </div>
      )}
    </div>
  )
}

export default RealTimeDataPage
