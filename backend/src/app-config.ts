import env from 'sugar-env'
const core = require('../package.json')

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
    name: core.name,
    type: env.get('NODE_ENV', 'development'),
    version: env.get('VERSION') || core.version,
    bindingPort: env.get.int('PORT', 3000)
  }
}
