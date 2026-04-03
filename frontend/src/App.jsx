import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLogin from './Pages/Bank/AdminLogin'
import ChangePassword from './Pages/Bank/ChangePassword'
import AdminHomePage from './Pages/Bank/AdminHomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/adminDashboard" element={<AdminHomePage />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App