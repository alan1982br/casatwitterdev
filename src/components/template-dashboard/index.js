import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useResize } from '../../hooks'
import { ImageLoginHome } from '../../assets'
import { Logo } from '..'
import './style.scss'

window.addEventListener('message', function(e) {
  console.log(e.origin); // outputs "http://www.example.com/"
  console.log("receive from layer 3dvista" , e.data); // outputs "works!"
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
