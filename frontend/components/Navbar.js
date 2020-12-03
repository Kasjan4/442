import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'


const Navbar = (props) => {

  const token = localStorage.getItem('token')
  if (token) {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))

    var finalId = parsedToken.sub
  }

  const football = <FontAwesomeIcon icon={faFutbol} size="2x" />

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/resort')
  }

  return <nav className="navbar navbar-expand-md navbar-dark nav-background fixed-top">

    <Link to="/" className="navbar-brand nav-brand">{football}</Link>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse text-right" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">



        <form className="form-inline my-2 my-lg-0 search-bar">
          <input className="form-control mr-sm-2" type="search" placeholder="Enter league or team" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>




        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>

        {!localStorage.getItem('token') && <li className="nav-item">
          <Link to="/Login" className="nav-link">Login</Link>
        </li>}

        {!localStorage.getItem('token') && <li className="nav-item">
          <Link to="/register" className="nav-link">Register</Link>
        </li>}

        {token && <li className="nav-item">
          <Link to={`/users/${finalId}`} className="nav-link">Account</Link>
        </li>}

        {localStorage.getItem('token') && <li className="nav-item">
          <Link to="/" className="nav-link nav-contact"
            onClick={handleLogout}
          >Logout</Link>
        </li>}


      </ul>
    </div>

  </nav>

}


export default withRouter(Navbar)