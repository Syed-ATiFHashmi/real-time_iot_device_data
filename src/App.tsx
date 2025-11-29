import React, { useState } from 'react'
import { Activity, Database, Settings, Wifi } from 'lucide-react'
import DevicesPage from './pages/DevicesPage'
import RealTimeDataPage from './pages/RealTimeDataPage'
import DeviceDetailPage from './pages/DeviceDetailPage'
import Sidebar from './components/Sidebar'

type Page = 'devices' | 'realtime' | 'device-detail'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('devices')
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null)

  const handleDeviceSelect = (deviceId: string) => {
    setSelectedDeviceId(deviceId)
    setCurrentPage('device-detail')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'devices':
        return <DevicesPage onDeviceSelect={handleDeviceSelect} />
      case 'realtime':
        return <RealTimeDataPage />
      case 'device-detail':
        return <DeviceDetailPage deviceId={selectedDeviceId} onBack={() => setCurrentPage('devices')} />
      default:
        return <DevicesPage onDeviceSelect={handleDeviceSelect} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-hidden">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
