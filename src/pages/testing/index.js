import React from 'react'
import { useDispatch } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap'
import { Timeline } from '../../components'
import { BackgroundFake } from '../../assets'


const TestingPage = () => {
  const dispatch = useDispatch();

  const showHideTerms = (show) => {
    dispatch({ type: 'UPDATE_TERMS', payload: true });
  }
  return (
    <Container fluid className="p-0 content-wrapper position-relative testing">
      <Row className="p-4">
        <Col>
        <div className="btn btn-success" onClick={() => showHideTerms(true) }>Open Modal</div>
        </Col>
      </Row>
      <Col className="col-12 timeline" style={{backgroundImage: `url(${BackgroundFake})`}}>
        <Timeline />
      </Col>
    </Container>
  )
}

export default TestingPage
