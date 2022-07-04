import rescue, { NextFunction, Request, Response } from 'express-rescue'
import { boom } from '@expresso/errors'
import { ShipService } from '../../../services/ShipService'
import { ShipNotFoundError } from '../../../domain/ship/errors/ShipNotFoundError'

export function factory (service: ShipService) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (req, res) => {
      const ship = await service.find(req.params.shipId)

      res.status(200).json(ship.persistedEvents)
    }),
    (err: Error, _req: Request, _res: Response, next: NextFunction) => {
      if (err instanceof ShipNotFoundError) return next(boom.notFound(err.message, { code: 'ship_not_found' }))

      next(err)
    }
  ]
}
