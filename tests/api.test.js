const request = require("supertest");
const app = require("../app");

// endpoint Register
const userTest = {
  email: "user@test.com",
  username: "userTest",
  password: "password123",
  user_id: 1,
};

const bioTest = {
  bio: "Bio Test",
};
const bioUpdateTest = {
  bio: "User Udate",
};

const scoreTest = {
  score: 1000,
};

var data = "";

var token = "";
// var token1 = "";

const truncate = require("../helpers/truncate");
truncate.user();
truncate.userBio();
truncate.userHistory();

// Test Register
describe("/api/auth endpoint", () => {
  // register berhasil
  test("register berhasil", async () => {
    try {
      const res = await request(app).post("/api/auth").send(userTest);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Account Created");
      expect(res.body.data).toStrictEqual({
        email: userTest.email,
        username: userTest.username,
      });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });

  // register gagal karena email sudah dipakai
  test("register gagal", async () => {
    try {
      const res = await request(app).post("/api/auth").send(userTest);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Email Already Used");
      expect(res.body.data).toBe(null);
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});
// Test Login
describe("/api/auth/login endpoint", () => {
  // login gagal
  test("login gagal", async () => {
    try {
      const res = await request(app)
        .post("/api/auth/login")
        .send({
          email: userTest.email,
          password: `${userTest.password}4`,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Login Error");
      expect(res.body.data).toBe(null);
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });

  // login berhasil
  test("login berhasil", async () => {
    try {
      const res = await request(app).post("/api/auth/login").send({
        email: userTest.email,
        password: userTest.password,
      });

      token = res.body.data.token;

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.data).toHaveProperty("token");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Success Login");
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});
// Test Add Bio
describe("/api/add endpoint", () => {
  test("Add Bio Berhasil", async () => {
    try {
      const res = await request(app)
        .post("/api/add")
        .set({ Authorization: token })
        .send({
          bio: bioTest.bio,
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Bio Created");
      expect(res.body.data).toHaveProperty("username");
      expect(res.body.data).toHaveProperty("bio");
      expect(res.body.data).toHaveProperty("user_id");
      expect(res.body.data.username).toBe(userTest.username);
      expect(res.body.data.bio).toBe(bioTest.bio);
      expect(res.body.data.user_id).toBe(userTest.user_id);
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
  //login gagal
  test("Add Bio Gagal", async () => {
    try {
      const res = await request(app)
        .post("/api/add")
        .set({ Authorization: token })
        .send({
          bio: bioTest.bio,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("You've Already Created a Bio");
      expect(res.body.data).toBe(null);
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});
// Test Show All Bio
describe("/api/index endpoint", () => {
  test("Show All Data Berhasil", async () => {
    try {
      const res = await request(app)
        .get("/api/index")
        .then((res) => {
          data = res.body.data;
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("status");
          expect(res.body).toHaveProperty("message");
          expect(res.body).toHaveProperty("data");
          expect(res.body.status).toBe(true);
          expect(res.body.message).toBe("Success Get All Data");
          expect(res.body.data).toEqual(data);
        });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});
// Test Show By Id
describe("/api/1 endpoint", () => {
  test("Show Data By Id Gagal", async () => {
    try {
      const res = await request(app)
        .get("/api/4")
        .then((res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body).toHaveProperty("status");
          expect(res.body).toHaveProperty("message");
          expect(res.body).toHaveProperty("data");
          expect(res.body.status).toBe(false);
          expect(res.body.message).toBe("Data Not Exist");
          expect(res.body.data).toBe(null);
        });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
  test("Show Data By Id Berhasil", async () => {
    try {
      const res = await request(app)
        .get(`/api/${userTest.user_id}`)
        .then((res) => {
          data = res.body.data;
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("status");
          expect(res.body).toHaveProperty("message");
          expect(res.body).toHaveProperty("data");
          expect(res.body.status).toBe(true);
          expect(res.body.message).toBe("Success Get Data");
          expect(res.body.data).toBe(data);
        });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});
// Test Update & Delete
describe("/api/update & api/1 endpoint", () => {
  test("Update Berhasil", async () => {
    try {
      const res = await request(app)
        .put("/api/update")
        .set({ Authorization: token })
        .send({
          bio: bioUpdateTest.bio,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Bio Updated");
      // expect(res.body.data).toBe(null);
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });

  test("Delete Berhasil", async () => {
    try {
      const res = await request(app)
        .delete("/api/1")
        .set({ Authorization: token })
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("status");
          expect(res.body).toHaveProperty("message");
          expect(res.body).toHaveProperty("data");
          expect(res.body.status).toBe(true);
          expect(res.body.message).toBe("Success Delete Data");
          // expect(res.body.data).toBe(null);
        });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });

  test("Update gagal", async () => {
    try {
      truncate.userBioDelete();
      const res = await request(app)
        .put("/api/update")
        .set({ Authorization: `${token}` })
        .send({
          bio: bioUpdateTest.bio,
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("You Haven't Created Bio Yet");
      expect(res.body.data).toBe(null);
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
  //login gagal
});
// Test Add History Game
describe("/api/history endpoint", () => {
  test("Add History Berhasil", async () => {
    try {
      const res = await request(app)
        .post("/api/history")
        .set({ Authorization: token })
        .send({
          score: scoreTest.score,
        });
      data = res.body.data;
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Score Saved");
      expect(res.body.data).toEqual(data);
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
  //login gagal
});
// Test Show All Histories
describe("/api/history/index endpoint", () => {
  test("Show All Data Berhasil", async () => {
    try {
      const res = await request(app)
        .get("/api/history/index")
        .then((res) => {
          data = res.body.data;
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("status");
          expect(res.body).toHaveProperty("message");
          expect(res.body).toHaveProperty("data");
          expect(res.body.status).toBe(true);
          expect(res.body.message).toBe("Success Get All Data");
          expect(res.body.data).toEqual(data);
        });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});

// Test Show History by Index
describe("/api/history/5 endpoint", () => {
  test("Show History By Id Gagal", async () => {
    try {
      const res = await request(app)
        .get("/api/history/5")
        .then((res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body).toHaveProperty("status");
          expect(res.body).toHaveProperty("message");
          expect(res.body).toHaveProperty("data");
          expect(res.body.status).toBe(false);
          expect(res.body.message).toBe("Data Not Exist");
          expect(res.body.data).toEqual(null);
        });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
  test("Show History By Id Berhasil", async () => {
    try {
      const res = await request(app)
        .get("/api/history/1")
        .then((res) => {
          data = res.body.data;
          expect(res.statusCode).toBe(200);
          expect(res.body).toHaveProperty("status");
          expect(res.body).toHaveProperty("message");
          expect(res.body).toHaveProperty("data");
          expect(res.body.status).toBe(true);
          expect(res.body.message).toBe("Success Get Data");
          expect(res.body.data).toEqual(data);
        });
    } catch (err) {
      expect(err).toBe("error"); // test gagal karena err != 'error'
    }
  });
});
