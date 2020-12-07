import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



const MyTeam = (props) => {

  const [accountData, updateAccountData] = useState({})

  // const [teamId, setTeamId] = useState('')


  useEffect(() => {
    axios.get(`/api/users/${props.match.params.id}`)
      .then((resp) => {
        updateAccountData(resp.data)

      
      })
  }, [])


  // const [teamInfo, setTeamInfo] = useState({})

  // useEffect(() => {
  //   axios.get(`/api/team/133610`)
  //     .then((resp) => {
  //       const team = resp.data
  //       setTeamInfo(team)

  //     })
  // }, [teamId])



  // const [teamEvents, setTeamEvents] = useState([])

  // useEffect(() => {
  //   axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=133610`)
  //     .then((resp) => {

  //       const events = resp.data.events
  //       console.log(events)

  //       // setTeamEvents(teamEvents => teamEvents.concat(events))

  //       setTeamEvents(events)

  //     })
  // }, [teamId])




  // const [teamResults, setTeamResults] = useState()

  // useEffect(() => {
  //   axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventslast.php?id=133610`)
  //     .then(resp => {
  //       const results = resp.data.results
  //       setTeamResults(results)
      
  //     })
  // }, [accountData.team])

 

  return <div className="container-results-fixtures">

    <h1 className="username">{accountData.username}</h1>

    <div className="myteaminfo">
      {/* <img className="myteamimg" src={teamInfo.strTeamBanner} /> */}
      <h1 className="myteamheader">Upcoming Fixtures</h1>
    </div>



    <div className="resultsfixtures">

      {/* {teamEvents.map((result, index) => {

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

      })} */}


      <div className="myteamprev">
        <h1 className="myteamprevheader text-center">Previous<br />Results</h1>
      </div>

      {/* {teamResults.map((result, index) => {

        return <div key={index} className="card text-center">
          <img className="card-img-top" src={result.strThumb} alt="Card image cap" />
          <div className="card-body">
            <h1 className="score"><strong>{result.intHomeScore} - {result.intAwayScore}</strong></h1>
            <h4 className="card-text-venue"><strong>{result.strVenue}</strong></h4>
            <h5 className="card-round">Round {result.intRound}</h5>
            <h5 className="card-round">{result.strStatus}</h5>


          </div>
        </div>

      })} */}


    </div>


  </div>


}

export default MyTeam

