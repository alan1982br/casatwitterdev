import React from 'react'
import './styled.scss'
import { LogoHeader } from '../../assets'

const HeaderComponent = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={LogoHeader} alt="Twitter" />
      </div>
      <div className="menu">
        <p>Olá Fulano</p>
        <p>Sair</p>
      </div>
    </div>
  )
}

export default HeaderComponent
