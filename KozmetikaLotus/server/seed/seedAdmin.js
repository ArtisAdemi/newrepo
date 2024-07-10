const models = require("../models"); // Adjust the path according to your project structure

const user = {
  "email": "admin@example.com",
  "firstName": "Super",
  "lastName": "Admin",
  "phoneNumber": "1234567890",
  "role": "admin",
  "password": "$2b$10$FxmKNuBQ2PcAza2ViN/xWu6J77WFHhNOezdKMlKI0BlEZzCJFoBY.", // 123123123
  "discount": 0.0
}

const seedSuperAdmin = async () => {

  const { email, firstName, lastName, phoneNumber, role, password, discount } = user;

  // Use findOrCreate to avoid duplicating the super admin if it already exists
  await models.Users.findOrCreate({
    where: { email },
    defaults: {
      firstName,
      lastName,
      phoneNumber,
      role,
      password, // Assuming the password is already hashed
      discount
    }
  });
};

module.exports = seedSuperAdmin;
