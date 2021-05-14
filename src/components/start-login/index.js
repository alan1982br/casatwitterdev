import React, { useState, useEffect } from "react"
import { Form, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Required } from '..'

export default function Start() {
  const { login , checkEmail , activeEmail, clearUser, userStartStatus, activeProfileEmail, activePassword , activePreRegisterPassword ,  checkEmailparticipant} = useAuth()
  const [error, setError] = useState("")
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
        //  await checkEmailparticipant(inputs.email);
        // history.push("/register")
    } catch (err) {
      // console.log('err start login:', err)

      if(err.message === 'user_not_found') {
        setError("O email digitado não consta em nosso sistema");
      } else if(err.message === 'error_network') {
        setError("Falha na comunicação com o sistema, tente novamente mais tarde.");
      }
    }
  }

  // Wait for pre-login
  useEffect(() => {
    // console.log("activeEmail: ", activeEmail, 
    //             "activePreRegisterPassword: ", activePreRegisterPassword, 
    //             "activeProfileEmail: ", activeProfileEmail)
    // TODO Verifcar se o usuário já confirmou email, para mandar para o login
    // activeProfileEmail verifica se o user já ativou a conta
    if(userStartStatus !== 0) {
      // console.log("atualizou a chamada")
      if(activeEmail !== null) {
        console.log("activeProfileEmail: ", activeProfileEmail)
  
        // Se já registrou, verifica se verificou email ou não
        if(activePreRegisterPassword) {
          if(activeProfileEmail === false) {
            // Se não verificou o email, manda para o confirme-email
            console.log('email existe, registro pendente => /confirme-email')
          } else {
            // Se verificou o email, manda para o login
            console.log('email existe, registro feito => /login')
          }
        } else if(activeProfileEmail !== true) {
          console.log(activeEmail, activePreRegisterPassword, activeProfileEmail)
          // ainda não fez o registro, vai para o register
          localStorage.setItem('@Twitter:email', activeEmail) 
          // history.push('/register');
          console.log('registro pendente => /register')
        }
      }
    } else {
      // console.log("nao atualizou a chamada")
    }
    
    //eslint-disable-next-line
  }, [userStartStatus])
  // }, [activePreRegisterPassword, activeProfileEmail])
  // }, [activeEmail, activePreRegisterPassword, activeProfileEmail])

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
 
  useEffect(() => {
    // const hasEmail = localStorage.getItem('@Twitter:ActiveEmail');

    // 1o - Se a pessoa nunca logou - entrando pela primeira vez

    // 2o - A pessoa já logou, mas quer entrar como outro usuário (talvez)

    // 3o mais antigo - verifica se a pessoa ja logou e manda para o redirect

    /*
    console.log("ENTER PAGE START_________________")
    const activePassword = localStorage.getItem('@Twitter:passwordCreated');
    console.log("ENTER PAGE REGISTER activePassword _________________" , activePassword)
    
    const doLogin = async () => {
      console.log("REACT_APP_PASSWORD_USER_FIRST ", process.env.REACT_APP_PASSWORD_USER_FIRST)
      await login(activeEmail, process.env.REACT_APP_PASSWORD_USER_FIRST)
      
    }
    
    if(localStorage.getItem('@Twitter:ActiveEmail') === true){
      //  history.push("/register");
      console.log("tem email verificado")
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
        // history.push("/start")
      }
    }
    //  }, [activeEmail, history, activePreRegisterPassword, login])
    */
    // Não remover o eslint abaixo
    //eslint-disable-next-line
   }, []);

  useEffect(() => {
    const email = localStorage.getItem('@Twitter:email');
    if(email !== null) {
      //  history.push("/register")
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
