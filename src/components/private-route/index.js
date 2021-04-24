import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser , activePassword } = useAuth()

const renderComponent = (props) => {

    const { forcedashboard } = props;
    console.log("PrivateRout______________________")
    switch (currentUser) {
      case currentUser && forcedashboard:
        return <Redirect to="/login" />;
      case currentUser.emailVerified  === true:
        return <Redirect to="/virtual-tour" />;
      case activePassword === true:
        return <Redirect to="/confirme-email" />;
      case currentUser :
        return <Component {...props} />;
      default: 
        return <Redirect to="/start" />;
    }
  }

  return (
    <Route
      {...rest}
      render={props => {
        renderComponent(props)
      }}
    ></Route>
  )
}
