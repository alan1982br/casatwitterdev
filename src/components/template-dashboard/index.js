import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Logo } from '..'
import './style.scss'

const TemplateDashboard = ({ component: Component, ...rest }) => {

  // const { alo } = {...rest};

  return (
    <Container {...rest} fluid className="template__dashboard">
      <Row>
        <Col className="col-12 col-md-8 vh100 content__left" />
        <Col className="col-12 col-md-4 content__right">
          <Logo />
          <Component {...rest} />
        </Col>
      </Row>
    </Container>
  )
}

export default TemplateDashboard
