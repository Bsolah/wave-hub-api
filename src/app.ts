import express, { Application } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import sequelize from "./config/database"
import userRoutes from "./routes/userRoutes"
import errorMiddleware from "./middleware/error.middleware"

dotenv.config()

const app: Application = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use("/api", userRoutes)

app.use(
  (
    err: express.ErrorRequestHandler,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    errorMiddleware(err, req, res, next)
  },
)

// Test DB Connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err))

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
