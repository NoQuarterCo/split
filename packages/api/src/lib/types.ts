import { Request, Response } from "express"
import { userLoader } from "../modules/user/user.loader"
import { shareLoader } from "../modules/share/share.loader"

export interface IResolverContext {
  req: IRequest
  res: Response
  userId: string
  userLoader: ReturnType<typeof userLoader>
  shareLoader: ReturnType<typeof shareLoader>
}

export interface IRequest extends Request {
  user?: { id: string }
}
