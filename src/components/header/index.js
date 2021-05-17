import React, { useState, useEffect } from 'react'
import {
  AnimatePresence,
} from 'framer-motion';
import { useResize } from '../../hooks'
import { IoMenu } from 'react-icons/all' 
import { useDispatch} from 'react-redux';
import './styled.scss'
import { ButtonLogout, MenuMobile, MenuHeader } from '..'
import { ThumbCompleteContent } from '../../assets'
import { useAuth } from "../../contexts/AuthContext"

const HeaderComponent = () => {
  const [openMenu, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const [ nome, setNome ] = useState();
  const { isTablet } = useResize();
  const dispatch = useDispatch()

  const updateVisitedTour = () => {
    dispatch({ type: 'UPDATE_TOUR', payload: '100' });
  }


  useEffect(() => {
    console.log("currentUser", currentUser)
    setNome(currentUser?.displayName || '')
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
        <img src={ThumbCompleteContent} alt="Twitter" onClick={updateVisitedTour} />
      </div>
      <div className="menu">
        {!isTablet &&
          <>
            <MenuHeader />
            <div className="divisor" />
            <p style={{marginRight: '40px'}}>Olá, {' '}<b>{currentUser.displayName && `${nome}.`}</b></p>
            <ButtonLogout />
          </>
        }
        {isTablet && <IoMenu size={40} onClick={() => setMenuOpen(true)} style={{cursor: 'pointer'}} />}
      </div>
      
    </div>
  )
}

export default HeaderComponent
