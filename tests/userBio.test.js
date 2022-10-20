const request = require("supertest");
const app = require("../app");

describe("POST /api/add", () => {
  test.skip("Should get error due to duplication data", async () => {
    const username = "ronaldoCR7";
    const bio = "Testing 2";
    const user_id = 1;

    // const created = await User_bio.findOne({
    //   where: { username: username },
    // });

    const res = await request(app)
      .post("/api/add")
      .send({ username, bio, user_id });
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("You've Already Created a Bio");
    expect(res.body.data).toBe(null);
  });
  it.skip("Should creating data with unique user_id", async () => {
    const username = "ini ikhsan";
    const bio = "Testing 3";
    const user_id = 8;

    const res = await request(app)
      .post("/api/add")
      .send({ username, bio, user_id });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Bio Created");
  });
});

describe.skip("GET /api/index", () => {
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

describe.skip("GET /api/3", () => {
  it("Should get data with Index 3", async () => {
    // const id = 3;
    // const findAll = await User_bio.findOne({ where: { id: id } });

    const res = await request(app)
      .get("/api/3")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe(true);
        expect(res.body.message).toBe("Success Get Data");
        // expect(res.body.data).toEqual(findAll);
      });
  });
});

describe.skip("DELETE /api/", () => {
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
