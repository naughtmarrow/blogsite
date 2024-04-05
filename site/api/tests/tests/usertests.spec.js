const { test, expect } = require("@playwright/test");
const testuser_username = "hellofromtest";
const testuser_password = "thisisapassword";

test("users is up", async ({ request }) => {
    const response = await request.get("/users");
    expect(response.ok()).toBeTruthy();
});

/*
test("users are created", async ({ request }) => {
    const username = `testuser-${Math.random().toString(36).substring(2, 7)}`;
    const user_id = await request.post("/users/new", {
        data: {
            username: username,
            password: "testpassword12",
        },
        headers: {
            "Content-Type": "application/json",
        },
    });

    expect(user_id.status()).toBe(201);

    const user = await request.get(`/users/name/${username}`);
    expect(user.status()).toBe(200);
    const user_json = await user.json();
    expect(user_json.username).toBe(username);
});

test("can GET user with username", async ({ request }) => {
    const username = "testuser-sqjpu";
    const user = await request.get(`/users/name/${username}`);
    expect(user.status()).toBe(200);
    const user_json = await user.json();
    expect(user_json.username).toBe(username);
});
*/

test("users can login", async ({request})=>{
    const user = await request.post("/users/login", {
        data: {
            username: testuser_username,
            password: testuser_password,
        },
        headers:{
            "Content-Type": "application/json",
        }
    })

    expect(user.status()).toBe(200);

    const user_json = await user.json();
    expect(user_json.message).toBe("Login accepted");
    expect(user_json.user.username).toBe(testuser_username);
})

test("get 401 if password is wrong", async ({request}) => {
    const user = await request.post("/users/login", {
        data: {
            username: testuser_username,
            password: "no_password",
        },
        headers:{
            "Content-Type": "application/json",
        }
    })

    expect(user.status()).toBe(401);

    const user_json = await user.json();
    expect(user_json.message).toBe("User or password incorrect");
})

test("get 401 if username is wrong too", async ({request}) => {
    const user = await request.post("/users/login", {
        data: {
            username: "no_username",
            password: "no_password",
        },
        headers:{
            "Content-Type": "application/json",
        }
    })

    expect(user.status()).toBe(401);

    const user_json = await user.json();
    expect(user_json.message).toBe("User or password incorrect");
})

/*
test("temp test to send in one user", async ({ request }) => {
    const user_id = await request.post("/users/new", {
        data: {
            username: testuser_username,
            password: testuser_password,
        },
        headers: {
            "Content-Type": "application/json",
        },
    });

    expect(user_id.status()).toBe(201);

    const user = await request.get(`/users/name/${testuser_username}`);
    expect(user.status()).toBe(200);
    const user_json = await user.json();
    expect(user_json.username).toBe(testuser_username);
});
*/
