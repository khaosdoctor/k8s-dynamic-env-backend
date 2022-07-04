import rescue, { NextFunction, Request, Response } from 'express-rescue'
import { boom } from '@expresso/errors'
import { PortService } from '../../../services/PortService'
import { PortNotFoundError } from '../../../domain/port/errors/PortNotFoundError'

export function factory (service: PortService) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (req, res) => {
      const port = await service.find(req.params.portId)

      res.status(200).json(port.persistedEvents)
    }),
    (err: Error, _req: Request, _res: Response, next: NextFunction) => {
      if (err instanceof PortNotFoundError) return next(boom.notFound(err.message, { code: 'ship_not_found' }))

      next(err)
    }
  ]
}
