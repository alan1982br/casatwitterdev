import React, { useState, useEffect } from "react"
import { Form, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Required } from '..'

export default function Start() {
  const { login , checkEmail , activeEmail , activePassword , activePreRegisterPassword ,  checkEmailparticipant} = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()

  const [ inputs, setAllInputs ] = useState({
    email: ''
  });
  const handleChange = (e) => setAllInputs({...inputs, [e.target.name]: e.target.value.toLowerCase()})

  async function handleSubmit(e) {
    e.preventDefault()
    console.log("handleSubmit")
    if(validateEmail(inputs.email) !== true) return setError("Informe um e-mail válido.")

    // history.push("/register")
    // return ;
    try {
      setError("")
       
              await checkEmail(inputs.email.toLowerCase())
          //  await checkEmailparticipant(inputs.email);
      // history.push("/register")
    } catch {
      setError("O email digitado não consta em nosso sistema")
    }
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
 
  useEffect(() => {
    // const hasEmail = localStorage.getItem('@Twitter:ActiveEmail');

    console.log("ENTER PAGE START_________________")
    const activePassword = localStorage.getItem('@Twitter:passwordCreated');
    console.log("ENTER PAGE REGISTER activePassword _________________" , activePassword)
    
    const doLogin = async () => {
      console.log("REACT_APP_PASSWORD_USER_FIRST ", process.env.REACT_APP_PASSWORD_USER_FIRST)
      await login(activeEmail, process.env.REACT_APP_PASSWORD_USER_FIRST)
     
    }
    
    if(localStorage.getItem('@Twitter:ActiveEmail') === true){
      //  history.push("/register");
    } else {
      if(typeof(activeEmail) === 'string') {
        console.log("activePreRegisterPassword " , activePreRegisterPassword);
        if(activePassword === true){
          console.log("step1")
            history.push("/login")
          }else{
          doLogin()
         console.log("step2")
          // adicionar email ao localStorage
          localStorage.setItem('@Twitter:ActiveEmail',true)
          localStorage.setItem('@Twitter:email', activeEmail) 
          history.push("/register")
        }
      } else if (activeEmail === false) {
        setError("O email digitado não consta em nosso sistema")
        history.push("/start")
      }
    }
  //  }, [activeEmail, history, activePreRegisterPassword, login])
   }, [activeEmail, activePreRegisterPassword, history, login])

  useEffect(() => {
    const email = localStorage.getItem('@Twitter:email');
    if(email !== null) {
       history.push("/register")
    }
    
  }, [history])


  return (
    <Container className="form">
          <p className="text-center mb-4">Para começar digite o seu email abaixo</p>
          <Form onSubmit={handleSubmit} className="distance-top higher" style={{minHeight: '340px'}}>
            <Form.Group id="email">
              <Form.Control onChange={handleChange} type="text" name="email" id="txtEmail" autoComplete="off" className={inputs.email !== '' ? 'filled': 'empty'} />
              <Form.Label className={inputs.email !== '' ? 'filled': 'empty'} htmlFor="txtEmail">Email</Form.Label>
              {inputs.email.length <= 0 && <Required />}
            </Form.Group>
            {error && <Alert className="mt-4" variant="danger">{error}</Alert>}
            <Button className="btn-form w-100 distance-top" type="submit">
              Entrar
            </Button>
          </Form>
    </Container>
  )
}
