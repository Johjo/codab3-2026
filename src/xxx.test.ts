import { describe, expect, it } from "vitest";
import request from "supertest";
import express from "express";
import { pinoHttp } from "pino-http";

function createServer() {
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

describe("Pokemon api", () => {
  describe("wild", () => {
    it("wild should give 200", async () => {
      const response = await request(createServer()).get("/wild");

      expect(response.status).toEqual(200);
    });

    it("wild should get pokemon", async () => {
      const response = await request(createServer()).get("/wild");

      expect(response.body).toEqual({
        id: 25,
        name: "pikachu",
        sprites: { front_default: "https://raw.githubusercontent.com/...png" },
        types: [{ type: { name: "electric" } }],
        stats: [{ stat: { name: "hp" }, base_stat: 35 }],
      });
    });
  });
});
