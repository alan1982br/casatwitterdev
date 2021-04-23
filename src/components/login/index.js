import React, { useRef, useState } from "react"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      // await login(emailRef.current.value, passwordRef.current.value)
      await login(emailRef.current.value, 'Venosa@dev0003')
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <Container className="form">
          <h2 className="text-center mb-4">LOGO</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="distance-top">
              <Form.Control type="email" ref={emailRef} required />
              <Form.Label>Email</Form.Label>
            </Form.Group>
            <Form.Group id="password" className="distance-top">
              <Form.Control type="password" ref={passwordRef} required />
              <Form.Label>Password</Form.Label>
            </Form.Group>
            <div className="w-100 text-center distance-top">
              <Link to="/signup">Esqueci minha senha</Link>
            </div>
            <Button disabled={loading} className="btn-form w-100 distance-top" type="submit">
              Entrar
            </Button>
          </Form>
    </Container>
  )
}
