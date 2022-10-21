const request = require("supertest");
const app = require("../app");

describe.skip("POST /api/add", () => {
  it("Should creating data with unique user_id", async () => {
    const bio = "This is My Bio";
    const res = await request(app)
      .post("/api/add")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJvdG5pZWxrZXZpbi5va0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxlaW50bzc4NyIsImlhdCI6MTY2NjMxMjE3OH0.anR8ssdM83s-KTDlyl3GMxSFExxf6q6Vb6z812HtbcQ",
      })
      .send({ bio });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Bio Created");
  });
});

// Error Create Bio : Duplication data
describe.skip("POST /api/add", () => {
  it("Should get error due to duplication data", async () => {
    const bio = "Bio add";
    const res = await request(app)
      .post("/api/add")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJvdG5pZWxrZXZpbi5va0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxlaW50bzc4NyIsImlhdCI6MTY2NjMxMjE3OH0.anR8ssdM83s-KTDlyl3GMxSFExxf6q6Vb6z812HtbcQ",
      })
      .send({ bio });
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("You've Already Created a Bio");
    expect(res.body.data).toBe(null);
  });
});

describe("GET /api/index", () => {
  it("Should get all data", async () => {
    // const findAll = await User_bio.findAll();

    const res = await request(app)
      .get("/api/index")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Success Get All Data");
        // expect(res.body.data).toEqual(findAll);
      });
  });
});

describe("GET /api/7", () => {
  it("Should get data with Index 7", async () => {
    const res = await request(app)
      .get("/api/7")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Success Get Data");
        // expect(res.body.data).toEqual(findAll);
      });
  });
});

describe("DELETE /api/", () => {
  it("Should get data with Index 9", async () => {
    const user_id = 4;
    // const deleted = await User_bio.destroy({ where: { user_id: user_id } });

    const res = await request(app).delete("/api").send({ user_id });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Success Delete Data");
    // expect(res.body.data).toEqual(findAll);
  });
});
