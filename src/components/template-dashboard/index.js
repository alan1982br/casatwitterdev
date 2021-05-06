import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useResize } from '../../hooks'
import { ImageLoginHome } from '../../assets'
import { Logo } from '..'
import './style.scss'

window.addEventListener('message', function(e) {
  console.log(e.origin); // outputs "http://www.example.com/"
  console.log("receive from layer 3dvista" , e.data); // outputs "works!"

  fetch('https://us-central1-casatwitter-815ac.cloudfunctions.net/api/messages?uid=OaevJixW4BZKO21i56w1JHT2W582&hotspot_id='+e.data.hotspot_id)
  .then(response => response.json())
  .then(data => console.log(data));


}, false);



const TemplateDashboard = ({ component: Component, ...rest }) => {

  const { isMobile } = useResize();

  return (
    <Container {...rest} fluid className="template__dashboard">
      <Row>
        {!isMobile && <Col className="vh100 content__left" style={{backgroundImage: `url(${ImageLoginHome})`}} />}
        <Col className="col-12 col-md-4 content__right">
          <Logo />
          <Component {...rest} />
        </Col>
      </Row>
    </Container>
  )
}

export default TemplateDashboard
