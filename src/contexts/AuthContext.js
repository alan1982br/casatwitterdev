import firebase from "firebase"
import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { db } from "../firebase";
import { useHistory } from "react-router"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [activeEmail, setActiveEmail] = useState(null);
  const [activePassword, setActivePassword] = useState(false);
  const [activeUserEmail, setActiveUserEmail] = useState(false);

  const history = useHistory()

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function checkEmail(email) {

    auth.fetchSignInMethodsForEmail(email).then((methods) => {

      // console.log(methods, methods[0]);
      if (methods[0] !== 'password') {
        console.log("fetchSignInMethodsForEmail false ", methods)
        setActiveEmail(false);
      } else {
        console.log("fetchSignInMethodsForEmail true ", methods)
        setActiveEmail(email);
      }

    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      // ...
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
 
  }

  function logout() {
    return auth.signOut().then(() => {
console.log("logout resp")
      setCurrentUser(null);
      history.push("/login")
    })
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password, name, idTwitter) {
    console.log("updatePassword 1")
    currentUser.updatePassword(password).then(() => {
      console.log("updatePassword 2")
      db.database().ref(`participantes`).child(currentUser.uid).update({
        password: password,
        passwordCreated: true
      }).then(() => {
        setActivePassword(true)
        console.log("updatePassword 3 ", currentUser.email)
        sendEmailVerification(currentUser.email);
      })

    })
  }

  function sendEmailVerification(email) {
    console.log("updatePassword 4", email)
    return currentUser.sendEmailVerification().then(() => {
      console.log("updatePassword 5")
      db.database().ref(`participantes`).child(currentUser.uid).update({
        sendEmailVerification: true
      })
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)

      if (user != null)
        db.database().ref('participantes').child(user.uid).on("value", snapshot => {
          try {
            console.log(' snapshot.val() ALL DATA PARTICIPANTE ', snapshot.val())
            console.log('STEP 1 PasswordCreated ______________', snapshot.val().passwordCreated)
            console.log('STEP 2 sendEmailVerification ________', snapshot.val().sendEmailVerification)
            console.log('STEP 3 EmailVerified ________________', user.emailVerified)
            setActivePassword(snapshot.val().passwordCreated);
            setActiveUserEmail(user.emailVerified);
    
          } catch (error) {
            console.log(error)
          }
         
        })


        
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    checkEmail,
    activeEmail,
    activePassword,
    activeUserEmail
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
