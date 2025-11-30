import React, { useState } from 'react'
import { submitTransaction, getCustomerBalance } from '../api'

function CustomerDashboard() {
  const [cardNumber, setCardNumber] = useState('4111111111111111')
  const [pin, setPin] = useState('1234')
  const [amount, setAmount] = useState('100')
  const [type, setType] = useState('topup')
  const [balance, setBalance] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await submitTransaction({
        cardNumber,
        pin,
        amount: Number(amount),
        type,
      })
      setResult(res)
      if (res.success) {
        setBalance(res.balance)
      }
    } catch (err) {
      setResult({ success: false, message: err.message })
    } finally {
      setLoading(false)
    }
  }

  const handleCheckBalance = async () => {
    setLoading(true)
    try {
      const bal = await getCustomerBalance(cardNumber, pin)
      setBalance(bal)
    } catch (err) {
      setResult({ success: false, message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card pastel-customer">
      <h2>Customer Portal</h2>
      <p className="hint">
        Use the demo card <strong>4111 1111 1111 1111</strong> with PIN <strong>1234</strong>
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Card Number</label>
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter card number"
          />
        </div>
        <div className="form-row">
          <label>PIN</label>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            type="password"
            placeholder="****"
          />
        </div>
        <div className="form-row">
          <label>Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min="1"
          />
        </div>
        <div className="form-row">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="topup">Top-up</option>
            <option value="withdraw">Withdraw</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Submit Transaction'}
          </button>
          <button type="button" onClick={handleCheckBalance} disabled={loading}>
            Check Balance
          </button>
        </div>
      </form>

      {balance !== null && (
        <div className="info-box">
          <strong>Current Balance:</strong> {balance}
        </div>
      )}

      {result && (
        <div className={`info-box ${result.success ? 'success' : 'error'}`}>
          <strong>{result.success ? 'Success' : 'Error'}:</strong> {result.message}
        </div>
      )}
    </section>
  )
}

export default CustomerDashboard
