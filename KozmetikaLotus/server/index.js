require("dotenv").config();
const seedSuperAdmin = require("./seed/seedAdmin");
const seedCategories = require("./seed/categoriesSeed");
const seedBrands = require("./seed/brandsSeed");
const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./models");

// Middleware to parse JSON
app.use(express.json());

// CORS config
const corsOptions = {
  origin: ["http://109.199.98.248/", "http://109.199.98.248:3000", "http://koz-lotus.duckdns.org", "https://koz-lotus.duckdns.org", "http://backend-koz-lotus.duckdns.org", "https://backend-koz-lotus.duckdns.org", "http://kozmetikalotus.com", "https://kozmetikalotus.com", "https://www.kozmetikalotus.com", "http://www.kozmetikalotus.com", "http://backend.kozmetikalotus.com", "https://backend.kozmetikalotus.com", "http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Creating a new router for the /api endpoint
const apiRouter = express.Router();

// Mounting Routes under /api endpoint

// UserRouter
const userRouter = require("./routes/Users");
apiRouter.use("/users", userRouter);
// Auth Router
const authRouter = require("./routes/Auth");
apiRouter.use("/auth", authRouter);
console.log("authRouter mounted", authRouter);
// Product router
const productRouter = require("./routes/Products");
apiRouter.use("/products", productRouter);
// CategoryRouter
const categoryRouter = require("./routes/Categories");
apiRouter.use("/categories", categoryRouter);
// OrderRouter
const orderRouter = require("./routes/Orders");
apiRouter.use("/orders", orderRouter);
// Mailer Routes
const mailerRouter = require("./routes/Mailer");
apiRouter.use("/mailer", mailerRouter);

const clientsRouter = require("./routes/Clients");
apiRouter.use("/clients", clientsRouter);

// Mount the apiRouter under the /api endpoint
app.use("/api", apiRouter);

// Creating sequelize sync with db
setTimeout(() => {
  db.sequelize.sync().then(() => {
    seedSuperAdmin();
    seedCategories();
    seedBrands();

    console.log("-------------------------------");
    console.log("Seeds are done");
    // After sync is complete we start server
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  });
}, 3000);

// Export the app for serverless function
module.exports = app;
