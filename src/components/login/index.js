import React, { useState, useEffect } from "react"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { RiEyeFill, RiEyeOffFill } from 'react-icons/all'
import { Required } from '..'

export default function Login() {
  const { login, clearUser } = useAuth()
  const [ userEmail, setUserEmail] = useState(null);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [ typePassword, setTypePassword ] = useState('password');
  const history = useHistory()

  const [ inputs, setAllInputs ] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => setAllInputs({...inputs, [e.target.name]: e.target.value})

  async function handleSubmit(e) {
    e.preventDefault()

    if(validateEmail(inputs.email) !== true) return setError("Informe um e-mail válido.")

    if(inputs.password.length < 1) return setError("O campo Senha deve ser preenchido.")

    if(inputs.password.length < 8) return setError("O campo Senha deve ser pelo menos 8 caracteres.")

    try {
      setError("")
      setLoading(true)
         const response = await login(inputs.email.toLowerCase(), inputs.password)
        //  console.log("retorno", response)
         if(response === 'auth/wrong-password') {
           setLoading(false)
           return setError("Email ou senha incorretos.");
         } else if(response === 'auth/too-many-requests') {
          setLoading(false)
          return setError("Muitas tentativas incorretas, tente novamente mais tarde.");
        }
         
    } catch {
      setError("Erro no login")
    }

    setLoading(false)
  }

   const handleCadastrar = async() => {
      // console.log("cadastrar");
      clearUser(true);
      history.push('/start');
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const changeIconPassword = () => {
    if(typePassword === 'password') setTypePassword('text');
    else setTypePassword('password');
  }

  const getIconVisibleEmail = (str) => {
    if(str === 'passwordConfirm') {
      if(inputs.passwordConfirm.length > 0){
        if(typePassword === 'password') {
          return <RiEyeOffFill className="icon-required cursor-pointer" color="#1D9BF0" style={{cursor: 'pointer'}} onClick={changeIconPassword} />
        }
        if(typePassword === 'text') {
          return <RiEyeFill className="icon-required" style={{cursor: 'pointer'}} color="#1D9BF0" onClick={changeIconPassword} />
        }
      }
    }

    if(str === 'password') {
      if(inputs.password.length > 0){
        if(typePassword === 'password') {
          return <RiEyeOffFill className="icon-required cursor-pointer" color="#1D9BF0" style={{cursor: 'pointer'}} onClick={changeIconPassword} />
        }
        if(typePassword === 'text') {
          return <RiEyeFill className="icon-required cursor-pointer" color="#1D9BF0" style={{cursor: 'pointer'}} onClick={changeIconPassword} />
        }
      }
    }
  }

  useEffect(() => {
    const emailLocal = localStorage.getItem('@Twitter:email');

    // check if has localStorage
    if(validateEmail(emailLocal)){
      var oldInputs = {...inputs}
      oldInputs.email = emailLocal;
      setAllInputs(oldInputs);
      setUserEmail(emailLocal);
    } 
    //eslint-disable-next-line
  }, [])

  return (
    <Container className="form">
          <Form onSubmit={handleSubmit} style={{minHeight: '600px'}}>
            <Form.Group id="email">
              <Form.Control disabled={userEmail !== null} onChange={handleChange} value={userEmail} style={{textTransform: 'lowercase'}} type="text" name="email" id="txtEmail" autoComplete="off" className={inputs.email !== '' ? 'filled': 'empty'} />
              <Form.Label className={inputs.email !== '' ? 'filled': 'empty'} htmlFor="txtEmail">Email</Form.Label>
              {inputs.email.length <= 0 && <Required />}
            </Form.Group>
            <Form.Group id="password" className="distance-top lighter">
              <Form.Control onChange={handleChange} name="password" type={typePassword} autoComplete="off" className={inputs.password !== '' ? 'filled': 'empty'} />
              <Form.Label>Senha</Form.Label>
              {inputs.password.length <= 0 && <Required />}
              {getIconVisibleEmail("password")}
            </Form.Group>
            <div className="w-100 text-center distance-top">
              <Link to="/forgot-password">Esqueci minha senha</Link>
            </div>
            {userEmail !== null && <p className="text-center mt-3">Não é você? <span onClick={handleCadastrar} style={{textDecoration: 'underline', cursor: 'pointer'}}>Alterar usuário.</span></p>}
            {error && <Alert variant="danger mt-4">{error}</Alert>}
            <Button disabled={loading} className="btn-form w-100 distance-top" type="submit">
              Entrar
            </Button>
          </Form>
    </Container>
  )
}
