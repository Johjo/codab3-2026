import express from "express";
import { pinoHttp } from "pino-http";

export function createServer() {
  const server = express();

  server.use(pinoHttp())
  server.get("/wild", (req, res) => {
    res.json({
      id: 25,
      name: "pikachu",
      sprites: { front_default: "https://raw.githubusercontent.com/...png" },
      types: [{ type: { name: "electric" } }],
      stats: [{ stat: { name: "hp" }, base_stat: 35 }],
    });
  });

  server.post("/capture/:id", (req, res) => {
    if (Number.parseInt(req.params.id) != 25) {
        res.status(404)
        res.json({})
    } else {
        res.json({})
    }
  })



  return server;
}
