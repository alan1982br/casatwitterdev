import React from "react"
import { Container, Row, Col } from 'react-bootstrap'
import { useResize } from '../../hooks'
import { ImageLoginHome } from '../../assets'
import { Logo } from '..'
// import { useAuth } from "../../contexts/AuthContext"
import './style.scss'
 

window.addEventListener('message', function(e) {

 let uid = localStorage.getItem('@Twitter:uid');
 let displayName = localStorage.getItem('@Twitter:displayName');
 let email = localStorage.getItem('@Twitter:email');

  // console.log(e.origin); // outputs "http://"
  // console.log("receive from layer 3dvista" , e.data); // outputs "works!"


if(e.data !== 'tourLoaded')
  fetch('https://us-central1-casatwitter-815ac.cloudfunctions.net/api/messages?displayName='+displayName+'&email='+email+'&uid='+uid+'&hotspot_id='+e.data.hotspot_id+'&hotspot_name='+e.data.hotspot_name+'&hotspot_title='+e.data.hotspot_title+'&id_room='+e.data.id_room+'&room_name='+e.data.room_name)
  .then(response => response.json())
  .then(data => console.log(data));


}, false);

const TemplateDashboard = ({ component: Component, ...rest }) => {

  const { isMobile } = useResize();
  // const { currentUser  } = useAuth();

  

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
