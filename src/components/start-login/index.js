import React, { useState } from "react"
import { Form, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"

export default function Start() {
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const [ inputs, setAllInputs ] = useState({
    email: ''
  });

  const handleChange = (e) => setAllInputs({...inputs, [e.target.name]: e.target.value})

  async function handleSubmit(e) {
    e.preventDefault()

    history.push("/register")
    return ;
    // try {
    //   setError("")
    //   setLoading(true)
    //   // await login(emailRef.current.value, passwordRef.current.value)
    //   await login(inputs.email, 'Venosa@dev0003')
    //   history.push("/confirme-email")
    // } catch {
    //   setError("Failed to log in")
    // }

    // setLoading(false)
  }

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
