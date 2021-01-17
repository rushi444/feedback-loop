import type { NextApiRequest, NextApiResponse } from 'next'

import db from '@lib/firebase-admin'

const getAllSites = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const sites = []
    const collection = await db.collection('sites').get()
    collection.forEach(site => {
      sites.push({ id: site.id, ...site.data() })
    })
    res.status(200).json({ sites })
  } catch (err) {
    res.status(500).json(err)
  }
}

export default getAllSites
