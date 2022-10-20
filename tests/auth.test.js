const request = require("supertest");
const app = require("../app");

// Success Create
describe.skip("POST /api/auth", () => {
  it("Should create user", async () => {
    const email = "otnielkevin.ok@gmail.com";
    const username = "leinto787";
    const password = "qwerty123";
    const res = await request(app)
      .post("/api/auth")
      .send({ email, username, password });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Account Created");
  });
});

// Error Create : Email Duplicate
describe("POST /api/auth", () => {
  it("Should create user", async () => {
    const email = "otnielkevin.ok@gmail.com";
    const username = "leinto787";
    const password = "qwerty123";
    const res = await request(app)
      .post("/api/auth")
      .send({ email, username, password });
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Email Already Used");
    expect(res.body.data).toBe(null);
  });
});

// Error Create : Username Duplicate
describe("POST /api/auth", () => {
  it("Should create user", async () => {
    const email = "otnielkevin.ok@gmail.com";
    const username = "leinto787";
    const password = "qwerty123";
    const res = await request(app)
      .post("/api/auth")
      .send({ email, username, password });
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Username Already Taken");
    expect(res.body.data).toBe(null);
  });
});

// Success Login
describe("POST /api/auth/login", () => {
  it("Should create user", async () => {
    const email = "otnielkevin.ok@gmail.com";
    // const username = "leinto787";
    const password = "qwerty123";
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Success Login");
  });
});

// Error Login : Wrong Email
describe("POST /api/auth/login", () => {
  it("Should create user", async () => {
    const email = "otnielkevin.ok@gmail.co";
    // const username = "leinto787";
    const password = "qwerty123";
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password });
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Email / Password doesn't match");
  });
});

// Error Login : Wrong Password
describe.only("POST /api/auth/login", () => {
  it("Should create user", async () => {
    const email = "otnielkevin.ok@gmail.com";
    const password = "qwerty13";
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password });
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Password doesn't match");
  });
});
