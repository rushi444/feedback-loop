import type { NextApiRequest, NextApiResponse } from 'next'

import db from '@lib/firebase-admin'
import { getAllSites } from '@lib/db-admin'

const fetchAllSites = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const sites = await getAllSites()
    res.status(200).json(sites)
  } catch (err) {
    res.status(500).json(err)
  }
}

export default fetchAllSites
