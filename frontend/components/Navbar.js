import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'


const Navbar = (props) => {

  const token = localStorage.getItem('token')
  if (token) {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))

    var finalId = parsedToken.sub
  }

  const football = <FontAwesomeIcon icon={faFutbol} size="2x" />


  const [searchTerm, setSearchTerm] = useState('')


  const leagues = [
    { id: 4328, name: 'Premier League' },
    { id: 4331, name: 'Bundesliga' },
    { id: 4335, name: 'La Liga' },
    { id: 4332, name: 'Seria A' },
    { id: 4334, name: 'Ligue 1' },
    { id: 4337, name: 'Eredivisie' },
    { id: 4346, name: 'MLS' },
    { id: 4344, name: 'Primeira Liga' },
    { id: 4359, name: 'Chinese Super League' },
    { id: 4330, name: 'Scottish Premier League' },
    { id: 4336, name: 'Superleague Greece' },
    { id: 4338, name: 'Belgian First Division A' },
    { id: 4339, name: 'Turkish Super Lig' },
    { id: 4351, name: 'Brazilian Serie A' },
    { id: 4355, name: 'Russian Football Premier League' },
    { id: 4347, name: 'Swedish Allsvenskan' },
    { id: 4350, name: 'Mexican Primera League' },
    { id: 4354, name: 'Ukrainian Premier League' },
    { id: 4358, name: 'Norwegian Eliteserien' }
  ]




  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/resort')
  }

  function closeSearch() {
    setSearchTerm('')
  }


  return <nav className="navbar navbar-expand-md navbar-dark nav-background fixed-top">

    <Link to="/" className="navbar-brand nav-brand">{football}</Link>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse text-right" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">



        <form className="form-inline my-2 my-lg-0 search-bar">
          <input className="form-control mr-sm-2"
            type="search"
            placeholder="Enter league"
            aria-label="Search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}
          />


        </form>

        <div className="search-results">
          {leagues.filter((val) => {
            if (searchTerm === '') {
              return ''
            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }

          }).map((val, key) => {
            return (

              <Link to={`/league/${val.id}`} key={key} onClick={closeSearch}>{val.name}</Link>

            )
          })}
        </div>




        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>

        {
          !localStorage.getItem('token') && <li className="nav-item">
            <Link to="/Login" className="nav-link">Login</Link>
          </li>
        }

        {
          !localStorage.getItem('token') && <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
        }

        {
          token && <li className="nav-item">
            <Link to={`/users/${finalId}`} className="nav-link">Account</Link>
          </li>
        }

        {
          localStorage.getItem('token') && <li className="nav-item">
            <Link to="/" className="nav-link nav-contact"
              onClick={handleLogout}
            >Logout</Link>
          </li>
        }


      </ul>
    </div>

  </nav >

}


export default withRouter(Navbar)