import React from "react"
import { Button, Container } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"





export default function ConfirmeEmailComponent() {
  const history = useHistory();

  const { logoutConfirmEmail } = useAuth()

  const goToLogin = () => {
    logoutConfirmEmail("/login");
      //  history.push("/login");
    // window.location.href = window.location + "/login";
  }
  
  return (
    <Container className="form">
          <h2>Confirme seu email</h2>
          <p className="text-center mb-4 distance-top">Por segurança, pedimos que você confirme seu email na caixa de entrada.</p>
          <div className="distance-top higher">
            <Button className="btn-form w-100 distance-top" type="button" onClick={goToLogin}>
              Já confirmado, continuar
            </Button>
          </div>
    </Container>
  )
}
