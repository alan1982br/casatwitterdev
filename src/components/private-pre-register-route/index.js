import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function PrivatePreRegisterRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  if(currentUser)
  // console.log(" currentUser.emailVerified " , currentUser.emailVerified)
 
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/start" />
      }}
    ></Route>
  )
}
