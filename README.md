# Authnest

AuthNest is a comprehensive authentication and user management package designed to provide secure and flexible user authentication and management solutions for web applications. It offers a robust and flexible solution for implementing authentication and user management functionalities in web applications, prioritizing security, usability, and customization.

### Features

1. User Registration: Added user registration that allows users to sign up for their application. This includes:

- Input validation for email, password, and username.
- Password hashing for storing passwords securely.

##### Coming Soon...

more features

### Installation

You can install the package via npm:

```bash
npm install authnest
```

### Usage

#### 1. Set Database Configuration

Before using the authentication and user registration functionalities, you need to set up the database configuration.

```javascript
import { setDataBaseConfig } from "authnest";

// Define database configuration
// FOR POSTGRESQL
const dbConfig = {
  connectionString: "postgres://postgres:admin@localhost:5432/mydb",
};

// FOR MONGODB
const dbConfig = {
  connectionString: "postgres://postgres:admin@localhost:5432/mydb",
};

setDataBaseConfig("postgresql | mongodb", dbConfig.connectionString);
```

#### Optional:

- If you are going to use PostgreSql than make sure you have created db and table with name users in your system || server.

#### 2. User Registration

After setting up the database configuration, you can register new users.

```javascript
import { registerUser } from "authnest";

// Example usage:
const userData = {
  username: "john_doe",
  email: "john@example.com",
  password: "Password123",
};

registerUser(userData)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

//   or

async function authFunction() {
  try {
    const result = await registerUser(userData);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

authFunction();
```

For more detailed documentation and examples, please refer to the <a href="#">API</a> documentation.

## License

This package is licensed under the MIT License. See the <a>LICENSE</a> file for details.
