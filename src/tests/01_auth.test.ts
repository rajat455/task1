import request from "supertest";
import app from "../app";
import { closeDB, connectDB } from "./testUtils";

beforeAll(connectDB);
afterAll(closeDB);

describe("Auth API", () => {
  const user = {
    firstName: "Test",
    lastName: "User",
    phone: "9999999999",
    password: "Test123"
  };

  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send(user);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Success");
  });

  it("should login user and return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      phone: user.phone,
      password: user.password
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

});
