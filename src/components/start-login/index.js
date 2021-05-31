import React, { useState, useEffect } from "react"
import { Form, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Required } from '..'

export default function Start() {
  const { login, checkEmail, activeEmail, setUserStartStatus, userStartStatus, activeProfileEmail, activePreRegisterPassword } = useAuth()
  const [error, setError] = useState("")
  const [freeze, setFreeze] = useState(false);
  const history = useHistory()

  const [ inputs, setAllInputs ] = useState({
    email: ''
  });
  const handleChange = (e) => setAllInputs({...inputs, [e.target.name]: e.target.value.toLowerCase()})

  async function handleSubmit(e) {
    e.preventDefault()
    if(validateEmail(inputs.email) !== true) return setError("Informe um e-mail válido.")

    // clearUser();

    try {
      setError("")
        await checkEmail(inputs.email.toLowerCase())
        
    } catch (err) {
      // console.log('err start login:', err)

      if(err.message === 'user_not_found') {

        // setError("O email digitado não consta em nosso sistema");
      } else if(err.message === 'error_network') {
        setError("Falha na comunicação com o sistema, tente novamente mais tarde.");
      }
    }
  }
 

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const doRegister = async () => {
    // console.log("REACT_APP_PASSWORD_USER_FIRST ", process.env.REACT_APP_PASSWORD_USER_FIRST)
    // await login(activeEmail, process.env.REACT_APP_PASSWORD_USER_FIRST)
    // console.log('registro pendente => /register pelo doLogin')
    history.push('/register');
    
  }
 
 

  useEffect(() => {
    const email = localStorage.getItem('@Twitter:email');
    if(email !== null) {
      //  history.push("/register")
    }
  }, [history])


  return (
    <Container className="form">
      <p className="text-center mb-4">Para começar digite o seu email abaixo<br /></p>
          <Form onSubmit={handleSubmit} className="distance-top higher" style={{minHeight: '340px'}}>
            <Form.Group id="email">
              <Form.Control onChange={handleChange} type="text" name="email" id="txtEmail" autoComplete="off" className={inputs.email !== '' ? 'filled': 'empty'} />
              <Form.Label className={inputs.email !== '' ? 'filled': 'empty'} htmlFor="txtEmail">Email</Form.Label>
              {inputs.email.length <= 0 && <Required />}
            </Form.Group>
            {error && <Alert className="mt-4" variant="danger">{error}</Alert>}
            <Button disabled={freeze} className="btn-form w-100 distance-top" type="submit">
              Entrar
            </Button>
          </Form>
    </Container>
  )
}
