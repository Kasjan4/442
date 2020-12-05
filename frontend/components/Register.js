import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'



const Register = (props) => {


  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    league: 4328,
    team: 133604
  })

  const [teams, setTeams] = useState([])


  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    league: 0,
    team: 0

  })

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

  function handleChange(event) {

    const name = event.target.name

    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    const newErrors = {
      ...errors,
      [name]: ''
    }

    updateFormData(data)
    updateErrors(newErrors)
  }

  useEffect(() => {
    axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=${formData.league}`)
      .then(resp => {
        const teams = resp.data.teams
        setTeams(teams)
        console.log(teams)
      })
  }, [formData])


  const [teamImage, setTeamImage] = useState('')

  useEffect(() => {
    axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${formData.team}`)
      .then(resp => {
        const team = resp.data.teams
        const image = team[0].strTeamBadge
        setTeamImage(image)
        console.log(team)
      })
  }, [formData])

  const [leagueImage, setLeagueImage] = useState('')


  useEffect(() => {
    axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${formData.league}`)
      .then(resp => {
        const league = resp.data.leagues
        const image = league[0].strBadge
        setLeagueImage(image)
        console.log(league)
      })
  }, [formData])





  function handleSubmit(event) {

    event.preventDefault()

    axios.post('/api/register', formData)
      .then(resp => {

        if (resp.data.errors) {
          updateErrors(resp.data.errors)
        } else {
          props.history.push('/login')
        }
      })

  }



  return <div className="background">
    <Fade>
      <div className="container-login-register ">

        <Slide right appear spy={formData.team} duration={500}>
          <img className="regteambadge" src={teamImage}></img>
        </Slide>

        <Slide left appear spy={formData.league} duration={500}>
          <img className="regleaguebadge" src={leagueImage}></img>
        </Slide>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="Username"
              type="text"
              onChange={handleChange}
              value={formData.username}
              name="username"
              required
            />
            {errors.username && <p id="error" style={{ color: 'red' }}>
              {`There was a problem with your ${errors.username.path}`}
            </p>}
          </div>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="Email"
              type="text"
              onChange={handleChange}
              value={formData.email}
              name="email"
              required
            />
            {errors.email && <p id="error" style={{ color: 'red' }}>
              {`There was a problem with your ${errors.email.path}`}
            </p>}
          </div>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="Password"
              type="Password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              required
            />
            {errors.password && <p id="error" style={{ color: 'red' }}>
              {`There was a problem with your ${errors.password.path}`}
            </p>}
          </div>

          <div className="form-group">
            <input
              className="form-control"
              placeholder="Confirm Password"
              type="password"
              onChange={handleChange}
              value={formData.passwordConfirmation}
              name="passwordConfirmation"
              required
            />
            {errors.passwordConfirmation && <p id="error" style={{ color: 'red' }}>
              {'Does not match password'}
            </p>}
          </div>

          <p className="regyourteam">YOUR TEAM</p>

          <div className="form-group">
            <select
              className="form-control"
              placeholder="League"
              type="league"
              onChange={handleChange}
              value={formData.league}
              name="league"
              required

            >
              {leagues.map((league, index) => {
                return <option key={index} value={league.id}>{league.name}</option>
              })}

            </select>




            <div className="form-group">
              <select
                className="form-control"
                placeholder="team"
                type="team"
                onChange={handleChange}
                value={formData.team}
                name="team"
                required

              >


                {teams.map((team, index) => {
                  return <option key={index} value={team.idTeam}>{team.strTeam}</option>
                })}

              </select>


            </div>


            {errors.passwordConfirmation && <p id="error" style={{ color: 'red' }}>
              {'Does not match password'}
            </p>}
          </div>





          <button className="btn btn-dark">Submit</button>

        </form>

      </div>
    </Fade>
  </div>

}

export default Register