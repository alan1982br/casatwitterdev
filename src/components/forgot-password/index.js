import React, { useState } from "react"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { Required } from '..'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const history = useHistory();

  const [ inputs, setAllInputs ] = useState({
    email: ''
  });

  const handleChange = (e) => setAllInputs({...inputs, [e.target.name]: e.target.value})

  async function handleSubmit(e) {
    e.preventDefault()

    if(validateEmail(inputs.email) !== true) return setError("Informe um e-mail válido.")

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(inputs.email.toLowerCase())
      history.push('/email-enviado')
      // setMessage("Check your inbox for further instructions")
    } catch {
      setError("O email digitado não consta em nosso sistema")
    }
    setLoading(false)
  }

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <Container className="form">
        <p className="text-center mb-4">Digite seu email.</p>
          <Form onSubmit={handleSubmit} className="distance-top higher" style={{minHeight: '480px'}}>
            <Form.Group id="email">
              <Form.Control style={{textTransform: 'lowercase'}} onChange={handleChange} type="email" name="email" id="txtEmail" autoComplete="off" className={inputs.email !== '' ? 'filled': 'empty'} />
              <Form.Label className={inputs.email !== '' ? 'filled': 'empty'} htmlFor="txtEmail">Email</Form.Label>
              {inputs.email.length <= 0 && <Required />}
            </Form.Group>
            {error && <Alert className="distance-top" variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Button disabled={loading} className="btn-form w-100 distance-top" type="submit">
              Resetar Senha
            </Button>
            <div className="w-100 text-center mt-4">
              <Link to="/login">Login</Link>
            </div>
          </Form>
    </Container>
  )
}
