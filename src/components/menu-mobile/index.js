import React from 'react';
import { motion } from 'framer-motion';
import { ButtonLogout } from '..'
import { IoCloseSharp } from 'react-icons/all';
import './style.scss'

const MenuMobileComponent = ({ closeMenuMobile, user }) => {
  const closeMobile = () => {
    closeMenuMobile(false);
  };
  return (
    <motion.div className="menu__mobile"
      key="center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6, delay: 0 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ delay: 0 }}
    >
      <motion.div className="menu__mobile-container"
        key="menu"
        initial={{ opacity: 0, x: '110vw' }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.5, delay: 0.2 },
        }}
        exit={{ opacity: 0, x: '110vw', transition: { duration: 0.35 } }}
        transition={{ delay: 0 }}
      >
        <IoCloseSharp size={40} color="#FFF" onClick={closeMobile} />
        <nav>
          <div className="menu__mobile-menu">
            <p>Olá <b>{user}</b></p>
            <ButtonLogout />
          </div>
        </nav>
      </motion.div>
    </motion.div>
  );
};

export default MenuMobileComponent;
