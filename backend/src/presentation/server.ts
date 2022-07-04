import { app as appFactory } from './app'
import { config } from '../app-config'

export async function start () {
  const app = await appFactory({
    name: config.environment.name,
    version: config.environment.version,
    server: {
      binding: {
        port: config.environment.bindingPort
      }
    }
  }, config.environment.type)

  app.listen(config.environment.bindingPort)
}
