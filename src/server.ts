import express from "express";
import ConnectDB from "./db.js";
import router from "./Route/CreateUser.js";
import cors from 'cors'


const app = express();


ConnectDB()
app.use(cors({
  origin : "https://vercel-crud-frontend-pi.vercel.app",
  
}))
app.use(express.json())
app.use('/api',router)

app.get("/", (req, res) => {
  res.send("Hello ,World");
});




export default app
