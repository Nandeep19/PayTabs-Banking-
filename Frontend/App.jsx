import React, { useState } from 'react'
import CustomerDashboard from './components/CustomerDashboard'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [role, setRole] = useState('customer')

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>PayTabs Banking POC</h1>
        <p className="subtitle">Simplified banking with secure PIN hashing</p>
        <div className="role-switch">
          <button
            className={role === 'customer' ? 'active' : ''}
            onClick={() => setRole('customer')}
          >
            Customer
          </button>
          <button
            className={role === 'admin' ? 'active' : ''}
            onClick={() => setRole('admin')}
          >
            Super Admin
          </button>
        </div>
      </header>

      <main className="app-main">
        {role === 'customer' ? <CustomerDashboard /> : <AdminDashboard />}
      </main>
    </div>
  )
}

export default App
