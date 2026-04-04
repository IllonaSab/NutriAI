import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profil from './pages/Profil'
import ChangePassword from './pages/ChangePassword'
import Abonnement from './pages/Abonnement'
import Support from './pages/Support'

import { UserProvider } from './context/UserContext'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/abonnement" element={<Abonnement />} />
          <Route path="/support" element={<Support />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App