import { getAllFeedback } from '@lib/db-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

const getAllSites = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { siteId } = req.query
    const feedback = await getAllFeedback(siteId as string)
    res.status(200).json({ feedback })
  } catch (err) {
    res.status(500).json(err)
  }
}

export default getAllSites
