import env from 'sugar-env'
const core = require('../package.json')

const version = env.get('VERSION') || core.version
export const config = {
  cors: {
    exposedHeaders: ['x-content-range']
  },
  database: {
    mongodb: {
      uri: env.get('DATABASE_MONGODB_URI'),
      dbName: env.get('DATABASE_MONGODB_DBNAME')
    }
  },
  environment: {
    type: env.get('NODE_ENV', 'development')
  },
  name: `Ship API (${version})`,
  version,
  server: {
    binding: {
      ip: env.get('SERVER_BINDING_IP', '0.0.0.0'),
      port: env.get.int('SERVER_BINDING_PORT', 3000)
    }
  }
}
