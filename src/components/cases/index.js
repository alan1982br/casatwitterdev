import React, { useRef, useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { useResize } from '../../hooks'
import { IoCloseSharp } from 'react-icons/all';
import { ThumbVideo } from '..'
import './style.scss'

const CasesComponent = () => {

  const { isMobile, height } = useResize();
  const [ iframeActive, setIframeActive ] = useState(null);
  const [ containerTextHeight, setContainerTextHeight ] = useState('40vh')
  const titleRef = useRef(null);
  const termsRef = useRef(null);
  const dispatch = useDispatch();

  const showHideTerms = (show) => {
    if(iframeActive !== null) {
      setIframeActive(null);
      return;
    }
    dispatch({ type: 'UPDATE_CASES', payload: show });
  }

  const setCurrentTour = (tour) => {
    dispatch({ type: 'UPDATE_TOUR', payload: tour });
    showHideTerms(false);
  }

  const setIframe = (url) => {
    setIframeActive(url);
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
              <Col className="col-11 col-md-6 cases-container" ref={termsRef}>
                <AnimatePresence>
                  { iframeActive !== null && 
                    <motion.div
                    key="iframe"
                    initial={{opacity: 0}}
                    animate={{opacity: 1, transition: {delay: .15, ease: 'easeInOut', duration: .5}}} 
                    exit={{opacity: 0, transition: { duration: .3}}} 
                    className='iframe-container'>
                      <iframe width="100%" height="100%" src={iframeActive} title="janela" />
                    </motion.div>
                  }
                </AnimatePresence>
                
                <Row className="title__container " ref={titleRef}>
                  <Col className="col-12 d-flex align-items-center justify-content-center mt-4">
                    <h1>Cases</h1>
                  </Col>
                </Row>
                <Row className="text-container">
                <Col style={{ maxHeight: containerTextHeight}} className="col-12 d-flex flex-column">
                    <Row>
                      <ThumbVideo image="https://www.placecage.com/500/399" 
                                  title="Título do vídeo 01"
                                  handleClick={() => setCurrentTour('21')}
                                   />
                      <ThumbVideo image="https://www.placecage.com/500/398" 
                                  title="Título do vídeo 02"
                                  handleClick={() => setCurrentTour('23')}
                                   />
                       <ThumbVideo image="https://www.placecage.com/500/396" 
                                  title="Iframe marketing twitter"
                                  handleClick={() => setIframe('https://marketing.twitter.com/pt/success-stories/lacta-bbb-twitter-vendas')}
                                   />
                      <ThumbVideo image="https://www.placecage.com/500/397" 
                                  title="Iframe Venosa"
                                  handleClick={() => setIframe('https://www.venosadesign.com.br')}
                                   />
                      </Row>
                  </Col>
                </Row>
              </Col>
    </motion.div>
  )
}

export default CasesComponent
