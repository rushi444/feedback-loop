import React, { useState, useEffect, useContext, createContext } from 'react'
// import cookies from 'js-cookie';
import firebase from './firebase'
import { createUser } from './db'
import { TUser } from '../utils/types'

type IAuth = {
  user: TUser | null
  loading: boolean
  signInWithGitHub: (redirect?: string) => void
  // signInWithGoogle: (redirect?: string) => void
  signOut: () => void
}

// interface IProvider {
//   displayName: string
//   email: string
//   phoneNumber: null | string | number
//   photoURL: string
//   providerId: string
//   uid: string
// }

const authContext = createContext<IAuth>(undefined)

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth(): IAuth {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const handleUser = (rawUser: any) => {
    if (rawUser) {
      console.log('rawUser==>>', rawUser)
      const user = formatUser(rawUser)
      const { token, ...userData } = user
      // cookies.set('auth-token', token, { expires: 1 });
      createUser(user.uid, userData)
      setLoading(false)
      setUser(user)

      return user
    } else {
      setLoading(false)
      setUser(false)
      // cookies.remove('auth-token');
      return false
    }
  }
  // const signInWithGoogle = redirect => {
  //   setLoading(true)

  //   return firebase
  //     .auth()
  //     .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  //     .then(response => {
  //       handleUser(response.user)
  //       console.log('redirect==>>', redirect)

  //       // if (redirect) {
  //       //   Router.push(redirect);
  //       // }
  //     })
  // }
  const signInWithGitHub = (redirect: any) => {
    setLoading(true)

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(response => {
        handleUser(response.user)
        console.log('redirect==>>', redirect)

        // if (redirect) {
        //   Router.push(redirect);
        // }
      })
  }
  const signOut = () =>
    firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser)

    return () => unsubscribe()
  }, [])

  return {
    user,
    loading,
    signInWithGitHub,
    // signInWithGoogle,
    signOut
  }
}

const formatUser = user => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  provider: user.providerData[0].providerId,
  photoURL: user.photoURL,
  token: user.xa
})
