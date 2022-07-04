import { app } from './app'
import { config } from '../app-config'
import server from '@expresso/server'

export function start () {
  server.start(app, config)
}
