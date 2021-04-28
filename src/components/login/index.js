import React, { useState } from "react"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { Required } from '..'

export default function Login() {
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
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

    try {
      setError("")
      setLoading(true)
         await login(inputs.email, inputs.password)
         history.push("/virtual-tour")
    } catch {
      setError("Erro no login")
    }

    setLoading(false)
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <Container className="form">
          <h2 className="text-center mb-4">LOGO</h2>
          <Form onSubmit={handleSubmit} style={{minHeight: '600px'}}>
            <Form.Group id="email">
              <Form.Control onChange={handleChange} type="email" name="email" id="txtEmail" autoComplete="off" className={inputs.email !== '' ? 'filled': 'empty'} />
              <Form.Label className={inputs.email !== '' ? 'filled': 'empty'} htmlFor="txtEmail">Email</Form.Label>
              {inputs.email.length <= 0 && <Required />}
            </Form.Group>
            <Form.Group id="password" className="distance-top lighter">
              <Form.Control onChange={handleChange} name="password" type="password" autoComplete="off" className={inputs.password !== '' ? 'filled': 'empty'} />
              <Form.Label>Senha</Form.Label>
              {inputs.password.length <= 0 && <Required />}
            </Form.Group>
            <div className="w-100 text-center distance-top">
              <Link to="/forgot-password">Esqueci minha senha</Link>
            </div>
            {error && <Alert variant="danger mt-4">{error}</Alert>}
            <Button disabled={loading} className="btn-form w-100 distance-top" type="submit">
              Entrar
            </Button>
          </Form>
    </Container>
  )
}
