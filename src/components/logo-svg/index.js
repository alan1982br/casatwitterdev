import React from 'react'
import { LogoBlue as LogoTwitter } from '../../assets'
import './style.scss'

const LogoComponent = () => {
  return (
    <div className="logo-container">
      <img src={LogoTwitter} alt="Twitter" className="logo-svg" />
    </div>
  )
}

export default LogoComponent
