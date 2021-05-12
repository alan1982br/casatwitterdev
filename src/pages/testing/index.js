import React from 'react'
import { useDispatch } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap'
import { Timeline, ButtonLogout } from '../../components'
import { BackgroundFake } from '../../assets'


const TestingPage = () => {
  const dispatch = useDispatch();

  const showHideTerms = (show) => {
    dispatch({ type: 'UPDATE_TERMS', payload: true });
  }
  const showHideDepoimentos = (show) => {
    dispatch({ type: 'UPDATE_CONTEUDOS', payload: true });
  }

  const showHideTrends = (show) => {
    dispatch({ type: 'UPDATE_TRENDS', payload: true });
  }

  const showHideCases = (show) => {
    dispatch({ type: 'UPDATE_CASES', payload: true });
  }
  return (
    <Container fluid className="p-0 content-wrapper position-relative testing">
      <Row className="p-4">
        <Col>
        <div className="btn btn-success" onClick={() => showHideTerms(true) }>Open Modal</div>
        </Col>
      </Row>
      <Row className="p-4">
        <Col>
        <div className="btn btn-success" onClick={() => showHideDepoimentos(true) }>Open Depoimentos</div>
        </Col>
      </Row>
      <Row className="p-4">
        <Col>
        <div className="btn btn-success" onClick={() => showHideTrends(true) }>Open Trends</div>
        </Col>
      </Row>
      <Row className="p-4">
        <Col>
        <div className="btn btn-success" onClick={() => showHideCases(true) }>Open Cases</div>
        </Col>
      </Row>
      <Row className="p-4" style={{background: '#000'}}>
        <Col>
          <ButtonLogout />
        </Col>
      </Row>
      <Col className="col-12 timeline" style={{backgroundImage: `url(${BackgroundFake})`}}>
        <Timeline />
      </Col>
    </Container>
  )
}

export default TestingPage
