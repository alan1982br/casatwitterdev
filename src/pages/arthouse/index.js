import React, { useEffect } from 'react'
import { getImage } from '../../utils'
import './style.scss'

const ArtHousePage = () => {

  useEffect(() => {
    document.body.style.backgroundColor = "#1D9BF0";
    return () => document.body.style.backgroundColor = "#FFF";
  }, [])

  return (
    <div class="container-fluid arthouse vh-100" style={{backgroundImage: `url(${getImage('bg_Html_Index.jpg')})`}}>
      <div className="logo">
        <img src={getImage('LogoWhite.svg')} alt="Twitter" />
      </div>
      <div className="row content-container">
        <div className="offset-md-2 col-md-8 d-block video-container">
            <div style={{padding: '56.25% 0px 0px 0px', position: 'relative'}}>
              <iframe src="https://player.vimeo.com/video/548874971?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" 
                      frameborder="0" allow="autoplay; fullscreen; picture-in-picture" 
                      allowfullscreen 
                      style={{position:'absolute', top: '0', left:'0', width:'100%',height:'100%'}} title="Arthouse (Deborah Xavier)">
              </iframe>
              {/* <h1>Começa a partir do dia 18 de maio.</h1> */}
            </div>
        </div>
        <div className="col-12 col-md-2 image-container">
            <img className="destaque-image" src={getImage('txtHome.png')} alt="Tá acontecendo no Twitter" />
          </div>
      </div>
    </div>
  )
}

export default ArtHousePage
