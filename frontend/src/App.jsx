import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/NavbarComponent'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ProtectedRoute from './components/ProtectedRoute'
import { HomePage } from './pages/homePage'
import Dashboard from './components/UserDashboard'
import AdminDashboard from './components/adminDashboard'


function App() {

  return (
    <>
     <>
      <Navbar/>  {/* Navbar is included here so it  appears on all pages */} 
      <Routes>
         <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/dashboard' element = {<Dashboard />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="Admin">  {/* Admin-only access */}
              <AdminDashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
    </>
  )
}

export default App