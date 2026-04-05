const BANK_URL = 'http://localhost:5000'

const getToken = () => localStorage.getItem('bank_token')

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
})

// ── ADMIN ──────────────────────────────────────────────
export const adminLogin = (password) =>
  fetch(`${BANK_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  }).then((r) => r.json())

export const adminChangePassword = (data) =>
  fetch(`${BANK_URL}/admin/change-password`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  }).then((r) => r.json())

// ── ACCOUNTS ───────────────────────────────────────────
export const sendOtp = (data) =>
  fetch(`${BANK_URL}/account/send-otp`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  }).then((r) => r.json())

export const createAccount = (data) =>
  fetch(`${BANK_URL}/account/create`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  }).then((r) => r.json())

// ── TRANSACTIONS ───────────────────────────────────────
export const depositMoney = (data) =>
  fetch(`${BANK_URL}/account/deposit`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  }).then((r) => r.json())

export const withdrawMoney = (data) =>
  fetch(`${BANK_URL}/account/withdraw`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  }).then((r) => r.json())

export const transferMoney = (data) =>
  fetch(`${BANK_URL}/account/transfer`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(data),
  }).then((r) => r.json())

// ── SEARCH ─────────────────────────────────────────────
export const searchProfile = (account_no) =>
  fetch(`${BANK_URL}/search/profile/${account_no}`, {
    headers: headers(),
  }).then((r) => r.json())

export const checkBalance = (account_no) =>
  fetch(`${BANK_URL}/search/balance/${account_no}`, {
    headers: headers(),
  }).then((r) => r.json())

export const getTransactions = (account_no) =>
  fetch(`${BANK_URL}/search/transactions/${account_no}`, {
    headers: headers(),
  }).then((r) => r.json())

export const deleteAccount = (account_no) =>
  fetch(`${BANK_URL}/search/delete/${account_no}`, {
    method: 'DELETE',
    headers: headers(),
  }).then((r) => r.json())
  