//@ts-ignore
import { PrismaClient } from "@prisma/client/edge";//@ts-ignore
import { withAccelerate } from "@prisma/extension-accelerate";//@ts-ignore
import { Hono } from "hono";//@ts-ignore
import { sign } from "hono/jwt";

export function initMiddleware(app) {
    app.use('/api/v1/blog/*', async (c, next) => {
        const header = c.req.header("authorization") || "";
        // Bearer token => ["Bearer", "token"];
        const token = header.split(" ")[1]
        
        // @ts-ignore
        const response = await verify(token, c.env.JWT_SECRET)
        if (response.id) {
          next()
        } else {
          c.status(403)
          return c.json({ error: "unauthorized" })
        }
      })
      
}