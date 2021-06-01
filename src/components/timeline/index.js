/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, RiArrowDownSLine } from 'react-icons/all'
import { useResize } from '../../hooks'
import { getImage } from '../../utils'
import { motion, AnimatePresence } from 'framer-motion'
import './style.scss'
import data from '../../assets/mock-data/timeline.json'
import { db } from "../../firebase";
import { analyticsEvent } from '../../analytics';
import ReactGA from 'react-ga'; 

const TimelineComponent = () => {

  const [ dados, setDados ] = useState([]);
  const [ readData, setReadData ] = useState(false);
  const [ hasSnapShot, setHasSnapShot] = useState(false);
  const [ fireBaseRead, setFirebaseRed ] = useState(false); 
  const [ currentThumb, setCurrentThumb ] = useState(null)
  const [ buttonIndex, setButtonIndex ] = useState(-1);
  const [ sobra, setSobra ] = useState(0);
  const [ moveX, setMoveX ] = useState(50);
  const [ isOpen, setIsOpen ] = useState(true);
  const { isMobile, width } = useResize();

  const dispatch = useDispatch();
  const paddingDrag = 50;
  const currentTour = useSelector(state => state.currentTour)
  const visitedTour = useSelector(state => state.visitedTour)
  const currentUser = useSelector(state => state.currentUser)

  const setCurrentTour = (tour) => {
    dispatch({ type: 'UPDATE_TOUR', payload: tour });
  }

  const updateVisitedTour = (tourId) => {
    const newTour = [...visitedTour];
    const hasVisitedTour = newTour.includes(tourId);
    if (hasVisitedTour === false) {
      newTour.push(tourId);
      // console.log("insere o valor", newTour)
      dispatch({ type: 'UPDATE_VISITED_TOUR', payload: newTour });
    }
    // console.log("visited tour", visitedTour, hasVisitedTour);
  }

  const containerButtonRef = useRef(null);

  let firstClick = 0;
  let posMouse = 0;

  const setDown = (e) => {
    firstClick = Date.now();
    posMouse = e.clientX;
  }

  function getDatetime(){
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth(); 
    var year = currentDate.getFullYear();
    var time = new Date().getTime();
    // var monthDateYear  = (month+1) + "/" + date + "/" + year + "/" + time;
    var monthDateYear  =  + date + "/" + (month+1) + "/" + year ;

    return monthDateYear;
  }

  const getOpacityOpen = () => {
    return isOpen ? 1 : 0;
  }

  const onClick = (e) => {

    // window.parent.postMessage({
    //   'hotspot_id': '01',
    //   'hotspot_name': '01',
    //   'id_room': '01',
    //   'room_name': '01',
    // }, "*");


    

    // Se o usuário não está logado ou se ainda não leu o firebase, não aciona o click
    if(currentUser === null || !fireBaseRead) return;


    if ((Date.now() - firstClick) > 150) {
      return;
    }
    const mouseMoved = (posMouse - e.clientX) < 0 ? (posMouse - e.clientX) * -1 : (posMouse - e.clientX);
    if (mouseMoved > 5) return;

    const { id, index } = e.currentTarget.dataset;
    // console.log(index)

    const dataObjToFirebase = dados.find(data => data.id === id);

    //  console.log("dataObjToFirebase " , dataObjToFirebase);
  
    if(dataObjToFirebase !== null) {
      // console.log("manda para o firebase");

      // analyticsEvent(dataObjToFirebase.idRoom,{
      //   content_type: 'room',
      //   content_id: dataObjToFirebase.idHotspot,
      //   screen_name: dataObjToFirebase.title,
      //   ITEM_ID : currentUser.uid,
      //   character : currentUser.email,
      //   nameUser: currentUser.displayName
      // });

      ReactGA.event({
        category: 'TIMELINE user :'+ currentUser.uid,
        action: 'TIMELINE room click ' + currentUser.email,
        label: 'HOTSPOT OPEN ' + dataObjToFirebase.idHotspot
        
      });
  

      let objToFirebase = {
        ...dataObjToFirebase,
        status_ckeckin : true,
        name:localStorage.getItem('@Twitter:displayName'),
        empresa:localStorage.getItem('@Twitter:empresa')
      }

      const date = getDatetime();
      const timmestamp = new Date().getTime(); 
      // console.log("hasSnapshot", hasSnapShot)
      hasSnapShot ? 
      db.database().ref('public/timeline_users').child(currentUser.uid+"/hotspots/" + id).update({...objToFirebase }):
      db.database().ref('public/timeline_users').child(currentUser.uid+"/hotspots/" + id).set({...objToFirebase })


      let idkey = db.database().ref(`/'public/timeline_users`).push().key;
      hasSnapShot ? 
      db.database().ref('public/timeline_users_reports').child( idkey).update({...objToFirebase, id:idkey , date, timmestamp , uid: currentUser.uid , email: currentUser.email }):
      db.database().ref('public/timeline_users_reports').child( idkey ).set({...objToFirebase , id: idkey , date, timmestamp , uid: currentUser.uid , email: currentUser.email })

    }

    if (currentThumb === id) {
      // desativa
      setCurrentThumb(null);
    } else {
      setCurrentThumb(id);
      setTimeout(() => {
        setCurrentTour(id);
      }, 300)

      // click for right side of active
      let adjustMargin = 160;
      if (buttonIndex === -1) {
        // click for non active (first click)
        adjustMargin = 180;
      } else if (parseInt(index) > buttonIndex) {
        // click for before active
        adjustMargin = 120;
      }

      let newDistance = e.currentTarget.offsetLeft;
      let sobraSpacing = (width - adjustMargin) / 2;
      const posCenter = -newDistance + sobraSpacing;
      setButtonIndex(parseInt(index));
      setMoveX(posCenter);
    }
  }

  const updateOutofTimeline = (currentTour) =>{
    // if(currentTour === '100') {
    //   setCurrentThumb('1');
    //   // updateVisitedTour('1')
    // }
  }

  useEffect(() => {
    updateVisitedTour(currentTour);
    updateOutofTimeline(currentTour)
  }, [currentTour])

  useEffect(() => {
    const limitDrag = ((containerButtonRef.current.offsetWidth + paddingDrag) - width) * -1;
    setSobra(limitDrag);

    if (!isMobile) setIsOpen(true);
  }, [isMobile, width])

  const getDuration = () => moveX === 50 ? 1 : .3

  const getMoveX = () => {
    return isMobile ? moveX : paddingDrag;
  }

  const openCloseTimeline = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const addAttr = data.filter(dado => dado.type === "timeline").map(data => ({
      ...data
    }))
    setDados(addAttr)
    setReadData(true);

  }, [])

  useEffect(() => {

    if(readData) {
   
      try {
        db.database().ref('public/timeline_users').child(currentUser.uid).on("value", snapshot => {
          try {
            
            const snapshotVal = snapshot.val();

            // Se nenhum thumb ainda foi clicado pelo user 
            if(snapshotVal === null) {
              // console.log("não tem nenhum hotspot que já foi visitado");
              
            } else { 
              setHasSnapShot(true);
              // console.log("tem hotspots visitados");
              // console.log("val", snapshotVal.hotspots)

              // converte os visitados do firebase em array
              const arr = Object.keys(snapshotVal.hotspots);

              // copia o array atual
              const oldData = [...dados];
             
              // verifica se os ids atuais já foram visitados de acordo com o firebase
              const newData = oldData.map(thumb => {
                let newThumb = {}
                const found = arr.filter(id => id === thumb.id);
 
                if(found.length > 0) {
                  newThumb = {
                    ...thumb,
                    visited: true
                  }
                } else {
                  newThumb = {...thumb}
                }

                return newThumb
              } )

              // Popula o novo array com o visited = true
              setDados(newData);

            }

            setFirebaseRed(true);
          } catch (error) {
            // console.log("useEffect timeline error " , error)
          }
          
        })
      } catch (error) {
        
      }
    }

  }, [currentUser, readData])

  return (
    <div className={`timeline__wrapper ${isOpen ? '' : 'timeline-close'}`} >
      {/* <AnimatePresence>
      {isMobile &&  */}
         <motion.div
          key="button-open-close"
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0, x: '-50%', transition: { ease: 'easeInOut', duration: .3}}} 
          exit={{opacity: 0, transition: { duration: .3}}}
          onClick={openCloseTimeline}
          // className={`controller ${isOpen ? 'open' : 'closed'}`}>
          className={`controller ${isOpen ? 'open' : 'closed'} ${currentThumb === null ? '': 'has-open'}`}>
         <RiArrowDownSLine size={30} color="#FFF" />
        </motion.div>
      {/* }
      </AnimatePresence> */}
     
      <motion.div animate={{x: getMoveX(), opacity: getOpacityOpen(), transition: { ease: 'easeOut', duration: getDuration()}}} drag="x" dragConstraints={{ left: sobra, right: paddingDrag }} ref={containerButtonRef} className="buttons-container">
        { dados.length > 0 &&
          dados.map((button, index) => {
            const _class = currentThumb === button.id ? 'active' : '';
            const activeScale = currentThumb === button.id ? .8 : 1;
           const hasVisitedTour = button?.visited === true;
        
            const _classImage = hasVisitedTour ? 'image-container visit' : 'image-container'
            let _classBullet = 'first';
            if (index > 0 && index < dados.length - 1) {
              _classBullet = 'middle';
            } else if (index === dados.length - 1) {
              _classBullet = 'last'
            }
            return (
              <div key={button.id}
                data-id={button.id}
                data-index={index}
                className={`timeline__button ${_class}`}
                onMouseUp={_class !== 'active' ? onClick : () => { }}
                onMouseDown={_class !== 'active' ? setDown : () => { }}
              >
                  <AnimatePresence>
                    {_class === 'active' && 
                      <motion.div 
                      className="timeline__title"
                      key={button.title}
                      initial={{opacity: 0, y: 25}}
                      animate={{opacity: 1, y: 0, transition: { ease: 'easeOut', delay: .12, duration: .4}}} 
                      exit={{opacity: 0, y: 50,  transition: { duration: .2}}}>
                        <p>{button?.title}</p>
                      </motion.div>
                    }
                  </AnimatePresence>
                  
                <div className={_classImage} >
                  <div className="image" style={{ backgroundImage: `url(${getImage(button.image)})` }} />
                  <AnimatePresence>
                    {hasVisitedTour &&
                      <motion.div
                        key={button.title}
                        initial={{ opacity: 0, y: 0, x: 11 }}
                        animate={{ opacity: 1, scale: activeScale, y: -11, x: 11, transition: { ease: 'easeInOut', duration: .3 } }}
                        exit={{ opacity: 0, scale: 0, transition: { duration: .3 } }}
                        className="visited">
                        <FaCheck color="#FFF" size={11} />
                      </motion.div>

                    }
                  </AnimatePresence>
                </div>
                <div className="vertical-line" />
                <div className={`bullet ${_classBullet}`} />
              </div>
            )
          })
        }
        <div className="area-drag" />
      </motion.div>
    </div>
  )
}

export default TimelineComponent
