import dotenv from 'dotenv'
import { App } from './main/app'
require('module-alias/register')
dotenv.config()

const app = new App()

app.server.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
