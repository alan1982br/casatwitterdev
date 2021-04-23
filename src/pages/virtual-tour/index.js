/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap'
import { Timeline, Header } from '../../components'
import './style.scss'


const VirtualTourPage = () => {

  const currentTour = useSelector(state => state.currentTour)

  useEffect(() => {
    // console.log(currentTour)
  }, [currentTour]);

  return (
    <Container fluid className="p-0 content-wrapper position-relative">
        <Header />
        <iframe className="responsive-iframe" src={`https://cloud.3dvista.com/hosting/7086438/2/index.htm?media-index=${currentTour}`}></iframe>
        <Timeline />
    </Container>
  )
}

export default VirtualTourPage
