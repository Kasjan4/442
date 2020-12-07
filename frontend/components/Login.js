import React, { useState } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'
import { Link } from 'react-router-dom'


const Login = (props) => {

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, updateErrors] = useState({
    message: ''
  })

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    updateFormData(data)

  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/login', formData)
      .then(resp => {

        localStorage.setItem('token', resp.data.token)
        props.history.push('/')

      })
  }


  return <div className="background">

    <Fade>
      <div className="container-login-register">

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <input
              className="form-control"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              required
            />

          </div>

          <div className="form-group">

            <input
              className="form-control"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              required
            />

          </div>

          {errors.message && <p id="error" style={{ color: 'red' }}>
            {errors.message}
          </p>}

          <button className="btn btn-dark">Login</button>

        </form>

        <Link to="/register" className="loginques">Don&prime;t have an account? Register here</Link>

      </div>
    </Fade>
  </div>

}

export default Login