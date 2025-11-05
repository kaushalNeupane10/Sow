import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../auth/auth'
import '../styles/login.css'

export default function Register(){
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await register(username, email, password)
      // after register navigate to login
      nav('/login')
    } catch (err) {
      setError('Registration failed')
      console.error(err)
    }
  }

  return (
    <div className="register-root">
      <div className="register-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Username<input value={username} onChange={e=>setUsername(e.target.value)} required/></label>
          <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" required/></label>
          <label>Password<input value={password} onChange={e=>setPassword(e.target.value)} type="password" required/></label>
          {error && <div className="login-error">{error}</div>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}
