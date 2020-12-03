import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapGL, { Marker, LinearInterpolator, FlyToInterpolator } from 'react-map-gl'
import { Link } from 'react-router-dom'


const Home = () => {

  const [resorts, updateResorts] = useState([])
  

  const [viewPort, setViewPort] = useState({
    height: '100vh',
    width: '100vw',
    zoom: 1.5,
    latitude: 54.5260,
    longitude: 15.2551

  })



  useEffect(() => {
    axios.get('/api/resorts')
      .then(resp => {
        updateResorts(resp.data)
      })
  }, [])

  function goToNorthAmerica() {
    const NorthAmericaViewport = {

      latitude: 37,
      longitude: -102,
      zoom: 3,

      height: '100vh',
      width: '100vw'
    }
    console.log(NorthAmericaViewport.longitude)
    setViewPort(NorthAmericaViewport)
  }
  function goToWorld() {
    const WorldViewport = {
      latitude: 54.5260,
      longitude: 15.2551,
      zoom: 1.5,
      height: '100vh',
      width: '100vw'
    }
    setViewPort(WorldViewport)
  }
  function goToEurope() {
    const WorldViewport = {
      latitude: 49.02624375273902,
      longitude: 10.449880969547975,
      zoom: 4,
      height: '100vh',
      width: '100vw'
    }
    setViewPort(WorldViewport)
  }


  function goToAsia() {
    const AsiaViewport = {
      latitude: 32.74536366056577,
      longitude: 108.43016171669143,
      zoom: 3,
      height: '100vh',
      width: '100vw'
    }
    setViewPort(AsiaViewport)
  }



  return <div>

    <MapGL

      mapboxApiAccessToken={'pk.eyJ1Ijoic2Vhbi1mZW5lbG9uIiwiYSI6ImNraGMxbHBvOTAycWUycm1wczNpemZ0MGsifQ.phMK4dt1j_7wvlbYTbLWxg'}
      mapStyle='mapbox://styles/kasjanhinc/cki93e734c41r19qu8nbtm8fa'
      {...viewPort}
      onViewportChange={(viewPort) => setViewPort(viewPort)}
    >

      <div className="map-menu">
        <button type="button" className="btn btn-dark" onClick={goToWorld}>WORLD</button>
        <button type="button" className="btn btn-dark" onClick={goToEurope}>Europe</button>
        <button type="button" className="btn btn-dark" onClick={goToNorthAmerica}>North America</button>
        <button type="button" className="btn btn-dark" onClick={goToAsia}>Asia</button>
      </div>


      {resorts.map((resort, index) => {
        return <Link to={`/resorts/${resort.name}`} key={index}>
          <Marker
            latitude={resort.lat}
            longitude={resort.lon}
          >
            <img className="marker" src="https://img.icons8.com/material/24/000000/marker--v1.png" />
          </Marker>
        </Link>
      })}
    </MapGL>
  </div >

}

export default Home