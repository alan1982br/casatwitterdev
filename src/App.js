import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom"
import { TestingPage, VirtualTour, ArtHouse  } from './pages'
import "./styles/App.scss"
import firebase from './firebase';
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
  EmailEnviado,
  TermsOfUse,
  Conteudos,
  Trends,
  Cases } from './components'
  

function App() {

  const showterms = useSelector(state => state.showterms);
  const showConteudos = useSelector(state => state.showConteudos);
  const showTrends = useSelector(state => state.showTrends);
  const showCases = useSelector(state => state.showCases);


  const RoutesListener = () => {

    const location = useLocation();

    useEffect(() => {
      firebase.analytics().setCurrentScreen(location.pathname);
    }, [location]);

    return <></>;
  } 


  return (
      <Container fluid
        className="content-wrapper overflow"
      >
        <AnimatePresence>
          {showterms && 
            <TermsOfUse key="termsofuse" />
          }
          
        </AnimatePresence>
        <AnimatePresence>
          {showConteudos && 
            <Conteudos key="depoimentos" />
          }
        </AnimatePresence>
        <AnimatePresence>
          {showTrends && 
            <Trends key="trends" />
          }
        </AnimatePresence>
        <AnimatePresence>
          {showCases && 
            <Cases key="cases" />
          }
        </AnimatePresence>
        <Row noGutters>
          <Col className="col">
            <Router>
            <RoutesListener/>
              <AuthProvider>
                <Switch>
                  <Route exact path="/">
                    <TemplateDashboard component={Start} />
                  </Route>
                  <Route exact path="/arthouse" component={ArtHouse} />
                  {/* <PrivateRoute exact path="/dashboard">
                    <TemplateDashboard component={Dashboard} />
                  </PrivateRoute> */}
                  <Route path="/update-profile">
                    <TemplateDashboard component={UpdateProfile} />
                  </Route>
                  <Route path="/email-enviado">
                    <TemplateDashboard component={EmailEnviado}/>
                  </Route>
                  <Route path="/register-fake">
                    <TemplateDashboard component={Register}/>
                  </Route>
                  {/* <PrivateRoute path="/confirme-email" component={ConfirmeEmail} /> */}
                  <Route path="/confirme-email">
                    <TemplateDashboard component={ConfirmeEmail} />
                  </Route>
                  <PrivateRoute path="/register" component={Register} />
                  <Route path="/start">
                    <TemplateDashboard component={Start} />
                  </Route>
                  <PrivateRoute path="/login" component={Login} />
                  <Route path="/forgot-password" component={ForgotPassword}>
                    <TemplateDashboard component={ForgotPassword} />
                  </Route>
                  <Route exact path="/testing" component={TestingPage} />
                  <PrivateRoute exact path="/virtual-tour" component={VirtualTour} />
                  {/* <Route exact path="/virtual-tour" component={VirtualTour} /> */}
                  <Route path="/">
                    <TemplateDashboard component={Start} />
                  </Route>
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
