require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//routers
const usersRouter = require("./routes/users.js")
const tweetsRouter = require('./routes/tweets.js')
const commentsRouter = require('./routes/comments.js')

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
app.use('/tweets', commentsRouter)

//ENGINE
// serve static files from the styles directory
app.use(express.static("./styles"));

// require the filesystem module
const fs = require("fs");
// define the template engine
app.engine("users", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    // Here, we take the content of the template file,
    // convert it to a string, and replace sections of
    // it with the values being passed to the engine.
    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

app.set("views", "./views"); // specify the views directory
app.set("view engine", "users"); // register the template engine

// New User form
app.get("/users/new", (req, res) => {
    // only works for GET and POST request be default
    // if you are trying to send a PATCH, PUT, DELETE, etc. Look into method-override packed 
    res.send(`
      <div>
        <h1>Create a User</h1>
        <form action="/users" method="POST">
          Name: <input type="text" name="name" />
          <br />
          Username: <input type="text" name="username"/>
          <br />
          Email: <input type="text" name="email" />
          <br />
          <input type="submit" value="Create User" />
        </form>
      </div>
      `)
})



app.get("/", (req, res) => {
    res.send("HOME")
})

// 404 Error Handling Middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
});

// Custom 404 (not found) middleware.
// Since we place this last, it will only process
// tesif no other rou have already sent a response!
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})