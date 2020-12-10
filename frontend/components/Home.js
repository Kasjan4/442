import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapGL, { Marker, FlyToInterpolator } from 'react-map-gl'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'


const Home = () => {

  const arrow = <FontAwesomeIcon icon={faArrowsAltV} size="1x" />

  const [leagues, setLeague] = useState([])

  const [news, setNews] = useState([])


  const [viewPort, setViewPort] = useState({
    height: '100vh',
    width: '100vw',
    zoom: 1.5,
    latitude: 54.5260,
    longitude: 15.2551

  })

  useEffect(() => {
    axios.get('/api/leagues')
      .then(resp => {
        const leagues = resp.data
        setLeague(leagues)

      })
  }, [])

  useEffect(() => {
    axios.get('/api/news')
      .then(resp => {
        const articles = resp.data
        console.log(resp)
        setNews(articles)


      })
  }, [])




  function goToNorthAmerica() {
    const NorthAmericaViewport = {

      latitude: 16.05807270304161,
      longitude: -89.36906289136971,
      zoom: 2.2,
      height: '100vh',
      width: '100vw'
    }
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

    {!leagues && <div>
    </div>}

    <Fade>
      {news && <div className="container-news" >

        <h6 className="news-header" >Headlines {arrow}</h6>

        {news.map((article, index) => {

          return <div key={index} className="article">

            <img className="news-img" src={article.image} />
            <a href={article.url} target="_blank" rel="noreferrer"><p className="news-title" >{article.title}</p></a>


          </div>

        })}

      </div>}
    </Fade>

    {leagues && <MapGL

      mapboxApiAccessToken={'pk.eyJ1Ijoic2Vhbi1mZW5lbG9uIiwiYSI6ImNraGMxbHBvOTAycWUycm1wczNpemZ0MGsifQ.phMK4dt1j_7wvlbYTbLWxg'}
      mapStyle='mapbox://styles/kasjanhinc/cki93e734c41r19qu8nbtm8fa'
      transitionInterpolator={new FlyToInterpolator()}
      transitionDuration={1000}
      {...viewPort}
      onViewportChange={(viewPort) => setViewPort(viewPort)}
    >

      <div className="map-menu">
        <button type="button" className="btn-home" onClick={goToWorld}>WORLD</button>
        <button type="button" className="btn-home" onClick={goToEurope}>Europe</button>
        <button type="button" className="btn-home" onClick={goToNorthAmerica}>Americas</button>
        <button type="button" className="btn-home" onClick={goToAsia}>Asia</button>
      </div>


      {leagues.map((league, index) => {
        return <Link to={`/league/${league.id}`} key={index}>
          <Marker

            latitude={league.lat}
            longitude={league.lon}
          // offsetTop={-48}
          // offsetLeft={-24}
          >

            <img className="marker" src={league.badge} />
          </Marker>
        </Link>
      })}
    </MapGL>}
  </div >

}

export default Home