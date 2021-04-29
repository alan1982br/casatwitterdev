import React, { useRef, useState, useEffect} from 'react'
import { useResize } from '../../hooks'
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { IoCloseSharp } from 'react-icons/all';
import { ThumbVideo } from '..'
import './style.scss'

const DepoimentosComponent = () => {

  const { isMobile, height } = useResize();
  const [ containerTextHeight, setContainerTextHeight ] = useState('40vh')
  const titleRef = useRef(null);
  const termsRef = useRef(null);
  const dispatch = useDispatch();

  const showHideTerms = (show) => {
    dispatch({ type: 'UPDATE_DEPOIMENTOS', payload: show });
  }

  const setCurrentTour = (tour) => {
    dispatch({ type: 'UPDATE_TOUR', payload: tour });
    showHideTerms(false);
  }

  useEffect(() => {
    const WrapperHeight = termsRef?.current.clientHeight
    const titleHeight = titleRef?.current.clientHeight;

    const newHeight = WrapperHeight - titleHeight - 40;
    setContainerTextHeight(newHeight);
  }, [titleRef, isMobile, height])

  return (
    <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {delay: .15, ease: 'easeInOut', duration: .5}}} 
            exit={{opacity: 0, transition: { duration: .3}}}
            className="modal-wrapper">
              <Col className="col-11 col-md-6 d-flex align-items-center justify-content-center button-container">
                  <Col className="col-12 d-flex align-items-end justify-content-end">
                    <IoCloseSharp style={{cursor: 'pointer'}} size={50} color="#FFF" onClick={() => showHideTerms(false)} />
                  </Col>
              </Col>
              <Col className="col-11 col-md-6 terms-container" ref={termsRef}>
                <Row className="title__container" ref={titleRef}>
                  <Col className="col-12 d-flex align-items-center justify-content-center mt-4">
                    <h1>Depoimentos</h1>
                  </Col>
                </Row>
                <Row className="text-container">
                  <Col style={{ maxHeight: containerTextHeight}} className="col-12 d-flex flex-column">
                    <Row>
                      <ThumbVideo image="https://www.placecage.com/500/405" 
                                  title="Título do vídeo 01"
                                  handleClick={() => setCurrentTour('20')}
                                   />
                      <ThumbVideo image="https://www.placecage.com/500/400" 
                                  title="Título do vídeo 02"
                                  handleClick={() => setCurrentTour('21')} />
                      <ThumbVideo image="https://www.placecage.com/500/401" 
                                  title="Título do vídeo 03"
                                  handleClick={() => setCurrentTour('22')} />
                      <ThumbVideo image="https://www.placecage.com/500/402" 
                                  title="Título do vídeo 04"
                                  handleClick={() => setCurrentTour('23')} />
                      <ThumbVideo image="https://www.placecage.com/500/403" 
                                  title="Título do vídeo 05"
                                  handleClick={() => setCurrentTour('24')} />
                    </Row>
                  </Col>
                </Row>
              </Col>
    </motion.div>
  )
}

export default DepoimentosComponent
