import express from "express";
import { pinoHttp } from "pino-http";
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import * as z from "zod"
import jwt from "jsonwebtoken"
import { randomUUID } from 'crypto';

extendZodWithOpenApi(z)

function errorHandler(err: Error, req: any, res: any, next: any) {
    res.status(410)
      res.json({error: "Pokemon has gone"});
}

const Pokemon = z.object({ 
  id: z.number().openapi({description: "C'est l'identifiant"}),
  name: z.string().openapi({description: "C'est le nom"})
});

export function createServer() {
  const server = express();

  server.use(pinoHttp())
  server.use(express.json())

  server.get("/wild", (req, res) => {
    res.json({
      id: 25,
      name: "pikachu",
      sprites: { front_default: "https://raw.githubusercontent.com/...png" },
      types: [{ type: { name: "electric" } }],
      stats: [{ stat: { name: "hp" }, base_stat: 35 }],
    });
  });

  server.post("/mirror", (req, res, next) => {
    res.status(200)
    try {
      const pokemon = Pokemon.parse(req.body)
      res.json(pokemon)
    } catch (err) {
      res.status(400)
      res.json()
    }
  })  

  server.post("/login", (req, res, next) => {
    const token = jwt.sign({userId: "toto", jti: randomUUID()}, "maclesecrete", { expiresIn: '1h' })
    res.status(200)
    res.json({token: token})
  })

  server.post("/capture/:id", (req, res, next) => {
    try {
        if (Number.parseInt(req.params.id) != 25) {
            throw new Error("Not found")
        }

    res.json({})
    } catch (err) {
        next(err)
    }
  })

    // server.use(errorHandler)

  server.use((req, res, next) => {
    res.status(404)
    res.json({})
    next()
  })

    return server;
}

