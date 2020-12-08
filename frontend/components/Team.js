import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'
import { Link } from 'react-router-dom'


const Team = (props) => {

  const [team, setTeam] = useState({})

  const id = props.match.params.id

  useEffect(() => {
    axios.get(`/api/team/${id}`)
      .then(resp => {
        const team = resp.data
        setTeam(team)
      })
  }, [id])


  return <div className="container-league-team">

    <div className="league-section">
      <Fade appear spy={id}>
        <div className="card-league text-center">
          
          <img className="card-img-top team-img" src={team.image} alt="Card image cap" />
          <div className="resfixbtn">
          </div>

          <div className="card-body">
            <h1 className="year"><strong>Founded: {team.year}</strong></h1>
            <h5 className="card-desc text-center"><strong>Stadium: {team.stadium}, {team.country}</strong></h5>
            <h5 className="card-desc">{team.description}</h5>
            <a href={`https://${team.website}`} target="_blank" className="card-website">TEAM WEBSITE</a>
          </div>

        </div>
      </Fade>
    </div>



  </div>

}

export default Team