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
          <th className="table-top-columns">Club</th>
          <th className="table-top-columns">MP</th>
          <th className="table-top-columns">W</th>
          <th className="table-top-columns">D</th>
          <th className="table-top-columns">L</th>
          <th className="table-top-columns">GF</th>
          <th className="table-top-columns">GA</th>
          <th className="table-top-columns">GD</th>
          <th className="table-top-columns"><strong>PTS</strong></th>
        </tr>

        {table.map((team, index) => {
          return <tr className="last-table-item" key={index}>
            <th><strong><Link to={`/team/${team.teamid}`}>{team.name}</Link></strong></th>
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