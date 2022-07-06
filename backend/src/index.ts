import { start } from './presentation/server'

(async () => {
  try {
    console.log('Testing')
    await start()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
})()
