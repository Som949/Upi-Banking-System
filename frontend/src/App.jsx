import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLogin from './Pages/Bank/AdminLogin'
import ChangePassword from './Pages/Bank/ChangePassword'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App