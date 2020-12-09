import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'

const MyTeam = (props) => {

  const [accountData, updateAccountData] = useState({})

  const [teamResults, setTeamResults] = useState([])

  const [teamEvents, setTeamEvents] = useState([])

  const [teamInfo, setTeamInfo] = useState({})


  useEffect(() => {
    axios.get(`/api/users/${props.match.params.id}`)
      .then((resp) => {
        updateAccountData(resp.data)
        console.log(resp.data.team)
        const team = resp.data.team
        getTeam(team)
        console.log(resp.data)
      })
  }, [])

  const getTeam = (team) => {
    axios.get(`/api/team/${team}`)
      .then((resp) => {
        setTeamInfo(resp.data)
        console.log(resp.data)
      })

    axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=${team}`)
      .then((resp) => {
        const events = resp.data.events
        console.log(events)
        setTeamEvents(events)

      })

    axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=${team}`)
      .then((resp) => {

        const results = resp.data.results
        console.log(results)
        setTeamResults(results)

      })
  }


  return <div className="container-my-team">

    <Fade>
      <h1 className="username">{accountData.username}</h1>

      <div className="myteaminfo">
        <img className="myteamimg" src={teamInfo.banner} />
        <h1 className="myteamheader">Upcoming Fixtures</h1>
      </div>
    </Fade>


    <div className="resultsfixtures">

      {teamEvents.map((result, index) => {

        return <div key={index} className="card text-center">
          <img className="card-img-top" src={result.strThumb} alt="Card image cap" />
          <div className="card-body">
            <h1 className="date"><strong>{result.dateEvent}</strong></h1>
            <h5 className="card-time">{result.strTime}</h5>
            <h4 className="card-text-venue"><strong>{result.strVenue}</strong></h4>
            <h5 className="card-round">Round {result.intRound}</h5>
            <h5 className="card-round">{result.strStatus}</h5>


          </div>
        </div>

      })}


      <div className="myteamprev">
        <h1 className="myteamprevheader text-center">Previous<br />Results</h1>
      </div>

      {teamResults.map((result, index) => {

        return <div key={index} className="card text-center">
          <img className="card-img-top" src={result.strThumb} alt="Card image cap" />
          <div className="card-body">
            <h1 className="score"><strong>{result.intHomeScore} - {result.intAwayScore}</strong></h1>
            <h4 className="card-text-venue"><strong>{result.strVenue}</strong></h4>
            <h5 className="card-round">Round {result.intRound}</h5>
            <h5 className="card-round">{result.strStatus}</h5>


          </div>
        </div>

      })}


    </div>


  </div>


}

export default MyTeam

