import React, { useState, useEffect } from 'react'
import './styled.scss'
import { ButtonLogout } from '..'
import { LogoHeader } from '../../assets'
import { useAuth } from "../../contexts/AuthContext"

const HeaderComponent = () => {

  const { currentUser } = useAuth();
  const [ nome, setNome ] = useState();

  useEffect(() => {
    setNome(currentUser?.displayName || 'Fulano')
  }, [currentUser])

  return (
    <div className="header">
      <div className="logo-container">
        <img src={LogoHeader} alt="Twitter" />
      </div>
      <div className="menu">
        <p>Olá {nome}</p>
        <ButtonLogout />
      </div>
    </div>
  )
}

export default HeaderComponent
