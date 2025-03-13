const { Router } = require("express");

const indexRouter = Router();

// sample messages
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// home page route with EJS templating system
indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Message Board", messages: messages });
});

// New Message form route
indexRouter.get("/new", (req, res) => {
  res.render("form", { title: "Add a new message!" });
});

indexRouter.post("/new", (req, res) => {
  // get contents from the form
  const messageUser = req.body.messageUser;
  const messageText = req.body.messageText;
  messages.push({ text: messageText, user: messageUser, added: new Date() });
  res.redirect("/");
});
module.exports = indexRouter;
