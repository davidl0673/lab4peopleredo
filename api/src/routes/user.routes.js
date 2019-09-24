const User = require("../models/User");
const { AsyncRouter } = require("express-async-router");

const router = AsyncRouter();

// List route
router.get("/", async (req, res) => {
  const users = await User.find({});

  res.send(users);
});

// Create route
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
console.log(user)
  res.status(201).send(user);
});

// Retrieve route
router.get("/:_id", async (req, res) => {
  const user = await User.findOne({_id: req.params._id});
  if(!user) return res.sendStatus(404);

  res.send(user);
});

// Update route
router.patch("/:_id", async (req, res) => {
  const user = await User.findOne({_id: req.params._id});
  if(!user) return res.sendStatus(404);

  user.set(req.body);
  await user.save();

  res.send(user);
});

// Delete route
router.delete("/:_id", async (req, res) => {
  const user = await User.findOne({_id: req.params._id});
  if(!user) return res.sendStatus(404);
  await user.remove();

  res.send(user);
});

module.exports = router;