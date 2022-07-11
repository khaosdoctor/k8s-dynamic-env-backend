import { start } from './presentation/server'

(async () => {
  try {
    await start()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
