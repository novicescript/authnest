import bcryptjs from "bcryptjs";
import { customAlphabet } from "nanoid";
import { randomString } from "./constants.js";

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!#%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const hashUserPassword = async (password) => {
  return await bcryptjs.hash(password, 14);
};

export const generateRandomId = () => {
  const nanoid = customAlphabet(randomString, 10);
  return nanoid();
};

export function sanitizeUsername(username) {
  return username.replace(/[-._]+/g, "_");
}
