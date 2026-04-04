import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLogin from './Pages/Bank/AdminLogin'
import ChangePassword from './Pages/Bank/ChangePassword'
import AdminHomePage from './Pages/Bank/AdminHomePage'
import AccountCreation from './Pages/Bank/AccountCreation'
import OTPverification from './Pages/Bank/OTPverification'
import AccountFinalized from './Pages/Bank/accountFinalized'
import SearchCustomer from './Pages/Bank/SearchCustomer'
import DepositMoney from './Pages/Bank/DepositMoney'
import WithdrawMoney from './Pages/Bank/WithdrawMoney'
import TransferMoney from './Pages/Bank/TransferMoney'
import TransactionHistory from './Pages/Bank/TransactionHistory'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminHomePage />} />
        <Route path="/accounts/create" element={<AccountCreation />} />
        <Route path="/customers/search" element={<SearchCustomer />} />
        <Route path="/accounts/verification" element={<OTPverification />} />
        <Route path="/accounts/finalized" element={<AccountFinalized />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/transactions/deposit" element={<DepositMoney />} />
        <Route path="/transactions/withdraw" element={<WithdrawMoney />} />
        <Route path="/transactions/transfer" element={<TransferMoney />} />
          <Route path="/transactions/history" element={<TransactionHistory />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App