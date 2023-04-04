import mongoose from "mongoose";

function connection() {
  mongoose
    .connect(
      "mongodb+srv://Shreyash:shreyash1234@cluster0.eyxgk.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log("Connecton to database failed");
    });
}

export default connection;
