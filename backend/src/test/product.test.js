import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../app.js";
import pool from "../config/db.js";

describe("Products API", () => {
  let createdId;

  // POST - create
  it("POST /api/products → 201 with valid data", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Test Item",
      price: 5.99,
      category: "Test",
      description: "desc",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Test Item");
    createdId = res.body.id;
  });

  it("POST /api/products → 400 when name missing", async () => {
    const res = await request(app).post("/api/products").send({ price: 5.99 });
    expect(res.statusCode).toBe(400);
  });

  it("POST /api/products → 400 when price missing", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "No Price" });
    expect(res.statusCode).toBe(400);
  });

  // GET all
  it("GET /api/products → 200 with array", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // GET by id
  it("GET /api/products/:id → 200 with valid id", async () => {
    const res = await request(app).get(`/api/products/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  it("GET /api/products/abc → 400 invalid id", async () => {
    const res = await request(app).get("/api/products/abc");
    expect(res.statusCode).toBe(400);
  });

  it("GET /api/products/999999 → 404 not found", async () => {
    const res = await request(app).get("/api/products/999999");
    expect(res.statusCode).toBe(404);
  });

  // PUT
  it("PUT /api/products/:id → 200 with valid data", async () => {
    const res = await request(app)
      .put(`/api/products/${createdId}`)
      .send({ name: "Updated Item" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Item");
  });

  it("PUT /api/products/999999 → 404 not found", async () => {
    const res = await request(app)
      .put("/api/products/999999")
      .send({ name: "Ghost" });
    expect(res.statusCode).toBe(404);
  });

  // DELETE
  it("DELETE /api/products/:id → 200", async () => {
    const res = await request(app).delete(`/api/products/${createdId}`);
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /api/products/999999 → 404", async () => {
    const res = await request(app).delete("/api/products/999999");
    expect(res.statusCode).toBe(404);
  });

  afterAll(async () => {
    await pool.end();
  });
});
