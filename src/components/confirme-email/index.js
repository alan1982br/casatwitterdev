import React, { useState, useEffect } from "react"
import { Button, Container, Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function ConfirmeEmailComponent() {
  const history = useHistory();
  const [ email, setEmail ] = useState('');
  const [error, setError] = useState("")
  const [ emailReenviado, setEmailReenviado ] = useState(false)

  const { logoutConfirmEmail, sendEmailVerification, currentUser } = useAuth()

  const goToLogin = () => {
    logoutConfirmEmail("/login");
      //  history.push("/login");
    // window.location.href = window.location + "/login";
  }

  const handlerResendEmail = () => {
    try {
      sendEmailVerification(email);
      setEmailReenviado(true);
    } catch {
      setError('Erro ao tentar reenviar o email, tente novamente mais tarde.')
      return;
    }
  }

  useEffect(() => {
    try {
      const email = localStorage.getItem('@Twitter:email');
      setEmail(email); 
      // if (email === null) {
      //   history.push('/');
      // }
    } catch {
      // Redireciona para a home caso o user não esteja no local storage
      
      return;
    }
    // eslint-disable-next-line
  }, [])
  
  return (
    <Container className="form">
      <h2>Confirme seu email</h2>
      <p className="text-center mb-4 distance-top">Por segurança, pedimos que você confirme seu email na caixa de entrada.</p>
      <p className="text-center distance-top">Ainda não recebeu seu emai?</p>
      <p className="text-center reenviar-email"><span onClick={handlerResendEmail}>Clique aqui para reenviar.</span></p>
      {error && <Alert className="mt-4" variant="danger">{error}</Alert>}
      {emailReenviado && <Alert className="mt-4 text-center" variant="success">Email reenviado, cheque sua caixa de email.</Alert>}
      <div className="distance-top">
        <Button className="btn-form w-100" type="button" onClick={goToLogin}>
          Já confirmado, continuar
        </Button>
      </div>
    </Container>
  )
}
