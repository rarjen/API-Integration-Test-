const { Collection, Item, Header } = require("postman-collection");
const fs = require("fs");

// Membuat Collection
const postmanCollection = new Collection({
  info: {
    name: "Dokumentasi RESTful API Challenge-4",
  },
  item: [],
});

// Set Header
// const rawHeaderString =
//   "Authorization:\nContent-Type:application/json\ncache-control:no-cache";

// const rawHeader = Header.parse(rawHeaderString);

// const requestHeader = rawHeader.map((h) => new Header(h));

// Add tests for request
const requestTests = `
    pm.test("Sample Test: test for successful response", ()=>{
        pm.expect(pm.response.code).to.equal(200)
    })
`;

// Request User Register
const postmanRequestUserRegister = new Item({
  name: "Request User Register",
  request: {
    header: {
      "Content-type": "application/json",
    },
    url: "http://localhost:3000/auth",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        email: "lewandowski09@gmail.com",
        username: "RL09",
        password: "qwerty123",
      }),
    },
    auth: null,
  },
  events: [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: requestTests,
      },
    },
  ],
});

// Request User Login
const postmanRequestUserlogin = new Item({
  name: "Request User Login",
  request: {
    header: {
      "Content-type": "application/json",
    },
    url: "http://localhost:3000/auth/login",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        email: "lewandowski09@gmail.com",
        password: "qwerty123",
      }),
    },
    auth: null,
  },
  events: [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: requestTests,
      },
    },
  ],
});

// Request Create Bio
const postmanRequestCreateBio = new Item({
  name: "Request User Create Bio",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJsZXdhbmRvd3NraTA5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiUkwwOSIsImlhdCI6MTY2NDg2MzM2MX0.UXJ2rQHrkqEpvhWDp2m1_pIegfWJgJTTZIMtDqtwmlY",
    },
    url: "http://localhost:3000/userBio",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        bio: "Best Number 9 in the world",
      }),
    },
    auth: null,
  },
  events: [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: requestTests,
      },
    },
  ],
});

// Request Update Bio
const postmanRequestUpdateBio = new Item({
  name: "Request Update Bio",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJsZXdhbmRvd3NraTA5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiUkwwOSIsImlhdCI6MTY2NDg2MzM2MX0.UXJ2rQHrkqEpvhWDp2m1_pIegfWJgJTTZIMtDqtwmlY",
    },
    url: "http://localhost:3000/userBio/update",
    method: "PUT",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        bio: "Best Number 9 in the world at the moment",
      }),
    },
    auth: null,
  },
  events: [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: requestTests,
      },
    },
  ],
});

// Request Get All Bio
const postmanRequestIndexBio = new Item({
  name: "Request Get All Bio",
  request: {
    header: {
      "Content-type": "application/json",
    },
    url: "http://localhost:3000/userBio/index",
    method: "GET",
  },
  events: [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: requestTests,
      },
    },
  ],
});

// Request Get Bio by Id
const postmanRequestShowBio = new Item({
  name: "Request Get Bio by Id",
  request: {
    header: {
      "Content-type": "application/json",
    },
    url: "http://localhost:3000/userBio/2",
    method: "GET",
  },
  events: [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: requestTests,
      },
    },
  ],
});

// Request Delete Bio
const postmanRequestDeleteBio = new Item({
  name: "Request Delete Bio",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJsZXdhbmRvd3NraTA5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiUkwwOSIsImlhdCI6MTY2NDg2MzM2MX0.UXJ2rQHrkqEpvhWDp2m1_pIegfWJgJTTZIMtDqtwmlY",
    },
    url: "http://localhost:3000/userBio",
    method: "DELETE",
    auth: null,
  },
  events: [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: requestTests,
      },
    },
  ],
});

// Request Create History
const postmanRequestCreateHistory = new Item({
  name: "Request Create History",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJsZXdhbmRvd3NraTA5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiUkwwOSIsImlhdCI6MTY2NDg2MzM2MX0.UXJ2rQHrkqEpvhWDp2m1_pIegfWJgJTTZIMtDqtwmlY",
    },
    url: "http://localhost:3000/userHistory",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        score: 5000,
      }),
    },
    auth: null,
  },
  events: [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: requestTests,
      },
    },
  ],
});

// Request Get All History
const postmanRequestIndexhistory = new Item({
  name: "Request Get All History",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJsZXdhbmRvd3NraTA5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiUkwwOSIsImlhdCI6MTY2NDg2MzM2MX0.UXJ2rQHrkqEpvhWDp2m1_pIegfWJgJTTZIMtDqtwmlY",
    },
    url: "http://localhost:3000/userHistory/index",
    method: "GET",
    auth: null,
  },
  events: [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: requestTests,
      },
    },
  ],
});

// Request History by Id
const postmanRequestShowhistory = new Item({
  name: "Request Get History by Id",
  request: {
    header: {
      "Content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJsZXdhbmRvd3NraTA5QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiUkwwOSIsImlhdCI6MTY2NDg2MzM2MX0.UXJ2rQHrkqEpvhWDp2m1_pIegfWJgJTTZIMtDqtwmlY",
    },
    url: "http://localhost:3000/userHistory/1",
    method: "GET",
    auth: null,
  },
  events: [
    {
      listen: "test",
      script: {
        type: "text/javascript",
        exec: requestTests,
      },
    },
  ],
});

// memasukkan kedalam collection
postmanCollection.items.add(postmanRequestUserRegister);
postmanCollection.items.add(postmanRequestUserlogin);
postmanCollection.items.add(postmanRequestCreateBio);
postmanCollection.items.add(postmanRequestUpdateBio);
postmanCollection.items.add(postmanRequestIndexBio);
postmanCollection.items.add(postmanRequestShowBio);
postmanCollection.items.add(postmanRequestDeleteBio);
postmanCollection.items.add(postmanRequestCreateHistory);
postmanCollection.items.add(postmanRequestIndexhistory);
postmanCollection.items.add(postmanRequestShowhistory);

// convert to json
const collectionJSON = postmanCollection.toJSON();

// Export to File
fs.writeFile("./collection.json", JSON.stringify(collectionJSON), (err) => {
  if (err) {
    console.log("file saved");
  }
});
