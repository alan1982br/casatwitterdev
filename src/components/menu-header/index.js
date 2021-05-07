import React from 'react'
import { useDispatch } from 'react-redux';
import { useResize } from '../../hooks'
import { FaTwitter } from 'react-icons/fa'
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
        <li onClick={() => showHideDepoimentos()}>Conteúdos</li>
        <li onClick={() => showHideTrends()}>Pesquisa</li>
        <li onClick={() => showHideCases()}>Cases</li>
        <li><a href="https://marketing.twitter.com/pt" rel="noopener noreferrer"
               target="_blank"><FaTwitter color="#1D9BF0" />
               Marketing
            </a>
        </li>
      </ul>
    </div>
  )
}

export default MenuHeaderComponent
