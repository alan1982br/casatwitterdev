import React, { useState } from "react"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { RiEyeFill, RiEyeOffFill } from 'react-icons/all'
import { Required } from '..'

export default function Login() {
  const { login } = useAuth()
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
         await login(inputs.email.toLowerCase(), inputs.password)
         history.push("/virtual-tour")
    } catch {
      setError("Erro no login")
    }

    setLoading(false)
  }

   const handleCadastrar = async() => {
    await localStorage.removeItem('@Twitter:ActiveEmail');
    await localStorage.removeItem('@Twitter:email');
    await localStorage.removeItem('@Twitter:passwordCreated');
    await localStorage.removeItem('@Twitter:uid');

    setTimeout(() => {
      history.push('/');

    }, 700)

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

  return (
    <Container className="form">
          <Form onSubmit={handleSubmit} style={{minHeight: '600px'}}>
            <Form.Group id="email">
              <Form.Control onChange={handleChange} style={{textTransform: 'lowercase'}} type="text" name="email" id="txtEmail" autoComplete="off" className={inputs.email !== '' ? 'filled': 'empty'} />
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
            <p className="text-center mt-3" onClick={handleCadastrar}>Ainda não é cadastrado? <span style={{textDecoration: 'underline', cursor: 'pointer'}}>Cadastrar</span></p>
            {error && <Alert variant="danger mt-4">{error}</Alert>}
            <Button disabled={loading} className="btn-form w-100 distance-top" type="submit">
              Entrar
            </Button>
          </Form>
    </Container>
  )
}
