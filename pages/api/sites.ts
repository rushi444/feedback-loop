import type { NextApiRequest, NextApiResponse } from 'next'

import { auth } from '@lib/firebase-admin'
import { getAllSites, getAllSitesByUser } from '@lib/db-admin'

const fetchAllSites = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = req.headers
    const { uid } = await auth.verifyIdToken(token as string)

    const sites = await getAllSitesByUser(uid)
    res.status(200).json(sites)
  } catch (err) {
    res.status(500).json(err)
  }
}

export default fetchAllSites
