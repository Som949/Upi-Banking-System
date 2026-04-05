import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing      from "./pages/Landing";
import Register     from "./pages/Register";
import SetPin       from "./pages/SetPin";
import Login        from "./pages/Login";
import Dashboard    from "./pages/Dashboard";
import Transfer     from "./pages/Transfer";
import Balance      from "./pages/Balance";
import Transactions from "./pages/Transactions";
import Rewards      from "./pages/Rewards";
import Profile      from "./pages/Profile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1e293b",
              color: "#f1f5f9",
              border: "1px solid #334155",
            },
          }}
        />
        <Routes>
          {/* Public */}
          <Route path="/"          element={<Landing />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/set-pin"   element={<SetPin />} />
          <Route path="/login"     element={<Login />} />

          {/* Protected */}
          <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/transfer"     element={<ProtectedRoute><Transfer /></ProtectedRoute>} />
          <Route path="/balance"      element={<ProtectedRoute><Balance /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/rewards"      element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
          <Route path="/profile"      element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}