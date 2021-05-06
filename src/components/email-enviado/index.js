import React from "react"
import { Form, Button, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"

export default function EmailEnviado() {
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    history.push("/login")
  }

  return (
    <Container className="form">
          <h2 className="mb-4">E-mail enviado</h2>
          <p className="text-center mb-4">Por segurança, pedimos que você confirme seu email na caixa de entrada.</p>
          <Form onSubmit={handleSubmit} className="distance-top" style={{minHeight: '340px'}}>
            <Button className="btn-form w-100 distance-top" type="submit">
              Entrar
            </Button>
          </Form>
    </Container>
  )
}
