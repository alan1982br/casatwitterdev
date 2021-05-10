import React, { useState, useEffect } from 'react'
import {
  AnimatePresence,
} from 'framer-motion';
import { useResize } from '../../hooks'
import { IoMenu } from 'react-icons/all' 
import './styled.scss'
import { ButtonLogout, MenuMobile, MenuHeader } from '..'
import { LogoHeader } from '../../assets'
import { useAuth } from "../../contexts/AuthContext"

const HeaderComponent = () => {
  const [openMenu, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const [ nome, setNome ] = useState();
  const { isTablet } = useResize();

  useEffect(() => {
    setNome(currentUser?.displayName || 'Fulano')
  }, [currentUser])

  useEffect(() => {
    if (!isTablet) setMenuOpen(false);
  }, [ isTablet ]);

  return (
    <div className="header">
      <AnimatePresence>
        {openMenu && (
          <MenuMobile user={nome} closeMenuMobile={setMenuOpen} />
        )}
      </AnimatePresence>
      <div className="logo-container">
        <img src={LogoHeader} alt="Twitter" />
      </div>
      <div className="menu">
        {!isTablet &&
          <>
            <MenuHeader />
            <div className="divisor" />
            <p style={{marginRight: '60px'}}>Olá, {' '}<b>{nome}</b>.</p>
            <ButtonLogout />
          </>
        }
        {isTablet && <IoMenu size={40} onClick={() => setMenuOpen(true)} style={{cursor: 'pointer'}} />}
      </div>
      
    </div>
  )
}

export default HeaderComponent
