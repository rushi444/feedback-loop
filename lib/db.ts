import firebase from './firebase'
import 'firebase/firestore'

const firestore = firebase.firestore()

export const createUser = (uid, data) => {
  return firestore
    .collection('users')
    .doc('uid')
    .set({ uid, ...data }, { merge: true })
}
