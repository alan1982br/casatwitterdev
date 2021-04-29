import React from 'react'
import { useDispatch } from 'react-redux';
import { useResize } from '../../hooks'
import './styles.scss'

const MenuHeaderComponent = ({closeMenuMobile = () => {}}) => {
  const dispatch = useDispatch();
  const { isMobile } = useResize();

  const showHideDepoimentos = () => {
    isMobile && closeMenuMobile();
    dispatch({ type: 'UPDATE_DEPOIMENTOS', payload: true })
  };
  const showHideTrends = () => {
    closeMenuMobile();
    dispatch({ type: 'UPDATE_TRENDS', payload: true });
  } 
  const showHideCases = () => {
    closeMenuMobile();
    dispatch({ type: 'UPDATE_CASES', payload: true });
  }

  return (
    <div className="menu__header">
      <ul>
        <li onClick={() => showHideDepoimentos()}>Depoimentos</li>
        <li onClick={() => showHideTrends()}>Trends</li>
        <li onClick={() => showHideCases()}>Cases</li>
      </ul>
    </div>
  )
}

export default MenuHeaderComponent
