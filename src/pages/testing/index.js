import React from 'react'
import { Container, Col } from 'react-bootstrap'
import { Timeline } from '../../components'
import { BackgroundFake } from '../../assets'

const TestingPage = () => {
  return (
    <Container fluid className="p-0 content-wrapper position-relative testing">
      <Col className="col-12 timeline" style={{backgroundImage: `url(${BackgroundFake})`}}>
        <Timeline />
      </Col>
    </Container>
  )
}

export default TestingPage
