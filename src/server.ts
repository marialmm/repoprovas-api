import app from "./index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = +process.env.PORT ||4000;

app.listen(PORT, ()=> {
    console.log("Server running on port " + PORT);
});