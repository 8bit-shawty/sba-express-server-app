require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//routers
const usersRouter = require("./routes/users.js")
const tweetsRouter = require('./routes/tweets.js')

const error = require('./utilities/error.js')
console.log(typeof error)




// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

// New logging middleware to help us keep track of
// requests during testing!
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

app.use("/users", usersRouter)
app.use('/tweets', tweetsRouter)



app.get("/", (req, res) => {
  res.send("HOME")
})

// 404 Error Handling Middleware
// app.use((req, res, next) => {
//   next(error(404, "Resource Not Found"));
// });

// // Custom 404 (not found) middleware.
// // Since we place this last, it will only process
// // tesif no other rou have already sent a response!
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.json({ error: err.message });
// });


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})