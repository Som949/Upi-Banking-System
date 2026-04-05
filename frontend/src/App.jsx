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

import UPIHome from './Pages/UPI/UPIHome'
import UPILogin from './Pages/UPI/UPILogin'
import UPIRegister from './Pages/UPI/UPIRegister'
import UPISetPin from './Pages/UPI/UPISetPin'
import UPIDashboard from './Pages/UPI/UPIDashboard'
import UPISendMoney from './Pages/UPI/UPISendMoney'
import UPITransConfirm from './Pages/UPI/UPITransConfirm'
import UPIConfirmation from './Pages/UPI/UPIConfirmation'
import UPICheckBalance from './Pages/UPI/UPICheckBalance'
import UPICheckBalanceResult from './Pages/UPI/UPICheckBalanceResult'
import UPITransactionHistory from './Pages/UPI/UPITransactionHistory'
import UPIRewards from './Pages/UPI/UPIRewards'
import UPIProfile from './Pages/UPI/UPIProfile'

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

        <Route path="/upi" element={<UPIHome />} />
        <Route path="/upi/login" element={<UPILogin />} />
        <Route path="/upi/register" element={<UPIRegister />} />
        <Route path="/upi/set-pin" element={<UPISetPin />} />
        <Route path="/upi/dashboard" element={<UPIDashboard />} />
        <Route path="/upi/send-money" element={<UPISendMoney />} />
        <Route path="/upi/pin" element={<UPITransConfirm />} />
        <Route path="/upi/confirm" element={<UPIConfirmation />} />
        <Route path="/upi/check-balance" element={<UPICheckBalance />} />
        <Route path="/upi/check-balance-result" element={<UPICheckBalanceResult />} />
        <Route path="/upi/transactions" element={<UPITransactionHistory />} />
        <Route path="/upi/rewards" element={<UPIRewards />} />
        <Route path="/upi/profile" element={<UPIProfile />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App