import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { getAccessToken, getRefreshToken, setTokens, clearTokens, isAuthenticated } from '../auth/auth.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAutoRefresh from '../auth/useAutoRefresh.js'
import Terms from './pages/Terms.jsx'

export default function App(){
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  useAutoRefresh();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const refresh = getRefreshToken();

      if (refresh && !isAuthenticated()){
        try {
          const resp = await fetch(`${import.meta.env.VITE_API}/api/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
          });

          if(!resp.ok) throw new Error("Refresh token invalid");

          const data= await resp.json();
          setTokens({ access: data.access, refresh: data.refresh || refresh });
        } catch (err){
          console.warn("Auto-refresh failed:", err);
          clearTokens();
        }
      }

      setAuthChecked(true);
      setLoading(false);
    };
    checkAndRefreshToken();
  }, [] );

  if (loading) return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;

  return (
    <>
    <Routes>
      <Route path="/" element={loading ? (<div>loading...</div>) :authChecked && isAuthenticated() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path='/terms' element={<Terms />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </>
  )
}
