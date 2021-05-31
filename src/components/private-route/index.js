/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { TemplateDashboard  } from '..'
import { VirtualTour  } from '../../pages'
// import { auth } from "../../firebase"

export default function PrivateRoute({ component: Component, ...rest }) {
  const [ hasLocalStorage, setHasLocalStorage ] = useState(false);
  const { currentUser , activePassword , activeEmail } = useAuth();

  const { path } = {...rest};

  // const children = {...rest};

  useEffect(() => {
    try {
      localStorage.getItem('@Twitter:email');
      setHasLocalStorage(true);
    } catch {
      
    }
    
  }, [])

const renderComponent = (props) => {
  
    const pathName = path;
    //  console.log("pathName " , pathName)
 
    switch(pathName) {
      case '/register':
        {
          
          //  if(currentUser) return <Redirect to="/virtual-tour"/>
         return <TemplateDashboard component={Component} />
        }
        case '/confirme-email': 
        {
          // console.log("activeUserEmail______________________", activeUserEmail)
          //  if(!currentUser) <Redirect to="/start" />
          //  if(activeUserEmail === true) return <Redirect to="/login" />
          // else return <TemplateDashboard component={Component} />
             return <TemplateDashboard component={Component} />
        }
        case '/login': 
        {
          // console.log("activeUserEmail______________________", activeUserEmail)
          // TODO verificar se o user existe validado ou mandar para home
          if(!currentUser) return  <TemplateDashboard component={Component} />
          if(currentUser) return <Redirect to="/virtual-tour"/>
          // if(activePassword === true) return  <TemplateDashboard component={Component} />
          break;
        }
        
        case '/virtual-tour':
          {
            if(!currentUser) {
              if(hasLocalStorage) return <Redirect to="/login" />
              else return <Redirect to="/" />
            } 
            // if(currentUser.emailVerified === false) return <Redirect to="/confirme-email" />
            else return  <Route exact path="/virtual-tour" component={VirtualTour} /> 
            break;
          }
          
      default:
        return <h1>404 private</h1>
        // if logado
        // <TemplateDashboard component={Component} />
    }
  }
  return (
    <Route
      {...rest}
      render={
        props => {
          return renderComponent(props)
        }
    }
    />
  )
}
