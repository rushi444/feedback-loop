import firebase from './firebase'
import 'firebase/firestore'

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

export const createFeedback = (data: TNewFeedback) => {
  return firestore.collection('feedback').add(data)
}

export const deleteFeedback = (feedbackId: string) => {
  return firestore.collection('feedback').doc(feedbackId).delete()
}

// export const createCheckoutSession = async (uid: string) => {
//   console.log('what')
//   const checkoutSessionRef = await firestore
//     .collection('users')
//     .doc(uid)
//     .collection('checkout_sessions')
//     .add({
//       price: 'price_1IBZ1nHyh3b72VElRgoqCeTh',
//       success_url: window.location.origin,
//       cancel_url: window.location.origin
//     })

//     console.log('wet', checkoutSessionRef)

//   checkoutSessionRef.onSnapshot(async snap => {
//     const { sessionId } = snap.data()
//     console.log('sesssionid', sessionId)
//     if (sessionId) {
//       const stripe = await getStripe()

//       stripe.redirectToCheckout({ sessionId })
//     }
//   })
// }

// export async function goToBillingPortal() {
//   const functionRef = app
//     .functions('us-west2')
//     .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink')
//   const { data } = await functionRef({ returnUrl: window.location.origin })

//   window.location.assign(data.url)
// }
