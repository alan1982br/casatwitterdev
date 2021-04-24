import React from "react"
import { useSelector } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { TestingPage, VirtualTour  } from './pages'
import "./styles/App.scss"
import { Dashboard, 
  ForgotPassword, 
  Login, 
  TemplateDashboard, 
  SignUp, 
  PrivateRoute,
  PrivatePreRegisterRoute,
  UpdateProfile,
  ConfirmeEmail,
  Start,
  Register,
  HeightMobile,
  TermsOfUse } from './components'

function App() {

  const showterms = useSelector(state => state.showterms);

  return (
      <Container fluid
        className="content-wrapper overflow"
      >
        <AnimatePresence>
          {showterms && 
            <TermsOfUse key="termsofuse" />
          }
        </AnimatePresence>
        <Row noGutters>
          <Col className="col">
            <Router>
              <AuthProvider>
                <Switch>
                  <PrivateRoute exact path="/">
                    <TemplateDashboard component={Dashboard} />
                  </PrivateRoute>
                  <PrivateRoute exact path="/dashboard">
                    <TemplateDashboard component={Dashboard} forcedashboard={true} />
                  </PrivateRoute>
                  <PrivateRoute path="/update-profile">
                    <TemplateDashboard component={UpdateProfile} />
                  </PrivateRoute>
                  <Route path="/signup">
                    <TemplateDashboard component={SignUp} noroute="true"/>
                  </Route>
                  <Route path="/confirme-email">
                    <TemplateDashboard component={ConfirmeEmail} noroute="true"/>
                  </Route>
                  <PrivateRoute path="/register">
                    <TemplateDashboard component={Register}   />
                  </PrivateRoute>
                  <Route path="/start">
                    <TemplateDashboard component={Start} noroute="true"/>
                  </Route>
                  <Route path="/login">
                    <TemplateDashboard component={Login} noroute="true"/>
                  </Route>
                  <Route path="/forgot-password" component={ForgotPassword}>
                    <TemplateDashboard component={ForgotPassword} noroute="true"/>
                  </Route>
                  <Route exact path="/testing" component={TestingPage} />
                  <Route exact path="/virtual-tour" component={VirtualTour} />
                </Switch>
              </AuthProvider>
            </Router>
          </Col>
          </Row>
          <HeightMobile />
      </Container>
  )
}

export default App
