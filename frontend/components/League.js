import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getUserId, isCreator } from '../lib/auth'

import Fade from 'react-reveal/Fade'



const League = (props) => {

  const id = props.match.params.id

  const [league, setLeague] = useState({})

  useEffect(() => {
    axios.get(`/api/league/${id}`)
      .then(resp => {
        const league = resp.data
        console.log(league)
        setLeague(league)

      })
  }, [id])

  const [teams, setTeams] = useState([])

  useEffect(() => {
    axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id=${id}`)
      .then(resp => {
        const teams = resp.data.teams
        setTeams(teams)

      })
  }, [id])

  return <div className="container-league-team">

    <div className="league-section">
      <Fade appear spy={id}>
        <div className="card-league text-center">
          <img className="card-img-top league-img" src={league.image} alt="Card image cap" />
          <div className="resfixbtn">
            <Link to={`/league/${id}/results`} className="btn btn-dark btn-resfix">Results</Link>
            <Link to={`/league/${id}/fixtures`} className="btn btn-dark btn-resfix">Fixtures</Link>
            <Link to={`/league/${id}/table`} className="btn btn-dark btn-resfix">League Table</Link>
          </div>
          <div className="card-body">
            <h1 className="year"><strong>Founded: {league.year}</strong></h1>
            <h5 className="card-desc text-center">Country: <strong>{league.country}</strong></h5>
            <h5 className="card-desc">{league.description}</h5>
            <a href={`https://${league.website}`} target="_blank" className="card-website">LEAGUE WEBSITE</a>

          </div>
        </div>
      </Fade>



      <div className="resultsfixtures">
        {teams.map((team, index) => {

          return <div key={index} className="card text-center card-transparent">
            <img className="card-img-top-league-teams text-center" src={team.strTeamBadge} alt="Card image cap" />
            <Link to={`/team/${team.idTeam}`} className="btn btn-dark btn-resfix btn-teams">View Club</Link>
          
          </div>

        })}
      </div>
    </div>

  </div>


}

export default League