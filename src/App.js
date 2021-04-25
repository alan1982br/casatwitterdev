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
                  <Route exact path="/">
                    <TemplateDashboard component={Start} />
                  </Route>
                  <PrivateRoute exact path="/dashboard">
                    <TemplateDashboard component={Dashboard} />
                  </PrivateRoute>
                  <Route path="/update-profile">
                    <TemplateDashboard component={UpdateProfile} />
                  </Route>
                  <Route path="/signup">
                    <TemplateDashboard component={SignUp}/>
                  </Route>
                  <Route path="/register-fake">
                    <TemplateDashboard component={Register}/>
                  </Route>
                  <PrivateRoute path="/confirme-email" component={ConfirmeEmail} />
                  <PrivateRoute path="/register" component={Register} />
                  <Route path="/start">
                    <TemplateDashboard component={Start} />
                  </Route>
                  <Route path="/login">
                    <TemplateDashboard component={Login} />
                  </Route>
                  <Route path="/forgot-password" component={ForgotPassword}>
                    <TemplateDashboard component={ForgotPassword} />
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
