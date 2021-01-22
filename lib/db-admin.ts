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
      .where('status', '!=', 'removed')
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

export const getSite = async (siteId: string) => {
  const doc = await firestore.collection('sites').doc(siteId).get()
  const site = { id: doc.id, ...doc.data() }

  return { site }
}

export const getUserSites = async (uid: string) => {
  const snapshot = await firestore
    .collection('sites')
    .where('authorId', '==', uid)
    .get()

  const sites = []

  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  )

  return { sites }
}

export const getAllFeedbackForSites = async (uid: string) => {
  const { sites } = await getUserSites(uid)

  if (!sites.length) {
    return { feedback: [] }
  }

  const siteIds = sites.map(site => site.id)

  const snapshot = await firestore
    .collection('feedback')
    .where('siteId', 'in', siteIds)
    .get()

  const feedback = []

  snapshot.forEach(doc => {
    feedback.push({ id: doc.id, ...doc.data() })
  })

  return { feedback }
}
