  
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");


const UserRouter = require("./routes/user.routes");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("stuff and things");
});

app.use("/users", UserRouter);

const connectDatabase = async () => {
  const database = await mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  });

  console.log("Connected to database...");

  return database;
}

const startServer = (port=8000) => {
  app.listen(port, async () => {
    await connectDatabase();
    console.log(`Listening @ localhost:${port}...`);
  });
}

module.exports = {
   connectDatabase,
   startServer,
   app
}