import React, { useState, useEffect } from 'react'
import { Search, Plus, Wifi, WifiOff, Battery, Thermometer, Droplets, Zap } from 'lucide-react'
import DeviceCard from '../components/DeviceCard'
import { Device } from '../types/Device'

interface DevicesPageProps {
  onDeviceSelect: (deviceId: string) => void
}

const DevicesPage: React.FC<DevicesPageProps> = ({ onDeviceSelect }) => {
  const [devices, setDevices] = useState<Device[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline'>('all')

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockDevices: Device[] = [
      {
        id: 'device-001',
        name: 'Temperature Sensor A1',
        type: 'temperature',
        status: 'online',
        location: 'Building A - Floor 1',
        lastSeen: new Date(Date.now() - 5 * 60 * 1000),
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
        lastSeen: new Date(Date.now() - 2 * 60 * 1000),
        batteryLevel: 92,
        currentValue: 65,
        unit: '%'
      },
      {
        id: 'device-003',
        name: 'Power Meter C1',
        type: 'power',
        status: 'offline',
        location: 'Building C - Basement',
        lastSeen: new Date(Date.now() - 45 * 60 * 1000),
        batteryLevel: 12,
        currentValue: 0,
        unit: 'kW'
      },
      {
        id: 'device-004',
        name: 'Environmental Sensor D3',
        type: 'temperature',
        status: 'online',
        location: 'Building D - Floor 3',
        lastSeen: new Date(Date.now() - 1 * 60 * 1000),
        batteryLevel: 78,
        currentValue: 21.8,
        unit: '°C'
      }
    ]
    setDevices(mockDevices)
  }, [])

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || device.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const onlineDevices = devices.filter(d => d.status === 'online').length
  const offlineDevices = devices.filter(d => d.status === 'offline').length

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Device Management</h1>
        <p className="text-slate-600">Monitor and manage your IoT devices</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Devices</p>
              <p className="text-2xl font-bold text-slate-800">{devices.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Wifi className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Online</p>
              <p className="text-2xl font-bold text-green-600">{onlineDevices}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Wifi className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Offline</p>
              <p className="text-2xl font-bold text-red-600">{offlineDevices}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <WifiOff className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg Battery</p>
              <p className="text-2xl font-bold text-slate-800">
                {Math.round(devices.reduce((acc, d) => acc + d.batteryLevel, 0) / devices.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Battery className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search devices by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'online', 'offline'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as 'all' | 'online' | 'offline')}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  filterStatus === status
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onClick={() => onDeviceSelect(device.id)}
          />
        ))}
      </div>

      {filteredDevices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-800 mb-2">No devices found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default DevicesPage
