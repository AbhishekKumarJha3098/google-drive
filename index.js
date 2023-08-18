const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const fileRoutes = require("./routes/file-upload-routes");
const connectDB = require("./database");
const fs = require("fs")

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config({
  path: path.join(__dirname, ".env"),
});

connectDB();

const dir="./uploads"
if(!fs.existsSync(dir)){
  fs.mkdirSync(dir)
}
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", fileRoutes.routes);
app.get("/", (req, res) => {
  res.status(200).send("This is a String");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server started at port: " + PORT);
});
