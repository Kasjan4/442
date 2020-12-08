import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getUserId, isCreator } from '../lib/auth'

import Fade from 'react-reveal/Fade'





const Table = (props) => {

  const id = props.match.params.id

  const [table, setTable] = useState([])
  const [dataReady, setDataReady] = useState(false)

  useEffect(() => {
    axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${id}&s=2020-2021`)
      .then(resp => {
        const table = resp.data.table
        setTable(table)
        setDataReady(true)

      })
  }, [id])


  return <div className="container-league-team">

    <div className="resfixinfo">
      <h1 className="tableheader">Current Standings</h1>
    </div>

    {!dataReady && <div>
      <h1>LOADING...</h1>
    </div>}

    <Fade>

      {dataReady && <table>
        <tr className="table-top">
          <th className="table-top-columns">Team</th>
          <th className="table-top-columns">Played</th>
          <th className="table-top-columns">Wins</th>
          <th className="table-top-columns">Draws</th>
          <th className="table-top-columns">Losses</th>
          <th className="table-top-columns">Goals<br />For</th>
          <th className="table-top-columns">Goals<br />Against</th>
          <th className="table-top-columns">Goals<br />Difference</th>
          <th className="table-top-columns"><strong>Points<br />Total</strong></th>
        </tr>

        {table.map((team, index) => {
          return <tr key={index}>
            <th><strong>{team.name}</strong></th>
            <th>{team.played}</th>
            <th>{team.win}</th>
            <th>{team.draw}</th>
            <th>{team.loss}</th>
            <th>{team.goalsfor}</th>
            <th>{team.goalsagainst}</th>
            <th>{team.goalsdifference}</th>
            <th><strong>{team.total}</strong></th>
          </tr>
        })}

      </table>}
    </Fade>


  </div>




}

export default Table