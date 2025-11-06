import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../auth/auth.js'
import '../styles/login.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const BG = 'https://storage.123fakturera.se/public/wallpapers/sverige43.jpg'
const LOGO = 'https://storage.123fakturera.se/public/icons/diamond.png'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      nav('/dashboard')
    } catch (err) {
      setError('Login failed. Check credentials.')
      console.error(err)
    }
  }

  return (
    <div className="container" style={{ backgroundImage: `url(${BG})` }}>
      <Navbar />
      <div className="overlay" />
      <div className="content">
        <div className="card">
          <h1 className="title">Log in</h1>

          <form onSubmit={handleSubmit} className="form">
            <label>
              Enter your email address
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Enter your password
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </label>

            {error && <div className="error">{error}</div>}

            <button className="loginbtn" type="submit">
              Log in
            </button>
          </form>

          <div className="footer-link">
            <Link to="/register">Register</Link>
            <Link to="/forgot">Forgot password?</Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
