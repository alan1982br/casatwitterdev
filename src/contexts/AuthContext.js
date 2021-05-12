
import React, { useContext, useState, useEffect, useCallback } from "react"
import { auth } from "../firebase"
import { db } from "../firebase";
import { useHistory } from "react-router"
import { useDispatch } from 'react-redux';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [activeEmail, setActiveEmail] = useState(null);
  const [activePassword, setActivePassword] = useState(false);
  const [activePreRegisterPassword, setActivePreRegisterPassword] = useState(false);
  const [activeUserEmail, setActiveUserEmail] = useState(null);

  const history = useHistory()

  const dispatch = useDispatch();

  const setStoreCurrentUser = useCallback((user) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  })

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }


    function checkEmailparticipant(email) {
    try {
          db
         .database()
         .ref('user_pre_register')
         .orderByChild("email")
         .on("value", snapshot => {
           
          //  console.log(' snapshot.val() ALL DATA USER PRE REGISTER ', snapshot.val())
           snapshot.forEach(function (child) {
            if(child.val().email === email ){
              setActiveEmail(email);
              console.log(child.key + ": " + child.val().email , child.val().passwordCreated);
              setActivePreRegisterPassword(child.val().passwordCreated);
              localStorage.setItem('@Twitter:passwordCreated', child.val().passwordCreated)
              return true;
            }else{
              //  console.log("false")
             
            }
           
          });
       })
    } catch (e) {
      // Error! oh no
    } finally {
      console.log("done verify email")
    }
 
  }

  async function checkEmail(email) {

    await auth.fetchSignInMethodsForEmail(email).then((methods) => {

      // console.log(methods, methods[0]);
      if (methods[0] !== 'password') {
        console.log("fetchSignInMethodsForEmail false ", methods)
        setActiveEmail(false);
      } else {
        console.log("fetchSignInMethodsForEmail true ", methods)
         checkEmailparticipant(email);
        //  setActiveEmail(email);  
      }

    }).catch((error) => {
      // var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      // ...
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('@Twitter:ActiveEmail',true)
      localStorage.setItem('@Twitter:email', email)
      
    }).then(() => {

    }).catch(function(error) {
       console.log(error)
    });
  }

  function logout(path = null) {
    return auth.signOut().then(() => {
      // localStorage.removeItem('@Twitter:ActiveEmail');
      // localStorage.removeItem('@Twitter:email');
      setCurrentUser(null);
      setStoreCurrentUser(null);
      // path == "/start" ? history.push("/start") : history.push("/login");
      history.push('/login');
      setActivePreRegisterPassword(false)
    })
  }
 
  function logoutConfirmEmail(path = null) {
    return auth.signOut().then(() => {
      setCurrentUser(null);
      setStoreCurrentUser(null);
      history.push(path)
      setActivePreRegisterPassword(false)
    })
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(nome,empresa,cargo,user_twitter,password) {
    console.log("updatePassword 1", currentUser)
    currentUser.updatePassword(password).then(() => {
      console.log("updatePassword 2")

      currentUser.updateProfile({
        displayName: nome,
      }).then(function() {
        console.log('Update successful profile name')  
      }).catch(function(error) {
        // An error happened.
      });

      db.database().ref(`participantes`).child(currentUser.uid).update({
        name: nome,
        empresa: empresa,
        cargo: cargo,
        user_twitter : user_twitter,
        password: password,
        passwordCreated: true
      }).then(() => {
        setActivePassword(true)
        db.database().ref(`user_pre_register`).child(currentUser.uid).update({
          passwordCreated: true
        })       
        console.log("updatePassword 3 ", currentUser.email)
        sendEmailVerification(currentUser.email);
        
      })
    })
  }

  function sendEmailVerification(email) {
    console.log("updatePassword 4", email)
    return currentUser.sendEmailVerification().then(() => {
      console.log("updatePassword 5")
      // setActiveUserEmail(currentUser.emailVerified);
     
      db.database().ref(`participantes`).child(currentUser.uid).update({
        sendEmailVerification: true
      }).then(() => {
         logoutConfirmEmail("/confirme-email");
        console.log("logout after sendEmailVerification")
        setCurrentUser(null);
      })
    })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setStoreCurrentUser(user);
      setLoading(false)
      localStorage.setItem('@Twitter:uid', user?.uid)
      localStorage.setItem('@Twitter:displayName', user?.displayName)

    

      if (user != null)
        db.database().ref('participantes').child(user.uid).on("value", snapshot => {
          try {
            setActiveUserEmail(user.emailVerified);

            console.log(' snapshot.val() ALL DATA PARTICIPANTE ', snapshot.val())
            console.log('STEP 1 PasswordCreated ______________', snapshot.val().passwordCreated)
            console.log('STEP 2 sendEmailVerification ________', snapshot.val().sendEmailVerification)
            console.log('STEP 3 EmailVerified ________________', user.emailVerified)
            console.log('STEP 4 setActiveUserEmail ________________', activeUserEmail)
           
            // setActivePassword(snapshot.val().passwordCreated);
             
          } catch (error) {
            console.log(error)
          }
      
        })
    })

     

    return unsubscribe
  }, [activeUserEmail, setStoreCurrentUser])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    checkEmail,
    sendEmailVerification,
    checkEmailparticipant,
    logoutConfirmEmail,
    activeEmail,
    activePassword,
    activePreRegisterPassword,
    activeUserEmail
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
