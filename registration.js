import {
  generateRandomId,
  hashUserPassword,
  sanitizeUsername,
  validateEmail,
  validatePassword,
} from "./utils/helperFunctions.js";

export const registerUser = async (userData) => {
  try {
    const { email, password, username } = userData;
    if (!email || !password || !username) {
      throw new Error("please provide email, password and username!");
    }

    const verifyEmail = validateEmail(email.toLowerCase());
    if (!verifyEmail) throw new Error("provide a valid email!");
    const verifyPassword = validatePassword(password);
    if (!verifyPassword)
      throw new Error(
        "Strong password required: 8+ chars, symbol, number, uppercase, lowercase."
      );

    const verifyUsername = sanitizeUsername(username);
    const hashedPassword = await hashUserPassword(password);
    const id = generateRandomId();

    return {
      success: true,
      message: "User registered successfully. Please verify your email.",
      data: { id, verifyUsername, email, hashedPassword },
    };
  } catch (err) {
    return { success: false, message: err.message || "some error occurred!" };
  }
};
