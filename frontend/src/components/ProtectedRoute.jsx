import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getAccessToken, clearTokens } from '../../auth/auth.js'
import client from '../../api/api.js'

export default function ProtectedRoute({ children }){
  const [isLoading, setIsLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)


  useEffect(() =>{
    const verifyToken= async ()=> {
      const token = getAccessToken()
      if(!token) {
        setIsAuth(false)
        setIsLoading(false)
        return

      }

      try {
        await client.get('/profile/' ) 
        setIsAuth(true)
      } catch{
        clearTokens()
        setIsAuth(false)
      } finally {
        setIsLoading(false)

      }
    }


    verifyToken()
  },  [])

  if (isLoading) return <div>Loading...</div> 

  if (!isAuth) return <Navigate to="/login" replace />

  return children
}
