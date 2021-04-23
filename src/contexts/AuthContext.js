import firebase from "firebase"
import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { db } from "../firebase";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {

    auth.fetchSignInMethodsForEmail(email).then((methods) => {
       console.log("fetchSignInMethodsForEmail ", methods)

    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    

    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  function sendEmailVerification(email) {
    return currentUser.sendEmailVerification(email)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)

      db.database().ref('participantes').child(user.uid).once("value", snapshot => {
        console.log(' snapshot.val() ALL DATA PARTICIPANTE ', snapshot.val())
        
        console.log('STEP 1 PasswordCreated ______________', snapshot.val().passwordCreated)
        console.log('STEP 2 sendEmailVerification ________', snapshot.val().sendEmailVerification)
        console.log('STEP 3 EmailVerified ________________', user.emailVerified) 
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
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
