import React from 'react'
import { LogoTwitter } from '../../assets'
import './style.scss'

const LogoComponent = () => {
  return (
    <div className="logo-container">
      <img src={LogoTwitter} alt="Twitter" />
    </div>
  )
}

export default LogoComponent
