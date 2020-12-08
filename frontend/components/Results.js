import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'



const Results = (props) => {

  const id = props.match.params.id

  const [results, setResults] = useState([])
  const [dataReady, setDataReady] = useState()

  useEffect(() => {
    axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=${id}`)
      .then(resp => {
        const results = resp.data.events
        setResults(results)
        setDataReady(true)
      })
  }, [])

  return <div className="container-results-fixtures">

    <div className="resfixinfo">
      <h1 className="resfixheader">Previous Results</h1>
    </div>


    <Fade>
      {dataReady && <div className="resultsfixtures">

        {results.map((result, index) => {

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
      </div>}
    </Fade>



  </div >



}

export default Results