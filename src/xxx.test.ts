import { describe, expect, it } from "vitest";
import request from "supertest";
import { createServer } from "./server";
import * as z from "zod";



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

  describe("capture", () => {
    it("tell ok if good pokemon", async () => {
        const response = await request(createServer()).post("/capture/25");
        
        expect(response.status).toEqual(200);        
    })

    it.skip("tell not found if bad pokemon", async () => {
        const response = await request(createServer()).post("/capture/297");
        
        expect(response.body).toEqual({error: "Pokemon has gone"});
        expect(response.status).toEqual(410)        
    })
  })

  describe("mirror", () => {
    it("mirror when it works", async () => {
      const response = (await request(createServer()).post("/mirror").send({id: 151, name: "Mew"}));
      expect(response.status).toEqual(200)
      expect(response.body).toEqual({id: 151, name: "Mew"})
    })

    it("mirror when it works bis", async () => {
      const response = (await request(createServer()).post("/mirror").send({id: 10, name: "Pikachu"}));
      expect(response.status).toEqual(200)
      expect(response.body).toEqual({id: 10, name: "Pikachu"})
    })


    it("mirror tell error when bad data", async () => {
      const response = (await request(createServer()).post("/mirror").send({id: "toto", name: "Mew"}));
      expect(response.status).toEqual(400)
    })

  })

describe("zod", () => {
    it("zod quand ça marche ou pas", () => {
      const User = z.object({
        token: z.jwt(),
      });
      
      // some untrusted data...
      const input = { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30" };
      
      // the parsed result is validated and type safe!
      User.parse(input);
    
      
    })
  })
});
