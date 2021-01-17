import { compareDesc, parseISO } from 'date-fns'
import firebase from './firebase-admin'

export const getAllFeedback = async (siteId: string) => {
  try {
    const snapshot = await firebase
      .collection('feedback')
      .where('siteId', '==', siteId)
      .get()

    const feedback = []

    snapshot.forEach(doc => {
      feedback.push({ id: doc.id, ...doc.data() })
    })

    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    )

    return { feedback }
  } catch (err) {
    return { err }
  }
}

export const getAllSites = async () => {
  try {
    const sites = []
    const collection = await firebase.collection('sites').get()
    collection.forEach(site => {
      sites.push({ id: site.id, ...site.data() })
    })
    return { sites }
  } catch (err) {
    console.error(err)
  }
}
