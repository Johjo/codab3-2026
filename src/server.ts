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

  return server;
}
