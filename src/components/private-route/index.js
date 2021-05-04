/* eslint-disable no-unused-expressions */
import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { TemplateDashboard } from '..'
import { auth } from "../../firebase"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser , activePassword , activeUserEmail } = useAuth();

  const { path } = {...rest};

  // const children = {...rest};

const renderComponent = (props) => {
  
    const pathName = path;
     console.log("pathName " , pathName)
 
    switch(pathName) {
      case '/register': 
        {
          // if()
          console.log("activePassword______________________", activePassword)
          if(!currentUser) <Redirect to="/start" />
          if(activePassword === true) return <Redirect to="/confirme-email" />
          else return <TemplateDashboard component={Component} />
        }
        case '/confirme-email': 
        {
          console.log("activeUserEmail______________________", activeUserEmail)
          //  if(!currentUser) <Redirect to="/start" />
          //  if(activeUserEmail === true) return <Redirect to="/login" />
          // else return <TemplateDashboard component={Component} />
             return <TemplateDashboard component={Component} />
        }
        case '/login': 
        {
          console.log("activeUserEmail______________________", activeUserEmail)
          if(!currentUser) return  <TemplateDashboard component={Component} />
          if(currentUser) return <Redirect to="/virtual-tour"/>
          // if(activePassword === true) return  <TemplateDashboard component={Component} />
         
        }
        
      default:
        return <h1>404 private</h1>
        // if logado
        // <TemplateDashboard component={Component} />
    }

    //
    // const route = props.path;

    // switch(route) {
    //   case '/register':
    //     return <TemplateDashboard component={Register} />
    //   default:
    //     return <h1>Olá</h1>
    // }

    // return <h1>teste</h1>

    // return <h1>sei lá</h1>
    // switch (currentUser) {
    //   case currentUser && forcedashboard:
    //     return <Redirect to="/login" />;
    //   case currentUser.emailVerified  === true:
    //     return <Redirect to="/virtual-tour" />;
    //   case activePassword === true:
        // return <Redirect to="/confirme-email" />;
    //   case currentUser :
    //     return <Component {...props} />;
    //   default: 
    //     return <Redirect to="/start" />;
    // }
  }

  return (
    <Route
      {...rest}
      render={
        props => {
          return renderComponent(props)
        }
        // props => renderComponent(props)
      //   (props) => {
      //   return <Component {...props} />
      // }
    }
    />
    // <Route
    //   {...rest}
    //   render={props => {
    //     return currentUser ? <TemplateDashboard component={Component} {...rest} />: <Redirect to="/start" />
    //   }}
    // ></Route>
  )
}
