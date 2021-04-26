import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useResize } from '../../hooks'
import { Logo } from '..'
import './style.scss'

const TemplateDashboard = ({ component: Component, ...rest }) => {

  const { isMobile } = useResize();

  return (
    <Container {...rest} fluid className="template__dashboard">
      <Row>
        {!isMobile && <Col className="col-12 col-md-8 vh100 content__left" />}
        <Col className="col-12 col-md-4 content__right">
          <Logo />
          <Component {...rest} />
        </Col>
      </Row>
    </Container>
  )
}

export default TemplateDashboard
