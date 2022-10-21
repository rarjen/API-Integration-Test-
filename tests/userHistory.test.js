const request = require("supertest");
const app = require("../app");

// Create Score
describe.skip("POST /api/history", () => {
  it("Should create user history", async () => {
    const score = 90;
    const res = await request(app)
      .post("/api/history")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJvdG5pZWxrZXZpbi5va0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxlaW50bzc4NyIsImlhdCI6MTY2NjI4NTQyMX0.REyCzbS-o9AYJMtXyITFnwVvE5t83UTzUX5Tv8Z0oxI",
      })
      .send({ score });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Score Saved");
  });
});

// Get All Histories
describe.skip("GET /api/history", () => {
  it("Should create user", async () => {
    const res = await request(app)
      .get("/api/history/index")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Success Get All Data");
      });
  });
});

// Get Score By Id
describe.skip("GET /api/history/1", () => {
  it("Should get data with Index 3", async () => {
    const res = await request(app)
      .get("/api/history/1")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Success Get Data");
      });
  });
});

// Error : Id doesn't exist
describe.skip("GET /api/history/150", () => {
  it("Should get error due to an overflow index 150", async () => {
    const res = await request(app)
      .get("/api/history/150")
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("Data Not Exist");
      });
  });
});
