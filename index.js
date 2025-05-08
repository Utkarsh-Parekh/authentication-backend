const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

//Routes
const userRoute = require('./src/routes/user_routes');
const noteRouter = require('./src/routes/note_routes');

const { connectMongoDb } = require("./connection")

const cors = require('cors');

//This will convert the request body to json
app.use(express.json());

app.use(cors());


app.use("/users", userRoute);
app.use("/notes", noteRouter)


app.get("/",(req,res) => {
  return res.json({
    message : "get Request"
  })
})

//Port Number
const PORT = process.env.PORT || 5000;


//Environment Check
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  console.log('Server is running in Development Mode');
} else if (env === 'production') {
  console.log('Server is running in Production Mode');
}

//DB Connection
connectMongoDb(env === 'production' ?  process.env.MONGODB_URI_ATLAS : process.env.MONGODB_URI).then(() => console.log("MongoDb Connected"))


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started at port ${PORT}`);
});