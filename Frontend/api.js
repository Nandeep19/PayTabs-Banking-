const BASE_URL = 'http://localhost:8080'

export async function submitTransaction(payload) {
  const res = await fetch(`${BASE_URL}/api/system1/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.json()
}

export async function getCustomerBalance(cardNumber, pin) {
  const params = new URLSearchParams({ cardNumber, pin })
  const res = await fetch(`${BASE_URL}/api/customer/balance?${params.toString()}`)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'Unable to fetch balance')
  }
  return res.json()
}

export async function getAllTransactions() {
  const res = await fetch(`${BASE_URL}/api/admin/transactions`)
  return res.json()
}
