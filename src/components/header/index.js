import React, { useState, useEffect } from 'react'
import {
  AnimatePresence,
} from 'framer-motion';
import { useResize } from '../../hooks'
import { IoMenu } from 'react-icons/all' 
import './styled.scss'
import { ButtonLogout, MenuMobile } from '..'
import { LogoHeader } from '../../assets'
import { useAuth } from "../../contexts/AuthContext"

const HeaderComponent = () => {
  const [openMenu, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const [ nome, setNome ] = useState();
  const { isMobile } = useResize();

  useEffect(() => {
    setNome(currentUser?.displayName || 'Fulano')
  }, [currentUser])

  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

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
          {!isMobile &&
            <>
              <p>Olá <b>{nome}</b></p>
              <div className="divisor" />
              <ButtonLogout />
            </>
          }
          {isMobile && <IoMenu size={40} onClick={() => setMenuOpen(true)} />}
        </div>
      
    </div>
  )
}

export default HeaderComponent
