import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross, faFutbol } from '@fortawesome/free-solid-svg-icons'
import Bounce from 'react-reveal/Bounce'
import Fade from 'react-reveal/Fade'


const Navbar = (props) => {

  const token = localStorage.getItem('token')
  if (token) {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))

    var finalId = parsedToken.sub
  }

  const football = <FontAwesomeIcon icon={faFutbol} size="3x" />

  const [searchTerm, setSearchTerm] = useState('')

  const [searchData, setSearchData] = useState([])


  useEffect(() => {
    axios.get('/api/leagues')
      .then((resp) => {
        const leagues = resp.data

        setSearchData(leagues)

      })
  }, [])

  useEffect(() => {
    axios.get('/api/teams')
      .then((resp) => {
        const teams = resp.data

        let finalSearchData = [...searchData]

        for (let i = 0; i < teams.length; i++) {

          finalSearchData.push(teams[i])
        }
        setSearchData(searchData => searchData.concat(finalSearchData))

      })
  }, [])


  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/resort')
  }

  function closeSearch() {
    setSearchTerm('')

  }


  return <nav className="navbar navbar-expand-md navbar-dark nav-background fixed-top">

    <Bounce top><div className="ball">{football}</div></Bounce>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse text-right" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">


        <Fade>
          <form className="form-inline my-2 my-lg-0 search-bar">
            <input className="form-control mr-sm-2"
              type="search"
              placeholder="Search leagues/teams"
              aria-label="Search"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
              }}
            />
          </form>
        </Fade>

        <div className="search-results">

          {searchData.filter((val) => {
            if (searchTerm === '') {
              return ''
            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return val
            }

          }).map((val, key) => {

            if (val.id.toString().length < 5) {

              return <Link to={`/league/${val.id}`} key={key} onClick={closeSearch}>{val.name}</Link>

            } else if (val.id.toString().length > 5) {

              return <Link to={`/team/${val.id}`} key={key} onClick={closeSearch}>{val.name}</Link>
            }

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
            <Link to={`/users/${finalId}`} className="nav-link">My Team</Link>
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