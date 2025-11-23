import { useState } from 'react'
import '../styles/Login.css'

function Login({ onLogin }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onLogin(name)
      setError('')
    } else {
      setError('Please enter your name')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Expenzo</h1>
        <p className="login-subtitle">Track Your Expenses Smartly</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Enter Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sachin"
              className="input-field"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="login-features">
          <p>Track your income and expenses</p>
          <p>Get instant insights</p>
          <p>Smart financial management</p>
        </div>
      </div>
    </div>
  )
}

export default Login