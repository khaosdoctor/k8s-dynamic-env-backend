import rescue, { NextFunction, Request, Response } from 'express-rescue'
import { boom } from '@expresso/errors'
import { ShipService } from '../../../services/ShipService'
import { ShipNotFoundError } from '../../../domain/ship/errors/ShipNotFoundError'
import { PortService } from '../../../services/PortService'

export function factory (service: ShipService, portService: PortService) {
  return [
    /**
     * Route handler
     * =============
     */
    rescue(async (req, res) => {
      const ship = await service.delete(req.params.shipId, req.onBehalfOf)
      await portService.undockShip(ship, 'Ship was deleted', req.onBehalfOf)

      res.status(204).end()
    }),
    (err: Error, _req: Request, _res: Response, next: NextFunction) => {
      if (err instanceof ShipNotFoundError) return next(boom.notFound(err.message, { code: 'ship_not_found' }))

      next(err)
    }
  ]
}
