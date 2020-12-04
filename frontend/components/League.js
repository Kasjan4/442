import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getUserId, isCreator } from '../lib/auth'




const League = (props) => {

  const id = props.match.params.id

  const [league, setLeague] = useState([])

  useEffect(() => {
    axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${id}`)
      .then(resp => {
        const league = resp.data.leagues
        console.log(league)
        setLeague(league)

      })
  }, [])

  return <div className="container-custom">


    <div className="league-section">

      {league.map((league, index) => {

        return <div key={index} className="card-league text-center">
          <img className="card-img-top league-img" src={league.strLogo} alt="Card image cap" />
          <div className="resfixbtn">
            <Link to={`/league/${id}/results`} className="btn btn-dark btn-resfix">Results</Link>
            <Link to={`/league/${id}/fixtures`} className="btn btn-dark btn-resfix">Fixtures</Link>
          </div>
          <div className="card-body">
            <h1 className="year"><strong>Founded: {league.intFormedYear}</strong></h1>
            <h5 className="card-desc">{league.strDescriptionEN}</h5>
            <a className="card-website">{league.strWebsite}</a>




          </div>
        </div>

      })}
    </div>
  </div>











}

export default League