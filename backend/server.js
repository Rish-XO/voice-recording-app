const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

const port = 5000; // Choose a port number for your backend server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
