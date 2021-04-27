/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, RiArrowDownSLine } from 'react-icons/all'
import { useResize } from '../../hooks'
import { getImage } from '../../utils'
import { motion, AnimatePresence } from 'framer-motion'
import './style.scss'
import data from '../../assets/mock-data/timeline.json'
import { db } from "../../firebase";

const TimelineComponent = () => {

  const [ dados, setDados ] = useState([]);
  const [ currentThumb, setCurrentThumb ] = useState(null)
  const [ buttonIndex, setButtonIndex ] = useState(-1);
  const { isMobile, width } = useResize();
  const [ sobra, setSobra ] = useState(0);
  const [ moveX, setMoveX ] = useState(50);
  const [ isOpen, setIsOpen ] = useState(true); 
  const dispatch = useDispatch();

  const paddingDrag = 50;


  const currentTour = useSelector(state => state.currentTour)
  const visitedTour = useSelector(state => state.visitedTour)

  const setCurrentTour = (tour) => {
    dispatch({ type: 'UPDATE_TOUR', payload: tour });
  }

  const updateVisitedTour = (tourId) => {
    const newTour = [...visitedTour];
    const hasVisitedTour = newTour.includes(tourId);
    if(hasVisitedTour === false) {
      newTour.push(tourId);
      // console.log("insere o valor", newTour)
      dispatch({ type: 'UPDATE_VISITED_TOUR', payload: newTour });
    }
    // console.log("visited tour", visitedTour, hasVisitedTour);
  }

  const containerButtonRef = useRef(null);

  let firstClick = 0;
  let posMouse = 0;

  const setDown = (e) => {
    firstClick = Date.now();
    posMouse = e.clientX;
  }

  const onClick = (e) => {
    if((Date.now() - firstClick) > 150) {
      return;
    }
    const mouseMoved = (posMouse - e.clientX) < 0 ? (posMouse - e.clientX) * -1: (posMouse - e.clientX);
    if(mouseMoved > 5) return;

    const { id, index } = e.currentTarget.dataset;


    if(currentThumb === id) {
      // desativa
      setCurrentThumb(null);
    } else {
      setCurrentThumb(id);
      setTimeout(() => {
        setCurrentTour(id);
      }, 300)
      
      // click for right side of active
      let adjustMargin = 160;
      if(buttonIndex === -1) {
        // click for non active (first click)
        adjustMargin = 180;
      } else if(parseInt(index) > buttonIndex) {
        // click for before active
        adjustMargin = 120;
      }
      
      let newDistance = e.currentTarget.offsetLeft;
      let sobraSpacing = (width - adjustMargin) / 2;
      const posCenter = -newDistance + sobraSpacing;
      setButtonIndex(parseInt(index));
      setMoveX(posCenter);
    }
  }

  useEffect(() => {
    updateVisitedTour(currentTour);
  }, [currentTour])

  useEffect(() => {
    const limitDrag = ((containerButtonRef.current.offsetWidth + paddingDrag) - width) *-1;
    setSobra(limitDrag);

    if(!isMobile) setIsOpen(true);
  }, [isMobile, width])

  const getDuration = () => moveX === 50 ? 1 : .3

  const getMoveX = () => {
    return isMobile ? moveX : paddingDrag;
  }

  const openCloseTimeline = () => {
    setIsOpen(!isOpen);

    console.log("openCloseTimeline")

  }

  useEffect(() => {
    const addAttr = data.map(data => ({
      ...data,
      active: false,
      visited: false
    }))
    setDados(addAttr)

    
    db.database().ref('timeline_users').child('iR4XROmrhCee8iMZhGVJtGaPjoA2').on("value", snapshot => {
      try {
        console.log(' snapshot.val() ALL DATA timeline_users ', snapshot.val())
      } catch (error) {
        console.log(error)
      }

    })
  }, [])
  return (
    <div className={`timeline__wrapper ${isOpen ? '' : 'timeline-close'}`} >
      <AnimatePresence>
      {isMobile && 
         <motion.div
         key="button-open-close"
         initial={{opacity: 0, y: 10}}
         animate={{opacity: 1, y: 0, x: '-50%', transition: { ease: 'easeInOut', duration: .3}}} 
         exit={{opacity: 0, transition: { duration: .3}}}
         onClick={openCloseTimeline}
         className={`controller ${isOpen ? 'open' : 'closed'}`}>
         <RiArrowDownSLine size={30} color="#FFF" />
        </motion.div>
      }
      </AnimatePresence>
     
      <motion.div animate={{x: getMoveX(), transition: { ease: 'easeOut', duration: getDuration()}}} drag="x" dragConstraints={{ left: sobra, right: paddingDrag }} ref={containerButtonRef} className="buttons-container">
        { dados.length > 0 &&
          dados.map((button, index) => {
            const _class = currentThumb === button.id ? 'active' : '';
            const activeScale = currentThumb === button.id ? .8 : 1;
            const hasVisitedTour = visitedTour.includes(button.id);
            const _classImage = hasVisitedTour ? 'image-container visit' : 'image-container'
            let _classBullet = 'first';
            if(index > 0 && index < dados.length -1) {
              _classBullet = 'middle';
            } else if (index === dados.length -1) {
              _classBullet = 'last'
            }
            return (
              <div key={button.id}
                  data-id={button.id}
                  data-index={index}
                  className={`timeline__button ${_class}`}
                  onMouseUp={_class !== 'active' ? onClick : () => {}} 
                  onMouseDown={_class !== 'active' ? setDown : () => {}}
              >
                <div className={_classImage} >
                  <div className="image" style={{backgroundImage: `url(${getImage(button.image)})`}}/>
                  <AnimatePresence>
                    {hasVisitedTour && 
                      <motion.div 
                      key={button.title}
                      initial={{opacity: 0, y: 0, x: 11}}
                      animate={{opacity: 1, scale: activeScale, y: -11, x: 11, transition: { ease: 'easeInOut', duration: .3}}} 
                      exit={{opacity: 0, scale: 0, transition: { duration: .3}}}
                      className="visited">
                        <FaCheck color="#FFF" size={11} />
                      </motion.div>
                      
                    }
                  </AnimatePresence>
                </div>
                <div className="vertical-line" />
                <div className={`bullet ${_classBullet}`} />
              </div>
            )
          })
        }
      </motion.div>
    </div>
  )
}

export default TimelineComponent
