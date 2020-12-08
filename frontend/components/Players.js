import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'
import { Link } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas, fab)


const Players = (props) => {

  const [currentPlayer, setCurrentPlayer] = useState({})

  const [searchTerm, setSearchTerm] = useState('messi')

  const [dataReady, setDataReady] = useState(1)


  useEffect(() => {
    axios.get(`/api/player/${searchTerm}`)
      .then((resp) => {
        const player = resp.data
        setCurrentPlayer(player)
        console.log(player)
      })
  }, [dataReady])



  function handleSubmit(event) {

    event.preventDefault()

    setDataReady(dataReady + 1)
    console.log('sefsdf')

  }

  return <div className="background">

    <div className="container-login-register">

      <Fade>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2"
            type="search"
            placeholder="Player name"
            aria-label="Search"
            onChange={(event) => {
              setSearchTerm(event.target.value)
            }}
          />

          <button className="btn btn-dark" onClick={handleSubmit}>Find Player</button>
        </form>
      </Fade>



      {currentPlayer && <div>

        <Fade appear spy={currentPlayer}>
          <img className="player-image" src={currentPlayer.image} />
        </Fade>

        <Fade appear spy={currentPlayer}>
          <div className="player-desc">
            <a href={`https://${currentPlayer.instagram}`} target="_blank" ><FontAwesomeIcon className="player-insta" icon={['fab', 'instagram']} /></a>
            
            <Link to={`/team/${currentPlayer.team_id}`} className="btn btn-dark btn-resfix btn-teams btn-player">View Club</Link>
            <h1 className="player-name">{currentPlayer.player_name}</h1><br />
            <p className="player-nat" >Nation: <strong>{currentPlayer.nationality}</strong></p><br /><p className="player-nat" >Club: <strong>{currentPlayer.team_name}</strong></p><br />
            {currentPlayer.description}
          </div>
        </Fade>

      </div>}

    </div>
  </div>

}

export default Players