import React, { useState, useEffect } from "react"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Required } from '..'

export default function Register() {
  const { signup, activeEmail, updatePassword } = useAuth()
  const [error, setError] = useState("")
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const showHideTerms = (show) => {
    dispatch({ type: 'UPDATE_TERMS', payload: show });
  }

  const [ inputs, setAllInputs ] = useState({
    checked: false,
    nome: '',
    empresa: '',
    cargo: '',
    email: '',
    user_twitter: '',
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
    e.preventDefault();

    if(inputs.nome === '') return setError("O campo Nome deve ser preenchido.")

    if(inputs.empresa === '') return setError("O campo Empresa deve ser preenchido.")

    if(inputs.cargo === '') return setError("O campo Cargo deve ser preenchido.")

    if(inputs.user_twitter === '') return setError("O campo @user deve ser preenchido.")

    if(inputs.password.length < 1) return setError("O campo Senha deve ser preenchido.")

    if(inputs.passwordConfirm.length < 1) return setError("O campo Confirmar Senha deve ser preenchido.")

    console.log(inputs.password.length, inputs.passwordConfirm.length)
    if (inputs.password !== inputs.passwordConfirm) {
      return setError("As senhas não são iguais")
    } 

    try {
      setError("")
      // console.log("nome", inputs.nome, "password", inputs.password)
      await updatePassword(inputs.password, inputs.nome, inputs.user_twitter)
      history.push("/confirme-email")
    } catch {
      setError("erro ao tentar conectar com o servidor")
    }
  }

  useEffect(() => {
    const email = localStorage.getItem('@Twitter:email');
    if(email !== null) {
      setUserEmail(email);
    } else {
       history.push("/start")
    }
  }, [history])

  return (
    <Container className="form">
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control disabled type="text" name="email" value={userEmail} />
              <Form.Label>Email</Form.Label>
            </Form.Group>
            <Form.Group id="nome" className="distance-top lighter">
              <Form.Control onChange={handleChange} value={inputs.nome} type="text" name="nome" autoComplete="off" className={inputs.nome !== '' ? 'filled': 'empty'} />
              <Form.Label>Nome</Form.Label>
              {inputs.nome.length <= 0 && <Required />}
            </Form.Group>
            <Form.Group id="empresa" className="distance-top lighter">
              <Form.Control onChange={handleChange} value={inputs.empresa} type="text" name="empresa" autoComplete="off" className={inputs.empresa !== '' ? 'filled': 'empty'} />
              <Form.Label>Empresa</Form.Label>
              {inputs.empresa.length <= 0 && <Required />}
            </Form.Group>
            <Form.Group id="cargo" className="distance-top lighter">
              <Form.Control onChange={handleChange} value={inputs.cargo} type="text" name="cargo" autoComplete="off" className={inputs.cargo !== '' ? 'filled': 'empty'} />
              <Form.Label>Cargo</Form.Label>
              {inputs.cargo.length <= 0 && <Required />}
            </Form.Group>
            <Form.Group id="user_twitter" className="distance-top lighter">
              <Form.Control type="text" onChange={handleChange} value={inputs.user_twitter} name="user_twitter" autoComplete="off" className={inputs.user_twitter !== '' ? 'filled': 'empty'} />
              <Form.Label>@user</Form.Label>
              {inputs.user_twitter.length <= 0 && <Required />}
            </Form.Group>
            <Form.Group id="password" className="distance-top lighter">
              <Form.Control onChange={handleChange} name="password" type="password" autoComplete="off" className={inputs.password !== '' ? 'filled': 'empty'} />
              <Form.Label>Senha</Form.Label>
              {inputs.password.length <= 0 && <Required />}
            </Form.Group>
            <Form.Group id="password-confirm" className="distance-top lighter">
              <Form.Control onChange={handleChange} name="passwordConfirm"  type="password" autoComplete="off" className={inputs.passwordConfirm !== '' ? 'filled': 'empty'} />
              <Form.Label>Confirmar senha</Form.Label>
              {inputs.passwordConfirm.length <= 0 && <Required />}
            </Form.Group>
            <label className={inputs.checked !== false ? 'checkbox filled distance-top lighter': 'checkbox empty distance-top lighter'} onClick={handleChangeCheckbox}>
              <div className={inputs.checked ? 'checked': ''} />
              <p>Aceito os <span className="termos">Termos de uso</span>.</p>
            </label>
            {error && <Alert className="mt-4" variant="danger">{error}</Alert>}
            <p className="mt-4 text-center preencha">*Preencha todos os campos para continuar</p>
            <Button disabled={!inputs.checked} style={{opacity: inputs.checked ? 1 : .5 }} className="btn-form w-100 distance-top lighter" type="submit">
              Cadastrar
            </Button>
          </Form>
    </Container>
  )
}
