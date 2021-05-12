import React, { useRef, useState, useEffect} from 'react'
import { useResize } from '../../hooks'
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { IoCloseSharp } from 'react-icons/all';
import { ThumbVideo } from '..'
import { BgInstrucoes } from '../../assets'
import './style.scss'

const ConteudosComponent = () => {

  const { isMobile, height } = useResize();
  const [ containerTextHeight, setContainerTextHeight ] = useState('40vh')
  const titleRef = useRef(null);
  const termsRef = useRef(null);
  const dispatch = useDispatch();

  const showHideTerms = (show) => {
    dispatch({ type: 'UPDATE_CONTEUDOS', payload: show });
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
            className="modal-wrapper"
            style={{backgroundImage: `url(${BgInstrucoes})`}}>
              <Col className="col-11 col-md-6 d-flex align-items-center justify-content-center button-container">
                  <Col className="col-12 d-flex align-items-end justify-content-end">
                    <IoCloseSharp style={{cursor: 'pointer'}} size={50} color="#FFF" onClick={() => showHideTerms(false)} />
                  </Col>
              </Col>
              <Col className="col-11 col-md-6 terms-container" ref={termsRef}>
                <Row className="title__container" ref={titleRef}>
                  <Col className="col-12 d-flex align-items-center justify-content-center mt-4">
                    <h1>Conteúdos</h1>
                  </Col>
                </Row>
                <Row className="text-container">
                  <Col style={{ maxHeight: containerTextHeight}} className="col-12 d-flex flex-column">
                    <Row>
                      <ThumbVideo image="thumb_visaoCEO.jpg" 
                                  title="Fique por dentro"
                                  handleClick={() => setCurrentTour('3')}
                                   />
                      <ThumbVideo image="thumb_paraLembrar.jpg" 
                                  title="Fique por dentro"
                                  handleClick={() => setCurrentTour('4')} />
                      <ThumbVideo image="thumb_agendaIntroducao.jpg" 
                                  title="Fique por dentro"
                                  handleClick={() => setCurrentTour('2')} />
                      <ThumbVideo image="thumb_daUmaEspiada.jpg" 
                                  title="Como fazer acontecer"
                                  handleClick={() => setCurrentTour('8')} />
                      <ThumbVideo image="thumb_twitterTV.jpg" 
                                  title="Conteúdo relevante? Aqui ó:"
                                  handleClick={() => setCurrentTour('5')} />
                      <ThumbVideo image="thumb_next.jpg" 
                                  title="Como fazer acontencer"
                                  handleClick={() => setCurrentTour('7')} />
                      <ThumbVideo image="thumb_twitterTrends.jpg" 
                                  title="Tendências que você precisa saber"
                                  handleClick={() => setCurrentTour('13')} />
                      <ThumbVideo image="thumb_arthouse.jpg" 
                                  title="Como fazer acontecer"
                                  handleClick={() => setCurrentTour('6')} />
                      <ThumbVideo image="thumb_inovacaoProduto.jpg" 
                                  title="O que vem por aí: Inovação de Produto"
                                  handleClick={() => setCurrentTour('12')} />
                    </Row>
                  </Col>
                </Row>
              </Col>
    </motion.div>
  )
}

export default ConteudosComponent
