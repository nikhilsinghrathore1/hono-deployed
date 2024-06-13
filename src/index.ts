import { Hono } from 'hono'
import type { Context } from 'hono'

const app = new Hono()

async function authMiddleware(c: Context, next: () => Promise<void>): Promise<Response | void> {
  if (c.req.header('Authorization')) {
    await next()
  } else {
    return c.json({
      msg: "you don't have the access"
    }, 403) 
  }
}

app.use('*', authMiddleware) 

app.get('/', async (c: Context): Promise<Response> => {
  const body = await c.req.json()
  console.log(body)
  console.log(c.req.header('Authorization'))
  console.log(c.req.query('param'))
  return c.json({
    msg: 'hello hono'
  } , 201)
})

export default app
