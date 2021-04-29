import React from 'react'
import { getImage } from '../../utils'
import { Col } from 'react-bootstrap'
import './style.scss'




const ThumbVideoComponent = ({image = '', title = '', handleClick = () => {}}) => {
  return (
    <Col className="col-12 col-md-4 thumb-video">
      <div onClick={handleClick} className="thumb-video-container" style={{backgroundImage: `url(${getImage(image)})`}} />
      <div onClick={handleClick} className="thumb-video-container-title">
        <p className="text-center">{title}</p>
      </div>
    </Col>
  )
}

export default ThumbVideoComponent
