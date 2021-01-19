import type { NextApiRequest, NextApiResponse } from 'next'

import { auth } from '@lib/firebase-admin'
import { getFeedbackByUser } from '@lib/db-admin'
import { formatObjectKeys, logger } from '@utils/logger'

const fetchFeedbackByUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { token } = req.headers
    const { uid } = await auth.verifyIdToken(token as string)

    const feedback = await getFeedbackByUser(uid)
    res.status(200).json(feedback)
  } catch (err) {
    logger.error(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method
        },
        response: {
          statusCode: res.statusCode
        }
      },
      err.message
    )
    res.status(500).json(err)
  }
}

export default fetchFeedbackByUser
