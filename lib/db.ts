import firebase from './firebase'
import 'firebase/firestore'
import { TNewFeedback, TNewSite } from 'utils/types'

const firestore = firebase.firestore()

export const createUser = (uid, data) => {
  return firestore
    .collection('users')
    .doc('uid')
    .set({ uid, ...data }, { merge: true })
}

export const createSite = (data: TNewSite) => {
  const site = firestore.collection('sites').doc()
  site.set(data)
  return site
}

export const createFeedback = (data: TNewFeedback) => {
  return firestore.collection('feedback').add(data)
}

export const deleteFeedback = (feedbackId: string) => {
  return firestore.collection('feedback').doc(feedbackId).delete()
}
