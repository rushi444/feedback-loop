import { compareDesc, parseISO } from 'date-fns'
import { firestore } from './firebase-admin'

export const getAllFeedback = async (siteId: string) => {
  try {
    const snapshot = await firestore
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
    const collection = await firestore.collection('sites').get()
    collection.forEach(site => {
      sites.push({ id: site.id, ...site.data() })
    })
    return { sites }
  } catch (err) {
    console.error(err)
  }
}

export const getAllSitesByUser = async (userId: string) => {
  try {
    const snapshot = await firestore
      .collection('sites')
      .where('authorId', '==', userId)
      .get()

    const sites = []

    snapshot.forEach(site => {
      sites.push({ id: site.id, ...site.data() })
    })

    return { sites }
  } catch (error) {
    console.error({ error })
  }
}

export const getFeedbackByUser = async (userId: string) => {
  try {
    const snapshot = await firestore
      .collection('feedback')
      .where('authorId', '==', userId)
      .get()

    const allFeedback = []

    snapshot.forEach(feedback => {
      allFeedback.push({ id: feedback.id, ...feedback.data() })
    })

    return { allFeedback }
  } catch (error) {
    console.error({ error })
  }
}
