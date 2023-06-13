import { Request, Response } from "express"

export function welcomeApi(req: Request, res: Response) {
  try {
    res.status(200).json({ message: "hello user" })
  } catch (err) {
    console.error(err)
  }
}
