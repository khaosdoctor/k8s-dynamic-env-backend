import { routes } from './routes'
import { Express } from 'express'
import expresso from '@expresso/app'
import { ShipService } from '../services/ShipService'
import { ShipRepository } from '../data/repositories/ShipRepository'
import mongodb from '../data/connections/mongodb'
import { PortRepository } from '../data/repositories/PortRepository'
import { PortService } from '../services/PortService'
import errors from '@expresso/errors'

export const app = expresso(async (app: Express, config: any, environment: string) => {
  const connection = await mongodb.createConnection(config.database.mongodb)

  const portRepository = new PortRepository(connection)
  const portService = new PortService(portRepository)

  const shipRepository = new ShipRepository(connection)
  const shipService = new ShipService(shipRepository, portService)

  app.post('/ships', routes.ship.create(shipService, portService))
  app.delete('/ships/:shipId', routes.ship.delete(shipService, portService))
  app.get('/ships/:shipId', routes.ship.find(shipService))
  app.get('/ships', routes.ship.getAll(shipService))
  app.get('/ships/:shipId/events', routes.ship.getEvents(shipService))
  app.put('/ships/:shipId/dock/:portId', routes.ship.dock(shipService))
  app.put('/ships/:shipId/depart', routes.ship.depart(shipService))

  app.post('/ports', routes.port.create(portService))
  app.delete('/ports/:portId', routes.port.delete(portService, shipService))
  app.get('/ports/:portId', routes.port.find(portService))
  app.get('/ports/:portId/events', routes.port.getEvents(portService))
  app.get('/ports/', routes.port.getAll(portService))

  app.use(errors(environment))
})
