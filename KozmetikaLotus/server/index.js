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
  origin: ["http://109.199.98.248/", "http://109.199.98.248:3000", "http://kozmetikalotus.com", "https://kozmetikalotus.com", "https://www.kozmetikalotus.com", "http://www.kozmetikalotus.com", "http://backend.kozmetikalotus.com", "https://backend.kozmetikalotus.com", 'http://localhost:45678', "http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Also add CORS headers to all responses as a fallback
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOptions.origin.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', 'https://kozmetikalotus.com');
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(204).send();
  }
  next();
});

// Creating a new router for the /api endpoint
const apiRouter = express.Router();

// Mounting Routes under /api endpoint

// UserRouter
const userRouter = require("./routes/Users");
apiRouter.use("/users", userRouter);
// Auth Router
const authRouter = require("./routes/Auth");
apiRouter.use("/auth", authRouter);
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
    // seedSuperAdmin();
    // seedCategories();
    // seedBrands();

    // console.log("-------------------------------");
    // console.log("Seeds are done");
    // After sync is complete we start server
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  });
}, 3000);

// Export the app for serverless function
module.exports = app;
