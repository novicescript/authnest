import { registerUser } from "./registration.js";

const user = {
  username: "john-989-..doe",
  email: "john.doe@gmail.com",
  password: "tEst123#",
};

const register = async () => {
  try {
    const result = await registerUser(user);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

register();
