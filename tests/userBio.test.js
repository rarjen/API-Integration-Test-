const request = require("supertest");
const app = require("../app");

describe("POST /api/add", () => {
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
describe("POST /api/add", () => {
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

// Get All Data
describe("GET /api/index", () => {
  it("Should get all data", async () => {
    // const findAll = await User_bio.findAll();

    const res = await request(app)
      .get("/api/index")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Success Get All Data");
      });
  });
});

// Get Data By Index
describe("GET /api/7", () => {
  it("Should get data with User_id 7", async () => {
    const res = await request(app)
      .get("/api/7")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Success Get Data");
      });
  });
});

// Error Get Data By Id : Data Not Exist
describe("GET /api/100", () => {
  it("Should error get data with User_id 100", async () => {
    const res = await request(app)
      .get("/api/100")
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("Data Not Exist");
      });
  });
});

// Success Update Data
describe("GET /api/100", () => {
  it("Should error get data with User_id 100", async () => {
    const res = await request(app)
      .get("/api/100")
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBe(false);
        expect(res.body.message).toBe("Data Not Exist");
      });
  });
});

// Delete Data by user_id
describe("DELETE /api/8", () => {
  it("Should delete data with user_id 8", async () => {
    const res = await request(app)
      .delete("/api/8")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJvdG5pZWxrZXZpbi5va0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxlaW50bzc4NyIsImlhdCI6MTY2NjMxMjE3OH0.anR8ssdM83s-KTDlyl3GMxSFExxf6q6Vb6z812HtbcQ",
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Success Delete Data");
      });
  });
});

// Update Bio
describe.only("PUT /api/update", () => {
  it("Should update bio", async () => {
    const bio = "update bio";
    const res = await request(app)
      .put("/api/update")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJvdG5pZWxrZXZpbi5va0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxlaW50bzc4NyIsImlhdCI6MTY2NjMxMjE3OH0.anR8ssdM83s-KTDlyl3GMxSFExxf6q6Vb6z812HtbcQ",
      })
      .send({ bio });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Bio Updated");
  });
});

// Error Update : Haven't created a bio
describe.only("PUT /api/update", () => {
  it("Should update bio", async () => {
    const bio = "update bio";
    const res = await request(app)
      .put("/api/update")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJyYXJqZW41N0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxlaW50bzc3OSIsImlhdCI6MTY2NjMyNjE0Nn0.IIS7PTfONxnENjgt7Y-DhydFlB0aYtnuXWqDMHYk9ms",
      })
      .send({ bio });
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("You've Haven't Created Bio Yet");
  });
});
