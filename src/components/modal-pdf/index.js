import React, { useRef, useState, useEffect} from 'react'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'; 
import { Document, Page, pdfjs } from 'react-pdf';
import { motion, AnimatePresence } from 'framer-motion';
// import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { IoCloseSharp } from 'react-icons/all';
import { getFile } from '../../utils'
import { ButtonNavigation } from '..'
import { BgInstrucoes } from '../../assets'
import './style.scss'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const  ModalPDFComponent = () => {

  // const [file, setFile] = useState(pdfFile);
  const [numPages, setNumPages] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(1);

  const typePDF = 'pagination';

  const showPdf = useSelector(state => state.showPdf);

  const [ iFileActive, setFileActive ] = useState(null);
  const termsRef = useRef(null);
  const dispatch = useDispatch();
  const showHidePdf = () => {
    setFileActive(null);
    dispatch({ type: 'UPDATE_MODAL_PDF', payload: {pdf: 'twitter-trends-report-pt.pdf', visible: false } });
    return;
  }

  // function onFileChange(event) {
  //   setFile(event.target.files[0]);
  // }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    // console.log("loaded", "pages", nextNumPages)
    setNumPages(nextNumPages);
  }

  // const saveFile = (url) => {
  //   saveAs(
  //     getFile(url),
  //     url
  //   );
  // }

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
    setFile(showPdf.pdf);
  }, [showPdf.pdf])

  return (
    <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {delay: .15, ease: 'easeInOut', duration: .5}}} 
            exit={{opacity: 0, transition: { duration: .3}}}
            className="modal-wrapper"
            style={{backgroundImage: `url(${BgInstrucoes})`}}>
              <Col className="col-11 col-md-6 d-flex align-items-center justify-content-center button-container">
                  <Col className="col-12 d-flex align-items-end justify-content-end">
                    <IoCloseSharp style={{cursor: 'pointer'}} size={50} color="#FFF" onClick={() => showHidePdf()} />
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
              </Col>
    </motion.div>
  )
}

export default ModalPDFComponent