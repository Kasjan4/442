import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getUserId, isCreator } from '../lib/auth'



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




  return <div className="container-custom">

    <div className="league-section">

      <div className="card-league text-center">
        <img className="card-img-top league-img" src={league.image} alt="Card image cap" />
        <div className="resfixbtn">
          <Link to={`/league/${id}/results`} className="btn btn-dark btn-resfix">Results</Link>
          <Link to={`/league/${id}/fixtures`} className="btn btn-dark btn-resfix">Fixtures</Link>
        </div>
        <div className="card-body">
          <h1 className="year"><strong>Founded: {league.year}</strong></h1>
          <h5 className="card-desc">{league.description}</h5>
          <a href={`https://${league.Website}`} target="_blank" className="card-website">LEAGUE WEBSITE</a>

        </div>
      </div>

    </div>
  </div>











}

export default League