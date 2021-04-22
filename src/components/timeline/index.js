import React, { useState, useEffect, useRef } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useResize } from '../../hooks'
import { getImage } from '../../utils'
import { motion, AnimatePresence } from 'framer-motion'
import './style.scss'
import data from '../../assets/mock-data/timeline.json'

const TimelineComponent = () => {

  const [ dados, setDados ] = useState([]);
  const [ currentThumb, setCurrentThumb ] = useState(null)
  const { isMobile, width } = useResize();
  const [ sobra, setSobra ] = useState(0);

  const paddingDrag = 50;

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

    const { id } = e.currentTarget.dataset;

    if(currentThumb === id) {
      // desativa
      setCurrentThumb(null);
    } else {
      setCurrentThumb(id);
    }
  }

  useEffect(() => {
    const limitDrag = ((containerButtonRef.current.offsetWidth + paddingDrag) - width) *-1;
    setSobra(limitDrag);
  }, [isMobile, width])

  useEffect(() => {
    const addAttr = data.map(data => ({
      ...data,
      active: false,
      visited: false
    }))
    setDados(addAttr)
  }, [])
  return (
    <div  className="timeline__wrapper" >
      <motion.div animate={{x: paddingDrag, transition: { ease: 'easeInOut', duration: 1}}} drag="x" dragConstraints={{ left: sobra, right: paddingDrag }} ref={containerButtonRef} className="buttons-container">
        { dados.length > 0 &&
          dados.map(button => {
            const _class = currentThumb === button.id ? 'active' : '';
            return (
              <div key={button.id}
                  data-id={button.id}
                  className={`timeline__button ${_class}`}
                  onMouseUp={onClick} 
                  onMouseDown={setDown}
              >
                <div className="image-container" style={{backgroundImage: `url(${getImage(button.image)})`}}>
                  <AnimatePresence>
                    {_class !== 'active' && 
                      <motion.div 
                      key={button.title}
                      initial={{opacity: 0, y: 0, x: 11}}
                      animate={{opacity: 1, scale: 1, y: -11, x: 11, transition: {delay: .15, ease: 'easeInOut', duration: .5}}} 
                      exit={{opacity: 0, scale: 0, transition: { duration: .3}}}
                      className="visited">
                        <FaCheck color="#FFF" size={11} />
                      </motion.div>
                    }
                  </AnimatePresence>
                </div>
              </div>
            )
          })
        }
      </motion.div>
    </div>
  )
}

export default TimelineComponent
