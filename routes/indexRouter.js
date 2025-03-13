const { Router } = require("express");

const indexRouter = Router();

// sample messages
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
    likes: 0,
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
    likes: 0,
  },
];

// home page route with EJS templating system
indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Message Board", messages: messages });
});

// New Message form route
indexRouter.get("/new", (req, res) => {
  res.render("form", { title: "Leave a message!" });
});

indexRouter.post("/new", (req, res) => {
  // get contents from the form
  const messageUser = req.body.messageUser;
  const messageText = req.body.messageText;
  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
    likes: 0,
  });
  res.redirect("/");
});

indexRouter.post("/like/:messageIndex", (req, res) => {
  const messageIndex = parseInt(req.params.messageIndex);
  // Validate messageIndex
  if (
    isNaN(messageIndex) ||
    messageIndex < 0 ||
    messageIndex >= messages.length
  ) {
    return res.status(400).json({ success: false });
  }

  // Initialize likes if it doesn't exist
  if (typeof messages[messageIndex].likes !== "number") {
    messages[messageIndex].likes = 0;
  }

  // Increment likes
  messages[messageIndex].likes++;

  // Return new count
  res.json({
    success: true,
    likes: messages[messageIndex].likes,
  });
});
module.exports = indexRouter;
