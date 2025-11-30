import React, { useEffect, useState } from 'react'
import { getAllTransactions } from '../api'

function AdminDashboard() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await getAllTransactions()
        setTransactions(data)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="card pastel-admin">
      <h2>Super Admin Monitor</h2>
      <p className="hint">
        View all transactions processed by System 1 &amp; System 2.
      </p>
      {loading && <p>Loading transactions...</p>}
      {!loading && transactions.length === 0 && <p>No transactions yet.</p>}
      {!loading && transactions.length > 0 && (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Card</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Message</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id.slice(0, 8)}</td>
                  <td>{tx.cardNumber}</td>
                  <td>{tx.type}</td>
                  <td>{tx.amount}</td>
                  <td>{tx.status}</td>
                  <td>{tx.message}</td>
                  <td>{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default AdminDashboard
