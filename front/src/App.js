import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
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
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App