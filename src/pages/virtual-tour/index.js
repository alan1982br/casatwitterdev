/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap'
import data from '../../assets/mock-data/timeline.json'
import { Timeline, Header } from '../../components'
import './style.scss'


const VirtualTourPage = () => {

  const [current3d, setCurrent3D] = useState(null);
  const currentTour = useSelector(state => state.currentTour)

  const getLink = () => {
    const findLink = data.findIndex(dado => dado.id === currentTour);
    setCurrent3D(data[findLink].path);
  }

  useEffect(() => {
    getLink(currentTour);
  }, [currentTour, getLink]);

  return (
    <Container fluid className="p-0 content-wrapper position-relative">
        <Header />
        {current3d !== null && 
          <iframe className="responsive-iframe" src={`${current3d}`}></iframe>
        }
        <Timeline />
    </Container>
  )
}

export default VirtualTourPage
