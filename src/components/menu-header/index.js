import React from 'react'
import { useDispatch } from 'react-redux';
import './styles.scss'

const MenuHeaderComponent = () => {
  const dispatch = useDispatch();

  const showHideDepoimentos = () => dispatch({ type: 'UPDATE_DEPOIMENTOS', payload: true });
  const showHideTrends = () => dispatch({ type: 'UPDATE_TRENDS', payload: true });
  const showHideCases = () => dispatch({ type: 'UPDATE_CASES', payload: true });

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
