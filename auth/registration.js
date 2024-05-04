import {
  validateEmail,
  validatePassword,
  sanitizeUsername,
  hashUserPassword,
} from "../utils/index.js";
import { getDatabaesConfig, getDatabaseType } from "../configs/dbConfig.js";
import MongoDBAdapter from "../database/mongoAdapter.js";
import PostgreSQLAdapter from "../database/pgAdapter.js";

export const registerUser = async (userData) => {
  try {
    let dbType = getDatabaseType();
    const dbConnnectionString = getDatabaesConfig();

    if (!dbConnnectionString)
      throw new Error("Database connection string not found!");

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

    const verifiedUsername = sanitizeUsername(username);
    const hashedPassword = await hashUserPassword(password);

    if (!dbConnnectionString)
      throw new Error("Database connection string not found!");

    if (!dbType) {
      if (dbConnnectionString.startsWith("mongodb")) dbType = "mongodb";
      else if (dbConnnectionString.startsWith("postgresql"))
        dbType = "postgresql";
    }

    let adapter;
    if (dbType === "mongodb") {
      adapter = new MongoDBAdapter(dbConnnectionString);
    } else if (dbType === "postgresql") {
      adapter = new PostgreSQLAdapter(dbConnnectionString);
    } else {
      throw new Error("Unsupported database type");
    }

    const existingUser = await adapter.getUserByEmail(email.toLowerCase());
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const newUser = await adapter.createUser({
      email: email.toLowerCase(),
      username: verifiedUsername,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "User registration successfully.",
      data: newUser,
    };
  } catch (err) {
    return { success: false, message: err.message || "some error occurred!" };
  }
};
