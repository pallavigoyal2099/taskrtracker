
import dotenv from "dotenv";
import app from "./app.js";
import { ConnectDb } from "./config/db.config.js";
 dotenv.config();

const port = process.env.PORT || 8000;

//db connection
ConnectDb();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}   );

