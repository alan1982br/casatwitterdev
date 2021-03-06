/* eslint-disable no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
/*eslint no-throw-literal: "error"*/
import React, { useContext, useState, useEffect, useCallback } from "react"
import { auth } from "../firebase"
import { db } from "../firebase";
import { useHistory } from "react-router"
import { useDispatch } from 'react-redux';

const AuthContext = React.createContext()

let counterLogin = 0;

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [activeEmail, setActiveEmail] = useState(null);

  const [activeProfileEmail, setActiveProfileEmail] = useState(false);
  const [activePassword, setActivePassword] = useState(false);
  const [activePreRegisterPassword, setActivePreRegisterPassword] = useState(false);

  const [activeUserEmail, setActiveUserEmail] = useState(null);
  const [userStartStatus, setUserStartStatus] = useState(0);

  const history = useHistory()

  const dispatch = useDispatch();

  
  const setStoreCurrentUser = useCallback((user) => {
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  })

  const setStoreCurrentTour = useCallback(() => {
    dispatch({ type: 'UPDATE_TOUR', payload: '15' });
  })

  const clearUser = (full = false) => {
    setUserStartStatus(0);
    localStorage.removeItem('@Twitter:ActiveEmail');
    if (full) localStorage.removeItem('@Twitter:email');
    localStorage.removeItem('@Twitter:displayName');
    localStorage.removeItem('@Twitter:uid');
    localStorage.removeItem('@Twitter:passwordCreated');

    setCurrentUser(null);
    setLoading(true);
    setActiveEmail(null);
    setActivePassword(false);
    setActivePreRegisterPassword(false);
    setActiveUserEmail(null);
    setActiveProfileEmail(false);

    // Zera o current tour para 15
    setStoreCurrentTour();
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  async function checkEmail(email) {

    await auth.fetchSignInMethodsForEmail(email).then((methods) => {

      // console.log(methods, methods[0]);
      if (methods[0] !== 'password') {
        //  console.log("fetchSignInMethodsForEmail false ", methods)
        // setActiveEmail(false);
        throw { message: 'user_not_found' }
      } else {
        // console.log("fetchSignInMethodsForEmail true ", methods)
        setActiveEmail(email);
        checkEmailparticipant(email);
      }

    }).catch((error) => {
      var errorMessage = error.message;
      if (errorMessage === 'user_not_found') {
        throw { message: 'user_not_found' }
      }

      throw { message: 'error_network' }
      // ...
    });
  }

  async function checkEmailparticipant(email) {
    let dataTime = await getDate();

    try {
      db
        .database()
        .ref('user_pre_register')
        .orderByChild("email")
        .once("value", snapshot => {
          
          snapshot.forEach(function (child) {
            if (child.val().email === email) {
              // console.log(' snapshot.val() ALL DATA USER PRE REGISTER ', child.key)
              db.database().ref(`user_pre_register`).child(child.key).update({
           
                updateDate: dataTime

              }).then((snap) => {
                //  setActiveProfileEmail(child.val().activeProfileEmail);
                // console.log(child.key + ": " + child.val().email, child.val().passwordCreated);
                setActivePreRegisterPassword(child.val().passwordCreated);
                localStorage.setItem('@Twitter:passwordCreated', child.val().passwordCreated)
                localStorage.setItem('@Twitter:uid', child.key)
                
                // Retorna true para a start/handleSubmit
                setUserStartStatus(() => userStartStatus + 1);

                let uidLocal = localStorage.getItem('@Twitter:uid');
                // console.log("uid ", uidLocal)
                db.database()
                  .ref('user_pre_register').child(uidLocal)
                  .on("value", snapshot => {
                    if(history.location.pathname === '/confirme-email'){
                      // console.log(snapshot.val().activeProfileEmail)
                       if(snapshot.val().activeProfileEmail===true)
                           history.push('/login')

                    }
                  })

                  db.database().ref(`user_pre_register`).child(child.key).update({
           
                    updateDate: dataTime
    
                  })

                return true;
              })

            } else {
              // console.log("false")

            }

          });
        })
    } catch (e) {
      // Error! oh no
    } finally {
      // console.log("done verify email")
    }
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('@Twitter:ActiveEmail', true)
      localStorage.setItem('@Twitter:email', email)

    }).then(() => {

    }).catch(function (error) {
      //  console.log("erro login", error)
      return error.code;
    });
  }

  async function logout(path = null) {
    let dataTimeLogout = await getDate();
    // clearUser(); op????o
    return auth.signOut().then(() => {
      counterLogin = 0 ;

      let actualkey = db.database().ref(`/demo/userOnLogout`).push().key;
      db.database().ref(`/demo/userOnLogout`).child(actualkey).update({
        email: currentUser.email,
        id: actualkey,
        uid: currentUser.uid,
        lastSignInTime : currentUser.metadata.lastSignInTime,
        dataTimeLogout : dataTimeLogout
      })

      clearUser();
      // path === "/start" ? history.push("/start") : history.push("/login");
      // history.push('/login');
    })
  }

  function logoutConfirmEmail(path = null) {
    return auth.signOut().then(() => {
      // setCurrentUser(null);
      // setStoreCurrentUser(null);
      clearUser();
      history.push(path)
      // setActivePreRegisterPassword(false)
    })
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(nome, empresa, cargo, user_twitter, password) {
    // console.log("updatePassword 1", currentUser)
    currentUser.updatePassword(password).then(() => {
      // console.log("updatePassword 2")

      currentUser.updateProfile({
        displayName: nome,
      }).then(function () {
        // console.log('Update successful profile name')
      }).catch(function (error) {
        // An error happened.
      });

      db.database().ref(`/demo/Participantes`).child(currentUser.uid).update({
        name: nome,
        empresa: empresa,
        cargo: cargo,
        user_twitter: user_twitter,
        password: password,
        passwordCreated: true
      })

      db.database().ref(`participantes`).child(currentUser.uid).update({
        name: nome,
        empresa: empresa,
        cargo: cargo,
        user_twitter: user_twitter,
        password: password,
        passwordCreated: true
      }).then(() => {
        setActivePassword(true)
        db.database().ref(`user_pre_register`).child(currentUser.uid).update({
          passwordCreated: true
        }).then((snap) => {
  
        })
        // console.log("updatePassword 3 ", currentUser.email)
          // sendEmailVerification(currentUser.email);
          logoutConfirmEmail('/login')
            
           
      })
    })
  }

  function sendEmailVerification(email) {
    // console.log("updatePassword 4", email)
    return currentUser.sendEmailVerification().then(() => {
      // console.log("updatePassword 5")
      // setActiveUserEmail(currentUser.emailVerified);

      db.database().ref(`participantes`).child(currentUser.uid).update({
        sendEmailVerification: true
      }).then(() => {
        logoutConfirmEmail("/confirme-email");
        // console.log("logout after sendEmailVerification")
        setCurrentUser(null);
      })
    })
  }

  async function getDate() {
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var time = new Date().getTime();
    var monthDateYear = (month + 1) + "/" + date + "/" + year + "/" + time;

    return monthDateYear;
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
             counterLogin++;

            //  console.log('counterLogin ', counterLogin)
            // console.log(' snapshot.val() ALL DATA PARTICIPANTE ', snapshot.val())
            // console.log('STEP 1 PasswordCreated ______________', snapshot.val().passwordCreated)
            // console.log('STEP 2 sendEmailVerification ________', snapshot.val().sendEmailVerification)
            // console.log('STEP 3 EmailVerified ________________', user.emailVerified)
            // console.log('STEP 4 setActiveUserEmail ________________', activeUserEmail)

            // setActivePassword(snapshot.val().passwordCreated);
            if(counterLogin==1){
              let actualkey = db.database().ref(`/demo/userOnLogin`).push().key;
             db.database().ref(`/demo/userOnLogin`).child(actualkey).update({
               email: user.email,
               name: snapshot.val().name,
               empresa: snapshot.val().empresa,
               cargo: snapshot.val().cargo,
               user_twitter: snapshot.val().user_twitter,
               id: actualkey,
               uid: user.uid,
               lastSignInTime : user.metadata.lastSignInTime,
               creationTime : user.metadata.creationTime
             })
            }

          } catch (error) {
            // console.log(error)
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
    clearUser,
    setUserStartStatus,
    activeEmail,
    activePassword,
    activePreRegisterPassword,
    activeUserEmail,
    activeProfileEmail,
    userStartStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
