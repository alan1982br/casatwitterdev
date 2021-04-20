import React from "react"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./styles/App.scss"
import { Dashboard, ForgotPassword, Login, TemplateDashboard, SignUp, PrivateRoute, UpdateProfile } from './components'

function App() {
  return (
    <Container fluid
      className="content-wrapper"
    >
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
    </Container>
  )
}

export default App
