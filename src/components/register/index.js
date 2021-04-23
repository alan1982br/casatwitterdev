import React, { useState } from "react"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"

export default function Register() {
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch();

  const showHideTerms = (show) => {
    dispatch({ type: 'UPDATE_TERMS', payload: show });
  }

  const [ inputs, setAllInputs ] = useState({
    checked: false,
    email: '',
    nome: '',
    user: '',
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e) => setAllInputs({...inputs, [e.target.name]: e.target.value})
  const handleChangeCheckbox = (e) =>  {
    if(e.target.classList.value === "termos") {
      showHideTerms(true);
    } else {
      setAllInputs({...inputs, checked : !inputs.checked})
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (inputs.password !== inputs.passwordConfirm) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(inputs.email, inputs.password)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <Container className="form">
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control disabled type="text" name="email" value="fulano@twitter.com.br" />
              <Form.Label>Email</Form.Label>
            </Form.Group>
            <Form.Group id="nome" className="distance-top lighter">
              <Form.Control onChange={handleChange} type="text" name="nome" required autoComplete="off" />
              <Form.Label>Nome</Form.Label>
            </Form.Group>
            <Form.Group id="user" className="distance-top lighter">
              <Form.Control type="text" onChange={handleChange} name="user" autoComplete="off" />
              <Form.Label>@user</Form.Label>
            </Form.Group>
            <Form.Group id="password" className="distance-top lighter">
              <Form.Control onChange={handleChange} name="password" type="password" required autoComplete="off" />
              <Form.Label>Senha</Form.Label>
            </Form.Group>
            <Form.Group id="password-confirm" className="distance-top lighter">
              <Form.Control onChange={handleChange} name="passwordConfirm"  type="password" required autoComplete="off" />
              <Form.Label>Confirmar senha</Form.Label>
            </Form.Group>
            <label className={inputs.checked !== false ? 'checkbox filled distance-top lighter': 'checkbox empty distance-top lighter'} onClick={handleChangeCheckbox}>
              <div className={inputs.checked ? 'checked': ''} />
              <p>Aceito os <span className="termos">Termos de uso</span>.</p>
            </label>
            <p className="distance-top text-center preencha">*Preencha todos os campos para continuar</p>
            <Button disabled={loading} className="btn-form w-100 distance-top lighter" type="submit">
              Cadastrar
            </Button>
          </Form>
    </Container>
  )
}
