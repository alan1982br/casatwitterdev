import React from 'react'
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Container, Row, Col } from 'react-bootstrap'
import './style.scss'

const TemplateDashboard = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  const { noroute } = {...rest}

  const getTemplate = () => {
    if(noroute) {
      return (
        <>
          <Container {...rest} fluid className="template__dashboard">
            <Row>
              <Col className="col-12 col-md-8 vh100 content__left" />
              <Col className="col-12 col-md-4 content__right">
                <Component {...rest} />
              </Col>
            </Row>
          </Container> : <Redirect to="/login" />
        </>
      )
    } else {
      return (
        <Route
          {...rest}
          render={props => {
            return currentUser ? 
            <Container {...props} fluid className="template__dashboard">
              <Row>
                <Col className="col-12 col-md-8 vh100 content__left" />
                <Col className="col-12 col-md-4 content__right">
                  <Component {...rest} />
                </Col>
              </Row>
            </Container> : <Redirect to="/login" />
          }}
        ></Route>
      )
    }
  }


  return getTemplate();
}

export default TemplateDashboard
