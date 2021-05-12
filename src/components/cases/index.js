import React, { useRef, useState, useEffect} from 'react'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'; 
import { Document, Page, pdfjs } from 'react-pdf';
import { useResize } from '../../hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { saveAs } from 'file-saver';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { IoCloseSharp } from 'react-icons/all';
import { getFile } from '../../utils'
import { ThumbVideo, ButtonNavigation } from '..'
import { BgInstrucoes } from '../../assets'
import './style.scss'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// const options = {
//   cMapUrl: 'cmaps/',
//   cMapPacked: true,
// };

const  CasesComponent = () => {

  // const [file, setFile] = useState(pdfFile);
  const [numPages, setNumPages] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(1);

  const typePDF = 'pagination';

  const { isMobile, height } = useResize();
  const [ iFileActive, setFileActive ] = useState(null);
  const [ containerTextHeight, setContainerTextHeight ] = useState('40vh')
  const titleRef = useRef(null);
  const termsRef = useRef(null);
  const dispatch = useDispatch();
  const showHideTerms = (show) => {
    if(iFileActive !== null) {
      setFileActive(null);
      return;
    }
    dispatch({ type: 'UPDATE_CASES', payload: show });
  }

  const setCurrentTour = (tour) => {
    dispatch({ type: 'UPDATE_TOUR', payload: tour });
    showHideTerms(false);
  }

  // function onFileChange(event) {
  //   setFile(event.target.files[0]);
  // }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    // console.log("loaded", "pages", nextNumPages)
    setNumPages(nextNumPages);
  }

  const saveFile = (url) => {
    saveAs(
      getFile(url),
      url
    );
  }

  const setFile = (url) => {
    setCurrentPage(1);
    setFileActive(getFile(url));
  }

  const handlePrevPage = () => {
    // console.log("prev")
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    // console.log("next")
    if(currentPage <= numPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const checkVisiblePrev = () => {
    // Se o pdf tem somente uma página, não mostra nada
    if(numPages === 1) return false;

    // Se está na primeira página, não mostra
    if(currentPage === 1) return false;

    // Mostra caso nenhum dos anteriores sejam false
    return true;

  }

  const checkVisibleNext = () => {
    // Se o pdf tem somente uma página, não mostra nada
    if(numPages === 1) return false;

    // Se está na primeira página, não mostra
    if(currentPage >= numPages) return false;

    // Mostra caso nenhum dos anteriores sejam false
    return true;

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
              <AnimatePresence>
                  { iFileActive !== null &&
                    <React.Fragment> 
                      <motion.div
                      key="iframe"
                      initial={{opacity: 0}}
                      animate={{opacity: 1, transition: {delay: .15, ease: 'easeInOut', duration: .5}}} 
                      exit={{opacity: 0, transition: { duration: .3}}} 
                      className='file-container'>
                        {typePDF === 'pagination' &&
                          <React.Fragment>
                            <AnimatePresence>
                              {checkVisiblePrev() && <ButtonNavigation key="btn-prev" direction="prev" handleClick={handlePrevPage} />}
                            </AnimatePresence>
                            <AnimatePresence>
                              {checkVisibleNext() && <ButtonNavigation key="btn-next" direction="next" handleClick={handleNextPage} />}
                            </AnimatePresence>
                          </React.Fragment>
                        } 
                        <Document
                          file={iFileActive}
                          loading="Carregando documento"
                          onLoadSuccess={onDocumentLoadSuccess}
                          // options={options}
                        >
                          {typePDF === 'pagination' &&
                          <Page
                              key={`page_${currentPage}`}
                              pageNumber={currentPage}
                            />
                          }
                          {typePDF !== 'pagination' && 
                            Array.from(
                              new Array(numPages),
                              (el, index) => (
                                <Page
                                  key={`page_${index + 1}`}
                                  pageNumber={index + 1}
                                />
                              ),
                            )
                          }
                          
                        </Document>
                      </motion.div>
                    </React.Fragment>
                  }
                </AnimatePresence>
                <Row className="title__container" ref={titleRef}>
                  <Col className="col-12 d-flex align-items-center justify-content-center mt-4">
                    <h1>Cases</h1>
                  </Col>
                </Row>
                <Row className="text-container">
                  <Col style={{ maxHeight: containerTextHeight}} className="col-12 d-flex flex-column">
                    <Row>
                      <ThumbVideo image="thumb_avon.jpg" 
                                    title="Inspire-se: Marcas que brilham"
                                    handleClick={() => setCurrentTour('101')}
                                    />
                        <ThumbVideo image="thumb_natura.jpg" 
                                    title="Inspire-se: Marcas que brilham"
                                    handleClick={() => setCurrentTour('10')}
                                    />
                        <ThumbVideo image="thumb_samsung.jpg" 
                                    title="Inspire-se: Marcas que brilham"
                                    handleClick={() => setCurrentTour('11')}
                                    />
                        <ThumbVideo image="thumb_maisAqui.jpg" 
                                    title="Inspire-se: Marcas que brilham"
                                    handleClick={() => setCurrentTour('23')}
                                    />
                        <ThumbVideo image="thumb_lacta.jpg" 
                                    title="Lacta + BBB"
                                    handleClickDownload={() => saveFile('twitter.pdf')}
                                    handleClick={() => setFile('twitter.pdf')}
                                    />
                        <ThumbVideo image="thumb_case99.jpg" 
                                    title="Case 99"
                                    handleClickDownload={() => saveFile('twitter.pdf')}
                                    handleClick={() => setFile('twitter.pdf')}
                                    />
                        <ThumbVideo image="thumb_Doritos.jpg" 
                                    title="Doritos"
                                    handleClickDownload={() => saveFile('twitter.pdf')}
                                    handleClick={() => setFile('twitter.pdf')}
                                    />
                      </Row>
                  </Col>
                </Row>
              </Col>
    </motion.div>
  )
}

export default CasesComponent