import express  from "express";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path';
import cookieParser from "cookie-parser";
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/bookings.js'
import { log } from "console";
import apiRouter from "./routes/api.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOptions = {
   origin: true,
   credentials: true
}

mongoose.set("strictQuery", false)
const connect = async() => {
   try {
      console.log('====================================');
      console.log(process.env.MONGO_URI);
      console.log('====================================');
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
      })

      console.log('MongoDB connected')
   } catch (error) {
      console.log('MongoDB connected failed')
   }
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use("/auth", authRoute)
app.use("/tours", tourRoute)
app.use("/users", userRoute)
app.use("/review", reviewRoute)
app.use("/booking", bookingRoute)
app.use("/api",apiRouter)

// ✅ Frontend ko serve karna:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(port, () => {
   connect()
   console.log('server listening on port', port)
})