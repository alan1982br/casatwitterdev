import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./styles/App.scss"
import { Dashboard, ForgotPassword, Login, TemplateDashboard, SignUp, PrivateRoute, UpdateProfile } from './components'

function App() {

  const TestComponent = () => <h1>teste</h1>;
  return (
    <Container fluid
      className="content-wrapper"
    >
      <Row noGutters>
        <Col className="col">
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/">
                  <TemplateDashboard component={Dashboard} />
                </PrivateRoute>
                <PrivateRoute exact path="/dashboard">
                  <TemplateDashboard component={Dashboard} />
                </PrivateRoute>
                <PrivateRoute path="/update-profile" component={UpdateProfile} />
                <Route path="/signup">
                  <TemplateDashboard component={SignUp} noroute="true"/>
                </Route>
                <Route path="/login">
                  <TemplateDashboard component={Login} noroute="true"/>
                </Route>
                <Route path="/forgot-password" component={ForgotPassword}>
                  <TemplateDashboard component={ForgotPassword} noroute="true"/>
                </Route>
              </Switch>
            </AuthProvider>
          </Router>
        </Col>
        </Row>
    </Container>
  )
}

export default App
