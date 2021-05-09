import React from 'react'
import { getImage } from '../../utils'
import { Col } from 'react-bootstrap'
import { MdFileDownload } from 'react-icons/all';
import './style.scss'




const ThumbVideoComponent = ({image = '', title = '', handleClick = () => {}, handleClickDownload = null}) => {
  return (
    <Col className="col-12 col-md-4 thumb-video">
      <div onClick={handleClick} className="thumb-video-container" style={{backgroundImage: `url(${getImage(image)})`}} />
      <div onClick={handleClick} className="thumb-video-container-title">
        <p className="text-center">{title}</p>
      </div>
      {handleClickDownload !== null &&
          <div onClick={handleClickDownload} className="file-download">Baixar <MdFileDownload size={20} color="#1D9BF0"/></div>
        }
    </Col>
  )
}

export default ThumbVideoComponent
