import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



const MyTeam = (props) => {

  const [formData, updateFormData] = useState({})
  const [accountData, updateAccountData] = useState({})


  useEffect(() => {
    axios.get(`/api/users/${props.match.params.id}`)
      .then((resp) => {

        updateAccountData(resp.data)

      })
  }, [])

  return <div className="background">

    <div className="container container-custom">

      <h1>Team name</h1>

    </div>






  </div>

}

export default MyTeam

