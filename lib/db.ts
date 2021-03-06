import firebase from './firebase'
import 'firebase/firestore'
import 'firebase/functions'

import { getStripe } from '../utils/stripe'
import { TNewFeedback, TNewSite } from 'utils/types'

const firestore = firebase.firestore()
const app = firebase.app()

export const createUser = (uid, data) => {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true })
}

export const createSite = (data: TNewSite) => {
  const site = firestore.collection('sites').doc()
  site.set(data)
  return site
}

export const deleteSite = async (id: string) => {
  firestore.collection('sites').doc(id).delete();
  const snapshot = await firestore
    .collection('feedback')
    .where('siteId', '==', id)
    .get();

  const batch = firestore.batch();

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export const updateSite = (id: string, newValues: any) =>  {
  return firestore.collection('sites').doc(id).update(newValues);
}

export const createFeedback = (data: TNewFeedback) => {
  return firestore.collection('feedback').add(data)
}

export const deleteFeedback = (feedbackId: string) => {
  return firestore
    .collection('feedback')
    .doc(feedbackId)
    .update({ status: 'removed' })
}

export const updateFeedback = async (id: string, newValues: any) => {
  return await firestore
    .collection('feedback')
    .doc(id)
    .update({ ...newValues })
}

export const createCheckoutSession = async (uid: string) => {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1IBZ1nHyh3b72VElRgoqCeTh',
      success_url: window.location.origin,
      cancel_url: window.location.origin
    })

  checkoutSessionRef.onSnapshot(async snap => {
    const { sessionId } = snap.data()

    if (sessionId) {
      const stripe = await getStripe()

      stripe.redirectToCheckout({ sessionId })
    }
  })
}

export const goToBillingPortal = async () => {
  const functionRef = app
    .functions('us-west2')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink')
  const { data } = await functionRef({ returnUrl: window.location.origin })

  window.location.assign(data.url)
}
