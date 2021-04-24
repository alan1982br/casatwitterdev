import React, { useState, useEffect } from "react"
import { Form, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"

export default function Start() {
  const { login , checkEmail , activeEmail , activePassword} = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()

  const [ inputs, setAllInputs ] = useState({
    email: ''
  });
  const handleChange = (e) => setAllInputs({...inputs, [e.target.name]: e.target.value})

  async function handleSubmit(e) {
    e.preventDefault()

    // history.push("/register")
    // return ;
    try {
      setError("")
      // await login(emailRef.current.value, passwordRef.current.value)
     await checkEmail(inputs.email)
      // history.push("/register")
    } catch {
      setError("Seu email não existe")
    }
  }

  useEffect(() => {
    const hasEmail = localStorage.getItem('@Twitter:ActiveEmail');

    const doLogin = async () => {
      console.log("REACT_APP_PASSWORD_USER_FIRST ", process.env.REACT_APP_PASSWORD_USER_FIRST)
      await login(activeEmail, process.env.REACT_APP_PASSWORD_USER_FIRST)
     
    }
  // if(!activePassword){
    if(localStorage.getItem('@Twitter:ActiveEmail') === true){
      history.push("/register");
    } else {
      if(typeof(activeEmail) === 'string') {
        history.push("/register")
        doLogin()
        // adicionar email ao localStorage
        localStorage.setItem('@Twitter:ActiveEmail',true)
        localStorage.setItem('@Twitter:email', activeEmail)
      } else if (activeEmail === false) {
        setError("Seu email não existe")
        history.push("/start")
      }
    }

  // }else{

  //   history.push("/confirme-email")

  // }
    
    
  }, [activeEmail,activePassword])

  useEffect(() => {
    const email = localStorage.getItem('@Twitter:email');
    if(email !== null) {
      history.push("/register")
    }
    console.log('activePassword ', activePassword)
  }, [activePassword])


  return (
    <Container className="form">
          <p className="text-center mb-4">Para começar digite o seu email abaixo</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} className="distance-top higher">
            <Form.Group id="email">
              <Form.Control onChange={handleChange} type="email" name="email" id="txtEmail" required autoComplete="off" />
              <Form.Label className={inputs.email !== '' ? 'filled': 'empty'} htmlFor="txtEmail">Email</Form.Label>
            </Form.Group>
            <Button className="btn-form w-100 distance-top" type="submit">
              Entrar
            </Button>
          </Form>
    </Container>
  )
}
