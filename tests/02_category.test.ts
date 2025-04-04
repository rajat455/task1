import request from "supertest";
import app from "../src/app";
import { connectDB, closeDB } from "./testUtils";

let token = "";
let categoryId = "";

beforeAll(async () => {
  await connectDB();

  // Login to get token
  const loginRes = await request(app).post("/api/auth/login").send({
    phone: "9999999999", // existing phone
    password: "Test123"
  });

  token = loginRes.body.token;
});

afterAll(closeDB);

describe("Category API", () => {
  it("should create a category", async () => {
    const res = await request(app)
      .post("/api/category")
      .set("token", token)
      .send({ name: "Electronics", alias: "electronics" });

    expect(res.statusCode).toBe(200);
    categoryId = res.body.data._id;
  });

  it("should fetch all categories", async () => {
    const res = await request(app).get("/api/category").set("token", token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("data");
  });

  it("should update a category", async () => {
    const res = await request(app)
      .put(`/api/category/${categoryId}`)
      .set("token", token)
      .send({ name: "Updated Name" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Success"); // Or your custom message
  });

  it("should delete a category", async () => {
    const res = await request(app)
      .delete(`/api/category/${categoryId}`)
      .set("token", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Success"); // Or your custom message
  });
});
