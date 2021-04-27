import React, { useRef, useState, useEffect} from 'react'
import { useResize } from '../../hooks'
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { IoCloseSharp } from 'react-icons/all';
import './style.scss'

const TermsOfUseComponent = () => {

  const { isMobile, height } = useResize();
  const [ containerTextHeight, setContainerTextHeight ] = useState('40vh')
  const titleRef = useRef(null);
  const termsRef = useRef(null);
  const dispatch = useDispatch();
  const showHideTerms = (show) => {
    dispatch({ type: 'UPDATE_TERMS', payload: show });
  }

  useEffect(() => {
    const WrapperHeight = termsRef?.current.clientHeight
    const titleHeight = titleRef?.current.clientHeight;

    const newHeight = WrapperHeight - titleHeight - 40;
    setContainerTextHeight(newHeight);
  }, [titleRef, isMobile, height])

  return (
    <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1, transition: {delay: .15, ease: 'easeInOut', duration: .5}}} 
            exit={{opacity: 0, transition: { duration: .3}}}
            className="modal-wrapper">
              <Col className="col-11 col-md-6 d-flex align-items-center justify-content-center button-container">
                  <Col className="col-12 d-flex align-items-end justify-content-end">
                    <IoCloseSharp style={{cursor: 'pointer'}} size={40} color="#FFF" onClick={() => showHideTerms(false)} />
                  </Col>
              </Col>
              <Col className="col-11 col-md-6 terms-container" ref={termsRef}>
                <Row className="title__container" ref={titleRef}>
                  <Col className="col-12 d-flex align-items-center justify-content-center mt-4">
                    <h1>TERMO DE CESSÃO DE DIREITOS DE USO DE IMAGEM E DE USO DE DADOS PESSOAIS</h1>
                  </Col>
                </Row>
                <Row className="text-container">
                  <Col style={{ maxHeight: containerTextHeight}} className="col-12 d-flex flex-column">
                    <p>Este documento (“Termos”) explica as práticas e cautelas relativas à privacidade, proteção de dados e as regras para a participação no evento Casa Twitter.
                      O evento Casa Twitter é um evento idealizado e organizado pelo <b>TWITTER DO BRASIL REDE DE INFORMAÇÃO LTDA.</b>, pessoa jurídica, inscrita no CNPJ/MF sob o n.º 16.954.565/0001-48, estabelecida na Av. Brig. Faria Lima 4221, 9º andar, Itaim Bibi, CEP 04538-133, São Paulo – SP, Brasil, doravante denominada Twitter, e de outro lado o público convidado, doravante denominado cedente. O evento divulgará conteúdo exclusivo à seus convidados.
                    </p>
                  <p>Considerando que o Twitter permitirá o acesso ao ambiente online Casatwitter.com.br, na data de 07/05/2021 à 28/05/2021 ("Ambiente"), e para a sua entrada e navegação coletará os seguintes dados, pessoais e não pessoais: nome da empresa, nome completo dos participantes, telefone, e-mail, cargo, imagem, que deverá ser enviada pela Cedente ao adentrar no Ambiente, além dos registros de navegação relativos aos acessos do Cedente ao Ambiente e seus espaços.</p>
                  <p>1. O Cedente, titular dos dados pessoais, pelo presente instrumento, e na melhor forma de direito, de acordo, também, com a Lei 13.709/18 ("LGPD"), cede e autoriza, pelo prazo de 2 (dois) anos para uso globalmente, sem qualquer ônus, o direito de uso de sua imagem e voz pelo o Twitter, para a finalidade específica e seu uso exclusivo no Ambiente e também em seus canais online e offline, que poderão ser em folders, anúncios, sites, panfletos, e-mails internos, vídeos, plataformas de streaming, redes sociais e em outros sites, para a publicação de eventos e outros materiais desenvolvidos pelo Twitter. 
                  </p>
                  <p>2. O titular dos dados autoriza, de forma expressa e específica, o uso do seu nome, imagem e voz para as finalidades de divulgação interna no Twitter e também para divulgação em materiais comerciais, utilizados localmente no Brasil e/ou globalmente.</p>
                  <p>3. O titular dos dados autoriza, de forma expressa e específica, o uso dos dados acima mencionados para fins de personalização do conteúdo e da sua experiência dentro do Ambiente, de acordo com os seus hábitos e histórico de navegação dentro do Ambiente.
                  </p>
                  <p>4. O Cedente, neste ato, declara que renuncia o direito de reivindicar qualquer tipo de indenização de qualquer natureza pela utilização dos dados acima, independente do canal de veiculação. 
                  </p>
                  <p>5. Caso qualquer disposição deste Contrato seja considerada nula ou inexequível, a validade ou exequibilidade das demais disposições do mesmo não serão afetadas.
                  </p>
                  <p>6. As modificações das cláusulas ou condições deste Instrumento somente terão validade se celebrado um termo expresso e escrito, assinado pelas Partes. 
                  </p>
                  <p>7. As Partes elegem o Foro Central da Comarca da Capital do Estado de São Paulo para dirimir as questões oriundas deste instrumento.
                  </p>
                  <p className="text-center">São Paulo, 7 de maio de 2021.</p>
                  <p className="margin-black"><b>TWITTER DO BRASIL REDE DE INFORMAÇÃO LTDA</b></p>
                  <p className="text-center"><b>XXXXX</b></p>
                  </Col>
                </Row>
              </Col>
    </motion.div>
  )
}

export default TermsOfUseComponent
