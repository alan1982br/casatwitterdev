import React, { useEffect } from 'react'
import { getImage } from '../../utils'
import './style.scss'

const PesquisaPage = () => {

  useEffect(() => {
    document.body.style.backgroundColor = "#1D9BF0";
    return () => document.body.style.backgroundColor = "#FFF";
  }, [])

  return (
    <div class="container-fluid pesquisa vh-100" style={{backgroundImage: `url(${getImage('bg_Html_Index.jpg')})`}}>
      <div className="row content-container">
        <div className="col-md-8 d-block video-container">
            <div style={{width: '100%'}}>
              <img className="image-header" 
                   src={getImage('headerRelatorioPesquisa.jpg')}
                   alt="Pesquisa"
              />
            </div>
            <div className="iframe-wrapper">
              <iframe className="iframe-container" id="typeform-full" title="Pesquisa" frameBorder="0" allow="camera; microphone; autoplay; encrypted-media;" src="https://form.typeform.com/to/QJBa4D89?typeform-medium=embed-snippet"></iframe>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PesquisaPage
