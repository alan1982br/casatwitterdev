import React, { useEffect, useState } from 'react'
import './style.scss'
import {Redirect , useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const ButtonLogoutComponent = () => {

  const [loged, setLoged ] = useState(false);
  const { logout, currentUser } = useAuth();
   const history  = useHistory();  
 
 const handleLogout = () => {

    if(currentUser) {
       logout();      
    }
    
  }

  useEffect(() => {
    setLoged(currentUser !== null);
  }, [currentUser])

  return (
    <div className={`logout ${loged ? '' : 'not-loged'}`} onClick={handleLogout}>
      Sair
    </div>
  )
}

export default ButtonLogoutComponent
