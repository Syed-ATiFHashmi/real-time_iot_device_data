export interface Device {
  id: string
  name: string
  type: 'temperature' | 'humidity' | 'power' | 'pressure' | 'light' | 'motion'
  status: 'online' | 'offline' | 'maintenance'
  location: string
  lastSeen: Date
  batteryLevel: number
  currentValue: number
  unit: string
}

export interface SensorReading {
  timestamp: Date
  value: number
}
