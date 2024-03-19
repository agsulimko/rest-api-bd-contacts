const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const DB_HOST =
  "mongodb+srv://Artem:5Gu6JbN56BqOvwg6@cluster0.b1qvw6h.mongodb.net/contact-book";

// const { DB_HOST, PORT = 4000 } = process.env;

const PORT = 4000;
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
