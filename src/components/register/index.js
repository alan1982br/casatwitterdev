import React, { useState, useEffect } from "react"
import { Form, Button, Container, Alert } from "react-bootstrap"
import { useDispatch } from 'react-redux';
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Required } from '..'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/all'

export default function Register() {
  const { login, signup, activeEmail, updatePassword, activePreRegisterPassword, checkEmailparticipant } = useAuth()
  const [error, setError] = useState("")
  const [userEmail, setUserEmail] = useState('');
  const [typePassword, setTypePassword] = useState('password');
  const history = useHistory();
  const dispatch = useDispatch();

  const showHideTerms = (show) => {
    dispatch({ type: 'UPDATE_TERMS', payload: show });
  }

  const handleLogout  = async() => {
    await localStorage.removeItem('@Twitter:ActiveEmail');
    await localStorage.removeItem('@Twitter:email');
    await localStorage.removeItem('@Twitter:passwordCreated');
    await localStorage.removeItem('@Twitter:uid');

    setTimeout(() => {
      history.push('/start');

    }, 2500)
  }

  const [inputs, setAllInputs] = useState({
    checked: false,
    nome: '',
    empresa: '',
    cargo: '',
    email: '',
    user_twitter: '',
    password: '',
    passwordConfirm: ''
  });

  const handleChange = (e) => setAllInputs({ ...inputs, [e.target.name]: e.target.value })
  const handleChangeCheckbox = (e) => {
    if (e.target.classList.value === "termos") {
      showHideTerms(true);
    } else {
      setAllInputs({ ...inputs, checked: !inputs.checked })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (inputs.nome === '') return setError("O campo Nome deve ser preenchido.")

    if (inputs.empresa === '') return setError("O campo Empresa deve ser preenchido.")

    if (inputs.cargo === '') return setError("O campo Cargo deve ser preenchido.")

    // if (inputs.user_twitter === '') return setError("O campo @user deve ser preenchido.")

    if (inputs.password.length < 1) return setError("O campo Senha deve ser preenchido.")

    if (inputs.password.length < 8) return setError("O campo Senha deve ser pelo menos 8 caracteres.")

    if (inputs.passwordConfirm.length < 1) return setError("O campo Confirmar Senha deve ser preenchido.")

    console.log(inputs.password.length, inputs.passwordConfirm.length)
    if (inputs.password !== inputs.passwordConfirm) {
      return setError("As senhas não são iguais")
    }

    try {
      setError("")
      // console.log("nome", inputs.nome, "password", inputs.password)
      await updatePassword(inputs.nome, inputs.empresa, inputs.cargo,
                                inputs.user_twitter, inputs.password);
      // history.push("/confirme-email")
    } catch {
      setError("erro ao tentar conectar com o servidor")
    }
  }

  const changeIconPassword = () => {
    if (typePassword === 'password') setTypePassword('text');
    else setTypePassword('password');
  }

  const getIconVisibleEmail = (str) => {
    if (str === 'passwordConfirm') {
      if (inputs.passwordConfirm.length > 0) {
        if (typePassword === 'password') {
          return <RiEyeOffFill className="icon-required cursor-pointer" color="#1D9BF0" style={{ cursor: 'pointer' }} onClick={changeIconPassword} />
        }
        if (typePassword === 'text') {
          return <RiEyeFill className="icon-required" style={{ cursor: 'pointer' }} color="#1D9BF0" onClick={changeIconPassword} />
        }
      }
    }

    if (str === 'password') {
      if (inputs.password.length > 0) {
        if (typePassword === 'password') {
          return <RiEyeOffFill className="icon-required cursor-pointer" color="#1D9BF0" style={{ cursor: 'pointer' }} onClick={changeIconPassword} />
        }
        if (typePassword === 'text') {
          return <RiEyeFill className="icon-required cursor-pointer" color="#1D9BF0" style={{ cursor: 'pointer' }} onClick={changeIconPassword} />
        }
      }
    }
  }

  useEffect(() => {

    console.log("ENTER PAGE REGISTER_________________", activePreRegisterPassword)

    const email = localStorage.getItem('@Twitter:email');
    const activePassword = localStorage.getItem('@Twitter:passwordCreated');

    // console.log("ENTER PAGE REGISTER activePassword _________________", activePassword)

    // const doLogin = async (email) => {
    //   console.log("REACT_APP_PASSWORD_USER_FIRST ", process.env.REACT_APP_PASSWORD_USER_FIRST)
    //   await login(email, process.env.REACT_APP_PASSWORD_USER_FIRST)
     
    // }

    // if (activePassword === 'true') {
    //   history.push("/login")
    // } else {
    //   if (email !== null) {
    //     setUserEmail(email);
    //     if(activePassword === false){
    //       doLogin(email);
    //     }
        
    //   } else {
    //     history.push("/start")
    //   }
    // }

  }, [activePreRegisterPassword, history])


  return (
    <Container className="form">
      <Form onSubmit={handleSubmit} className="register">
        <Form.Group id="email">
          <Form.Control disabled type="text" name="email" value={userEmail} style={{ textTransform: 'lowercase' }} />
          <Form.Label>Email</Form.Label>
        </Form.Group>
        <Form.Group id="nome" className="distance-top lighter">
          <Form.Control onChange={handleChange} value={inputs.nome} type="text" name="nome" autoComplete="off" className={inputs.nome !== '' ? 'filled' : 'empty'} />
          <Form.Label>Nome</Form.Label>
          {inputs.nome.length <= 0 && <Required />}
        </Form.Group>
        <Form.Group id="empresa" className="distance-top lighter">
          <Form.Control onChange={handleChange} value={inputs.empresa} type="text" name="empresa" autoComplete="off" className={inputs.empresa !== '' ? 'filled' : 'empty'} />
          <Form.Label>Empresa</Form.Label>
          {inputs.empresa.length <= 0 && <Required />}
        </Form.Group>
        <Form.Group id="cargo" className="distance-top lighter">
          <Form.Control onChange={handleChange} value={inputs.cargo} type="text" name="cargo" autoComplete="off" className={inputs.cargo !== '' ? 'filled' : 'empty'} />
          <Form.Label>Cargo</Form.Label>
          {inputs.cargo.length <= 0 && <Required />}
        </Form.Group>
        <Form.Group id="user_twitter" className="distance-top lighter">
          <Form.Control type="text" onChange={handleChange} value={inputs.user_twitter} name="user_twitter" autoComplete="off" className={inputs.user_twitter !== '' ? 'filled' : 'empty'} />
          <Form.Label>@perfil no Twitter</Form.Label>
        </Form.Group>
        <Form.Group id="password" className="distance-top lighter">
          <Form.Control onChange={handleChange} name="password" type={typePassword} autoComplete="off" className={inputs.password !== '' ? 'filled' : 'empty'} />
          <Form.Label>Senha</Form.Label>
          {inputs.password.length <= 0 && <Required />}
          {getIconVisibleEmail("password")}
        </Form.Group>
        <Form.Group id="password-confirm" className="distance-top lighter">
          <Form.Control onChange={handleChange} name="passwordConfirm" type={typePassword} autoComplete="off" className={inputs.passwordConfirm !== '' ? 'filled' : 'empty'} />
          <Form.Label>Confirmar senha</Form.Label>
          {inputs.passwordConfirm.length <= 0 && <Required />}
          {getIconVisibleEmail("passwordConfirm")}
        </Form.Group>
        <label className={inputs.checked !== false ? 'checkbox filled distance-top lighter' : 'checkbox empty distance-top lighter'} onClick={handleChangeCheckbox}>
          <div className={inputs.checked ? 'checked' : ''} />
          <p>Aceito os <span className="termos">Termos de uso</span>.</p>
        </label>
        <p className="text-center mt-3" onClick={handleLogout}>Não é você? <span style={{textDecoration: 'underline', cursor: 'pointer'}}>Sair</span></p>
        {error && <Alert className="mt-4" variant="danger">{error}</Alert>}
        <p className="mt-4 text-center preencha">*Preencha todos os campos para continuar</p>
        <Button disabled={!inputs.checked} style={{ opacity: inputs.checked ? 1 : .5 }} className="btn-form w-100 distance-top lighter" type="submit">
          Cadastrar
            </Button>
      </Form>
    </Container>
  )
}
