import React from 'react'
import { motion } from 'framer-motion'
import { IconNext, IconPrev } from '../../assets'
import './style.scss'

const ButtonNavigationComponent = ({ direction = 'prev', handleClick = () => {}}, style = {}) => {

  const image = direction === 'prev' ? IconPrev : IconNext;
  const altImage = direction === 'prev' ? 'Anterior' : 'Próxima';
  return (
    <motion.div style={style} 
          className={`button-navigation ${direction}`}
          onClick={handleClick}
          initial={{opacity: 0}}
          animate={{opacity: 1, transition: {delay: .15, ease: 'easeInOut', duration: .5}}} 
          exit={{opacity: 0, transition: { duration: .3}}} >
            <img src={image} alt={altImage} />
          </motion.div>
      
  )
}

export default ButtonNavigationComponent
