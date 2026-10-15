import { describe, expect, it } from "vitest";
import request from "supertest";
import { createServer } from "./server";



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

    it("tell not found if bad pokemon", async () => {
        const response = await request(createServer()).post("/capture/297");
        
        expect(response.status).toEqual(404);        
    })

    
  })
});
