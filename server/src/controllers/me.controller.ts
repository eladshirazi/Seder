import { Request, Response } from 'express'

export function getMeHandler(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'Unauthorized' })
    return
  }

  const { id, email, role } = req.user

  res.json({
    success: true,
    user: { id, email, role }
  })
}
