import express from "express";

// load .env file
process.loadEnvFile();

const app = express();

// parse JSON body
app.use(express.json());

// start server on port 3000
app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
