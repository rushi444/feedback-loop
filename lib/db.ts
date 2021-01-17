import firebase from './firebase'
import 'firebase/firestore'
import { TNewFeedback } from 'utils/types'

const firestore = firebase.firestore()

export const createUser = (uid, data) => {
  return firestore
    .collection('users')
    .doc('uid')
    .set({ uid, ...data }, { merge: true })
}

export const createSite = data => {
  return firestore.collection('sites').add(data)
}

export const createFeedback = (data: TNewFeedback) => {
  return firestore.collection('feedback').add(data)
}
