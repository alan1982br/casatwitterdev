import React, { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./styles/App.scss"
import { TestingPage } from './pages'
import { Dashboard, 
  ForgotPassword, 
  Login, 
  TemplateDashboard, 
  SignUp, 
  PrivateRoute,
  UpdateProfile,
  TermsOfUse } from './components'

function App() {

  const showterms = useSelector(state => state.showterms);
  const dispatch = useDispatch();

  const showHideTerms = (show) => {
    dispatch({ type: 'UPDATE_TERMS', payload: show });
  }

  useEffect(() => {
    // setTimeout(() => {
    //   showHideTerms(true)
    // }, 2000)
  }, [showHideTerms])

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
                    <TemplateDashboard component={Dashboard} />
                  </PrivateRoute>
                  <PrivateRoute path="/update-profile">
                    <TemplateDashboard component={UpdateProfile} />
                  </PrivateRoute>
                  <Route path="/signup">
                    <TemplateDashboard component={SignUp} noroute="true"/>
                  </Route>
                  <Route path="/login">
                    <TemplateDashboard component={Login} noroute="true"/>
                  </Route>
                  <Route path="/forgot-password" component={ForgotPassword}>
                    <TemplateDashboard component={ForgotPassword} noroute="true"/>
                  </Route>
                  <Route exact path="/testing" component={TestingPage} />
                </Switch>
              </AuthProvider>
            </Router>
          </Col>
          </Row>
      </Container>
  )
}

export default App
