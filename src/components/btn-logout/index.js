import React, { useEffect, useState } from 'react'
import './style.scss'
import { useAuth } from "../../contexts/AuthContext"

const ButtonLogoutComponent = () => {

  const [loged, setLoged ] = useState(false);
  const { logout, currentUser } = useAuth();
 
 const handleLogout = () => {

    if(currentUser) {
        logout(`start`);
        localStorage.removeItem('@Twitter:ActiveEmail');
        localStorage.removeItem('@Twitter:email');
        localStorage.removeItem('@Twitter:uid');
        localStorage.removeItem('@Twitter:passwordCreated');
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
